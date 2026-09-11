# SportProof - Codex Build Brief

> Working product name: **SportProof**. Build a multi-sport marketplace where autonomous sponsors' agents buy private, verifiable audience and activation intelligence from event organizers' seller agents. Use ticketing, admissions, participant registrations, and explicitly instrumented activation records where available to choose an event, then the right package, session, fixture, day, or activation zone. Each sport must have its own meaningful data semantics, information products, and user experience.
>
> **Synthetic records. Real autonomous agents. Real Base Sepolia smart contracts and payments. No customer-list sales.**

Prepared: September 10, 2026, America/Los_Angeles.
Status: execution specification for a fresh repository; not a claim that the application or contracts already exist.

**Product scope:** Squash is the founder's origin story and one supported sport, not the product boundary. Support sports through an extensible registry, with fully implemented squash, tennis, basketball, association football/soccer, running, and golf packs in this build. A pack changes data validation, calculations, evidence rules, interface components, questions, and agent behavior. A sport selector, six logos, or renamed copies of one dashboard do not satisfy this requirement. The shared niche is **first-party sponsorship due diligence for sporting-event organizers and their sponsors**.

**Required blockchain infrastructure:** Base Sepolia (Ethereum Layer 2 testnet), chain ID `84532`. Smart contracts must power offer registration, escrow, order state, verifier attestations, disputes, settlement, refunds, and withdrawals. Private-report access must depend on confirmed contract state, and seller fulfillment history must derive from actual on-chain outcomes. Agents, private analytics, encrypted storage, and the web interface run off-chain and interact with these contracts; do not publish the hidden information on-chain. The public demo must execute real Base Sepolia transactions, not simulated payments [S1, S14].

## 0. Instructions to the coding agent

Implement this as a finished, deployable application, not another proposal or a static interface. Exercise engineering judgment on implementation details, but preserve the product, trust boundaries, and acceptance criteria below. Do not stop after scaffolding, a polished landing page, or mocked transactions.

Start by reading the full brief and the relevant official documentation. Establish a short implementation checklist, then build and test complete vertical slices. Keep a record of material choices in `docs/DECISIONS.md`. Verify current package compatibility, pin dependencies, and commit a lockfile; do not blindly use versions remembered from training.

The user has explicitly chosen:

| Decision | Requirement |
| --- | --- |
| Primary decision | Help a sponsor choose between events, including across sports where appropriate. Then choose suitable packages, sessions, fixtures, days, or activation zones within the preferred event. |
| Sports scope | Any sport through a documented extension architecture; six fully functional initial packs, not a squash-only application with future expansion promised. |
| Sport specificity | Distinct data schemas, evidence definitions, report catalogs, custom-question rules, visual workspaces, and tests for each implemented pack. |
| Market format | Both browsable information products and custom questions answered through approved analysis templates. |
| Data | Synthetic only for this build. No real customer records, private emails, or implied real partnerships. |
| Agency | Fully autonomous buyer and seller behavior after mission/policy setup. No human approval for every purchase. |
| Verification | Choose a credible mechanism; this brief selects a disclosed trusted verifier, deterministic recomputation, and on-chain escrow. |
| Blockchain | Required: Base Sepolia, chain ID `84532`, with real smart-contract execution and test ETH. The chain is the authority for escrow and order outcomes, not a decorative payment badge. |
| Starting point | Fresh repository. Stack choices are defaults, not pre-existing constraints. |
| Quality | A substantive, polished product, with room for depth. Do not replace completion with speculative infrastructure. |

This brief defines the target application. If external credentials, deployment access, or testnet funds are genuinely unavailable, finish everything possible, provide exact remaining setup steps, and identify the missing dependency. Never fabricate a deployed URL, transaction, passing test, or funded wallet. Do not ask the user to make routine engineering choices that this brief already resolves.

### What counts as success

A reviewer can give a fictional sponsor a goal and budget, watch its agent buy previously inaccessible audience evidence from seller agents through deployed Base Sepolia smart contracts, see a recommendation change because of that evidence, and inspect a genuine payout or refund. The experience explains why the evidence is credible, what it does not prove, and why this is specifically a sport-aware sponsorship-intelligence product. The reviewer can compare different sports and inspect materially different evidence workspaces without encountering decorative placeholders.

### What not to build

This is not an AI-training-data marketplace, athlete-scouting platform, generic PDF store, contact-list exchange, token launch, prediction market, or automated sponsorship-contract signing service. It is not a claim of decentralized truth. The final sponsorship recommendation requires human commercial judgment; autonomous spending applies to the information-research budget.

---

## 1. Product thesis and narrow vertical

### One-sentence pitch

**Before committing sponsorship money, an autonomous buyer purchases specific, verifiable answers about a sporting event's audience, participation, and documented activation opportunities, without obtaining the organizer's customer database.**

### Why this particular product

The founder was approached by a professional squash-event organizer with years of ticket-purchase data, entrance-scanner records, and thousands of contacts that had not been analyzed together. This is evidence of a real organizer-side analytics problem. It is not proof of sponsor willingness to pay, nor permission to disclose or commercialize the actual records.

Use that origin as private product context. Public materials should say the concept was inspired by conversations with event organizers. Do not publish the email, name the contact, use actual organizational logos, or imply a pilot relationship without separate permission.

The vertical is **first-party sponsorship due diligence for independent and regional sporting-event rights holders**: the commercial decision, participants, evidence contracts, and payment mechanism remain narrow even though the sports differ. The market is not limited to independent organizers in its architecture; they are the initial customer profile. It is not a marketplace for arbitrary sports files, player-performance predictions, broadcast rights, or training datasets.

The founder's squash experience provides the origin, not a restriction on the total product. Launch with six complete sport packs and a registry designed for additional sports. Support both spectator-oriented events and participation-oriented events, while keeping their populations and measurements distinct. Do not claim an unimplemented sport is production-supported merely because its name can be entered.

**Why cross-sport support matters:** a sponsor may be deciding between a basketball fixture series, a road race, and a tennis tournament, not merely choosing between several squash tournaments. It needs comparable decision criteria where justified, plus sport-native evidence where the underlying questions differ. The application should make those differences understandable rather than erase them.

### Participants and incentives

| Participant | Actual objective | Role in the application |
| --- | --- | --- |
| Event organizer / rights holder | Understand its audience or participants and substantiate sponsorship claims. | Selects the correct sport/format pack and authorizes synthetic datasets, permissible analyses, prices, and a seller agent. |
| Sponsor / sponsorship agency | Reduce uncertainty before choosing an event and activation package. | Supplies a brief and a limited information budget to a buyer agent. |
| Seller agent | Monetize permitted evidence without disclosing raw records or promising unsupported findings. | Publishes listings, responds to requests, commits reports, and fulfills orders. |
| Buyer agent | Acquire decision-relevant evidence at a justified cost. | Compares offers, declines unsuitable reports, buys, checks delivery, and recommends. |
| Platform verifier | Determine whether the advertised computational and delivery terms were fulfilled. | Recomputes metrics and submits on-chain attestations or dispute outcomes. |

### What creates paid value

Basic event descriptions, sport/format metadata, organizer-declared package rights, and package prices are free. The paid products provide defined, standardized, reproducible evidence or a custom analysis, not access to a normal sales brochure.

The commercial hypothesis is that a sponsor or agency will pay a limited research cost to reduce uncertainty around a much larger sponsorship decision. This must remain a hypothesis in public claims. A future organizer-funded verification model is plausible, but is not the payment flow implemented here.

---

## 2. The flagship user journey

Use a fictional sponsor, such as **Crestline Active**, comparing a mission-relevant shortlist drawn from a genuinely multi-sport market. Seed at least twelve fictional properties: two per initial sport, across at least six organizer tenants. A mission normally researches three to five plausible candidates, not every listing.

Example mission:

> Choose one sporting event for our next local campaign. Our commercial package budget is $60,000. Consider multiple sports and prioritize relevant permitted activation rights, evidence quality, and purchasing-account fit in our target metro. We are open to either an on-site demonstration or a hospitality activation, but compare those delivery models explicitly. Spend at most 0.001 test ETH on research. First choose the event; then the appropriate package and activation window. Do not equate runners with spectators, ticket scans with sponsor impressions, or premium purchases with wealth.

Also provide focused mission presets:

- **Hospitality:** compare squash, tennis, basketball, soccer, or golf properties with public hospitality rights and adequate access evidence.
- **Participant sampling:** prioritize documented participant touchpoints at running events; ticketed spectator offers qualify only with matching, permitted activation evidence.
- **Local spectator campaign:** compare compatible ticket-account geography and ticket-usage evidence across supported spectator sports.

Changing the mission must change relevant templates and eligibility criteria, not merely rewrite the final paragraph. Do not create an unsupported statistical conversion between these campaign types.

The dollar figure is a fictional business-planning constraint. The test ETH amount is the on-chain information budget. They are separate ledgers, with no implied conversion or real-money valuation.

### End-to-end sequence

1. The sponsor sets its objective and bounds and starts a mission.
2. The buyer agent inspects public event descriptions, sport/format capabilities, package rights, report scopes, coverage disclosures, seller histories, and testnet prices. It checks which candidates have the requested activation rights and which metrics are actually comparable.
3. It creates a provisional comparison that marks unpurchased evidence as unknown, not zero and not secretly known.
4. It rejects at least one unsuitable offer for an understandable reason: incompatible audience unit, missing relevant zone or timing evidence, stale reporting period, unsupported metric, excessive price, or redundancy. Example: a race registration total cannot answer a request for verified spectator admissions.
5. It purchases one or more relevant reports, with actual buyer-wallet escrow transactions.
6. The seller fulfills the order; the verifier checks the report and private delivery. The buyer receives plaintext only after confirmed payment and the delivery conditions described later.
7. The agent updates its evidence-backed comparison. At least one seeded scenario should cause a different recommendation than public marketing alone suggested.
8. The buyer submits a sport-native follow-up question at the strongest candidate: a tennis court/session entitlement comparison, a basketball fixture/section comparison, a running expo-versus-finish touchpoint analysis, or a golf hospitality-day usage report. The seller maps it to an authorized template, quotes it, registers the offer, and fulfills another purchase.
9. The buyer produces a cited decision brief: recommended event, package, alternatives, evidence, unknowns, and information spending.
10. Successful orders settle to sellers. A separate bad-report or dispute scenario demonstrates a genuine refund and an intelligible trust outcome.

This is the core experience. Do not end the product story at "report unlocked."

### The non-obvious reveal

A large public ticket-sales claim can coexist with weak recorded premium-ticket usage. A race with many registrations can lack measured sponsor-contact evidence. A golf grounds-admission count can leave hospitality usage unknown. A smaller event in another sport can be better suited to the sponsor's declared objectives. These are seeded scenario possibilities, not general rankings of sports. A valid negative finding still deserves payment.

Do not hardcode the winning event. Create data-generating scenarios in which the winner follows from the mission, raw synthetic records, coverage, and transparent comparison rules. Changing those inputs must be able to change the outcome.

---

## 3. Domain rules: what the evidence actually measures

Make this distinction visible throughout the application:

**Contacts != purchasing accounts != orders != tickets != access entitlements != recorded admissions != unique spectators.**

**Registrations != packet-pickup check-ins != observed starts != observed finishes != spectators != sponsor contacts.**

**Venue entry != court/section/club access != sponsor-zone visit != advertisement exposure != commercial conversion.**

A person may have multiple roles. Never add populations together to claim unique reach without an authorized identity model and a defensible deduplication rule. No cross-provider person graph is required or permitted in this build.

All following definitions are product requirements for this prototype, not claims about any real organizer's schema.

### Required metric definitions

**Recorded ticket usage / scan-through.** For ticketed formats, the unit is an eligible ticket-admission-block entitlement: a session, fixture, or event day defined by the pack. Nested access to a court or hospitality zone is a separate scope, not a second unique spectator. The shared template `ticket_usage_v1` applies across compatible ticketed formats. Count an entitlement in the numerator once when it has at least one accepted entry scan during the appropriate session. The denominator is the eligible entitlements for the same included sessions. Deduplicate re-entry and repeated scans. Exclude refunded/voided entitlements according to the frozen report policy. Distinguish paid, complimentary, and hospitality allocations. Never call unscanned tickets "no-shows" without adequate scanner coverage.

**Coverage.** Publish which sessions and scanner intervals were covered, which were excluded, and why. Device downtime and missing imports are different from absent admissions. A report with incomplete coverage may still be sellable if that limitation was accurately declared before purchase; it must not masquerade as a complete-event rate. Defaults should exclude materially uncovered sessions from aggregate usage comparisons and identify the resulting selection limitation.

**Returning-buyer share.** Distinct qualifying purchasing accounts in edition B that also purchased in edition A, divided by distinct qualifying purchasing accounts in B. Separately name any retention metric that divides by A. Preserve the denominator in the schema and UI. This measures accounts, not necessarily returning spectators.

