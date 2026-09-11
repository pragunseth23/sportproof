# Reviewed sport packs

All six packs version 1 have two fictional properties and a separate format ID. Registry source is `packages/sports/src/index.ts`. Version 1 supports these formats only:

| Sport / format | Source distinction | Native templates and scope |
|---|---|---|
| Squash / court_tournament | Round/session admission; several matches can share a block | Court-session usage and paid/complimentary allocation filters |
| Tennis / campus_tournament | Grounds grants and court observations remain separate | Court-session and independent court-access usage |
| Basketball / fixture_series | Plan expansion creates fixture rights; transfer does not create supply | Fixture and ticket-product usage; independent lounge access |
| Football (soccer) / fixture_series | Actual schedule version controls eligibility and first-entry bins | Fixture usage, pre-kickoff arrivals and instrumented fan zones |
| Running / adult_road_race | Entry, pickup, start and finish are distinct intersecting cohorts | Participant turnout/return and expo/finish token interactions |
| Golf / multi_day_tournament | Weekly credentials expand to day rights; grounds do not imply club access | Day-pass usage and instrumented hospitality-day usage |

The 14-template catalog is capability-gated. No running tickets are generated. Some second properties deliberately lack dedicated activation/hospitality capability. Generated outages exclude complete-rate conclusions. Sport-native question examples and invalid-evidence explanations live in each pack. Rankings contain no fixed sport multiplier or winner.

Shared aggregation is intentional where units agree. The deterministic verifier re-reads the snapshot and uses a separate sorted-distinct aggregation path instead of seller Set aggregation; template control flow and definitions are shared. This catches payload/denominator tampering but does not eliminate shared semantic bugs.
