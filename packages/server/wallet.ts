import {randomUUID} from 'node:crypto';
import {generatePrivateKey,privateKeyToAccount} from 'viem/accounts';
import type {Hex,Hash} from 'viem';
import {sql} from '../database/index';
import {createMarketClient,type Role,type MarketFunction} from '../chain/index';
import {decrypt,encrypt} from './crypto';
export function chain(){if(process.env.DEMO_MODE!=='local-chain-fixture'&&/localhost|127\.0\.0\.1/.test(process.env.RPC_URL??''))throw new Error('Local chain requires explicit local-chain-fixture mode');return createMarketClient({rpcUrl:process.env.RPC_URL??'',address:process.env.MARKET_CONTRACT_ADDRESS as Hex,bytecodeHash:process.env.MARKET_BYTECODE_HASH as Hash,deploymentBlock:BigInt(process.env.MARKET_DEPLOYMENT_BLOCK??0),confirmations:Number(process.env.CONFIRMATIONS??2)})}
export async function ensureWallet(principalId:string|null,tenantId:string,role:Role){
 // Serialize all wallet creation for a tenant. NULL principal seller/verifier identities
 // need this lock too; SQL UNIQUE(principal_id,...) alone does not cover NULLs.
 return sql().begin(async tx=>{
  const [tenant]=await tx`SELECT id FROM tenants WHERE id=${tenantId} FOR UPDATE`;
  if(!tenant)throw new Error('Wallet tenant not found');
  if(principalId){const [principal]=await tx`SELECT id FROM principals WHERE id=${principalId} AND tenant_id=${tenantId}`;if(!principal)throw new Error('Wallet principal tenant mismatch');}
  const [old]=await tx`SELECT id,address,role FROM agent_wallets WHERE tenant_id=${tenantId} AND role=${role} AND principal_id IS NOT DISTINCT FROM ${principalId}`;
  if(old)return old;
  const id=randomUUID(),key=role==='verifier'?process.env.VERIFIER_PRIVATE_KEY as Hex:generatePrivateKey();
  if(!key)throw new Error('Verifier key missing');
  const address=privateKeyToAccount(key).address;
  await tx`INSERT INTO agent_wallets(id,principal_id,tenant_id,role,address,encrypted_key) VALUES(${id},${principalId},${tenantId},${role},${address},${encrypt(key,id,'AGENT_KEY_ENCRYPTION_KEY')})`;
  return {id,address,role};
 });
}
export async function assertChainInstance(){if(process.env.DEMO_MODE==='local-chain-fixture'&&!process.env.DATABASE_URL?.includes('/sportproof_chain_test'))throw new Error('Local chain requires isolated sportproof_chain_test database');const address=process.env.MARKET_CONTRACT_ADDRESS;if(!address)throw new Error('Market deployment missing');await sql().begin(async tx=>{await tx`SELECT pg_advisory_xact_lock(84532002)`;const [row]=await tx`SELECT * FROM chain_instance WHERE singleton=true`;if(row&&(row.market_address.toLowerCase()!==address.toLowerCase()||row.mode!==(process.env.DEMO_MODE??'live')))throw new Error('Database bound to a different chain instance; use isolated database');if(!row)await tx`INSERT INTO chain_instance(singleton,chain_id,market_address,mode) VALUES(true,84532,${address},${process.env.DEMO_MODE??'live'})`})}
export async function writeMarket(walletId:string,idempotencyKey:string,functionName:MarketFunction,args:readonly unknown[],value=0n,authorize:()=>Promise<void>=async()=>{},maintenance=false){await assertChainInstance();const lock=await sql().reserve();try{await lock`SELECT pg_advisory_lock(hashtext(${walletId}))`;const [existing]=await sql()`SELECT * FROM wallet_transactions WHERE id=${idempotencyKey}`;const client=chain();if(existing){if(existing.wallet_id!==walletId||existing.purpose!==functionName)throw new Error('Idempotency conflict');try{await client.confirmReceipt(existing.tx_hash);return existing.tx_hash as Hash}catch{await client.broadcastSigned(decrypt<Hex>(existing.encrypted_raw,existing.id,'AGENT_KEY_ENCRYPTION_KEY')).catch(()=>{});return existing.tx_hash as Hash}}const [wallet]=await sql()`SELECT * FROM agent_wallets WHERE id=${walletId}`;if(!wallet)throw new Error('Wallet not found');const key=decrypt<Hex>(wallet.encrypted_key,wallet.id,'AGENT_KEY_ENCRYPTION_KEY');return client.prepareWrite({privateKey:key,role:maintenance&&wallet.role==='verifier'?'maintenance':wallet.role,functionName,args,value,maxValueWei:value,maxGasCostWei:BigInt(process.env.MAX_GAS_PER_TX_WEI??'20000000000000'),authorize,persistSigned:async signed=>{await sql()`INSERT INTO wallet_transactions(id,wallet_id,nonce,purpose,tx_hash,encrypted_raw) VALUES(${idempotencyKey},${walletId},${signed.nonce},${functionName},${signed.hash},${encrypt(signed.rawTransaction,idempotencyKey,'AGENT_KEY_ENCRYPTION_KEY')})`}})}finally{await lock`SELECT pg_advisory_unlock(hashtext(${walletId}))`;lock.release()}}
