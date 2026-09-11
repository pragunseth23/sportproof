# Synthetic source dictionary

The private frozen `Snapshot` holds normalized, typed relational arrays. Backend storage persists sources separately from marketplace orders. Every row is fictional and carries organizer/event context through the snapshot. There are no emails, addresses, health records, ages, or real identities.

| Table | Key and meaning |
|---|---|
| accounts | Organizer-local purchasing-account ID; coarse region or null. Not attendees. |
| purchases | Account/edition paid or refunded ticketing purchase. Distinct from escrow orders. |
| entitlements | A ticket's specific block/zone access right, allocation category, product, final status and schedule version. A multi-block ticket yields multiple rights; nested zones do not yield more people. |
| entries | Participant-distance-edition registration, version, final status, synthetic bib. Payer and participant differ. Obsolete transfers/cancellations are excluded. |
| observations | Accepted/rejected subject/source/block/zone/time observation. Repeated scans deduplicate within the defined scope. |
| coverage | Source/block/zone collection interval, complete/partial/not-collected and outage reason. Missing scans are not no-shows. |
| transfers | Ticket or obsolete entry reference and synthetic prior/new holder, without increasing ticket supply. |
| blocks | Session/fixture/race/day, edition, UTC start/end, schedule version and native metadata. |
| zones | Public schematic topology and source capability declaration; never hidden counts. |

Metric cores preserve integer numerator/denominator, integer basis points (`value / 100` is a percentage), population, policy/version, scope, coverage, status and limitations. Missing/suppressed values omit every numeric field. Reports suppress all related outputs if a protected small cell would expose complementary values. Prototype threshold: 20. This is not formal anonymity.

`packages/sports/src/imports.ts` validates normalized imports with strict schemas, row caps, duplicate keys, tenant/format/scope checks and relationship reconciliation. Production-grade ticket-provider mappings and a full append-only history of every source amendment are not implemented; the frozen input stores normalized final status plus modeled transfer records.

2024 and 2025 are historical editions. 2027 package inventory is public declared future inventory with no fabricated attendance. Local fixture seed is intentionally public; hosted calls require a separate secret seed. The platform can always reconstruct its own synthetic source data.

## Organizer import path

The public organizer laboratory validates an explicitly supplied synthetic CSV entirely in the browser using the same strict table schemas. It has no source-inventory access. The authenticated server service requires a seller/operator principal with the exact event organizer tenant; buyers cannot switch roles. CSV is limited to 2 MB and 20,000 rows. A committed import replaces one normalized table in a new frozen snapshot, checks cross-table relationships, persists normalized sources plus encrypted snapshot and secret commitment salt, audits non-sensitive diagnostics, and pauses new publication for policy review. Old offers remain bound to their old snapshots. Importing a changed primary-key population may require a coordinated bundle/import extension; a single-table change that strands existing references is rejected.

Policy records restrict templates and maximum test-ETH price. Validated capability detection intersects observed sources/coverage with reviewed pack capabilities. It cannot elevate a running source to spectator admissions. CSV import is not a live provider connector.
