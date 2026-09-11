// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Test-ETH escrow for private aggregates. The immutable platform verifier is trusted.
contract SportProofMarket is Ownable, Pausable, ReentrancyGuard {
    enum Status {
        None,
        Funded,
        Delivered,
        Disputed,
        Settled,
        Refunded
    }
    enum Reason {
        None,
        CommitmentMismatch,
        IncorrectCalculation,
        WrongScope,
        IncompatiblePopulation,
        FalseCoverage,
        PrivacyViolation,
        InaccessibleDelivery,
        DeliveryTimeout,
        VerifierTimeout
    }

    struct OfferTerms {
        bytes32 termsHash;
        bytes32 datasetCommitment;
        bytes32 reportCommitment;
        uint256 priceWei;
        uint64 expiry;
        uint32 deliveryWindow;
        uint32 reviewWindow;
        uint32 resolutionWindow;
        address allowedBuyer;
        uint32 purchaseLimit;
    }

    struct Offer {
        address seller;
        OfferTerms terms;
        uint32 purchases;
        bool cancelled;
    }

    struct Order {
        uint256 offerId;
        address buyer;
        uint256 priceWei;
        uint64 fundedAt;
        uint64 deliveryDeadline;
        uint64 deliveredAt;
        uint64 reviewDeadline;
        uint64 resolutionDeadline;
        Status status;
    }
    address public immutable verifier;
    uint32 public constant MAX_WINDOW = 30 days;
    uint256 public offerCount;
    uint256 public orderCount;
    uint256 public totalEscrow;
    uint256 public totalCredits;
    uint256 public totalWithdrawn;
    mapping(address => bool) public approvedSellers;
    mapping(uint256 => Offer) private _offers;
    mapping(uint256 => Order) private _orders;
    mapping(address => mapping(bytes32 => uint256)) public publications;
    mapping(address => mapping(bytes32 => uint256)) public clientOrders;
    mapping(address => mapping(uint256 => uint256)) public buyerOfferOrder;
    mapping(address => uint256) public credits;
    event SellerApproval(address indexed seller, bool approved);
    event OfferRegistered(
        uint256 indexed offerId, address indexed seller, bytes32 indexed publicationKey, OfferTerms terms
    );
    event OfferCancelled(uint256 indexed offerId);
    event Purchased(
        uint256 indexed orderId,
        uint256 indexed offerId,
        address indexed buyer,
        bytes32 clientOrderKey,
        bytes32 termsHash,
        uint256 priceWei,
        uint64 deliveryDeadline
    );
    event Delivered(
        uint256 indexed orderId,
        bytes32 reportCommitment,
        bytes32 evidenceHash,
        uint64 reviewDeadline,
        uint64 resolutionDeadline
    );
    event Disputed(uint256 indexed orderId, Reason reason, bytes32 evidenceHash);
    event Outcome(
        uint256 indexed orderId,
        Status status,
        address indexed creditedTo,
        uint256 amount,
        Reason reason,
        bytes32 evidenceHash,
        bool buyerAccepted
    );
    event Withdrawn(address indexed account, uint256 amount);
    error Unauthorized();
    error InvalidTerms();
    error Duplicate();
    error NotLive();
    error WrongState();
    error Deadline();
    error InvalidReason();
    error TransferFailed();

    constructor(address admin, address verifier_) Ownable(admin) {
        if (verifier_ == address(0) || verifier_ == admin) revert InvalidTerms();
        verifier = verifier_;
    }
    modifier onlyVerifier() {
        if (msg.sender != verifier) revert Unauthorized();
        _;
    }

    function setSeller(address seller, bool approved) external onlyOwner {
        if (seller == address(0) || seller == verifier) revert InvalidTerms();
        approvedSellers[seller] = approved;
        emit SellerApproval(seller, approved);
    }

    function setPaused(bool value) external onlyOwner {
        if (value) _pause();
        else _unpause();
    }

    function getOffer(uint256 id) external view returns (Offer memory) {
        return _offers[id];
    }

    function getOrder(uint256 id) external view returns (Order memory) {
        return _orders[id];
    }

    function registerOffer(bytes32 publicationKey, OfferTerms calldata t) external whenNotPaused returns (uint256 id) {
        if (!approvedSellers[msg.sender]) revert Unauthorized();
        if (publicationKey == 0 || publications[msg.sender][publicationKey] != 0) revert Duplicate();
        if (
            t.termsHash == 0 || t.datasetCommitment == 0 || t.reportCommitment == 0 || t.priceWei == 0
                || t.expiry <= block.timestamp || t.deliveryWindow == 0 || t.deliveryWindow > MAX_WINDOW
                || t.reviewWindow == 0 || t.reviewWindow > MAX_WINDOW || t.resolutionWindow == 0
                || t.resolutionWindow > MAX_WINDOW
        ) revert InvalidTerms();
        id = ++offerCount;
        _offers[id] = Offer(msg.sender, t, 0, false);
        publications[msg.sender][publicationKey] = id;
        emit OfferRegistered(id, msg.sender, publicationKey, t);
    }

    function cancelOffer(uint256 id) external {
        Offer storage o = _offers[id];
        if (o.seller != msg.sender) revert Unauthorized();
        o.cancelled = true;
        emit OfferCancelled(id);
    }

    function purchase(uint256 id, bytes32 expectedTermsHash, bytes32 clientOrderKey)
        external
        payable
        whenNotPaused
        returns (uint256 orderId)
    {
        Offer storage o = _offers[id];
        OfferTerms storage t = o.terms;
        if (
            o.seller == address(0) || o.cancelled || block.timestamp >= t.expiry
                || (t.purchaseLimit != 0 && o.purchases >= t.purchaseLimit)
        ) revert NotLive();
        if (msg.sender == o.seller || (t.allowedBuyer != address(0) && t.allowedBuyer != msg.sender)) {
            revert Unauthorized();
        }
        if (expectedTermsHash != t.termsHash || msg.value != t.priceWei) revert InvalidTerms();
        if (
            clientOrderKey == 0 || clientOrders[msg.sender][clientOrderKey] != 0 || buyerOfferOrder[msg.sender][id] != 0
        ) revert Duplicate();
        orderId = ++orderCount;
        uint64 now_ = uint64(block.timestamp);
        uint64 deadline = now_ + t.deliveryWindow;
        _orders[orderId] = Order(id, msg.sender, msg.value, now_, deadline, 0, 0, 0, Status.Funded);
        clientOrders[msg.sender][clientOrderKey] = orderId;
        buyerOfferOrder[msg.sender][id] = orderId;
        ++o.purchases;
        totalEscrow += msg.value;
        emit Purchased(orderId, id, msg.sender, clientOrderKey, t.termsHash, msg.value, deadline);
    }

    function attestDelivery(uint256 id, bytes32 reportCommitment, bytes32 evidenceHash) external onlyVerifier {
        Order storage o = _orders[id];
        if (o.status != Status.Funded) revert WrongState();
        if (block.timestamp >= o.deliveryDeadline) revert Deadline();
        OfferTerms storage t = _offers[o.offerId].terms;
        if (reportCommitment != t.reportCommitment || evidenceHash == 0) revert InvalidTerms();
        o.status = Status.Delivered;
        o.deliveredAt = uint64(block.timestamp);
        o.reviewDeadline = o.deliveredAt + t.reviewWindow;
        o.resolutionDeadline = o.reviewDeadline + t.resolutionWindow;
        emit Delivered(id, reportCommitment, evidenceHash, o.reviewDeadline, o.resolutionDeadline);
    }

    function rejectOrder(uint256 id, Reason reason, bytes32 evidenceHash) external onlyVerifier {
        Order storage o = _orders[id];
        if (o.status != Status.Funded) revert WrongState();
        if (block.timestamp >= o.deliveryDeadline) revert Deadline();
        _objective(reason, evidenceHash);
        _finish(id, false, reason, evidenceHash, false);
    }

    function acceptDelivery(uint256 id) external {
        Order storage o = _orders[id];
        if (o.buyer != msg.sender) revert Unauthorized();
        if (o.status != Status.Delivered) revert WrongState();
        if (block.timestamp >= o.reviewDeadline) revert Deadline();
        _finish(id, true, Reason.None, bytes32(0), true);
    }

    function openDispute(uint256 id, Reason reason, bytes32 evidenceHash) external {
        Order storage o = _orders[id];
        if (o.buyer != msg.sender) revert Unauthorized();
        if (o.status != Status.Delivered) revert WrongState();
        if (block.timestamp >= o.reviewDeadline) revert Deadline();
        _objective(reason, evidenceHash);
        o.status = Status.Disputed;
        emit Disputed(id, reason, evidenceHash);
    }

    function resolveDispute(uint256 id, bool valid, Reason reason, bytes32 evidenceHash) external onlyVerifier {
        Order storage o = _orders[id];
        if (o.status != Status.Disputed) revert WrongState();
        if (block.timestamp >= o.resolutionDeadline) revert Deadline();
        if (valid) {
            if (reason != Reason.None || evidenceHash == 0) revert InvalidReason();
        } else {
            _objective(reason, evidenceHash);
        }
        _finish(id, valid, reason, evidenceHash, false);
    }

    function finalize(uint256 id) external {
        Order storage o = _orders[id];
        if (o.status != Status.Delivered) revert WrongState();
        if (block.timestamp < o.reviewDeadline) revert Deadline();
        _finish(id, true, Reason.None, 0, false);
    }

    function expire(uint256 id) external {
        Order storage o = _orders[id];
        Reason reason;
        if (o.status == Status.Funded) {
            if (block.timestamp < o.deliveryDeadline) revert Deadline();
            reason = Reason.DeliveryTimeout;
        } else if (o.status == Status.Disputed) {
            if (block.timestamp < o.resolutionDeadline) revert Deadline();
            reason = Reason.VerifierTimeout;
        } else {
            revert WrongState();
        }
        _finish(id, false, reason, 0, false);
    }

    function withdraw() external nonReentrant {
        uint256 amount = credits[msg.sender];
        if (amount == 0) revert WrongState();
        credits[msg.sender] = 0;
        totalCredits -= amount;
        totalWithdrawn += amount;
        (bool ok,) = payable(msg.sender).call{value: amount}("");
        if (!ok) revert TransferFailed();
        emit Withdrawn(msg.sender, amount);
    }

    function _objective(Reason reason, bytes32 evidenceHash) private pure {
        if (reason == Reason.None || reason > Reason.InaccessibleDelivery || evidenceHash == 0) revert InvalidReason();
    }

    function _finish(uint256 id, bool valid, Reason reason, bytes32 evidenceHash, bool accepted) private {
        Order storage o = _orders[id];
        address receiver = valid ? _offers[o.offerId].seller : o.buyer;
        o.status = valid ? Status.Settled : Status.Refunded;
        totalEscrow -= o.priceWei;
        totalCredits += o.priceWei;
        credits[receiver] += o.priceWei;
        emit Outcome(id, o.status, receiver, o.priceWei, reason, evidenceHash, accepted);
    }
}
