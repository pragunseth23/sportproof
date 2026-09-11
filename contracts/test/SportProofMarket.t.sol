// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {SportProofMarket as M} from "../src/SportProofMarket.sol";

contract MarketTest is Test {
    M m;
    address seller = address(0x11);
    address buyer = address(0x22);
    address verifier = address(0x33);
    bytes32 constant H = bytes32(uint256(1));
    uint256 offer;

    function setUp() public {
        m = new M(address(this), verifier);
        m.setSeller(seller, true);
        vm.deal(buyer, 100 ether);
        offer = publish();
    }

    function terms() internal view returns (M.OfferTerms memory) {
        return M.OfferTerms(H, H, H, 1 ether, uint64(block.timestamp + 10000), 100, 100, 100, address(0), 0);
    }

    function publish() internal returns (uint256) {
        bytes32 key = bytes32(m.offerCount() + 1);
        M.OfferTerms memory t = terms();
        vm.prank(seller);
        return m.registerOffer(key, t);
    }

    function buy() internal returns (uint256) {
        vm.prank(buyer);
        return m.purchase{value: 1 ether}(offer, H, H);
    }

    function deliver(uint256 id) internal {
        vm.prank(verifier);
        m.attestDelivery(id, H, H);
    }

    function testOfferExpiryAndPurchaseLimit() public {
        M.OfferTerms memory t = terms();
        t.purchaseLimit = 1;
        vm.prank(seller);
        uint256 id = m.registerOffer(bytes32(uint256(55)), t);
        vm.prank(buyer);
        m.purchase{value: 1 ether}(id, H, H);
        address other = address(0x99);
        vm.deal(other, 2 ether);
        vm.prank(other);
        vm.expectRevert();
        m.purchase{value: 1 ether}(id, H, H);
        vm.warp(m.getOffer(offer).terms.expiry);
        vm.prank(other);
        vm.expectRevert();
        m.purchase{value: 1 ether}(offer, H, H);
    }

    function testBadTermsAndCommitment() public {
        M.OfferTerms memory t = terms();
        t.reviewWindow = 0;
        vm.prank(seller);
        vm.expectRevert();
        m.registerOffer(bytes32(uint256(55)), t);
        uint256 id = buy();
        vm.prank(verifier);
        vm.expectRevert();
        m.attestDelivery(id, bytes32(uint256(99)), H);
        vm.prank(verifier);
        vm.expectRevert();
        m.rejectOrder(id, M.Reason.None, H);
    }

    function testUnauthorizedAcceptAndEarlyExpiry() public {
        uint256 id = buy();
        vm.expectRevert();
        m.expire(id);
        deliver(id);
        vm.expectRevert();
        m.finalize(id);
        vm.prank(seller);
        vm.expectRevert();
        m.acceptDelivery(id);
        vm.prank(seller);
        vm.expectRevert();
        m.openDispute(id, M.Reason.WrongScope, H);
    }

    function testTerminalCannotReopen() public {
        uint256 id = buy();
        deliver(id);
        vm.prank(buyer);
        m.acceptDelivery(id);
        vm.expectRevert();
        m.finalize(id);
        vm.expectRevert();
        m.expire(id);
        vm.prank(verifier);
        vm.expectRevert();
        m.resolveDispute(id, false, M.Reason.WrongScope, H);
    }

    function testAcceptWithdraw() public {
        uint256 id = buy();
        deliver(id);
        vm.prank(buyer);
        m.acceptDelivery(id);
        assertEq(m.credits(seller), 1 ether);
        vm.prank(seller);
        m.withdraw();
        assertEq(seller.balance, 1 ether);
        assertEq(m.totalWithdrawn(), 1 ether);
        vm.expectRevert();
        vm.prank(seller);
        m.withdraw();
    }

    function testWrongPaymentAndTerms() public {
        vm.startPrank(buyer);
        vm.expectRevert();
        m.purchase{value: 2 ether}(offer, H, H);
        vm.expectRevert();
        m.purchase{value: 1 ether}(offer, 0, H);
        vm.stopPrank();
    }

    function testDuplicates() public {
        buy();
        vm.prank(buyer);
        vm.expectRevert();
        m.purchase{value: 1 ether}(offer, H, bytes32(uint256(2)));
    }

    function testPermissionsAndReserved() public {
        vm.prank(buyer);
        vm.expectRevert();
        m.registerOffer(H, terms());
        M.OfferTerms memory t = terms();
        t.allowedBuyer = address(0x44);
        vm.prank(seller);
        uint256 id = m.registerOffer(bytes32(uint256(77)), t);
        vm.prank(buyer);
        vm.expectRevert();
        m.purchase{value: 1 ether}(id, H, H);
    }

    function testCancelAndPauseDoNotStrand() public {
        uint256 id = buy();
        vm.prank(seller);
        m.cancelOffer(offer);
        m.setPaused(true);
        deliver(id);
        vm.prank(buyer);
        m.acceptDelivery(id);
        vm.prank(seller);
        m.withdraw();
        assertEq(seller.balance, 1 ether);
    }

    function testRejectInvalid() public {
        uint256 id = buy();
        vm.prank(verifier);
        m.rejectOrder(id, M.Reason.IncorrectCalculation, H);
        assertEq(m.credits(buyer), 1 ether);
        vm.prank(buyer);
        m.withdraw();
        assertEq(buyer.balance, 100 ether);
        vm.expectRevert();
        deliver(id);
    }

    function testDeliveryBoundary() public {
        uint256 id = buy();
        vm.warp(m.getOrder(id).deliveryDeadline);
        vm.expectRevert();
        deliver(id);
        m.expire(id);
        assertEq(uint256(m.getOrder(id).status), uint256(M.Status.Refunded));
    }

    function testReviewBoundary() public {
        uint256 id = buy();
        deliver(id);
        vm.warp(m.getOrder(id).reviewDeadline);
        vm.prank(buyer);
        vm.expectRevert();
        m.acceptDelivery(id);
        vm.prank(buyer);
        vm.expectRevert();
        m.openDispute(id, M.Reason.WrongScope, H);
        m.finalize(id);
        assertEq(m.credits(seller), 1 ether);
    }

    function testDisputeValidUnfavorablePaid() public {
        uint256 id = buy();
        deliver(id);
        vm.prank(buyer);
        m.openDispute(id, M.Reason.IncorrectCalculation, H);
        vm.prank(verifier);
        m.resolveDispute(id, true, M.Reason.None, H);
        assertEq(m.credits(seller), 1 ether);
    }

    function testDisputeRefund() public {
        uint256 id = buy();
        deliver(id);
        vm.prank(buyer);
        m.openDispute(id, M.Reason.WrongScope, H);
        vm.prank(verifier);
        m.resolveDispute(id, false, M.Reason.WrongScope, H);
        assertEq(m.credits(buyer), 1 ether);
    }

    function testResolutionBoundaryAndOneDispute() public {
        uint256 id = buy();
        deliver(id);
        vm.prank(buyer);
        m.openDispute(id, M.Reason.FalseCoverage, H);
        vm.prank(buyer);
        vm.expectRevert();
        m.openDispute(id, M.Reason.FalseCoverage, H);
        vm.warp(m.getOrder(id).resolutionDeadline);
        vm.prank(verifier);
        vm.expectRevert();
        m.resolveDispute(id, true, M.Reason.None, H);
        m.expire(id);
        assertEq(m.credits(buyer), 1 ether);
    }

    function testOnlyVerifier() public {
        uint256 id = buy();
        vm.prank(buyer);
        vm.expectRevert();
        m.attestDelivery(id, H, H);
        vm.prank(buyer);
        vm.expectRevert();
        m.rejectOrder(id, M.Reason.WrongScope, H);
    }

    function testFuzzAccounting(uint96 price) public {
        vm.assume(price > 0);
        M.OfferTerms memory t = terms();
        t.priceWei = price;
        vm.prank(seller);
        uint256 o = m.registerOffer(bytes32(uint256(77)), t);
        vm.deal(buyer, price);
        vm.prank(buyer);
        uint256 id = m.purchase{value: price}(o, H, H);
        assertEq(m.totalEscrow(), price);
        deliver(id);
        vm.prank(buyer);
        m.acceptDelivery(id);
        assertEq(m.totalCredits(), price);
        assertEq(address(m).balance, m.totalEscrow() + m.totalCredits());
    }

    function testForcedSurplus() public {
        buy();
        vm.deal(address(m), 2 ether);
        assertGe(address(m).balance, m.totalEscrow() + m.totalCredits());
    }

    function testBadReceiverCannotBlockOthers() public {
        BadReceiver bad = new BadReceiver(m);
        m.setSeller(address(bad), true);
        uint256 o = bad.publish(terms());
        vm.prank(buyer);
        uint256 id = m.purchase{value: 1 ether}(o, H, H);
        deliver(id);
        vm.prank(buyer);
        m.acceptDelivery(id);
        vm.expectRevert();
        bad.withdraw();
        assertEq(m.credits(address(bad)), 1 ether);
        vm.prank(buyer);
        uint256 good = m.purchase{value: 1 ether}(offer, H, bytes32(uint256(2)));
        deliver(good);
        vm.prank(buyer);
        m.acceptDelivery(good);
        vm.prank(seller);
        m.withdraw();
        assertEq(seller.balance, 1 ether);
    }
}