**Purchasing-account geography.** Distinct eligible purchasing accounts in an approved coarse target region divided by accounts with known geography, with an explicit unknown share. Account/billing locality is a proxy, not proof of attendee residence. Do not infer income, profession, age, or ethnicity.

**Premium-session usage.** For applicable spectator formats, apply the same entitlement/coverage definitions to configured ticket categories. A general venue scan is not proof of hospitality check-in; distinguish used premium entitlements at venue entry from independently recorded zone access. "Premium" is a disclosed category mapping, not a claim that its purchasers are wealthy executives.

**Session/package fit.** Combine purchased evidence about the appropriate sport-specific scope with public, organizer-declared package deliverables, rights-holder authority assumptions, category restrictions, availability, and synthetic USD asking prices. The scope may be a court/session, fixture/section, race touchpoint, or golf day/hospitality zone. Mark public rights as organizer declarations, not independently audited legal ownership. Historical records are evidence about previous editions, not guaranteed future campaign performance.

**Cross-event overlap.** Optional later. Only compute matched-account overlap across datasets for which cross-provider linkage is explicitly authorized and technically defined. Do not treat organizer-local account IDs or hashed email addresses as permission to join databases. This is not a launch dependency.

### Participation and measured-activation definitions

**Eligible race entry.** A valid, non-cancelled registration for one participant-distance-edition combination under the frozen policy. A payer can buy several entries; neither payer count nor entry count is automatically unique-person reach across distances. Maintain amendments, transfers, and withdrawals without counting obsolete versions twice.

**Recorded check-in share.** Eligible entries with a valid packet-pickup/check-in record divided by eligible entries for the same race scope, qualified by collection coverage. Check-in is not evidence of starting or finishing; collection systems can record check-in and bib assignment as distinct operations [S11].

**Observed-start share.** Eligible entries with a qualifying start observation divided by the eligible-entry population within the declared timing coverage. Never substitute packet pickup for a start observation. When coverage is insufficient, label this an observed lower bound or decline the complete-rate claim under the published policy.

**Observed finishes.** Count qualifying finish records under a published finish/status rule. A finish can be recorded when a start mat record is missing. Do not force the display into a perfectly nested funnel; show cohort intersections and unmatched observations. A finish-to-started-cohort rate uses observed starters as the denominator and finish records linked to that same cohort as numerator. Label official classifications separately from sensor observations.

**Recorded activation interactions.** An eligible, independently instrumented zone check-in or redemption event is not a view or sale. Deduplicate within the specified token/zone/day scope, disclose coverage and the limitation of the token identity, and show unknown where no dedicated data exists. Do not assert dwell time from entry-only logs. A conversion metric would require additional attributable sales evidence and is outside this build.

### Cross-sport comparison contract

Every metric carries a typed `MetricDefinition` with ID/version, population, unit, numerator/denominator policy, deduplication scope, period, geography basis, access scope, evidence source, coverage, suppression policy, and status. Every result carries those semantics or an immutable reference. Report scope, including sport/format pack versions, belongs in the committed terms.

Use separate evidence statuses: `available_unpurchased`, `verified_purchased`, `organizer_claim`, `not_collected`, `not_applicable`, `insufficient_coverage`, `suppressed`, and `not_comparable`. None is silently zero. Do not reveal suppressed values in agent explanations.

The comparison engine decides whether measures have matching semantics; percentages alone are insufficient. Offer three modes:

1. **Like-for-like evidence:** comparable ticket usage or purchasing-account geography with matching definitions and disclosed observation windows.
2. **Goal-level trade-offs:** different sport-native measures support different activation options. Show them side by side with distinct labels; a user-defined utility preference is a decision model, not statistical equivalence.
3. **Not comparable / not answerable:** preserve the distinction, explain what evidence is missing, and allow abstention.

Compare events against mission-specific conditions rather than ranking sports globally. Do not compute a universal cost per fan by dividing package price by ticket entitlements, registered runners, and hospitality scans interchangeably. Do not silently redistribute weights when a candidate lacks required evidence; expose the policy and uncertainty.

### Not answerable from the launch datasets

Broadcast audience, streaming watch time, true unique attendance when identity is unavailable, attendee income, named VIP lists, employment seniority, sales conversion, actual sponsor ROI, or future attendance guarantees.

The seller agent must decline these requests or describe the missing evidence. It must not invent them with an LLM.

---

## 3A. Required sport packs: different decisions, evidence, and experiences

Implement all six packs below with normalized fixtures, real calculations, agent query support, and interactive sport-native components. These are product designs, not claims that every event in each sport uses the same format. **Sport and event format are separate axes.** A basketball league series differs from a one-day showcase; a tennis festival differs from a stadium tournament. Unsupported format/capability combinations must be explicit.

Documented examples motivate these distinctions: US Open ticketing separates stadium/session and grounds access [S10]; Ticketmaster exposes event, seat, and scan-history concepts [S12]; race systems separate registration and check-in workflows [S11]; golf event offerings distinguish grounds and hospitality access [S13]. The proposed metrics and visualizations below are this product's design choices, not capabilities claimed of those providers. Do not copy their branding or imply integrations.

### Squash - compact tournament and session hospitality

**Evidence/data:** tournament rounds, scheduled sessions, one or more courts, admission entitlements, paid/complimentary allocations, and separately instrumented hospitality access when available. A session may contain multiple matches; the gate scan does not identify which match someone watched.

**UI:** a clickable round-by-session grid and compact court/venue schematic. Selecting an evening semifinal block filters the exact eligible entitlement cohort, purchased evidence, and compatible hospitality packages. Show a coverage strip beneath the grid. A bracket can provide schedule context, but it must not turn a session scan into per-match viewership.

**Products and agent question:** `court_session_usage_v1`; compare eligible paid versus complimentary premium allocations across declared session groups. Example: 'Which covered sessions have the strongest recorded use of the premium entitlements included in this package?'

**Failure to handle:** re-entry, multi-match session inflation, and an attractive final masking weak earlier-session usage. Courtside placement is a package right, not proof of attention or income.

### Tennis - concurrent courts, grounds access, and day/night sessions

**Evidence/data:** multi-court schedule, stadium/grounds admission products, day/night blocks, access-right mappings, and court-entry instrumentation coverage. Access models must be event-configured rather than copied from a particular major tournament.

**UI:** a court-by-session matrix plus a campus access map with distinct layers for entitlement eligibility and measured entries. Select a stadium session or grounds activation zone to inspect rights and relevant reports. Unknown court-level entries remain hatched/marked unmeasured, not colored as zero.

**Products and agent question:** `court_access_usage_v1` and `court_session_usage_v1` where supported. Example: 'Compare recorded use of stadium-session entitlements with separately measured grounds activation-zone visits, without assuming these are distinct people.'

**Failure to handle:** multiplying one grounds entry by the number of courts accessible; treating a reserved-seat purchase as evidence the buyer watched a particular match; schedule changes altering which sessions a ticket actually entitles.

### Basketball - fixture series, seat products, and premium access

**Evidence/data:** fixture/series, opponent label, actual/scheduled start version, seat sections, ticket-product types, series/season entitlements where configured, transfers, entry scans, and optional suite/lounge scans. All demo participants/events are fictional; avoid profiling real minors.

**UI:** a fixture calendar linked to an arena section map. Switch between product cohorts (series-plan, single-game, group, complimentary) and actual coverage. Selecting a fixture/section updates ticket usage and a pregame entry-time chart when valid timestamps exist. Label section displays 'recorded ticket usage by assigned section,' not live seat occupancy.

**Products and agent question:** `fixture_usage_v1`, `ticket_product_usage_v1`, `hospitality_access_v1`. Example: 'For this three-fixture sponsor package, compare recorded premium-entitlement usage and any separately measured lounge access.'

**Failure to handle:** plan ownership confused with attendance at every fixture, transfers treated as new ticket supply, entry scans treated as continuous occupancy, or deriving halftime footfall without dedicated movement observations.

### Association football / soccer - fixture context and fan-zone activation

Use `football_soccer` as the unambiguous internal sport ID and a localized 'Football (soccer)' display label. American football is a distinct future sport pack, not an alias.

**Evidence/data:** fixture, competition phase, original/rescheduled kickoff, actual entitlement validity, home/away/neutral seating designation where configured, stadium scans, and separate fan-zone instrumentation. A seating designation is not a resident's location or a personal identity label.

**UI:** a fixture/opponent calendar with a stadium-sector schematic, separate fan-zone layer, and pre-kickoff arrival windows. Package cards show organizer-declared placement and activation restrictions. Select a fixture or permitted series to compare like-for-like observations and disclosed rescheduling exclusions.

**Products and agent question:** `fixture_usage_v1`, `arrival_window_v1`, `activation_zone_usage_v1` when the zone is instrumented. Example: 'Which candidate fixtures provide credible pre-match activation opportunities, and what does the evidence actually measure?'

**Failure to handle:** selling stadium admissions as measured fan-zone interactions; invalid denominators after rescheduling; assuming a high-profile opponent guarantees future attendance or sponsor conversion.

### Running - registered participants, observed race activity, and expo touchpoints

Initial format: adult road-running events with configurable distances and waves. A separate trail/relay configuration needs its own validation, not a silent label change.

**Evidence/data:** purchaser, participant-entry, distance, registration status history, bib mapping, packet pickup, start/finish observations with timing coverage, and optional expo/finish-area interaction logs. Do not collect health profiles, precise participant locations, or real identity data for this synthetic build.

**UI:** a stage/cohort view for registration, check-in, observed starts, and observed finishes, with unmatched observations surfaced rather than forced into a descending funnel. Add distance/wave selectors and a schematic route/expo/finish activation map. Route geometry is context; show measured counts only at instrumented points.

**Products and agent question:** `participant_turnout_v1`, `participant_return_v1`, and `activation_zone_usage_v1` where independently observed. Example: 'For a product-sampling campaign, compare documented expo interactions with finish-area interactions; do not count all entrants as exposed.'

**Failure to handle:** participants counted as spectators, bib collection treated as a start, missing timing reads treated as nonparticipation, and finish times or wave labels used to infer medical status or customer value. Expo contact does not prove a product sale.

### Golf - tournament days, distributed viewing, and hospitality zones

**Evidence/data:** tournament/practice day, day versus multi-day passes, grounds entitlements, configured hospitality credentials, re-entry, and independent zone-access records. The course is a venue topology, not automatically a tracking system.

**UI:** a day selector linked to a schematic course map with grounds and hospitality layers. Clicking a hospitality area reveals its public access rights, measured-access coverage, locked/purchased reports, and compatible packages. Distinguish entitlement-to-enter from observed zone entry. Never infer that everyone entering the course visited each hole.

**Products and agent question:** `day_pass_usage_v1`, `hospitality_access_v1`. Example: 'Compare measured hospitality access across the days included in this package, separating it from total grounds admissions.'

**Failure to handle:** a weekly credential counted as a different unique person each day, grounds scans represented as impressions at a particular green, or an uninstrumented hospitality area treated as fully utilized.

### Completion and extension rules

Each launch pack must include at least two fictional properties, at least two working paid templates (shared templates can qualify only with correct sport semantics), one sport-native custom question, an adapter-specific invalid-evidence case, and functional UI interactions. At least one template or rendering/data rule per pack must demonstrate the distinctions above. Tennis and squash cannot be the same page with a different icon; neither can soccer and basketball.

Additional sports such as cycling, cricket, motorsport, swimming, volleyball, or American football are supported by the extension design, not advertised as completed integrations. To add a sport, implement and register a reviewed pack with source schema, permitted formats, metric definitions, answerability rules, privacy policies, UI composition, fixtures, and tests. No new escrow contract is required. An unknown sport may have public event metadata, but unsupported paid analyses stay unavailable until a real pack is registered.

---

## 4. Information products and custom questions

### Launch catalog: shared primitives plus sport-native products

Implement a versioned template registry rather than a global dropdown in which every sport can sell every metric. Every template declares required source capabilities, allowed sport/format combinations, units, filters, coverage, privacy checks, and its renderer.

