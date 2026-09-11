# Trust model

**Verified computation under disclosed source assumptions** is the guarantee. It is not verified audience truth. Verification is currently centralized (platform-run verifier with contract-enforced dispute deadlines); the roadmap toward optimistic bonded verification and ultimately ZK-proven aggregation is in ARCHITECTURE.md.

The platform runs the verifier, source generator, private storage, authentication and custodial test wallets. Separate roles and keys do not make these economically independent organizations. The contract is an unaudited prototype, not suitable for real funds.

Public terms and salted report commitments bind scope, snapshot, price and content before sale. The canonical core uses integer counts and numerator/denominator ratios (basis-point convenience values), sorted-key canonical JSON and a domain-separated chain/market/seller-bound commitment. A matching hash alone cannot prove source authenticity or a correct denominator. Verifier recomputation also checks metric semantics and disclosure. Its alternative distinct-count implementation shares template control flow; shared software bugs remain a risk.

Two canonical included/sealed L2 blocks are required for both funding and delivery attestation. The inclusion block counts as one. Pending or preconfirmed transactions are insufficient. This policy accepts L2 reorg risk; it is not L1 finality. Already disclosed information cannot be recalled after a reorg.

Valid unfavorable reports settle. Refunds are for objective failures, unavailable delivery, or documented deadlines. A buyer cannot veto payment forever. Anyone may invoke due finalization/expiry; a worker must submit the transaction. Funds become irrevocable credits before same-chain withdrawal. A marketplace withdrawal is not a bridge.

Report access is private and buyer-specific, with no-store responses and encrypted database artifacts. The platform operator can decrypt records. Buyers can copy or redistribute content after learning it. Thirty-day report availability is a platform promise, not permanent on-chain storage. A verifier outage after a buyer has read a report can still produce a timeout refund.

All organizations and data are fictional. Public geometry has no private counts or value-based colors. Public test fixtures never define a hosted instance’s seed. Suppression threshold 20 and constrained scopes mitigate some inference, but are not formal anonymity or a legal compliance claim. No cross-provider person graph, raw customer sale, inferred demographics, broadcast reach, impressions or ROI is provided.

Seller history records fulfillment and service outcomes, not audience attractiveness or source truth. Permissioned demo sellers and separate wallet roles do not prevent wash trading or prove Sybil resistance.
