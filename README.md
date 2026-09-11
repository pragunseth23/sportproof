# SportProof

**Private, verifiable aggregate evidence for sporting-event sponsorship due diligence.** A sponsor’s buyer agent researches events, pays organizer seller agents for bounded answers, then recommends an event and a sport-native package. Correct unfavorable findings earn payment; objective failures follow escrow refund rules.

Six sport packs cover **squash, tennis, basketball, football/soccer, running and golf**, with two fictional properties each. Their source schemas, templates, scope controls and evidence definitions differ. Extension support does not imply support for additional production sports.

All organizations, records, source claims and commercial prices are fictional. Historical evidence is from 2024–2025; sponsorship inventory is separate for 2027. Test ETH is a research budget, not a conversion of the USD commercial package budget.

## Current delivery status

The SportProofMarket contract is **deployed on Base Sepolia** at [`0xe138722b6e466044efaa515337255a735716c326`](https://sepolia.basescan.org/address/0xe138722b6e466044efaa515337255a735716c326) (manifest: `deployments/base-sepolia.json`; source verified on BaseScan). **No public application URL, live-model mission, or paid-report transaction is claimed yet.** See [test results](docs/TEST_REPORT.md) and [completion status](docs/COMPLETION.md) for exact executed coverage and remaining work. Local Anvil transactions are not public-testnet acceptance.

## Run

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Configure PostgreSQL and fresh server-only encryption keys; see docs/DEPLOYMENT.md.
pnpm db:migrate
pnpm seed:local
pnpm dev
# In a second terminal:
pnpm worker
```

Open [the local application](http://127.0.0.1:3000). Browse properties, compare public rights, inspect native scopes, or start a bounded mission. Missing model/chain configuration produces an explicit blocked state. It never becomes a scripted success.

The deployment can run **bring-your-own-key**: each visitor supplies their own Anthropic or OpenAI key when starting a mission (auto-detected by key prefix; Anthropic runs default to claude-opus-5). Keys are provider-validated up front, encrypted at rest, scoped to one mission, never logged or returned, and deleted when the mission ends. See docs/DEPLOYMENT.md.

```sh
pnpm typecheck
pnpm test
pnpm test:sport-packs
pnpm test:e2e
sh contracts/install-deps.sh
forge test --root contracts
pnpm build
```

Set `TEST_DATABASE_URL` to an isolated test database to exercise PostgreSQL tests. Install Playwright Chromium with `pnpm exec playwright install chromium`. Foundry must be on PATH. Full configuration, container deployment, funding and live commands: [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Trust and biggest design decision

Sell **bounded, reproducible aggregate answers under sport-specific definitions**, with one shared Base Sepolia escrow market. Buyers pay for correct calculation and delivery, not a positive conclusion. Verifier attestations and two canonical sealed L2 confirmations gate private access. L2-confirmed does not mean L1-finalized.

The verifier, synthetic source generator and custodial test wallets are platform operated. Sources and artifacts stay off-chain; transaction metadata is public. A commitment proves consistency, not authentic or complete real-world source records. Access control cannot prevent redistribution after purchase. The contract is an unaudited testnet prototype. Sponsor willingness to pay remains a hypothesis.

[Architecture](docs/ARCHITECTURE.md) · [Trust model](docs/TRUST_MODEL.md) · [Sport packs](docs/SPORT_PACKS.md) · [Data dictionary](docs/DATA_DICTIONARY.md) · [Comparability](docs/COMPARABILITY.md) · [Decisions](docs/DECISIONS.md) · [Demo script](docs/DEMO_SCRIPT.md)
