# Adding a reviewed sport

1. Add a stable ID and a versioned `SportPack` with an explicitly supported format. Do not alias American football to `football_soccer`.
2. Declare the native vocabulary, public topology, allowed templates, required source tables, custom question and semantic failure cases.
3. Implement/validate normalized sources without coercing participants into ticket entitlements. Add typed schema and reconciliation tests.
4. Add deterministic computation and independently hand-derived cases for its definitions; reuse primitives only when meanings agree.
5. Implement the native UI composition, keyboard table/list equivalent, scope reset and paid overlay rules.
6. Register fictional properties and a private generator. Keep hosted seeds and results out of public source.
7. Run sport-pack and privacy/browser tests, then public-testnet paid-delivery smoke coverage.

No escrow or delivery authorization change is needed. Offers bind exact pack/format/template/policy versions. Do not mutate historical versions: add a versioned definition and preserve the old calculator. The initial code registry uses an explicit TypeScript sport-ID union for compile-time review; extending it requires source changes and a reviewed release. No arbitrary tenant code is executed. A tested append-only VersionedPackRegistry demonstrates developer extension registration and protects old metadata from mutation. The cycling_test extension is a registry test only, not a production-supported seventh sport. Concurrent historic calculator routing remains unimplemented; version 1 is the only implemented calculator version.