contract BadReceiver {
    M m;

    constructor(M m_) {
        m = m_;
    }

    function publish(M.OfferTerms memory t) external returns (uint256) {
        return m.registerOffer(bytes32(uint256(5)), t);
    }

    function withdraw() external {
        m.withdraw();
    }

    receive() external payable {
        revert();
    }
}

contract MarketHandler is Test {
    M public m;
    uint256 public deposited;
    address constant S = address(101);
    address constant B = address(102);
    address constant V = address(103);

    constructor() {
        m = new M(address(this), V);
        m.setSeller(S, true);
    }

    function create(uint96 value) external {
        value = uint96(bound(value, 1, 1 ether));
        vm.deal(B, value);
        uint256 n = m.offerCount() + 1;
        bytes32 h = bytes32(n);
        M.OfferTerms memory t = M.OfferTerms(h, h, h, value, uint64(block.timestamp + 10000), 30, 30, 30, address(0), 0);
        vm.prank(S);
        uint256 o = m.registerOffer(h, t);
        vm.prank(B);
        m.purchase{value: value}(o, h, h);
        deposited += value;
    }

    function progress(uint256 seed, bool valid, bool dispute) external {
        if (m.orderCount() == 0) return;
        uint256 id = bound(seed, 1, m.orderCount());
        M.Order memory o = m.getOrder(id);
        if (o.status == M.Status.Funded) {
            if (block.timestamp >= o.deliveryDeadline) {
                m.expire(id);
            } else {
                bytes32 h = m.getOffer(o.offerId).terms.reportCommitment;
                vm.prank(V);
                m.attestDelivery(id, h, bytes32(uint256(1)));
            }
        } else if (o.status == M.Status.Delivered) {
            if (block.timestamp >= o.reviewDeadline) {
                m.finalize(id);
            } else {
                vm.prank(B);
                if (dispute) m.openDispute(id, M.Reason.WrongScope, bytes32(uint256(1)));
                else m.acceptDelivery(id);
            }
        } else if (o.status == M.Status.Disputed) {
            if (block.timestamp >= o.resolutionDeadline) {
                m.expire(id);
            } else {
                vm.prank(V);
                m.resolveDispute(id, valid, valid ? M.Reason.None : M.Reason.WrongScope, bytes32(uint256(1)));
            }
        }
    }

    function time(uint32 seconds_) external {
        vm.warp(block.timestamp + bound(seconds_, 0, 200));
    }

    function withdraw(bool seller) external {
        address a = seller ? S : B;
        if (m.credits(a) > 0) {
            vm.prank(a);
            m.withdraw();
        }
    }
}

contract MarketInvariant is Test {
    MarketHandler handler;
    M m;

    function setUp() public {
        handler = new MarketHandler();
        m = handler.m();
        targetContract(address(handler));
    }

    function invariantSolvencyAndConservation() public view {
        assertGe(address(m).balance, m.totalEscrow() + m.totalCredits());
        assertEq(handler.deposited(), m.totalEscrow() + m.totalCredits() + m.totalWithdrawn());
    }
}
