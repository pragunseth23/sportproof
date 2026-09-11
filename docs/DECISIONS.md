# Material decisions

- The supplied build brief is authoritative. Acceptance items are tracked in CHECKLIST.md; blocked public acceptance is never substituted with local receipts.
- Keep Next.js App Router, PostgreSQL/Drizzle, a durable Node worker, viem/Base Sepolia, and a non-upgradeable market. Sites hosting was inspected but its Cloudflare runtime/no TCP model does not host this required PostgreSQL and separate durable worker architecture. Container deployment preserves the recommended stack; no deployment account is configured yet.
- Public event descriptions and schematic topology are code-owned; private snapshots, salts, report contents, wallet material and model contexts are server-only. Public fixtures never generate hosted sources.
- Native test ETH only. Chain outcomes determine entitlement and money. Two canonical sealed L2 blocks are the minimum for BOTH funding and delivery; this is not L1 finality.
- Pin registry-verified package versions (2026-09-10). TypeScript 5.9.3 is selected for mature compatibility with Next/Drizzle rather than the newly listed major 7.
- Minimum protected cohort 20; use a constrained query lattice, with no arbitrary row queries or cross-provider identity joining.
- Each agent owns separate modules; payment execution remains serialized under database wallet locks. Buyers receive public metadata and paid aggregates, sellers their tenant's authorized tools; verifier uses deterministic recomputation.

## Official references checked

- https://nextjs.org/docs/app/getting-started/installation
- https://orm.drizzle.team/docs/get-started/postgresql-new
- https://developers.openai.com/api/docs/guides/function-calling
- https://docs.base.org/get-started/connect-to-base
- https://docs.base.org/specifications/transactions/transaction-finality
- https://docs.base.org/get-started/get-funds
- https://docs.openzeppelin.com/contracts/5.x/api/utils

## Environment at start

Fresh directory with brief only. Node/pnpm/git and PostgreSQL 14 binaries available. Docker daemon unavailable. No OPENAI_API_KEY, RPC_URL, signing keys, DATABASE_URL, hosting credentials or existing deployment manifest found in task environment. A workspace-private PostgreSQL instance is being used for local integration tests.

## Design system: "Broadcast" (ACTL-inspired), September 11, 2026

Adopted a dark-first system per user direction, referencing awwwards.com/sites/actl: deep navy ground (#0A1322) with panel surfaces (#101D33), single neon-lime accent (#DCFF40) reserved for CTAs, verified states and live numbers; Archivo 600-800 for display, Inter for body with tabular numerals, Barlow Condensed 700 uppercase for sport wordmarks on event cards. Venue schematics render as lime line-art on navy (broadcast-telestrator style). Implemented as a programmatic HSL remap of the previous sage palette (backup at .local/globals.css.pre-actl) plus hand-tuned buttons, tabs, map, and per-sport art tints. Deliberately skipped ACTL's WebGL 3D. Research and rejected alternatives: the design-directions artifact and competitor analysis (Relo Metrics, Zoomph navy-plus-accent convention).
