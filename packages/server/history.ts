import {parseEventLogs} from 'viem';
import {marketAbi} from '../chain/index';
import {sql} from '../database/index';
import {chain} from './wallet';
export type IndexedEvent={transactionHash:string;logIndex:number;blockNumber:bigint;blockHash:string;timestamp:bigint;eventName:string;args:Record<string,any>;canonical:boolean};
export type Checkpoint={number:bigint;hash:string};
export interface HistoryStore {
 cursor():Promise<bigint>; checkpoints():Promise<Checkpoint[]>;
 rollback(from:bigint):Promise<void>;
 append(events:IndexedEvent[],checkpoint:Checkpoint,next:bigint):Promise<void>;
}
export interface HistorySource {
 sealedHead():Promise<bigint>; block(number:bigint):Promise<{hash:string;timestamp:bigint}>;
 events(from:bigint,to:bigint):Promise<Omit<IndexedEvent,'timestamp'|'canonical'>[]>;
}
/** Revalidate the last checkpoint, walk back on mismatch, then replay bounded sealed ranges. */
export async function synchronizeHistory(store:HistoryStore,source:HistorySource,deploymentBlock:bigint,confirmations=2,batchSize=200n){
 if(confirmations<2||!Number.isInteger(confirmations))throw new Error('At least two sealed confirmations required');
 const head=await source.sealedHead(),safe=head-BigInt(confirmations)+1n;
 const checkpoints=(await store.checkpoints()).sort((a,b)=>a.number>b.number?-1:1);
 let reorgFrom:bigint|undefined;
 for(const point of checkpoints){
  const valid=point.number<=head&&(await source.block(point.number)).hash===point.hash;
  if(valid)break;reorgFrom=point.number;
 }
 if(reorgFrom!==undefined){
  const ancestor=checkpoints.find(p=>p.number<reorgFrom!);
  // Checkpoints anchor complete scanned ranges. Replay from the last surviving range end.
  const from=ancestor?ancestor.number+1n:deploymentBlock;
  await store.rollback(from);
 }
 const from=await store.cursor();if(from>safe)return {scanned:0,reorganized:reorgFrom!==undefined,nextBlock:from.toString()};
 const to=from+batchSize-1n<safe?from+batchSize-1n:safe;
 const end=await source.block(to),raw=await source.events(from,to),blocks=new Map<string,{hash:string;timestamp:bigint}>();
 const events:IndexedEvent[]=[];
 for(const event of raw){let block=blocks.get(String(event.blockNumber));if(!block){block=await source.block(event.blockNumber);blocks.set(String(event.blockNumber),block);}if(block.hash!==event.blockHash)throw new Error('Reorganization during log scan');events.push({...event,timestamp:block.timestamp,canonical:true});}
 if((await source.block(to)).hash!==end.hash)throw new Error('Reorganization before index commit');
 await store.append(events,{number:to,hash:end.hash},to+1n);
 return {scanned:Number(to-from+1n),reorganized:reorgFrom!==undefined,nextBlock:(to+1n).toString()};
}
function jsonSafe(value:unknown){return JSON.parse(JSON.stringify(value,(_,v)=>typeof v==='bigint'?v.toString():v));}
export async function syncChainHistory(){
 const client=chain();await client.assertReady();const market=client.config.address.toLowerCase(),network=84532;
 const connection=await sql().reserve();
 try{
  const [locked]=await connection`SELECT pg_try_advisory_lock(hashtext(${`history:${network}:${market}`})) AS ok`;if(!locked.ok)return {busy:true};
  const store:HistoryStore={
   async cursor(){const [row]=await sql()`SELECT next_block FROM market_chain_cursors WHERE chain_id=${network} AND market_address=${market}`;return row?BigInt(row.next_block):client.config.deploymentBlock;},
   async checkpoints(){const rows=await sql()`SELECT block_number,block_hash FROM market_indexed_blocks WHERE chain_id=${network} AND market_address=${market} ORDER BY block_number DESC`;return rows.map(r=>({number:BigInt(r.block_number),hash:r.block_hash}));},
   async rollback(from){await sql().begin(async tx=>{
    const invalid=await tx`UPDATE market_indexed_logs SET canonical=false WHERE chain_id=${network} AND market_address=${market} AND block_number>=${String(from)} RETURNING tx_hash`;
    const hashes=[...new Set(invalid.map(x=>x.tx_hash))];
    if(hashes.length){await tx`UPDATE market_orders SET access_active=false WHERE funding_tx=ANY(${hashes}) OR delivery_tx=ANY(${hashes})`;await tx`UPDATE missions SET status='blocked' WHERE id IN (SELECT mission_id FROM market_orders WHERE funding_tx=ANY(${hashes}) OR delivery_tx=ANY(${hashes})) AND status NOT IN ('stopped','failed')`;}
    await tx`DELETE FROM market_indexed_blocks WHERE chain_id=${network} AND market_address=${market} AND block_number>=${String(from)}`;
    await tx`INSERT INTO market_chain_cursors(chain_id,market_address,next_block) VALUES(${network},${market},${String(from)}) ON CONFLICT(chain_id,market_address) DO UPDATE SET next_block=EXCLUDED.next_block,updated_at=now()`;
   });},
   async append(events,checkpoint,next){await sql().begin(async tx=>{
    for(const event of events)await tx`INSERT INTO market_indexed_logs(chain_id,market_address,tx_hash,log_index,block_number,block_hash,block_timestamp,event_name,args,canonical) VALUES(${network},${market},${event.transactionHash},${event.logIndex},${String(event.blockNumber)},${event.blockHash},${String(event.timestamp)},${event.eventName},${tx.json(jsonSafe(event.args))},true) ON CONFLICT(chain_id,market_address,tx_hash,log_index) DO UPDATE SET block_number=EXCLUDED.block_number,block_hash=EXCLUDED.block_hash,block_timestamp=EXCLUDED.block_timestamp,event_name=EXCLUDED.event_name,args=EXCLUDED.args,canonical=true`;
    await tx`INSERT INTO market_indexed_blocks(chain_id,market_address,block_number,block_hash) VALUES(${network},${market},${String(checkpoint.number)},${checkpoint.hash}) ON CONFLICT(chain_id,market_address,block_number) DO UPDATE SET block_hash=EXCLUDED.block_hash`;
    await tx`INSERT INTO market_chain_cursors(chain_id,market_address,next_block) VALUES(${network},${market},${String(next)}) ON CONFLICT(chain_id,market_address) DO UPDATE SET next_block=EXCLUDED.next_block,updated_at=now()`;
   });}
  };
  const source:HistorySource={sealedHead:async()=> (await client.publicClient.getBlock({blockTag:'latest'})).number,block:async number=>{const b=await client.publicClient.getBlock({blockNumber:number});return {hash:b.hash,timestamp:b.timestamp};},events:async(fromBlock,toBlock)=>{
   const logs=await client.publicClient.getLogs({address:client.config.address,fromBlock,toBlock});
   return (parseEventLogs({abi:marketAbi,logs}) as any[]).map(log=>({transactionHash:log.transactionHash,logIndex:log.logIndex,blockNumber:log.blockNumber,blockHash:log.blockHash,eventName:log.eventName,args:log.args}));
  }};
  return await synchronizeHistory(store,source,client.config.deploymentBlock,client.config.confirmations??2);
 }finally{await connection`SELECT pg_advisory_unlock(hashtext(${`history:${network}:${market}`}))`;connection.release();}
}
export type HistoryFilters={seller?:string;tenantId?:string;sportId?:string;templateId?:string};
export type OfferMetadata={chainOfferId:string;sportId:string;templateId:string;termsHash?:string};
/** Counts only canonical emitted outcomes; no synthetic reputation seeds or quality inference. */
export function summarizeSellerHistory(events:IndexedEvent[],metadata:OfferMetadata[],filters:HistoryFilters={}){
 const canonical=events.filter(e=>e.canonical).sort((a,b)=>a.blockNumber===b.blockNumber?a.logIndex-b.logIndex:a.blockNumber>b.blockNumber?1:-1);
 const offers=new Map<string,Record<string,any>>(),orders=new Map<string,{seller:string;fundedAt:bigint;eligible:boolean}>();
 const result={publishedOffers:0,purchases:0,verifiedDeliveries:0,buyerAccepted:0,settled:0,objectivelyInvalid:0,inaccessibleDelivery:0,deliveryTimeouts:0,verifierTimeouts:0,disputes:0,disputeSettled:0,disputeRefunded:0,medianDeliverySeconds:null as number|null,settledWei:'0',refundedWei:'0',withdrawnWei:'0',outcomes:[] as {orderId:string;transaction:string;status:string;reason:string}[]};
 const meta=new Map(metadata.map(m=>[m.chainOfferId,m]));const disputed=new Set<string>();const latencies:number[]=[];let paid=0n,refund=0n,withdrawn=0n;
 for(const e of canonical){const a=e.args,id=String(a.orderId);if(e.eventName==='OfferRegistered'){
  const candidate=meta.get(String(a.offerId));const m=candidate&&(!candidate.termsHash||candidate.termsHash===a.terms?.termsHash)?candidate:undefined;const eligible=(!filters.seller||String(a.seller).toLowerCase()===filters.seller.toLowerCase())&&(!filters.sportId||m?.sportId===filters.sportId)&&(!filters.templateId||m?.templateId===filters.templateId);
  offers.set(String(a.offerId),{seller:a.seller,eligible});if(eligible)result.publishedOffers++;
 }else if(e.eventName==='Purchased'){const offer=offers.get(String(a.offerId));if(offer){orders.set(id,{seller:offer.seller,fundedAt:e.timestamp,eligible:offer.eligible});if(offer.eligible)result.purchases++;}}
 else if(e.eventName==='Withdrawn'){// Wallet withdrawals aggregate all offers, so scoped totals are intentionally not attributed.
  if(filters.seller&&!filters.sportId&&!filters.templateId&&String(a.account).toLowerCase()===filters.seller.toLowerCase())withdrawn+=BigInt(a.amount);
 }else if(orders.get(id)?.eligible){
  if(e.eventName==='Delivered'){result.verifiedDeliveries++;latencies.push(Number(e.timestamp-orders.get(id)!.fundedAt));}
  else if(e.eventName==='Disputed'){result.disputes++;disputed.add(id);}
  else if(e.eventName==='Outcome'){const status=Number(a.status),reason=Number(a.reason);if(status===4){result.settled++;paid+=BigInt(a.amount);if(a.buyerAccepted)result.buyerAccepted++;if(disputed.has(id))result.disputeSettled++;}else if(status===5){refund+=BigInt(a.amount);if(reason>=1&&reason<=6)result.objectivelyInvalid++;else if(reason===7)result.inaccessibleDelivery++;else if(reason===8)result.deliveryTimeouts++;else if(reason===9)result.verifierTimeouts++;if(disputed.has(id))result.disputeRefunded++;}
   result.outcomes.push({orderId:id,transaction:`https://sepolia.basescan.org/tx/${e.transactionHash}`,status:status===4?'Settled':'Refunded',reason:reason===0?'Correct delivery':reason===8?'No attested delivery before deadline':reason===9?'Unresolved verifier timeout':'Objective report or delivery failure'});
  }
 }
 }
 latencies.sort((a,b)=>a-b);if(latencies.length){const mid=Math.floor(latencies.length/2);result.medianDeliverySeconds=latencies.length%2?latencies[mid]:(latencies[mid-1]+latencies[mid])/2;}
 return {...result,settledWei:paid.toString(),refundedWei:refund.toString(),withdrawnWei:!filters.seller||filters.sportId||filters.templateId?null:withdrawn.toString(),notice:'Counts confirmed deliveries and payouts. They don\u2019t prove audience quality or the organizer\u2019s original records.'};
}
export async function getSellerHistory(filters:HistoryFilters={}){
 let seller=filters.seller;
 if(filters.tenantId){const [wallet]=await sql()`SELECT address FROM agent_wallets WHERE tenant_id=${filters.tenantId} AND role='seller'`;if(!wallet)return {configured:!!process.env.MARKET_CONTRACT_ADDRESS,lastConfirmedAt:null,...summarizeSellerHistory([],[],filters)};seller=wallet.address;}
 const market=process.env.MARKET_CONTRACT_ADDRESS?.toLowerCase();if(!market)return {configured:false,lastConfirmedAt:null,...summarizeSellerHistory([],[],filters)};
 const rows=await sql()`SELECT * FROM market_indexed_logs WHERE chain_id=84532 AND market_address=${market} AND canonical=true ORDER BY block_number,log_index`;
 const offers=await sql()`SELECT chain_offer_id,manifest,terms_hash FROM offers WHERE chain_offer_id IS NOT NULL`;
 const [cursor]=await sql()`SELECT updated_at,next_block FROM market_chain_cursors WHERE chain_id=84532 AND market_address=${market}`;
 const events:IndexedEvent[]=rows.map(r=>({transactionHash:r.tx_hash,logIndex:r.log_index,blockNumber:BigInt(r.block_number),blockHash:r.block_hash,timestamp:BigInt(r.block_timestamp),eventName:r.event_name,args:r.args,canonical:r.canonical}));
 const summary=summarizeSellerHistory(events,offers.map(o=>({chainOfferId:o.chain_offer_id,sportId:o.manifest.sportId,templateId:o.manifest.templateId,termsHash:o.terms_hash})),{...filters,seller});
 const local=process.env.DEMO_MODE==='local-chain-fixture';
 return {configured:true,network:local?'Local Anvil fixture':'Base Sepolia',lastConfirmedAt:cursor?.updated_at??null,throughBlock:cursor?(BigInt(cursor.next_block)-1n).toString():null,...summary,outcomes:summary.outcomes.map(outcome=>({...outcome,transaction:local?null:outcome.transaction}))};
}