| Template | Eligible context | Hidden paid result |
| --- | --- | --- |
| `ticket_usage_v1` | Ticketed sessions, fixtures, or day-admission blocks with defined entitlements. | Deduplicated entitlement use, exact denominator, exclusions, and coverage. |
| `returning_buyers_v1` | Comparable completed periods with authorized organizer-local purchasing-account history. | Returning purchasing-account share; never automatically returning spectators. |
| `buyer_geography_v1` | Authorized coarse billing/account geography. | Purchasing-account geography with explicit unknown share; not participant or attendee residence. |
| `court_session_usage_v1` | Squash/tennis formats with court-session access mappings. | Scope-correct session entitlements and recorded usage; no inferred match audience. |
| `court_access_usage_v1` | Tennis/multi-court events with actual court access evidence. | Ground/stadium/court entry measurements, independent denominators, and unknown court coverage. |
| `fixture_usage_v1` | Basketball/soccer fixture formats. | Fixture-level eligible ticket usage with product/section scope and schedule-version exclusions. |
| `ticket_product_usage_v1` | Ticketed formats with plan, single-entry, group, and complimentary classifications. | Defined product-cohort usage without counting a plan holder as attending every match. |
| `arrival_window_v1` | Timestamped admissions relative to a versioned start/kickoff. | Coarse first-entry time bins and coverage, not dwell time or continuous attendance. |
| `participant_turnout_v1` | Running registrations plus check-in/timing capabilities. | Separate entry, pickup, observed-start/finish cohorts and unmatched/unknown states. |
| `participant_return_v1` | Authorized organizer-local participant linkage across comparable race editions. | Returning entry-linked participant share under a stated identity policy; not repeat payer share. |
| `day_pass_usage_v1` | Golf and supported multi-day ticketed formats. | Day-entitlement usage without claiming unique people across days. |
| `hospitality_access_v1` | Any supported sport with distinct hospitality entitlements and zone instrumentation. | Verified computational summaries of credential use at that zone, with coverage limits. |
| `activation_zone_usage_v1` | Explicit zone check-in/redemption instrumentation. | Deduplicated recorded interactions per defined zone/time scope, not ad views or sales. |
| `session_package_fit_v1` | Any pack with a permitted native scope and public package terms. | Evidence for the relevant session/fixture/day/touchpoint mapped to a proposed package; historical, not predicted ROI. |

Share tested aggregation primitives where meanings agree. Do not create duplicate algorithms solely to inflate template count. A template is available only when its source capability and disclosure checks pass; registration data does not unlock spectator reports, and generic gate scans do not unlock zone-access reports.

Custom requests are natural-language input mapped to these typed templates and permitted parameters. They are not unrestricted SQL, arbitrary Python, or a channel for retrieving individual records. Show the compiled request including sport, format, population, period, scope, units, and missing-source checks before the automatic quote is accepted.

The seller agent should return `quoted`, `needs_scope_adjustment`, or `not_answerable`, with a brief non-leaking reason. Normal buyer/seller negotiation over scope and price should be automatic. A refined request remains subject to the original budget and organizer permissions. Example alternatives: replace an unsupported golf hole-impressions question with a measured hospitality-access question; replace runner spectator-count requests with registered-participant evidence only when the buyer's goal allows it.

### Public offer manifest

A prospective buyer can inspect:

- Seller identity status, fictional event, sport and format IDs/versions, covered edition(s), template version, source capabilities, and allowed native scope.
- The question being answered, units/denominators, declared coverage category, known limitations, and sample-size bucket where allowed.
- The verifier's identity and exact guarantee, delivery/refund rules, immutable snapshot reference, and nonexclusive use license.
- Fixed price in test ETH, expiry, delivery/review/resolution windows, on-chain offer ID, and terms commitment.

The buyer cannot inspect the actual result, report content, raw records, secret report salt, private evidence, or an answer-revealing preview.

Descriptions, quotes, and negotiation messages must not give away the paid conclusion. Price should depend on template/scope and seller policy, not whether the answer is flattering. Use fictional placeholder examples clearly separated from live results for previews.

### Immutable paid result

Separate the deliverable into:

1. **Canonical verified core:** metric values, population and exact units, raw aggregate numerators/denominators where disclosure permits, time period, coverage, exclusions, snapshot reference, sport/format/metric versions, native scope, evidence status, and limitations. Preserve a typed distinction between not collected, not applicable, suppressed, and not comparable.
2. **Evidence receipt:** report commitment, verifier address, check outcomes, verification version, order reference, and relevant transaction hashes.
3. **Interpretation:** a readable explanation and charts generated only from the authorized core. Label this as interpretation, not an independently certified commercial prediction.

Commit the canonical core before offering it for sale. The receipt can acquire transaction IDs afterward; those IDs must not change the precommitted core. Do not include unstable prose, generation timestamps, or order IDs in a reusable catalog report's content commitment.

License: nonexclusive internal sponsorship evaluation for the purchasing sponsor/agency. The prototype cannot stop a buyer from copying or redistributing information after learning it. Say so.

---

## 5. Synthetic data and demo fixtures

### Dataset design

Create twelve fictional event properties owned by at least six fictional organizer tenants, two per initial sport. Example pairs (working fictional names, not representations of actual events):

| Sport | Fictional properties | Native structures |
| --- | --- | --- |
| Squash | Glasscourt Invitational; Harbor Squash Open | Editions, rounds, courts, ticketed session blocks. |
| Tennis | Riverside Tennis Week; Juniper Court Classic | Court campus, day/night sessions, stadium/grounds products. |
| Basketball | Metro Hoops Showcase; Foundry Basketball Series | Fixture sets, arena sections, single-game and multi-fixture products. |
| Football (soccer) | Portside Football Cup; Valley Soccer Series | Fixtures, home/away-designated sectors, optional fan-zone measurements. |
| Running | Waterfront Half Marathon; Ridgeline Road Festival | Distances, waves, entries, pickups, timing points, optional expo measurements. |
| Golf | Meadow Links Invitational; Pinewater Golf Classic | Tournament/practice days, day/week credentials, hospitality zones. |

Use fictional brands and original visual assets; do not imply association with real tournaments. Include at least two completed editions or comparable completed seasons/series per property, plus a clearly separate upcoming sponsorship inventory. Do not manufacture future attendance records as historical observations. Display an explicit demo-as-of date.

Generate several thousand domain records overall with coherent relationships and differences in measurement capabilities. Some properties should have a legitimate absence of zone scans or timing coverage. Not every seller may answer every question. At least one property in each sport must have a fully supported sport-native paid analysis. Keep initial hosted generation/runtime manageable; data correctness matters more than millions of rows.

#### Shared entities

| Entity | Minimum useful fields |
| --- | --- |
| `organizers` | ID, display name, seller wallet, simulation label, allowed templates, pricing policy. |
| `sport_packs` / `format_profiles` | Stable IDs, versions, vocabulary, capability schemas, metric/template IDs, UI configuration. |
| `events` / `event_editions` | Organizer, sport/discipline, format/version, coarse location, dates, comparable-period definition, next-edition reference. |
| `venues` / `zones` | Public synthetic topology, zone type, access rules, optional source-capability reference. No private counts in public geometry. |
| `event_blocks` | Edition, kind (session/fixture/day/race), hierarchy, schedule versions, actual/cancelled/rescheduled status, timezone. |
| `accounts` | Organizer-scoped synthetic purchasing-account ID, coarse geography or unknown; no realistic contact PII. |
| `orders` / `order_lines` | Purchasing account, time, payment/refund status, quantities, synthetic USD cents. |
| `entitlements` | Source product, access block/zone, category, status history, payer reference; visitor access is distinct from a participant entry. |
| `observations` / `source_coverage` | Typed accepted/rejected observation, time, subject reference, source/device, measured scope, coverage/outage metadata. |
| `packages` / `package_rights` | Upcoming edition, deliverables, allowed block/zone, declared authority, category restrictions, capacity/availability, synthetic USD ask. |
| `dataset_snapshots` | Immutable normalized snapshot, private source location, commitments, source/pack/policy versions, synthetic label. |

Use normalized module-specific tables instead of one untyped JSON blob. Validated JSON is suitable for versioned configuration, not a replacement for relationships that drive metrics.

#### Pack/module-specific entities

- **Ticketed events:** `tickets`, `ticket_products`, `access_grants`, `entry_scans`, `scan_coverage`, `transfer_events`. Model session/fixture/day rights without duplicating nested zone access into extra people.
- **Court tournaments:** `courts`, `matches`, `rounds`, `session_match_map`, `court_access_rules`. Match schedules contextualize entitlements but do not prove per-match viewing.
- **Team fixtures:** `fixtures`, `teams`, `seating_sections`, `ticket_plan_entitlements`, `schedule_changes`. Use anonymous synthetic purchase/account keys; never infer personal team allegiance.
- **Running:** `participant_entries`, `entry_status_history`, `race_distances`, `waves`, `bib_assignments`, `packet_pickups`, `timing_observations`, `timing_coverage`. Distinguish registration payer from participant reference and obsolete bib assignments from valid observations.
- **Golf:** `course_zones`, `play_days`, `grounds_passes`, `hospitality_credentials`, `zone_access_scans`. Grounds entry and hospitality access use distinct scopes.
- **Measured activation, where enabled:** `activation_zones`, `activation_sessions`, `interaction_tokens`, `interaction_observations`, `interaction_coverage`. Do not equate a pseudonymous token with a verified unique human across events.

A pack need not populate irrelevant tables. Do not invent ticket rows for unticketed runners to make an existing query work. Every published metric must derive from the applicable normalized records, not a seeded floating-point audience score.

### Required seeded phenomena

- One buyer purchases multiple tickets, and may not personally attend.
- One ticket admits to multiple sessions; one spectator could attend repeatedly.
- Duplicate/re-entry scans do not multiply admissions.
- Refunds, voids, complimentary allocation, and hospitality tickets need different handling.
- At least one scanner outage produces unknown coverage, not invented no-shows.
- Missing account geography is disclosed rather than silently discarded.
- Different events have different repeat-purchaser patterns and premium usage.
- A large headline-sales event is not always the strongest mission fit.
- A small cohort triggers suppression or a scope restriction.
- A deliberately invalid report has a valid cryptographic commitment but an incorrect denominator, so the verifier must catch more than hash mismatch.
- Tennis has a grounds entry with several eligible courts but no observations proving attendance at each court.
- Basketball has a multi-fixture ticket product and a transfer that must not inflate eligible supply or unique-person claims.
- Soccer has a rescheduled fixture and independently missing fan-zone coverage.
- Running has packet pickup without a start read, a finish read with a missing start read, and a registration transfer; no fake perfectly nested funnel.
- Golf has a multi-day pass, grounds re-entry, and independently recorded hospitality access on only some days.
- At least one activation question is answerable from dedicated observations, and a superficially similar one is unavailable because no observations were collected.
- Cross-sport missions can legitimately choose different sports; no hardcoded sport or event always wins.
- Public local test fixtures must make unit mismatches and unsupported inferences easy to inspect.

### Prevent synthetic-data shortcuts from breaking the black box

A public repository must not publish the deployed instance's private report payloads or a fixed seed that reconstructs all its live answers. Generate a fresh private deployment seed and runtime snapshots, store them server-side, and keep salts/keys secret.

Publish small hand-checkable fixtures and a deterministic local test seed for development; these must not be the hosted demo's private source data. For reproducibility, an authorized operator can retain the hosted seed outside version control. Clearly state that this demonstrates access control, not secrecy against the platform operator who generates the synthetic records.

Public reviewer mode must not expose a toggle that grants organizer access to the very source data being sold to that reviewer. The organizer showcase can operate in a separate sandbox or show only non-answer-revealing metadata. Role separation must be enforced by backend authorization, not just tabs.

### Data quality workspace

Provide an organizer workspace for selecting sport/format, permitted imports, capability detection, reconciliation, schema mapping, coverage warnings, and report publication policies. Support the generated module-specific CSV schemas first. A running import asks for entries and timing observations rather than requiring stadium ticket scans. A golf hospitality report asks for hospitality credentials and zone observations, not just grounds entry. A polished validation flow for that schema is preferable to a fake "connect any ticketing system" button.

Do not ship live ticketing integrations unless they actually work. Label the synthetic data source and every simulated source credential clearly.

---

## 6. Analytics, privacy, and answerability engine

Implement calculation as deterministic application code/SQL, not LLM arithmetic. Each template has a versioned schema, compatible sport/format and source-capability requirements, allowed filters, population/unit, denominator and identity policy, completeness checks, disclosure policy, computation function, and independently checked test fixture. Validate the metric semantics as well as numerical equality. A correctly computed registration count sold under a spectator-admissions promise is invalid.

The seller calculator and verifier must not merely return the same cached JSON. Recompute from the frozen snapshot and validate with an independently implemented aggregation path for launch metrics where practical, plus hand-derived reference cases. Shared definitions are necessary; shared bugs remain a limitation and should be acknowledged.

### Approved-query policy

- Only approved templates, edition ranges, category groupings, and coarse geographic buckets.
- No arbitrary SQL execution, raw-row output, individual lookup, exact address, sensitive demographic inference, or cross-tenant joins.
- Suppress small cohorts using the protected unit appropriate to the query: accounts, participant references, or approved interaction identifiers; do not apply an account-only threshold blindly to running or zone data. Choose and document a prototype minimum, such as 20 distinct protected units; that number is a design parameter, not a legal safe harbor.
- Include complementary suppression when visible totals would reveal a suppressed cell.
- Restrict nearby/overlapping custom scopes that allow subtraction attacks. Keep a query-release ledger at the sponsor/organization level, not only per wallet.
- Prefer fixed coarse bins and a small query lattice over an illusion of unlimited private querying.
- Model refusals and quote availability can themselves leak information. Give generic eligibility responses and avoid arbitrary repeated threshold probing.

Approved analyses and output constraints are an established pattern in data clean rooms [S5]. Minimum group size alone does not prevent inference through overlapping queries [S6]. Do not call this prototype mathematically anonymous, legally compliant by default, or a full enterprise clean room.

