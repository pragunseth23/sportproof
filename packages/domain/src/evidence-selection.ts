import type { Metric,ReportCore } from './index';
export interface EvidenceSelection {eventId:string;editionId:string;blockId:string;zoneId:string;category?:'paid'|'complimentary'|'hospitality';product?:string}
/** Presentation scoping only. Authentication/chain entitlement checks MUST happen before cores reach this function. */
export function selectEvidence(cores:ReportCore[],selection:EvidenceSelection):{metrics:Metric[];eventWide:Metric[];sourceCores:ReportCore[]} {
 const sourceCores=cores.filter(core=>core.eventId===selection.eventId&&core.scope.eventId===selection.eventId&&core.scope.editionId===selection.editionId&&core.scope.category===selection.category&&core.scope.product===selection.product&&(!core.scope.blockIds||core.scope.blockIds.includes(selection.blockId))&&(!core.scope.zoneId||core.scope.zoneId===selection.zoneId));
 const metrics=sourceCores.flatMap(c=>c.metrics).filter(m=>m.blockId===selection.blockId&&m.zoneId===selection.zoneId);
 // Running stage cohorts are block-wide; never imply a route point measured these stages.
 const blockWide=sourceCores.filter(c=>c.sportId==='running'&&c.templateId==='participant_turnout_v1').flatMap(c=>c.metrics).filter(m=>m.blockId===selection.blockId&&!m.zoneId);
 const eventWide=sourceCores.flatMap(c=>c.metrics).filter(m=>!m.blockId&&!m.zoneId);
 return {metrics:[...metrics,...blockWide],eventWide,sourceCores};
}
