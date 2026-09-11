# Deployment and live acceptance

## Current status

SportProofMarket is deployed on Base Sepolia at `0xe138722b6e466044efaa515337255a735716c326` (deployment tx `0xaa034363bda24d8ea69721733e0a802291dd541c802590deb896463d1fb68511`, block 46671776, September 11, 2026); `deployments/base-sepolia.json` is the genuine manifest and `pnpm exec tsx scripts/chain-verify.ts` has verified code and canonical receipt. Explorer source verification: **verified** on September 11, 2026 (Etherscan V2 API, compiler v0.8.30+commit.73712a01, optimizer runs 200; confirmed via getsourcecode). Also submitted to Sourcify. No public application URL and no paid-report transactions exist yet. Local Anvil integration receipts are explicitly not public-testnet evidence.

## Local application

Node 22+ and pnpm 9.4.0 are required. Tested development host uses Node 23.11.0 and PostgreSQL 14; container uses Node 22 / PostgreSQL 16. Docker configuration is supplied; the local Docker daemon was unavailable, so the container build itself remains unexercised.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Configure DATABASE_URL and fresh 32-byte hex encryption keys in .env.
pnpm db:migrate
pnpm seed:local
pnpm dev
# Separate terminal:
pnpm worker
```

This workspace already has a local database at `postgres://sportproof@127.0.0.1:54329/sportproof`, with local secrets in ignored `.env`. To restart the existing workspace database:

```sh
/opt/homebrew/opt/postgresql@14/bin/pg_ctl -D .local/postgres -l .local/postgres.log -o '-p 54329 -h 127.0.0.1' start
```

Do not use local trust authentication for a hosted database. `seed:local` is public, reproducible test data. Never use it as the supposedly private hosted source.

## Live inputs

- `RPC_URL`: authorized provider-backed Base Sepolia HTTP endpoint, chain 84532.
- `ANTHROPIC_API_KEY` (+ optional `ANTHROPIC_MODEL`, default claude-opus-5) or `OPENAI_API_KEY`+`OPENAI_MODEL`: platform credentials for seller/organizer agents; Anthropic takes precedence when both are set. The runtime verifies model access. No model is silently substituted. Visitor missions accept either provider's key, auto-detected by prefix.
- `REPORT_ENCRYPTION_KEY`, `AGENT_KEY_ENCRYPTION_KEY`: separate random 32-byte hex values.
- `VERIFIER_PRIVATE_KEY`: dedicated verifier test wallet; separate from deployer/buyer/seller.
- `DATABASE_URL`, `APP_BASE_URL`: persistent hosted database and exact web origin.
- `PRIVATE_DEMO_SEED`: fresh private random deployment seed, never committed.
- `ETHERSCAN_API_KEY`: optional for source verification.
- `SESSION_SECRET` is reserved in configuration; authentication currently uses random opaque server sessions stored by SHA-256 token hash.

`pnpm exec tsx scripts/prepare-testnet-roles.ts` creates a fresh deployer in ignored `.local/operator.env` and a verifier in `.env`, printing public addresses only. Fund these on Base Sepolia using faucet **test ETH**, never real ETH. Buyer/seller wallets are distinct encrypted DB records and need their own gas/funding allocations.

Deployer is operator-only. Do not inject `.local/operator.env` into hosted web/worker services.

```sh
sh contracts/install-deps.sh
# Put Foundry on PATH, or specify FORGE_BIN.
pnpm exec tsx --env-file=.env --env-file=.local/operator.env scripts/chain-deploy.ts
pnpm exec tsx --env-file=.env scripts/chain-verify.ts
```

Successful deployment writes actual `deployments/base-sepolia.json`. Copy its address, bytecodeHash and deploymentBlock into `MARKET_CONTRACT_ADDRESS`, `MARKET_BYTECODE_HASH`, `MARKET_DEPLOYMENT_BLOCK`. Keep `CONFIRMATIONS=2` or higher. Contract approval of each seller is required before publication.