No customer identifiers or raw records should go into LLM prompts, user-visible logs, browser bundles, transaction calldata, contract events, or public storage. The buyer model sees public manifests and purchased aggregate cores only. Seller models receive schema/allowed summaries and use constrained services rather than seeing full record tables.

Hashing a customer identifier does not by itself make it safe to disclose or link; avoid introducing identifier matching into the launch scope. Consent, licensing, and legal review for any future real-data deployment remain outside the synthetic demo.

---
## 7. Autonomous agents and orchestration

### Real autonomy, within explicit authority

The human starts a mission and sets its budget and objectives. The buyer then researches, negotiates permitted scopes, selects reports, submits purchases, evaluates received evidence, disputes objective failures, and finishes without per-transaction approval.

The organizer sets its dataset permissions and price bounds. Its seller agent publishes offers, answers requests, computes authorized reports through tools, and handles fulfillment without manual approval of each sale.

Fully autonomous does not mean unlimited funds, unrestricted queries, or arbitrary blockchain transactions. Enforce permissions outside the models.

### Suggested tool interfaces

| Actor | Tools |
| --- | --- |
| Buyer | `list_sports`, `get_sport_capabilities`, `list_events`, `check_metric_comparability`, `inspect_package_rights`, `list_public_offers`, `inspect_offer_terms`, `get_seller_history`, `request_custom_analysis`, `get_quote`, `reserve_research_budget`, `purchase_offer`, `get_order_status`, `read_purchased_report`, `accept_delivery`, `open_dispute`, `compare_candidates`, `finalize_recommendation`. |
| Seller | `get_authorized_inventory`, `get_sport_capabilities`, `validate_request_scope`, `check_source_capabilities`, `calculate_quote`, `compute_report`, `prepare_private_artifact`, `publish_offer_onchain`, `fulfill_order`, `withdraw_proceeds`. |
| Verifier service | `load_snapshot`, `recompute_report`, `check_commitments`, `check_disclosure_policy`, `check_delivery_readiness`, `attest_delivery`, `reject_order`, `resolve_dispute`. |

Tool names are a starting contract, not a required framework. Define validated schemas and typed tool results. OpenAI documents function tools and structured outputs for this style of integration [S7, S8]. A configurable provider adapter is acceptable; a heavyweight multi-agent framework is unnecessary.

The verifier is a deterministic service, not an LLM judge. Buyer and seller tools are scoped to their own principals. No shared all-knowing prompt can contain every seller's private results and then pretend the buyer discovers them after paying.

### Buyer decision policy

Maintain a decision state with:

- Mission objectives, business-package budget, test-ETH research budget, and constraints.
- Candidate events, sport/format capabilities, typed evidence needs, relevant activation rights, and public package options.
- A ledger of known evidence, unknown criteria, provenance, and already purchased scopes.
- Expected decision relevance of a potential purchase, described as a heuristic rather than fabricated numerical certainty.
- Remaining research budget, outstanding reservations, gas reserve, and termination conditions.

Prefer reports likely to resolve a material uncertainty among plausible candidates. Do not automatically buy all products. Avoid duplicate purchases and redundant follow-up questions. Stop when evidence is adequate for the declared decision, the remaining options are not worth their cost, the budget is exhausted, or evidence is insufficient.

A refusal to recommend is a legitimate outcome when the evidence does not support a decision. Do not force a winner from incomplete data.

### Comparison and recommendation

Offer an explainable, configurable scoring/ranking method. Show its inputs and weights and label it a decision aid. Never present an opaque "AI sponsorship score" as an empirical fact.

Keep public marketing claims, verified historical evidence, and agent inference visibly distinct. Unknown values stay unknown. For partially observed candidates, show bounds or a coverage-qualified comparison rather than silently assigning zero. Do not compare incompatible denominators, populations, or observation scopes. Use the cross-sport comparison contract in Section 3. Sport must influence requested evidence and refusal reasons, not act as a fixed quality multiplier. Prioritize concrete capabilities over stereotypes about a sport's audience.

The final brief includes:

- Chosen event and a suitable publicly described package, or a clear abstention.
- Why it fits the mission and how purchased evidence changed the provisional comparison.
- Evidence references linking to paid metric values and their coverage/definitions.
- Alternatives, remaining uncertainty, and historical-versus-forward-looking limitations.
- Total information spending, outstanding/refunded amounts, and actual transaction links.
- A next human commercial step, not an autonomous promise to sign a sponsorship deal.

### Model and execution hygiene

Use actual model calls in live-agent mode and show the configured provider/model. Keep the model selectable through a server environment setting. Verify available models with the chosen provider rather than hardcoding a nonexistent or inaccessible identifier.

Use tool calling and structured outputs, validate every argument, and handle refusals/malformed responses. If a provider is unavailable, show a clear configuration/error state. A deterministic fixture mode is useful for tests, but must be labeled; it is not evidence that a model made decisions.

Treat seller descriptions, reports, uploaded text, and model outputs as untrusted data. They cannot override system permissions, request private keys, increase budgets, or route money to arbitrary addresses. Log short decision summaries, tool names, sanitized inputs/outcomes, and policy checks. Do not expose hidden model reasoning or describe a staged animation as a live decision trace.

### Durable execution

Persist every mission and order. Use a worker and durable jobs rather than starting a long-running agent in a browser request and hoping it finishes.

Required mission states can be `created`, `researching`, `waiting_for_quote`, `purchasing`, `waiting_for_delivery`, `evaluating`, `completed`, `blocked`, `failed`, and `stopped`. Persist a transition log and retry context. Idempotency is required for tool execution, publication, and payments.

Use a server-side wallet nonce lock and transactional budget reservations. A retry after a network timeout must reconcile the existing transaction before issuing another one. Refreshing the page, reconnecting to the activity stream, or restarting the worker must not cause duplicate purchases.

Stopping a mission stops new spending. Already-funded escrow obligations must still be fulfilled, settled, disputed when appropriate, or refunded by maintenance jobs.

---

## 8. Trust model and guarantees

### Guarantees to implement

| Layer | Guarantee | Explicit limitation |
| --- | --- | --- |
| Terms | The purchased scope, sport/format versions, population, price, snapshot, metric version, and deadlines cannot change after purchase. | On-chain hashes do not explain or validate business semantics by themselves. |
| Content integrity | Delivered canonical core matches the seller's pre-sale salted commitment. | A committed answer can still be false or incorrectly computed. |
| Computation | A named verifier recomputes the agreed metrics from the committed synthetic snapshot. | Platform-controlled source records and shared software bugs remain trusted risks. |
| Delivery | A confirmed buyer obtains authorized access to the matching private report. | The platform controls the service; this is not trustless cryptographic fair exchange. |
| Settlement | The contract holds payment and enforces the stated success, dispute, and timeout paths. | Off-chain judgments depend on the verifier and its availability. |
| Privacy | Buyer tools receive only authorized aggregates after payment. | No promise of formal anonymity, prevention of redistribution, or secret transaction metadata. |

The platform operates the verifier and custody infrastructure in this prototype. Use separate services/roles and keys, but do not describe them as economically independent third parties. A different process is not automatically a neutral organization.

Use the phrase **"verified computation under disclosed source assumptions"**, not "verified audience truth."

### Why a truthful bad result gets paid

Acceptance is about delivering the defined answer accurately, not flattering the event or convincing the sponsor. A report showing weak premium usage, low measured participant turnout, or sparse recorded activation interactions must be settled normally if it satisfies its contract. Refunds cannot depend on commercial disappointment or a claim that the sponsor "already knew" the answer.

### Source credibility

For synthetic providers, label identity and provenance as simulated. Demonstrate where a future authorized export receipt, connector identity, reconciliation total, and audit record would live, but do not fake those integrations or certifications.

A high success count establishes past fulfillment under these rules, not truthfulness of all source data. Raw commercial facts remain outside a hash's guarantee.

### Blockchain is the marketplace execution layer

The marketplace's core transaction functionality must be enforced by deployed Base Sepolia smart contracts, not a database that later logs a payment hash. The contract is authoritative for offer terms, escrow balances, order states, deadlines, and final money outcomes. Services and the interface react to confirmed contract state; they cannot mark an unpaid order as paid, invent a settlement, or bypass a dispute by editing a database row.

| Capability | Required blockchain behavior | Off-chain responsibility |
| --- | --- | --- |
| Seller publication | Seller-signed offer registration binds immutable terms, price, dataset commitment, and salted report commitment before purchase. | Catalog discovery, readable public manifests, report preparation, and custom-scope negotiation. |
| Autonomous purchase | Buyer-signed calls deposit actual test ETH into escrow and record the buyer/order binding. | Mission reasoning, price/gas budget enforcement, transaction submission, and receipt reconciliation. |
| Private access | Confirmed purchase and the required verifier-attested order state establish the entitlement checked by the delivery service. | Encrypted artifact storage, buyer authentication, and private release; a contract cannot itself make a public plaintext payload secret. |
| Verification | Only the configured verifier can submit the attestations/rejections that drive the allowed order transitions. | Deterministic recomputation and evidence checks; the attestation records a trusted service's conclusion, not proof that Solidity ran the private analysis. |
| Buyer protection | Contract-enforced review/dispute windows, authorized resolution, and callable expiry/refund paths. | Evidence collection, private dispute review, and restart-safe jobs that submit due transactions. |
| Seller payment | Irrevocable seller credits and actual withdrawals after valid settlement; buyer credits and withdrawals on refund. | Indexing and displaying credited versus withdrawn funds without fabricating transfers. |
| Reputation | Append-only transaction outcomes/events provide the basis for fulfillment history. | Index, categorize, and display those outcomes with sport/template context and explicit source/identity limitations. |

Use the same shared transaction layer for every sport. Prove in tests that removing or bypassing the chain adapter prevents live purchases, report unlocks, and settlements rather than triggering a database-only fallback. Read-only cached history may remain visible with its last-confirmed timestamp, but it must not fabricate a new chain outcome.

This is an information marketplace on an Ethereum Layer 2 testnet, with a private off-chain evidence layer. A conventional payment system could support a different implementation of the business, but it does not satisfy this build. Do not claim that blockchain alone proves the underlying audience records, guarantees service availability, or runs the agents and analytics.

Choose native test ETH rather than creating a token. Do not add a DAO, NFT receipt, oracle token, or zero-knowledge proof unless the complete required product is already working and the addition improves a specific guarantee.

---

## 9. On-chain market and escrow specification

### Network and deployment

Required network: **Base Sepolia (Ethereum Layer 2 testnet)**, chain ID `84532`, native test ETH [S1]. All live marketplace transactions in this build use this single chain. Do not substitute another public network, a private chain, a local emulator, or any mainnet for the public deployment and acceptance runs. Anvil remains appropriate for explicitly labeled local development and automated tests.

| Setting | Required value or policy |
| --- | --- |
| Public network | Base Sepolia |
| Chain ID | `84532` |
| Payment and gas asset | Native test ETH; no custom token or stablecoin dependency |
| Client chain configuration | `baseSepolia` from `viem/chains` |
| Public RPC reference | `https://sepolia.base.org`; limited development/fallback use only |
| Hosted RPC | Configurable server-side `RPC_URL` from an authorized provider |
| Explorer | `https://sepolia.basescan.org` |
| Deployment manifest | `deployments/base-sepolia.json` |
| Report-release confirmation policy | `CONFIRMATIONS=2` minimum, using included/sealed L2 blocks, not pending preconfirmations |

Before any live signing, read `eth_chainId` and require `84532`. Verify that the configured market address has the expected deployed bytecode and that the deployment manifest matches the chain. Reject all other chains in live mode. Keep Ethereum-compatible contract logic portable, but do not add multi-chain deployment or routing to this build.

Use a provider-backed RPC for the hosted app, worker, indexing, and receipt polling. Base's public endpoints are rate-limited; do not make them the sole reliability assumption for a public demo [S17]. Apply bounded retries with backoff, reconcile transactions before retrying writes, and surface RPC outages honestly. A public HTTP endpoint must not be assumed to support WebSocket subscriptions; choose a documented provider capability or use bounded polling [S17].

Obtain Base Sepolia faucet test ETH for buyer, seller, verifier, and deployment roles using a currently available documented source [S16]. Confirm balances on this chain before starting. Keep research payments separate from a conservatively funded gas reserve, and use network-appropriate fee estimation. Do not ask for real-fund deposits or make an onramp, bridge, or token purchase a prerequisite.

Construct explorer links only from actual deployment and receipt data. Publish the deployed ABI, address, deployment block/transaction, compiler and dependency versions, constructor arguments, and source-verification command/status in the manifest and README. Use the explorer's current supported verification tooling [S14]; never claim source verification or deployment succeeded without checking it. The manifest contains no secrets.

### L2 confirmation policy and same-chain settlement

The prototype explicitly accepts L2 confirmation risk for its testnet demonstration. Define receipt confirmations as `latestSealedBlockNumber - receipt.blockNumber + 1`; the inclusion block counts as one. Require at least the configured depth, with `CONFIRMATIONS >= 2`, and confirm that the receipt's block remains canonical. Apply this policy to funding and verifier-attestation receipts before releasing a report. A pending transaction, Flashblock/preconfirmation, optimistic frontend state, or a model's assertion is never sufficient to unlock paid information.

