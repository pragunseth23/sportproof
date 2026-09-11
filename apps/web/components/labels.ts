/** Plain-language labels for internal ids shown to sponsors and organizers. */
const TEMPLATES:Record<string,string>={
 ticket_usage_v1:'Ticket usage',
 ticket_product_usage_v1:'Ticket package usage',
 court_session_usage_v1:'Court & session attendance',
 court_access_usage_v1:'Court access usage',
 fixture_usage_v1:'Match-day attendance',
 arrival_window_v1:'Arrival times',
 hospitality_access_v1:'Hospitality attendance',
 day_pass_usage_v1:'Day-pass usage',
 buyer_geography_v1:'Where buyers come from',
 returning_buyers_v1:'Returning buyers',
 session_package_fit_v1:'Session & package fit',
 participant_turnout_v1:'Runner turnout',
 participant_return_v1:'Returning runners',
 activation_zone_usage_v1:'Activation zone traffic',
};
export const templateLabel=(id:string)=>TEMPLATES[id]??id.replaceAll('_',' ');
const STATUSES:Record<string,string>={
 available_unpurchased:'Available to buy',
 verified_purchased:'Verified',
 organizer_claim:'Organizer claim (unverified)',
 not_collected:'Not tracked',
 not_applicable:'Not applicable',
 insufficient_coverage:'Partial tracking',
 suppressed:'Hidden (group too small)',
 not_comparable:'Not comparable',
};
export const statusLabel=(status:string)=>STATUSES[status]??status.replaceAll('_',' ');
const TABLES:Record<string,string>={
 accounts:'Purchasers',
 entitlements:'Tickets & passes',
 entries:'Race entries',
 observations:'Scans & check-ins',
 coverage:'Scanner coverage',
 blocks:'Sessions & fixtures',
 zones:'Venue areas',
};
export const tableLabel=(table:string)=>TABLES[table]??table.replaceAll('_',' ');