Source verification (only after actual deployment): use Foundry `forge verify-contract --chain 84532` with Etherscan V2 API key, compiler 0.8.30, optimizer runs 200, Cancun, and ABI-encoded constructor arguments from the generated manifest. Check the explorer before recording status as verified. Current status: not attempted.

```sh
pnpm seed:private-demo
pnpm exec tsx --env-file=.env --env-file=.local/operator.env scripts/prepare-sellers.ts
pnpm offers:publish
pnpm check:environment
pnpm worker
pnpm smoke:testnet
```

`prepare-sellers.ts` (operator-only) creates each organizer's seller wallet, funds it with gas from the deployer, and approves it on the contract. `offers:publish` then enqueues autonomous seller work; the worker and a platform `OPENAI_API_KEY` are prerequisites. With `FORCE_BYOK=true`, that platform key powers only seller/organizer agents; visitor missions still require the visitor's own key. `smoke:testnet` verifies existing real acceptance runs and requires all six settled/withdrawn packs plus a withdrawn refund; it does not invent or replay transactions.

## Hosting

Use an authorized container-capable provider with a persistent PostgreSQL service and **two separate services**: web and durable worker. Configure secrets server-side. Run migrations before startup; persist database and backups. `compose.yaml` gives the topology. Set a fresh `POSTGRES_PASSWORD` for Compose. Do not buy paid resources without authorization.

```sh
docker compose up --build -d
```

Health is `/api/health`. Readiness reports only non-secret configuration and liveness; missing configuration is a blocked state. Validate RPC chain and bytecode, live key roles, balances, worker heartbeat, database migrations, private artifact retention, then execute the actual mission and six-pack acceptance.

## Publication

The local repository has no remote. To publish only through an authorized GitHub account:

```sh
gh repo create sportproof --public --source=. --remote=origin --push
```

Review `.gitignore` and staged files first. Never publish `.env`, `.local`, raw generated snapshots, salts, ciphertext keys or local-chain receipts as public-testnet proof.

## Public demo hosting (Vercel) and bring-your-own-key

The intended public demo topology:

- **Web (Next.js)** on Vercel. Set all non-secret config plus `DATABASE_URL`, `REPORT_ENCRYPTION_KEY`, `AGENT_KEY_ENCRYPTION_KEY`, `SESSION_SECRET`, `VERIFIER_PRIVATE_KEY`, `PRIVATE_DEMO_SEED` and the deployed contract values in Vercel project environment variables. Set `APP_BASE_URL` to the exact production origin (the POST origin check depends on it).
- **PostgreSQL** on a managed provider (e.g. Neon via the Vercel marketplace). Run `pnpm db:migrate` and `pnpm seed:private-demo` against it before opening the demo.
- **Durable worker** cannot run on Vercel (it is a persistent loop, not a serverless function). Host it as an always-on process elsewhere (e.g. Railway/Render/Fly) with the same environment, or run it from an operator machine during demo windows. Without a live worker the site stays honest: health reports `worker: false` and missions block instead of pretending to run.

Bring-your-own-key: leave `OPENAI_API_KEY`/`OPENAI_MODEL` unset on the hosted deployment. Health then reports `byok: true` and each visitor supplies their own OpenAI key when starting a mission. The key is validated against the provider at mission creation (fail fast), stored AES-256-GCM-encrypted under `AGENT_KEY_ENCRYPTION_KEY` bound to the mission id, used only for that mission's buyer steps and its custom-request seller quotes, never returned by any API (missions expose only a `byok` flag), never logged, and set to NULL when the mission completes, stops, or hits its step limit. Setting the platform variables instead restores operator-paid mode; a user key always takes precedence for its own mission.

Public-demo notes: visitors spend the platform's custodial faucet test ETH for research purchases; `MAX_DAILY_MISSIONS` (default 20/day globally, 5/day per principal) caps that spend. Do not put real value on these wallets.