Label this status **L2-confirmed**. L2 inclusion and later L1 batch finality are distinct stages [S15]; do not label the selected two-confirmation policy Ethereum-finalized or irreversible. Explain the policy in the UI and trust documentation without promising a fixed wall-clock confirmation time. Choose delivery and review windows that accommodate actual chain, worker, verifier, and provider latency.

A marketplace `withdraw()` transfers credited test ETH from the contract to the buyer's or seller's wallet on the same Base Sepolia chain. It is not an L2-to-L1 bridge withdrawal. Keep purchases, disputes, refunds, and payouts entirely on Base Sepolia; bridge challenge periods are not part of this marketplace's escrow workflow [S15].

### Contract shape

One non-upgradeable `SportProofMarket` is enough. Use a supported stable Solidity compiler and pinned OpenZeppelin release. Prefer well-tested access-control and reentrancy primitives to hand-rolled equivalents [S2, S3].

Use an immutable verifier address for the deployment. An administrative role may approve demo sellers and pause new offers/purchases, but must not edit existing terms, seize escrow, or prevent refunds/withdrawals. Existing orders retain their paths even while new business is paused.

No fees or seller bonds are required in the core version. Omitting them is intentional: correctness, availability, seller history, and permissioned providers are the first trust mechanism. Do not claim a costly-to-fake reputation or economic security deposit that is not implemented.

### Offers

A seller wallet registers an immutable offer containing at least:

- Seller address and a unique seller-side publication key.
- `termsHash`: hash of the canonical public terms manifest.
- `datasetCommitment`: commitment to the frozen input snapshot.
- `reportCommitment`: salted commitment to the already computed canonical core.
- `priceWei`, offer expiry, delivery window, review window, and resolution window.
- `allowedBuyer`: zero address for a catalog offer, or the buyer wallet for a reserved custom quote.
- Purchase limit: reusable catalog or a single-use custom offer.

Prices, deadlines, license, and metric terms must agree between on-chain fields and the public manifest. The manifest also commits sport/format pack versions, population/unit, native scope, source capabilities, and computation/disclosure policies. These semantics can remain off-chain under `termsHash`; do not deploy a separate market or token for each sport. The buyer adapter must validate that agreement before paying.

Cancellation prevents future purchases; it cannot invalidate existing orders. Editing a price, dataset, or report creates a new offer version. Disallow unintended repeat purchases by the same buyer for the same offer; the buyer should reuse its existing entitlement.

### Pre-sale commitment

Use a precisely specified canonical JSON format and integer/rational metric representation. A suggested construction is:

```text
coreHash = keccak256(UTF8(canonicalCoreJson))
reportCommitment = keccak256(abi.encode(
    REPORT_DOMAIN_V1,
    chainId,
    marketAddress,
    sellerAddress,
    termsHash,
    datasetCommitment,
    privateRandomSalt32,
    coreHash
))
```

Define the domain constant and all ABI types in shared test vectors. The terms manifest does not contain `reportCommitment`, preventing a circular hash definition. Public on-chain fields anchor both independently. Use cryptographically random 32-byte salts, not timestamps, short PINs, or report IDs. Do not release the core hash or salt publicly if that could enable answer guessing.

The private report-delivery envelope contains the canonical core and salt so the authorized buyer can check the commitment. Snapshot commitments should likewise avoid exposing guessable low-entropy payloads. A commitment proves consistency, not source truth or proper consent.

### Orders and exact lifecycle

`purchase(offerId, expectedTermsHash, clientOrderKey)` is payable and binds `msg.sender` as buyer. Require exact price, a live offer, authorized/reserved buyer, unused idempotency key, and no existing equivalent purchase. Store a frozen order reference to the immutable terms.

Use these conceptual states:

| State | Meaning |
| --- | --- |
| `Funded` | Payment is escrowed; private payload is not yet released. |
| `Delivered` | The verifier has recorded an on-chain attestation of its off-chain computation and delivery-readiness checks; authorized buyer access is enabled. Review window is running. |
| `Disputed` | Buyer raised an allowed objective objection during review; escrow remains locked pending resolution. |
| `Settled` | Seller has an irrevocable withdrawable credit. |
| `Refunded` | Buyer has an irrevocable withdrawable credit. |

A rejected report ends in `Refunded` with a reason code. Do not create unnecessary intermediate states if they obscure the money flow.

Define deadlines unambiguously:

```text
deliveryDeadline = fundedAt + deliveryWindow
reviewDeadline = deliveredAt + reviewWindow
resolutionDeadline = reviewDeadline + resolutionWindow
```

Actions that fulfill or challenge before a deadline require `block.timestamp < deadline`. Expiry paths use `block.timestamp >= deadline`. Boundary tests must cover exact equality. Offers must specify nonzero bounded windows; document shorter demonstration settings as testnet-only, not production advice.

### Required transitions

| From | Trigger / authorization | To / result |
| --- | --- | --- |
| No order | Buyer deposits exact payment. | `Funded`. |
| `Funded` | Verifier attests matching report, correct calculation, policy compliance, and ready authorized delivery before delivery deadline. | `Delivered`; start review clock. |
| `Funded` | Verifier rejects an objectively invalid report before delivery deadline. | `Refunded`; buyer credited. |
| `Funded` | Anyone invokes expiry at/after delivery deadline. | `Refunded`; no valid delivery in time. |
| `Delivered` | Buyer agent accepts while review is open. | `Settled`; seller credited immediately. |
| `Delivered` | Anyone finalizes at/after review deadline, with no dispute. | `Settled`; seller credited. |
| `Delivered` | Buyer opens its one allowed dispute before review deadline. | `Disputed`; fixed resolution deadline. |
| `Disputed` | Verifier resolves before resolution deadline. | `Settled` or `Refunded`, with reason and evidence commitment. |
| `Disputed` | Anyone invokes expiry at/after resolution deadline. | `Refunded`; unresolved-verifier-timeout reason. |

Final states cannot be reopened or paid twice. No late verifier attestation may revive an expired/refunded order. No party may extend deadlines unilaterally. The buyer cannot block payment indefinitely by refusing to accept a valid delivery. A maintenance worker invokes applicable finalization/expiry functions; time passing alone does not execute a transaction.

### Disputes

Allowed reason categories include content-commitment mismatch, incorrect advertised calculation, wrong period/scope, incompatible population or evidence substitution (such as registrations sold as admissions), materially false coverage representation, privacy-policy violation in output, and inaccessible promised delivery. "Unfavorable conclusion" is not valid.

Keep private reports and evidence off-chain. Commit salted private evidence references/hashes on-chain and use non-sensitive reason enums; do not publish small private counts or the report itself in dispute events.

The verifier has authority over objective checks and delivery-service assessment. It cannot cryptographically prove that a human read the result. Explicitly acknowledge the residual case where a buyer has learned the data and later receives a timeout refund because the verifier is unavailable; a service-availability-dependent escrow cannot eliminate that risk.

### Funds and accounting

Use pull-payment credits: settlement credits the seller; refunds credit the buyer. A `withdraw()` operation pays the caller's credit with checks-effects-interactions and reentrancy protection. A reverting recipient must not block unrelated settlements.

The seller/buyer agents automatically withdraw their credits, and the UI distinguishes `credited` from `withdrawn`. Show a real payout/refund transaction, not merely an internal status label.

Implement invariants:

- Every funded amount has exactly one outcome: remaining escrow, seller credit, buyer credit, or completed withdrawal.
- Total escrow liabilities plus withdrawable credits never exceed the contract balance.
- In the absence of unsolicited ETH, reconcile balance exactly to tracked liabilities. Do not assume exact equality universally; forced/unrequested ETH can create surplus.
- Terminal outcomes and withdrawal accounting are idempotent.
- An offer cancellation, admin pause, or bad receiver cannot strand existing order funds.

There is no general administrator withdrawal of user escrow. Track seller, buyer, terms, commitment, deadlines, statuses, and safe reason codes in events for inspection and indexing.

---

## 10. Private delivery and chain synchronization

### Required release sequence

1. Observe the buyer's transaction on the configured chain and verify its successful receipt, contract, amount, buyer, offer, and order event.
2. Wait for the configured sealed-L2-block confirmation depth (minimum `CONFIRMATIONS=2` under Section 9) before authorizing fulfillment, and check the receipt remains canonical. Do not count pending/Flashblock preconfirmations as completed payment. This testnet policy is not L1-finality assurance. Viem supports receipt waiting, confirmations, and replacement handling [S4, S15].
3. Prepare an encrypted server-side report artifact and an ACL bound to the order's buyer principal. Do not make plaintext available yet.
4. Verifier independently recomputes and checks the report and confirms the artifact will be retrievable under the buyer's authorization. Stage the ACL as inactive until the appropriate chain event.
5. Verifier submits the delivery attestation. Only after that transaction meets the same L2-confirmation policy and the order has the valid `Delivered` status, activate buyer access.
6. The buyer's authenticated backend tool retrieves the report core and salt over the private delivery endpoint. It checks the commitment and advertised schema; it does not need raw data.
7. It accepts or opens an objective dispute. The normal successful path accepts promptly; the fallback deadline exists if it does nothing.

This is centrally mediated private delivery with on-chain settlement, not trustless encrypted fair exchange. Server-side encryption and access control protect against other buyers and casual leakage, not against a malicious platform operator.

### Access controls

Every read verifies the authenticated mission/principal and its specific on-chain entitlement. Knowledge of an order ID or a report URL is not authorization. Prefer a server-proxied private endpoint over a bearer public link. Do not cache private responses in public/CDN caches; use appropriate no-store behavior.

No plaintext report in initial HTML, client component props, prefetched JSON, public assets, source maps, screenshots of locked cards, shared agent histories, or public API responses. Browser masking/blur is presentation only, never the access-control mechanism.

Per-buyer report access survives a page refresh and is isolated from other sponsors. Report retention/access duration belongs in terms; make a modest, stated prototype commitment and disclose that availability beyond settlement is a platform promise, not perpetual on-chain storage.

### Indexing and recovery

Index events from the deployment block using a durable cursor. Store chain ID, transaction hash, block hash/number, and log index; use an appropriate uniqueness key. Reconcile pending transactions and replacements, and detect/reconcile reorganized logs. Database order state is a projection, not authority over escrow balances.

When an RPC is unavailable, retain pending status and show the limitation. Do not synthesize receipts or unlock content based solely on optimistic frontend state. A model timeout after payment must not undo or duplicate the payment. If a chain reorganization invalidates an entitlement, suspend further reads and spending dependent on that state while reconciling it. Already disclosed information cannot be recalled; this is a residual risk of the chosen L2-confirmation policy, not a guarantee eliminated by later database repair.

---
## 11. Reputation and marketplace economics

Build a factual seller-history panel, not a decorative star score.

Show verified deliveries, buyer-accepted deliveries, objectively invalid reports, seller delivery failures when established, dispute outcomes, verifier/service timeouts, median delivery latency, and evidence coverage. Filter history by sport, template, and source capability; successful squash ticket reports do not by themselves establish expertise in race timing or golf zone measurement. Preserve an overall factual fulfillment record as a separate view. Separate outcome categories rather than folding every refund into "seller dishonesty."

A poor audience metric is not a poor seller-quality outcome. A verified report saying the event is unsuitable should improve the seller's fulfillment record just like a favorable report.

Compute chain-derived counts from actual emitted outcomes. Never seed "47 verified sales" as if those transactions happened. Display synthetic/provider-profile claims separately from on-chain history. Seeded reputation demonstrations must either execute actual fixture transactions or be clearly labeled simulated, outside live counts.

Seller onboarding/allowlisting is the demo identity control, not a Sybil-resistance proof. Self-purchases, collusion, and wash-traded reputation remain possible; distinguish demo wallets and do not claim global anti-fraud security. Exclude obvious same-principal internal transactions from any purported distinct-customer count.

Quotes use a transparent policy: base template price plus permitted scope/computation complexity, constrained by organizer bounds. Sample prices might be 0.00005-0.00020 test ETH; label them simulation prices, not validated market willingness to pay. The buyer can decline or propose a smaller authorized scope. Skip an elaborate auction unless it improves the core experience.

---

## 12. Recommended implementation architecture

### Default stack

| Layer | Default |
| --- | --- |
| Web | Next.js App Router, React, TypeScript. |
| UI | Tailwind CSS and accessible component primitives; a maintained charting library for evidence visualizations. |
| Server | Node.js/TypeScript domain services, authenticated route handlers, and a separate durable worker process. |
| Database | PostgreSQL with Drizzle migrations. Store jobs and audit records here initially. |
| Agents | A small typed tool-calling orchestrator using a configurable model provider; OpenAI is a reasonable default. |
| Blockchain | Required Base Sepolia smart contracts; Solidity, Foundry tests/scripts, OpenZeppelin, and viem configured for chain ID `84532`. |
| Private artifacts | Encrypted database/blob storage behind a server-only authorization service. Start with encrypted DB payloads if that simplifies reliable deployment. |
| Testing | Unit/integration tests, Foundry contract tests, and Playwright browser tests. |
| Local/deployment | pnpm workspace and Docker Compose for web/worker/Postgres; deploy web and worker as real services with persistent Postgres. |

