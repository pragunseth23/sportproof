/** Server-side only. Hosted callers MUST supply a secret random seed; never import into browser. */
import { createHash } from 'node:crypto';
import type { Snapshot, Observation } from '../../domain/src/index';
import { getEvent } from '../../sports/src/index';
export function generateSnapshot(eventId:string,seed:string):Snapshot {
 if(seed.length<8)throw new Error('Explicit seed of at least 8 characters required');
 const event=getEvent(eventId);let state=createHash('sha256').update(seed+eventId).digest().readUInt32LE(0);const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
 const s:Snapshot={id:createHash('sha256').update(eventId+seed).digest('hex'),eventId,organizerId:event.organizerId,normalizationVersion:'1',policyVersion:'1',synthetic:true,accounts:[],purchases:[],entitlements:[],observations:[],coverage:[],entries:[],transfers:[],blocks:event.blocks.filter(b=>event.editions.some(e=>e.id===b.editionId&&e.completed)),zones:event.zones};
 const fit=.3+random()*.6;const count=140+Math.floor(random()*100);
 for(let a=0;a<count;a++)s.accounts.push({id:`a${a}`,organizerId:event.organizerId,region:a%9===0?null:random()<fit?'Bay Metro':a%2?'North Coast':'Inland'});
 const observe=(subjectId:string,blockId:string,zoneId:string,kind:Observation['kind'],at:string,scheduleVersion:number)=>{const o={id:`o${s.observations.length}`,subjectId,blockId,zoneId,kind,at,accepted:true,scheduleVersion};s.observations.push(o);if(random()<.15)s.observations.push({...o,id:`o${s.observations.length}`})};
 for(const block of s.blocks){
 const epoch=Date.parse(block.start);const at=new Date(epoch-25*60000).toISOString();const bi=Number(block.id.slice(-1));
 const sources:Observation['kind'][]=event.sportId==='running'?['pickup','start','finish']:['gate'];
 for(const source of sources)s.coverage.push({blockId:block.id,source,status:bi===2&&source!=='finish'?'partial':'complete',from:new Date(epoch-2*3600000).toISOString(),to:block.end,reason:bi===2&&source!=='finish'?'Synthetic device outage; excluded from complete-rate aggregates':undefined});
 for(const zone of event.zones){for(const source of ['court','hospitality','activation'] as const){const relevant=source==='court'?zone.kind==='court':source==='hospitality'?zone.kind==='hospitality':['activation','expo','finish'].includes(zone.kind);if(relevant)s.coverage.push({blockId:block.id,source,zoneId:zone.id,status:zone.instrumented&&!(event.sportId==='golf'&&bi===2)?'complete':'not_collected',from:new Date(epoch-2*3600000).toISOString(),to:block.end,reason:zone.instrumented?undefined:'No dedicated instrument collected this scope'})}}
 for(let a=0;a<count;a++){
 if(block.editionId.endsWith('2024')&&a%3===0)continue;
 const accountId=`a${a}`;if(!s.purchases.some(p=>p.accountId===accountId&&p.editionId===block.editionId))s.purchases.push({id:`p${s.purchases.length}`,accountId,editionId:block.editionId,status:a%29===0?'refunded':'paid'});
 if(event.sportId==='running'){
 const id=`e${s.entries.length}`;s.entries.push({id,participantId:`runner${a}`,accountId,editionId:block.editionId,blockId:block.id,status:a%31===0?'cancelled':a%37===0?'transferred':'valid',version:1,bib:`${bi}-${a}`});
 if(a%37===0){s.entries.push({id:id+'v2',participantId:`transferee${a}`,accountId,editionId:block.editionId,blockId:block.id,status:'valid',version:2,bib:`new-${bi}-${a}`});s.transfers.push({id:`tr${s.transfers.length}`,entryId:id,from:`runner${a}`,to:`transferee${a}`})}
 if(a%5!==0)observe(id,block.id,event.zones[0]!.id,'pickup',at,block.scheduleVersion);
 if(a%4!==0)observe(id,block.id,event.zones[0]!.id,'start',block.start,block.scheduleVersion);
 if(a%6!==0)observe(id,block.id,event.zones[1]!.id,'finish',new Date(epoch+3600000).toISOString(),block.scheduleVersion);
 }else{
 for(let t=0;t<(a%4===0?2:1);t++){
 const id=`e${s.entitlements.length}`;const category=a%7===0?'complimentary':a%3===0?'hospitality':'paid';const product=category==='complimentary'?'complimentary':event.sportId==='golf'?'weekly':a%4===0?'series':a%5===0?'group':'single';
 const base={id,ticketId:`ticket-${block.editionId}-${a}-${t}`,accountId,editionId:block.editionId,blockId:block.id,zoneId:event.zones[['basketball','football_soccer'].includes(event.sportId)?a%2:0]!.id,category,product,status:a%29===0?'refunded':a%41===0?'void':'valid',scheduleVersion:block.scheduleVersion} as Snapshot['entitlements'][number];s.entitlements.push(base);
 if(random()<fit)observe(id,block.id,base.zoneId,'gate',new Date(epoch+(-80+Math.floor(random()*130))*60000).toISOString(),block.scheduleVersion);
 if(a===4&&bi===1)s.transfers.push({id:`tr${s.transfers.length}`,ticketId:base.ticketId,from:accountId,to:'transferred-holder'});
 for(const zone of event.zones){const kind=zone.kind==='hospitality'?'hospitality':zone.kind==='court'?'court':null;if(!kind)continue;const nested={...base,id:id+'-'+zone.id,zoneId:zone.id};if(zone.id!==base.zoneId)s.entitlements.push(nested);if(zone.instrumented&&random()<fit)observe(zone.id===base.zoneId?base.id:nested.id,block.id,zone.id,kind,at,block.scheduleVersion)}
 }
 }
 for(const zone of event.zones.filter(z=>['activation','expo','finish'].includes(z.kind)&&z.instrumented))if(random()<fit)observe(`token-${a}`,block.id,zone.id,'activation',at,block.scheduleVersion);
 }
 }
 return s;
}
export const LOCAL_TEST_SEED='public-local-fixture-only-not-hosted';
