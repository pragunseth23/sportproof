# Architecture

Next.js serves public metadata and authenticated, no-store API routes. Browser source contains the reviewed sport registry, public topology, and rendering definitions, never generated private snapshots. PostgreSQL stores principals, encrypted custodial wallet keys, normalized source relationships, frozen encrypted snapshots, immutable offers, durable jobs, reservations, transaction journals, and chain projections.

The separate Node worker executes buyer/seller model steps and settlement obligations. Model calls use OpenAI Responses function tools with strict schemas and no parallel tool calls. Buyer contexts are reconstructed from mission-scoped public data plus authorized purchased cores; seller contexts contain only their organizer inventory metadata. Tool authority, budget reservations, wallet locks and destination/function checks are application code. The deterministic verifier recalculates against the frozen snapshot.

SportProofMarket is the money authority. Its immutable verifier can attest, reject and resolve objective disputes; neither database edits nor a model response grants report access. Every private read verifies buyer identity and canonical confirmed funding and attestation receipts, matching on-chain order, and allowed current state. Encrypted artifacts use AES-256-GCM with randomized nonces and artifact identity as authenticated associated data.

The market is shared across sport packs. Snapshot scope and versioned semantics are committed before publication. Catalog and custom offers have different buyer restrictions but the same lifecycle. Chain indexing is a rebuildable projection with canonical block checkpoints and reorg invalidation; private reads independently check live canonical receipts.

## Verification roadmap

**Today: platform verifier with optimistic-style protections.** A single deterministic verifier, operated by the platform, recomputes each report against the frozen committed snapshot before attesting on-chain; escrow releases only on attestation, and buyers hold a bounded dispute window with contract-enforced deadlines and refund credits. The pre-sale commitment prevents answer swapping and the chain makes every order outcome auditable, but correctness verification itself is centralized: the verifier sees the data and the platform operates the verifier. Docs and UI must not describe this as decentralized or independent verification.

**Near term: strengthen the optimistic pattern.** The existing dispute/deadline machinery generalizes to optimistic verification proper: sellers post a bond with each delivery, results stand unless challenged inside the window, and a losing seller forfeits the bond. Challenger data access is the open design question; candidate answers are designated challengers under confidentiality terms or attested-hardware (TEE) challengers. M-of-N independent attesters is a complementary low-cost step that removes the platform's unilateral say over attestation.

**Future direction: ZK-proven aggregation.** The intended endgame replaces the trusted verifier with zero-knowledge proofs: the seller proves on-chain that the committed result is the correct output of the committed template circuit over the committed dataset, and no verifier, validator, or platform ever sees the underlying records. The current architecture is deliberately shaped for this migration — frozen Merkle-style snapshot commitments, versioned typed report templates (each template maps to one future circuit), and integer-only canonical report cores are all ZK-compatible primitives. Two limits survive even then: proofs establish correct computation over committed data, never source authenticity (that requires upstream signing by ticketing/scanner sources), and disclosure suppression must move into the circuit as a constraint. Proving cost and circuit audit burden are why this is sequenced last.

## Work boundaries

- `packages/domain`: types, strict scope validation, canonical integer-only JSON, safe evidence selection.
- `packages/sports`: sport/format registry, topology, import adapters and capability metadata.
- `packages/analytics`: deterministic calculations, verifier path, privacy and comparability.
- `packages/fixtures`: public local-test generator; hosted seed is separate and secret.
- `packages/chain`, `contracts`: chain policies, contract lifecycle, deployment and tests.
- `packages/database`, `packages/server`: durable persistence, sessions, market services, encrypted artifacts and organizer authorization.
- `packages/agents`, `apps/worker`: bounded model tools and durable job execution.
- `apps/web`: sponsor research, sport-native scope inspection, market, evidence and isolated organizer source laboratory.

Local chain testing uses a separate `sportproof_chain_test` database and explicit local fixture configuration. A chain ID alone does not identify the public testnet: local Anvil receipts remain labeled local and are not BaseScan evidence.