Use compatible current stable versions, confirmed from documentation. Avoid unnecessary infrastructure: no vector database, Kafka, Kubernetes, a custom blockchain, or an additional agent framework solely for appearances.

### Suggested repository structure

```text
apps/
  web/                    # Sponsor workspace, market, organizer sandbox, APIs
  worker/                 # Agents, fulfillment, verification jobs, chain reconciliation
packages/
  domain/                 # Shared types, validation, policies, canonical encodings
  analytics/              # Versioned templates and deterministic calculations
  sports/                 # Sport/format registry, schemas, capabilities and fixtures
  evidence-ui/            # Safe renderers, semantic charts, venue/route components
  agents/                 # Prompts, tools, orchestration and guardrails
  database/               # Schema, migrations, queries and durable jobs
  chain/                  # ABI, typed adapter, event indexing, signer policies
  fixtures/               # PUBLIC test-only data generators and reference cases
contracts/
  src/SportProofMarket.sol
  test/
  script/
scripts/
  seed-local.ts
  seed-private-demo.ts
  publish-offers.ts
  check-environment.ts
  verify-deployment.ts
docs/
  ARCHITECTURE.md
  TRUST_MODEL.md
  DATA_DICTIONARY.md
  SPORT_PACKS.md
  ADDING_A_SPORT.md
  COMPARABILITY.md
  DECISIONS.md
  DEPLOYMENT.md
  DEMO_SCRIPT.md
  TEST_REPORT.md
deployments/
  base-sepolia.json    # Actual Base Sepolia deployment metadata, when available
.env.example
README.md
```

Treat filenames as an implementation guide. Do not create empty directories/documents simply to imitate completeness.

### Sport-pack architecture: shared transaction layer, specific evidence layer

Implement a reviewed, code-owned registry of versioned `SportPack` definitions. Use a stable sport slug with registry validation rather than a hardcoded database enum that requires restructuring the whole application for every new sport. Unknown IDs do not grant access to arbitrary reports. Tenant uploads supply data/configuration only, never executable pack code.

A pack defines these validated contracts:

| Contract | Required responsibility |
| --- | --- |
| Identity/format | Sport ID/version, discipline, supported format profiles, vocabulary and native scope hierarchy. |
| Source adapters | Typed import schemas, normalization, deduplication, capability detection, lineage and coverage validation. |
| Evidence semantics | Metric definitions, population/unit, denominator policies, answerability and comparison compatibility. |
| Market catalog | Permitted templates, scope examples, quote complexity rules, required public disclosures. |
| Agent policy | Supported question intents, safe alternatives, unavailable claims, and native package-selection tools. |
| UI composition | Registered components and field definitions; public topology versus entitlement-protected paid layers. |
| Quality | Synthetic generator, hand-checked cases, semantic adversarial cases, and browser interactions. |

Use reusable modules for ticket access, timing, and zone observations; compose them into sport/format packs. Do not assume a global one-to-one mapping between a sport and a format or data source. Core escrow, wallet policies, private delivery, reputation event storage, and agent orchestration remain shared.

All historical offers bind exact pack/template/normalization versions. Installing a new pack or changing an access rule cannot retroactively change a purchased result. A pack's rendering manifest must not contain hidden result values before purchase.

Document and test adding one simple extension pack locally through the registry without changing the escrow contract, buyer payment logic, or private-delivery authorization. Label this a developer extension test, not proof of supported production analytics for every possible sport.

### Marketplace/application data model

In addition to the synthetic source entities, persist:

- `principals`, `tenants`, `agent_wallets`: application identity and chain address bindings, with private key material isolated from normal queries.
- `missions`, `mission_objectives`, `mission_events`: briefs, budgets, status, and sanitized activity history.
- `offers`, `offer_manifests`, `custom_requests`, `quotes`: immutable terms, sport/format/metric versions, typed native scopes, lifecycle, allowed buyers.
- `market_orders`: separate from ticketing orders; chain IDs, deadlines, receipts, and entitlement ownership.
- `report_artifacts`, `report_entitlements`: encrypted canonical cores, salts, private access, retention.
- `verification_runs`, `disputes`: machine-readable checks, private evidence, resolver outcome, chain references.
- `budget_reservations`, `wallet_transactions`, `withdrawals`: accounting and idempotency.
- `query_releases`: approved/suppressed releases used to prevent repeated inference probes.
- `jobs`, `chain_cursors`, `indexed_logs`: leases, retries, recovery, and reconciliation.

Use integer cents for fictional package prices and BigInt/decimal-integer storage for wei. Serialize wei as decimal strings at JSON boundaries. Do not use JavaScript floating-point arithmetic for payment accounting. Keep UTC timestamps plus the event's declared timezone where local session boundaries matter.

### API boundary sketch

Implement equivalents of these routes with authentication and strict validation:

| Route group | Purpose |
| --- | --- |
| `GET /api/sports`, `/api/sports/:id/capabilities` | Public registry metadata and supported source/format requirements, not private measurements. |
| `GET /api/events`, `/api/offers` | Public, non-answer-revealing market metadata with sport, format, activation, and evidence filters. |
| `GET /api/events/:id/topology` | Public synthetic layout and package locations only; no locked metric layers. |
| Buyer-authorized comparison endpoint | Typed evidence compatibility checks and access-controlled purchased results. |
| `POST /api/missions` | Create a bounded sponsor mission and start durable execution. |
| `GET /api/missions/:id`, `/activity` | Authorized status and SSE/polling updates. |
| `POST /api/missions/:id/stop` | Stop new research spending without abandoning funded obligations. |
| `POST /api/custom-requests` | Validated buyer scope request, not arbitrary database execution. |
| `GET /api/market-orders/:id` | Buyer/authorized-operator order state. |
| `GET /api/market-orders/:id/report` | Private paid report, checked against actual entitlement and chain state. |
| `POST /api/market-orders/:id/dispute` | Validated objective challenge passed through buyer authorization. |
| Organizer-only import/policy endpoints | Authorized sandbox/source management; never public buyer access. |
| Internal worker endpoints or job dispatch | Authenticated system-only orchestration, not exposed arbitrary signing. |
| Health/configuration endpoint | Non-secret readiness and chain/deployment status. |

There must be no public generic `executeSql`, `sendTransaction`, `decryptReport`, `impersonateTenant`, or unrestricted admin endpoint.

### Signer and budget security

For the hosted demo, use small testnet-only custodial agent wallets managed by the backend. The UI must disclose custody and the test-only nature of funds. Use distinct buyer, seller, verifier, and deployment roles. A deployment key should not sit in the public web runtime.

Keep secrets in server-side environment/secret storage. Never use client-exposed environment variables for keys, database credentials, artifact-encryption keys, or provider credentials. Use authenticated encryption with unique nonces and standard maintained cryptographic APIs for private stored artifacts; do not invent a cipher.

Every signing request must pass a non-LLM policy check: chain ID, allowlisted contract, function selector, caller role, order/offer ID, exact value, price cap, remaining reservation, nonce, and gas policy. No arbitrary calldata or arbitrary destination accepted from the model.

Separate research price budget from gas reserve. Atomically reserve price before sending; account for pending commitments and only release a reservation on a reconciled failure/refund. Concurrent tools must not spend the same remaining budget twice. A refund must not be counted as both available wallet funds and a still-withdrawable credit.

Rate-limit public demo sessions, cap model steps and total exposure, limit concurrent runs, and stop new writes when gas or API quota is inadequate. Public visitors must not be able to repeatedly drain a shared faucet/funding wallet. Any funding utility is operator-only and has a hard cap.

---

## 13. Product design and user interface

### Design direction

Make this feel like a premium sports-business intelligence product, not a crypto casino and not a chat window with a token badge. Use clear typography, generous spacing, restrained color, accessible contrast, and actual data visualizations. An editorial, predominantly light interface with dark navigation and one restrained accent is a good default.

The audience is a sponsor who understands budgets, events, and evidence. Use plain labels first: "Research budget," "Recorded ticket usage," "Evidence coverage," "Payment in escrow," and "What changed the recommendation." Put chain jargon in expandable transaction details.

Desktop-first, responsive at laptop and mobile widths. Keyboard navigation, focus states, semantic tables, and text alternatives matter. No broken placeholder controls or meaningless dashboard charts.

### Required views

**1. Mission setup / home.** One clear proposition, a persistent synthetic/testnet disclosure, a usable example brief, configurable objectives and budgets, and a start button. Offer multi-select sports, an all-supported-sports choice, relevant event-format filters, and distinct spectator/hospitality/participant-activation objectives. Selecting a narrow objective should refine candidate eligibility without hiding its rationale. Show which model and chain are configured. A reviewer should not need a wallet extension just to understand or run the bounded hosted demo.

**2. Live decision workspace.** Candidate events across sports and provisional/final comparisons, research budget ledger, current agent state, pending purchases, and a concise live activity feed. Include a persistent comparison tray; show sport-native evidence labels, comparability chips, and explicit unknown/not-applicable states. Selecting an event opens its sport-specific workspace without losing the mission. Distinguish facts, public seller claims, and inference. Unknown paid evidence should be visibly unknown.

**3. Information market.** Browsable offers with scope, period, price, methodology, coverage, seller history, verifier guarantee, and locked-result state. Filter by sport, event format, measured population, source capability, activation type, template, and eligibility for the current mission. Only show filters that can be meaningfully applied; do not leak private value-derived filters before payment. A details panel explains exactly what payment will unlock and what it will not establish.

**4. Custom request flow.** Show the sponsor's question, its translation into an approved sport-aware template, automatic scope/price responses, and the resulting reserved offer. Display a typed scope builder and suggestions relevant to the selected sport and actual data capabilities. Court-session, fixture, race-wave, and golf-day controls must not all appear everywhere. An unsupported demographic question should be refused with a clear alternative, not fabricated.

**5. Purchased evidence viewer.** Sport-native interactive visualizations defined in Section 3A, correctly labeled charts/tables, exact metric definitions, coverage notices, receipt/commitment details, and links to the comparison affected by this report. The map/grid/table must be backed by the same verified core; no hardcoded illustrative chart values mixed into real report displays. A report export can be JSON/Markdown; PDF generation is optional and not needed for completion.

**6. Trust and transaction panel.** Timeline from offer publication through purchase, verification, acceptance/dispute, settlement and withdrawal. Show the Base Sepolia network label, market contract address, relevant agent wallet addresses, test-ETH balances, and the latest confirmed state without exposing private keys or private report contents. Explorer links open the actual contract/transactions on BaseScan. Every live state change must reconcile to a real receipt; an unavailable RPC leaves the operation pending or blocked, not magically successful. Explain reason codes in business language. Show "report correct, findings unfavorable" as a normal success, not a warning about seller quality.

**7. Final sponsorship decision.** A clean event/package recommendation with supporting paid evidence, remaining unknowns, alternatives and price fit. The recommended action uses the selected sport's real scope: session, fixture, hospitality day, expo, or finish-area activation. Show why alternatives in other sports were not selected, including incomparable or absent evidence rather than simplistic sport preference. One section explicitly answers: "What did buying the information change?"

**8. Organizer workspace.** Sport/format onboarding, source-specific data/schema validation, coverage warnings, allowed templates/pricing, seller agent activity, and earnings history. Include a capability preview showing which report types the supplied data can and cannot support. Adding participant entries should not magically enable spectator admission products. Keep public reviewer access isolated from the source data behind their buyer experience.

### Interaction and visualization acceptance criteria

**Sport-native workspaces are required features, not stretch goals.** Implement the six compositions in Section 3A with a shared design system. Share a ticket-usage chart where appropriate, but change the scope controls, topology, evidence sources, package logic, and explanatory content when the sport requires it.

