# SportProof

A marketplace where sponsorship buyers pay event organizers for private, verified answers about attendance, audience, and activation, before committing to a sponsorship. Autonomous agents do the research and the buying; a smart contract on Base Sepolia holds the money and the receipts.

**Live demo:** [sportproof.vercel.app](https://sportproof.vercel.app) (bring your own Anthropic or OpenAI key to run a research mission)
**Contract:** [`0xe138722b6e466044efaa515337255a735716c326`](https://sepolia.basescan.org/address/0xe138722b6e466044efaa515337255a735716c326) on Base Sepolia (chain 84532), source verified.
**Stack:** Next.js web (Vercel) · durable agent worker (Railway) · PostgreSQL (Neon) · SportProofMarket contract (Foundry).

## How to run

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Fill in PostgreSQL, fresh 32-byte hex encryption keys, and a Base Sepolia RPC; see docs/DEPLOYMENT.md.
pnpm db:migrate
pnpm seed:local
pnpm dev
# In a second terminal:
pnpm worker
```

Open http://127.0.0.1:3000. Browse events, compare packages, connect a wallet, and start a research mission with your own Anthropic or OpenAI key.

Tests:

```sh
pnpm typecheck
pnpm test            # unit, analytics, and PostgreSQL-backed suites
pnpm test:e2e        # Playwright browser tests (pnpm exec playwright install chromium first)
forge test --root contracts
```

Deployment, contract publishing, seller onboarding, and live acceptance commands are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## The vertical: sports sponsorship

Sponsorship is a roughly $100B market that still runs on sales decks. An organizer claims "8,000 attendees, premium audience, great activation traffic," and a sponsor has no way to check any of it before wiring six figures. The data that would settle the question exists, in ticketing systems, gate scanners, and activation counters, but organizers cannot hand it out: it is commercially sensitive and full of personal records.

SportProof closes that gap for sporting events. Organizers sell bounded, verified answers ("how many hospitality tickets were actually used at the final?") instead of raw data. Sponsors buy exactly the evidence that changes their decision, then negotiate the sponsorship itself with the organizer, off the platform. Six sports are implemented with their own data semantics and interfaces: squash, tennis, basketball, soccer, running, and golf, each with venue-native views (court and session grids, fixture calendars, race waves, golf days). The demo runs on synthetic event data and testnet funds.

## Trust assumptions

Buyer and seller never have to trust each other. The seller commits to a report's contents and terms on-chain before any sale, so answers cannot be swapped afterward. The buyer's payment sits in contract escrow, not with the seller. A deterministic verifier recomputes every figure from the seller's frozen records and attests or rejects on-chain; only its attestation unlocks payment and delivery. Correct but unfavorable findings still get paid, invalid reports refund automatically, and contract deadlines prevent either side from stalling.

Trust is concentrated in one place: the verifier, whose address is fixed in the contract at deployment. Today the platform operates it. The roadmap in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) shrinks that assumption in stages: independent attesters, then optimistic bonded verification, then zero-knowledge proofs where no verifier sees the data at all.

## Biggest design decision: non-exclusive answers

Every listing can be bought by many buyers. Each purchase is its own escrow, verification, and private delivery; buyer A never learns what buyer B bought or concluded.

This works because of what the data is for. A report here is an intermediate research input, not the sponsorship decision itself. Two brands can buy the same attendance report and reach opposite conclusions, because each weighs it against its own objective, budget, and brand fit. And a firm that paid for evidence has no incentive to hand it to competitors who are evaluating the same inventory. Non-exclusivity is what makes this a marketplace rather than a brokerage: organizers price answers once and sell them many times, more sponsors can afford to participate, and the same verified evidence base serves the whole buy side without the platform picking winners.

## One important limitation

The verifier proves the calculations, not the world. It recomputes every number from the records the organizer committed, so a seller cannot miscount, redefine a denominator, or swap in a flattering answer. But if the committed records themselves were fabricated, the math will be flawlessly correct about fabricated data. Attesting that the foundational data is authentic requires signatures from upstream sources, ticketing platforms and scanner hardware signing records at creation, which is an ecosystem integration beyond this build. Buyers are trusting the organizer's raw records; what they no longer have to trust is anything the organizer says about them.

## More

[Architecture](docs/ARCHITECTURE.md) · [Trust model](docs/TRUST_MODEL.md) · [Sport packs](docs/SPORT_PACKS.md) · [Data dictionary](docs/DATA_DICTIONARY.md) · [Deployment](docs/DEPLOYMENT.md) · [Demo script](docs/DEMO_SCRIPT.md) · [Test report](docs/TEST_REPORT.md)