- **Persistent context:** carry event, edition, active scope, and selected paid evidence through map/calendar/table navigation. Include a visible breadcrumb and a reset-scope action. Switching sports resets incompatible filters with an explanation.
- **Linked interactions:** clicking a court/session, fixture/section, distance/wave, or day/zone highlights the matching report cohort and package rights. Multi-selection compiles an approved scope, never arbitrary raw-record access.
- **Two map layers:** public schematic venue/route geometry and public package-right locations may render before purchase. Historical measured overlays require the specific paid entitlement. No locked-value tint, scale, tooltip, heatmap density, alt text, or point count may leak the answer. Label venue diagrams schematic, not surveyed physical layouts.
- **Evidence inspector:** any displayed metric opens its unit/population, denominator, observation scope, exclusions, coverage, suppression, version, and verification receipt. A 'why not comparable?' control explains incompatible definitions using plain language.
- **Cross-sport comparison:** a shared matrix uses comparable metrics only where valid and sport-native subpanels otherwise. The user can inspect a goal-level trade-off without pretending the underlying quantities are equal. Purchased versus not-collected versus not-applicable must be visually distinct.
- **Package planner:** overlay public rights and compatible purchased evidence for the selected event. Show which candidate package contains the relevant session/fixture/zone; show exclusions and category restrictions. The agent recommends only, and does not reserve inventory or sign a commercial agreement.
- **Agent transparency:** show concise decisions such as 'Declined: this counts race entries, not spectators' or 'Requested separate hospitality-access evidence; grounds scans are insufficient.' Summaries must follow actual tool results, not prewritten live-looking theater.
- **Accessibility:** every interactive schematic has a synchronized keyboard-accessible list/table; focus and selection states are visible. Heatmaps have text values after purchase and a non-color status indication. Charts must not use animation as the only explanation.
- **Responsive behavior:** comparison and maps remain usable on laptops and narrow screens through stacked panels and a synchronized list view. Do not cram six sport-specific dashboards into one crowded page.
- **Error and empty states:** show distinct unavailable capability, no observations, insufficient coverage, suppressed cohort, report not yet purchased, and pending verification states. No empty state should imply zero audience.

Use in-app SVG/HTML schematic components or an appropriate maintained visualization library. A third-party map API and photorealistic stadium art are not dependencies. Beautiful diagrams without meaningful interaction or verified data do not satisfy these requirements.

### Data honesty in the interface

- Every fictional event/data view has an unobtrusive but visible simulation indicator.
- Never describe generated audience statistics as actual ToC, Squash Engine, or other real-event measurements.
- Show original-source assumptions separately from verified computation.
- No bought report values in a locked tooltip, sparkline, image alt text, screen-reader label, hidden DOM, or screenshot preview.
- Transaction rows distinguish queued, broadcast, confirmed, reverted, replaced, and credited/withdrawn.
- A saved run/replay is labeled as such, with its actual transaction references; do not show it as a new live purchase.
- Show useful empty, loading, low-funds, provider-error, RPC-error, and recovery states.

---

## 14. Required test plan

Tests are part of the deliverable, not an optional cleanup step. Use explicit unit cases, integration tests, and browser tests. Foundry supports fuzzing and invariants for contract lifecycle/accounting checks [S9].

### Analytics tests

- Hand-checkable records produce the expected numerators, denominators, and rates.
- Multiple tickets per account do not multiply distinct purchasers.
- Duplicate scans/re-entry do not multiply ticket-session usage.
- Multi-session passes are modeled as multiple entitlements, not one lifetime admission.
- Refunds, voids, complimentary tickets, and status changes follow the frozen eligibility policy.
- Coverage outages cannot silently become attendee no-shows.
- Returning-buyer share is distinguished from prior-edition retention.
- Unknown geography is disclosed and not misrepresented as target-market membership.
- Small cells and complementary totals are suppressed consistently.
- Out-of-policy overlapping queries are rejected.
- Snapshot changes produce different commitments and new report versions.
- Unsupported claims such as occupation or broadcast reach are not generated.
- Tennis grounds access does not multiply into court spectators; per-match reports are unavailable without matching observations.
- Basketball fixture entitlements remain correct after transfers and plan expansion; scan totals do not become live seat occupancy.
- Soccer schedule changes preserve the correct cohort; entry-time bins use the frozen kickoff version and missing fan-zone evidence stays unknown.
- Running registration, check-in, observed-start, and observed-finish cohorts stay distinct, including unmatched records; valid cancellation/transfer histories change denominators correctly.
- Golf multi-day credentials expand into day entitlements but do not become multiple unique humans; grounds and hospitality scopes do not substitute for one another.
- Dedicated activation observations are deduplicated by their stated identity/scope and not represented as impressions, dwell time, or sales.
- Same-looking percentages with different populations/denominators fail direct cross-sport comparison.
- Every pack has hand-checked calculations, one supported custom query, and one semantic-failure fixture.
- Installing a pack-version update does not change any historic committed offer/report.

### Contract unit, fuzz, and invariant tests

- Offer registration/permission, immutable fields, versioning, cancellation, expiry, and custom buyer restriction.
- Correct payment succeeds; under/overpayment, wrong expected terms, duplicates, and unauthorized purchase fail.
- Buyer reservations/idempotency integrate without duplicate purchases.
- Only the fixed verifier can attest/reject/resolve.
- Valid delivery, immediate buyer acceptance, and default post-review settlement work.
- Objective report rejection refunds correctly.
- Buyer disputes only during its own review window, once per order.
- Verifier resolution correctly pays either party; timeouts cannot be postponed indefinitely.
- Exact deadline-boundary cases and adversarial ordering of expiry/delivery transactions.
- No late attestation/acceptance/resolution resurrects a final order.
- Withdrawals cannot double-pay; reverting or malicious recipients do not damage other orders.
- Pausing new business does not block existing refunds/finalizations/withdrawals.
- Escrow + credits are covered by contract balance, including a forced-ETH/surplus case.
- Multiple offers/orders and concurrent actors preserve lifecycle invariants.

### Agent and application tests

- Buyer receives only public data before payment and only its purchased report afterward.
- Live signing rejects the wrong chain; neither a pending receipt nor a preconfirmation unlocks information. Funding and delivery-attestation receipts must each satisfy the configured canonical L2-confirmation policy.
- Missing RPC or a disconnected chain adapter cannot trigger database-only payment, unlock, or settlement fallbacks. Reorg reconciliation blocks stale entitlements and preserves an honest audit history.
- Seller tools cannot access another organizer's data.
- Verifier recomputes rather than trusting the seller's cached result.
- A mathematically wrong report with a matching content hash fails verification.
- A correct unfavorable report passes and is paid.
- Changing sponsor objectives or source fixtures can change the event/package selection.
- Buyer declines unsuitable offers and avoids duplicate reports.
- Custom question becomes a bounded typed query and a real seller-published offer, with sport/format/metric versions committed to terms.
- Buyer compares candidates from different sports without equating participants, entitlements, and spectators.
- Buyer/seller tool eligibility changes with sport/format capabilities; unsupported zone data cannot be invented.
- An impossible or incomparable research brief can produce an abstention rather than a fabricated winner.
- A sport-pack extension test requires no change to shared escrow or private-delivery enforcement.
- Unsupported/sensitive request is rejected without spilling private details.
- Prompt injection in an offer cannot increase budget, export records, change recipients, or invoke arbitrary signing.
- Budget reservations remain correct under concurrent tools, retries, reversions, and refunds.
- Worker restart, browser reload, and delayed receipts do not duplicate transactions.
- Model/provider failure does not fabricate reasoning or leave funded orders unmanaged.
- Live mode rejects the wrong chain ID or wrong market bytecode and cannot silently fall back to local/mock payments.
- Editing a database order status or disabling the chain adapter cannot unlock an unpaid report, settle an order, or fabricate withdrawable funds.
- Rebuilding indexed marketplace outcomes from confirmed contract events preserves balances and seller-history categories without seeding fictional transactions.

### Privacy and browser tests

Before purchase, inspect HTML, application bundles, network responses, SSE, report URLs, and cached requests. Confirm they contain no hidden answer or private seed. Try another buyer's order ID and a fake client-side payment status. Both must fail authorization.

After purchase, verify that the authorized buyer sees the expected report, another sponsor does not, and a public organizer-view toggle cannot bypass the paywall.

Test desktop/laptop/mobile layouts, keyboard usage, charts and labels, copy/export behavior, and all real transaction links. Add browser tests for all six native workspaces: select court/session, fixture/section, soccer fan zone, running distance/wave/touchpoint, and golf day/zone; verify each changes the intended scope. Test incompatible-filter resets, comparison chips, missing-source states, synchronized map/table accessibility, and protected overlays before/after payment. Capture real application screenshots for QA; do not substitute design mockups for running UI.

### Base Sepolia public-testnet acceptance scenarios

Run these against the deployed market on chain ID `84532`, with actual agent wallets and test ETH. Record actual transaction IDs and BaseScan links for:

1. Seller registers a report offer.
2. Buyer pays, receives a valid report, accepts; seller is credited and withdraws.
3. A correct but commercially unfavorable report is also paid normally.
4. A deliberately incorrect report is rejected by real verifier logic; buyer gets a genuine refund credit and withdrawal.
5. A custom question creates a new reserved seller offer and completes a real purchase.
6. One live mission buys evidence for candidates in at least two different sports and produces a scope-correct comparison.
7. Successful paid-report/settlement smoke coverage exists for all six implemented sport packs. These may be separate executed runs; do not force all six into the five-minute video.

Also test the dispute and timeout paths on-chain or in a clearly identified integration environment, and state which environment each test used. At least one failure/refund must happen on the public testnet, not only in a mock UI.

Do not claim a public-testnet test passed when it ran only on Anvil. Do not fabricate a comprehensive test report; list executed tests, commands, outcomes, and any untested limitations.

---
## 15. Configuration, deployment, and operational readiness

### Environment contract

Provide a documented `.env.example` containing placeholder names only. Suggested settings:

```dotenv
APP_BASE_URL=
DATABASE_URL=
CHAIN_ID=84532
EXPLORER_BASE_URL=https://sepolia.basescan.org
ETHERSCAN_API_KEY=
RPC_URL=
MARKET_CONTRACT_ADDRESS=
MARKET_DEPLOYMENT_BLOCK=
# Included/sealed L2 blocks; inclusion block counts as one; live minimum is 2.
CONFIRMATIONS=2
OPENAI_API_KEY=
OPENAI_MODEL=
REPORT_ENCRYPTION_KEY=
AGENT_KEY_ENCRYPTION_KEY=
VERIFIER_PRIVATE_KEY=
SESSION_SECRET=
PRIVATE_DEMO_SEED=
MAX_AGENT_STEPS=30
DEMO_MODE=live
```

Adjust names to the implementation, but separate public configuration from secrets. Persist seller/buyer wallet secrets through a protected backend store or encrypted environment-managed configuration. Keep the deployer key separate from hosted runtime. No actual secrets in logs, screenshots, README, client bundles, example files, or Git history.

`DEMO_MODE=live` means real provider calls and actual configured-chain writes. Local deterministic/test modes should have distinct names and prominent labels. A missing provider setting must not silently turn a live run into a scripted performance.

### Developer commands

Supply working, tested commands or equivalents for:

```text
pnpm install
pnpm db:migrate
pnpm seed:local
pnpm dev
pnpm worker
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm test:sport-packs
forge test
pnpm chain:deploy:testnet
pnpm seed:private-demo
pnpm offers:publish
pnpm smoke:testnet
pnpm build
```

Commands in the README must actually exist and do what their names promise. Separate destructive reset commands from normal start commands. A local data reset must not erase or contradict public-chain history; use new namespaces/instances where needed.

### Deploy an application, not only a contract

Deploy web, durable worker, and persistent database using the available hosting account/tooling. A container-capable provider is a suitable default. If the web host is request-limited/serverless, do not rely on it for an indefinite in-process agent loop; deploy the worker separately.

Validate database migrations, runtime environment checks, private artifact persistence, wallet funding, RPC access, chain ID, matching deployed bytecode, and worker liveness. Supply a health page that reveals only non-secret readiness.

Use Base's network documentation for Base Sepolia settings [S1], documented faucet options [S16], and the current explorer/source-verification tooling [S14]. Confirm the selected RPC provider serves chain ID `84532` and observe its limits [S17]. Generate explorer links from actual hashes and addresses, not hardcoded examples. Fund all required roles on Base Sepolia directly where possible; never treat an unfunded/local wallet as a public-testnet success. No bridging or second-chain deployment is required.

If deployment access is absent, provide container configurations and precise deployment steps, then explicitly report that the public URL is not yet available. The deliverable can be locally complete without pretending to satisfy the public-deployment preference.

### Operations and threat limits

- Bound per-mission and global testnet spending, gas exposure, and model/API usage.
- Refuse new work when dependencies cannot support fulfillment; continue handling existing escrow obligations.
- Expiry/finalization workers should be restart-safe and callable on demand.
- Configure request/file-size limits, validated CSV parsing, tenant-scoped database queries, and authentication/CSRF protections appropriate to the chosen session design.
- Never evaluate uploaded code or arbitrary instructions from a report.
- Preserve encrypted report access and chain history across restarts.
- Document that verifier compromise, platform compromise, and bad source data remain central trust risks.
- An immutable verifier simplifies active-order rules but limits key rotation; new deployments can change it, existing orders cannot. Outages fall back to the stated deadlines, not undocumented admin seizure.
- This contract is a tested prototype, not a security-audited mainnet system. Do not encourage deposits of real funds.

---

## 16. Implementation sequence and scope discipline

These are dependency gates, not time estimates. Finish each working slice before broadening it.

### Gate 1 - Domain correctness and a payable report

Create the shared sport/format registry, normalized synthetic generator, small reference fixtures for one spectator sport and running, one initial analytics template, canonical manifest/core encodings, and an escrow contract with normal settlement and refunds. Validate early that participant entries do not have to masquerade as tickets. Prove the metric by hand on the reference data. Show a real private-report access boundary locally.

### Gate 2 - First public-testnet vertical slice

Deploy the contract, publish an offer using a seller wallet, pay from a distinct buyer wallet, verify and privately deliver the core, settle, and withdraw. Record receipts. Make the same flow survive retry/reload. Do this before spending all effort on a wide interface.

### Gate 3 - Actual buyer and seller agency

Add durable role-separated model orchestration. Buyer selects or declines from public metadata, spends within bounds, and updates its decision after receiving evidence. Seller generates and publishes authorized offers automatically. Demonstrate real tool calls, not replayed animation.

### Gate 4 - Multi-sport evidence and custom questions

Implement all six registered sport packs, two properties per pack, the capability-gated catalog, approved custom questions, and source-specific organizer import flows. Complete the typed cross-sport comparison engine and event-to-package follow-up. Demonstrate missions in which different sports and events are appropriate, without a hardcoded winner.

This gate is not satisfied by implementing squash and adding five placeholder cards. Each pack needs real normalized data, meaningful calculations, appropriate source limitations, and working paid delivery.

### Gate 4B - Sport-native product experience

Implement and exercise the six native workspaces, linked selection/map/table behavior, package planner, shared comparison tray, and evidence inspectors. Reuse primitives while preserving each pack's semantics. Inspect real running pages at laptop and mobile widths, and test that locked overlays cannot leak report values. Complete this before claiming multi-sport support.

### Gate 5 - Trust and adversarial behavior

Implement the full dispute/deadline lifecycle, invalid-calculation fixture, privacy tests, budget concurrency tests, seller-history semantics, recovery, and bad-provider states. Demonstrate an actual refund and a valid unfavorable report being paid.

### Gate 6 - Finished product and submission

Polish the required views, deploy all services, inspect the running UI, run the test matrix, verify actual transaction links, write the short README and demo script, and record a complete experience within five minutes.

### Worthwhile additions after all gates work

Additional sport/discipline/format packs beyond the six required ones, more approved CSV mappings, improved organizer diagnostics, comparison sensitivity controls, safely expanded query scopes, saved sponsor workspaces, and stronger privacy or external verification. The six initial packs and their specified UI are required, not additions deferred to this list.

### Explicitly defer

Live real-organizer data, cross-provider identity matching, inferred demographics, autonomous commercial-contract signing, mainnet payments, tokens/DAOs/NFTs, unverifiable ROI predictions, and a zero-knowledge/TEE system that is not actually implemented and tested. Cryptographic commitments plus an honest trusted verifier are stronger than aspirational "trustless AI" language.

---

## 17. Submission package and demonstration

### Public repository and short README

Create a coherent public-ready repository. Publish it only through available authorized access; otherwise provide the completed local repository and exact publication command/instructions. Do not invent a GitHub URL.

The short README must prominently include:

1. The niche (first-party sporting-event sponsorship due diligence), actual participants, consequential sponsor decision, and why purchased evidence matters. State the six implemented sport packs and the distinction between extensibility and unimplemented sport support.
2. How to run a reviewer demo and the fact that data/organizations are fictional.
3. Real application URL, network, contract address, explorer link, and representative successful/refunded transactions, if achieved.
4. Trust assumptions: platform-run verifier, custodial demo wallets, controlled synthetic source data, private off-chain delivery, and public transaction metadata.
5. Biggest design decision: sell bounded, reproducible aggregate answers under sport-specific evidence definitions, using a shared market/payment system; pay for correctness/delivery rather than positive findings.
6. One major limitation: correct calculation is not proof of authentic/complete real-world source records; also acknowledge the willingness-to-pay hypothesis.
7. Setup commands and required environment variables, with links to deeper architecture/trust/test documents.

The deeper docs should be concise and accurate to the implemented system. Remove planned features from claims of completed functionality.

### Maximum-five-minute video outline

| Segment | What to show |
| --- | --- |
| Opening | The organizer-data origin, the sponsor's decision, synthetic-data disclosure, and one-sentence product proposition. |
| Mission | Compare events across at least two different sports, with distinct package and research budgets. Start actual agents. |
| Market | Public metadata is visible, answers are inaccessible. Agent declines an unsuitable report and buys another. |
| Evidence and decision | Real escrow transaction, private report reveal, sport-native workspace interaction, correct metric definition/coverage, and the changed comparison. Briefly show a contrasting sport's genuinely different evidence UI. |
| Custom follow-up | Seller answers a new sport-native bounded question, publishes a reserved offer, and the buyer selects a suitable session/fixture/day/activation package. |
| Trust failure | Deliberately incorrect calculation is caught; show the real refund. Contrast with a valid unfavorable report that was paid. |
| Closing | Final recommendation, seller/buyer outcomes, explorer proof, and the largest trust limitation. |

Use real screen recording of the completed product. Trimming ordinary waits is fine; do not splice a mocked transaction into a claim of a live result. A narrated saved run is acceptable when clearly labeled and tied to actual receipts. The video need not use all five minutes.

### Required completion report from Codex

Return the implemented app/repository, concise run instructions, actual deployment details, executed test results, and remaining limitations. Separate `implemented and verified`, `implemented but not externally exercised`, and `not implemented`. Include no invented success claims.

---

## 18. Definition of done / acceptance checklist

### Product and vertical

- [ ] The application is specifically about sporting-event sponsorship due diligence, not squash-only and not generic themed file listings.
- [ ] Squash, tennis, basketball, football/soccer, running, and golf have working source schemas, metrics, custom requests, fixtures, and native interactive UI.
- [ ] At least two fictional properties per sport enable within-sport and cross-sport comparison.
- [ ] Sport and event format are separate, versioned concepts; missing capabilities are explicit.
- [ ] Additional sports can be implemented through a documented, tested extension path without changing escrow or private delivery.
- [ ] A sport filter or copied dashboard is not presented as sport-native product support.
- [ ] Sponsor selects between events, then an appropriate package/session option.
- [ ] Paid information changes or supports a consequential recommendation with visible evidence.
- [ ] All records, organizer identities, prices, and source claims used in the demo are explicitly synthetic where applicable.
- [ ] No user-data resale or AI-training-data product is substituted for sponsorship intelligence.

### Agents and data

- [ ] Buyer and seller use actual autonomous tool-calling in live mode; verifier is deterministic.
- [ ] Agent contexts and tools respect tenant and paid-entitlement boundaries.
- [ ] Buyers can decline, ask custom questions, stop spending, and abstain when evidence is inadequate.
- [ ] Custom questions are handled through approved typed templates, not arbitrary database access.
- [ ] Ticket/purchaser/admission, participant/check-in/start/finish, and zone-interaction units, denominators, coverage, and unknowns are correct and tested.
- [ ] Cross-sport comparisons do not equate incompatible populations or silently manufacture comparable reach.
- [ ] Maps, charts, and scope controls consume verified authorized results; no unpurchased value leaks through overlays or filters.
- [ ] Agent report selection, custom questions, and package recommendations actually depend on sport/format and source capabilities.
- [ ] Synthetic source data produces all report values; no fabricated chart numbers or fixed hidden winner.

### Market and trust

- [ ] The actual `SportProofMarket` is deployed on Base Sepolia, chain ID `84532`, with real contract/explorer references.
- [ ] Seller offer publication, buyer escrow, verifier attestations, settlement, refunds, and withdrawals execute through that contract; database-only substitutes fail acceptance.
- [ ] Order entitlements and reputation histories depend on confirmed chain state/outcomes, while private data, analytics, agents, and UI remain off-chain.
- [ ] Live operation refuses other networks, preserves pending/error states honestly, and never unlocks information on a fabricated receipt.
- [ ] Report release checks canonical funding and delivery-attestation receipts at the configured L2-confirmation depth; the UI does not mislabel them L1-finalized.
- [ ] Purchases and marketplace withdrawals remain on Base Sepolia; no bridge or second-chain setup is required.
- [ ] A buyer cannot retrieve the deployed paid result before confirmed payment.
- [ ] Commitments, deterministic recomputation, private delivery, and source authenticity are explained as distinct guarantees.
- [ ] Valid negative findings earn payment; objective failures earn refunds under the policy.
- [ ] Deadlines, disputes, withdrawal credits, idempotency, and recovery work without indefinite buyer veto.
- [ ] Seller histories derive from actual outcomes and do not mislabel service outages or negative findings.
- [ ] Private data and report salts do not appear on-chain or in public assets/logs.

### Quality and delivery

- [ ] Working deployed application or a clearly identified deployment-access limitation; no dead showcase buttons.
- [ ] Actual contract address, explorer link, and representative real transaction hashes.
- [ ] Executed unit, integration, contract, privacy, and browser tests with honest results.
- [ ] Clean public-ready repository, short README, deeper trust/run docs, and a maximum-five-minute demo plan/video when recording capability is available.
- [ ] Clear synthetic-data, custodial-test-wallet, trusted-verifier, and non-audited-prototype disclosures.

---

## 19. Official technical references

These references anchor implementation interfaces, domain examples, and known limitations. They are not evidence of product-market fit or permission to use provider data. Re-check them during implementation; APIs, versions, network availability, and event offerings can change. No live integration is implied.

- **[S1] Base - Connect to Base.** Base Sepolia chain ID, RPC, native currency, and explorer settings. <https://docs.base.org/get-started/connect-to-base>
- **[S2] OpenZeppelin Contracts - Access Control.** Ownership and role-based permission patterns. <https://docs.openzeppelin.com/contracts/5.x/access-control>
- **[S3] OpenZeppelin Contracts - Utilities.** Reentrancy guards, pausing, and value-transfer considerations. <https://docs.openzeppelin.com/contracts/5.x/api/utils>
- **[S4] viem - waitForTransactionReceipt.** Confirmation depth, receipt waiting, transaction replacement handling. <https://viem.sh/docs/actions/public/waitForTransactionReceipt>
- **[S5] AWS Clean Rooms - Analysis rules.** Restricting permissible queries and output through defined analysis rules. <https://docs.aws.amazon.com/clean-rooms/latest/userguide/analysis-rules.html>
- **[S6] AWS Clean Rooms - Considerations and limitations.** Minimum-group-size and overlapping-query inference limitations. <https://docs.aws.amazon.com/clean-rooms/latest/userguide/custom-considerations.html>
- **[S7] OpenAI API - Function calling.** Typed application tools and the model/tool execution loop. <https://developers.openai.com/api/docs/guides/function-calling>
- **[S8] OpenAI API - Structured model outputs.** Schema-constrained outputs and refusal handling. <https://developers.openai.com/api/docs/guides/structured-outputs>
- **[S9] Foundry - Invariant testing.** Stateful tests for lifecycle, accounting, and solvency properties. <https://www.getfoundry.sh/guides/invariant-testing>

- **[S14] Etherscan - Supported Chains; Base Sepolia Explorer.** Verify current API/verification support and inspect actual Base Sepolia contracts and transactions. <https://docs.etherscan.io/supported-chains> and <https://sepolia.basescan.org>
- **[S15] Base - Transaction Finality.** Distinguishes preconfirmation, L2 inclusion, L1 batch finality, and cross-chain withdrawals. <https://docs.base.org/specifications/transactions/transaction-finality>
- **[S16] Base - Get Funds.** Official starting point for currently available Base Sepolia faucet options; use the testnet instructions only. <https://docs.base.org/get-started/get-funds>
- **[S17] Base - Throughput and Limits; RPC Overview.** Public-endpoint rate limits, provider selection, and HTTP versus WebSocket capabilities. <https://docs.base.org/specifications/transactions/throughput-and-limits> and <https://docs.base.org/base-chain/api-reference/rpc-overview>

### Sports-workflow references

- **[S10] USTA / US Open - Ticket types.** Example of distinct stadium-session and grounds-access products; informs access-right modeling, not a universal tennis rule. <https://www.usopen.org/en_US/tickets/index.html>
- **[S11] RunSignup - RaceDay Checkin: Checkin Participants.** Check-in, registration lookup, bib assignment, and queued device updates are distinct operational records. <https://help.runsignup.com/support/solutions/articles/17000141615-raceday-checkin-app-checkin-participants-4->
- **[S12] Ticketmaster - Archtics Season Ticketing API.** Illustrative event, seat, ticket-product, and attendance-scan concepts; production access is permissioned, and this build does not claim such access. <https://developer.ticketmaster.com/products-and-docs/apis/season-ticketing/>
- **[S13] THE PLAYERS / PGA TOUR - 2026 ticket offerings.** Example of general event entry and separately ticketed club/hospitality access, supporting distinct admission scopes. <https://www.theplayers.com/news/2025/11/18/tickets-on-sale-the-players-2026-pga-tour-tpc-sawgrass>

## Final instruction

Build the first complete transaction slice, then complete the **multi-sport, sport-aware** product defined here. A single-sport intermediate milestone is not the final deliverable. Optimize for a reviewer understanding, in one uninterrupted experience, who needs the information, why they pay before seeing it, what agents actually decide, how an honest seller gets paid, and what happens when the evidence is wrong.
