import {randomUUID} from 'node:crypto';import assert from 'node:assert/strict';import {ensureWallet} from '../packages/server/wallet';import {sql,closeDatabase} from '../packages/database/index';
const id='wallet-race-'+randomUUID();
try{
 await sql()`INSERT INTO tenants(id,name,kind) VALUES(${id},'Wallet concurrency fixture','sponsor')`;
 await sql()`INSERT INTO principals(id,tenant_id,role) VALUES(${id},${id},'buyer')`;
 const results=await Promise.all(Array.from({length:8},()=>ensureWallet(id,id,'buyer')));
 assert.equal(new Set(results.map(x=>x.id)).size,1);
 const sellers=await Promise.all(Array.from({length:8},()=>ensureWallet(null,id,'seller')));
 assert.equal(new Set(sellers.map(x=>x.id)).size,1);
 await assert.rejects(ensureWallet('foreign-principal',id,'buyer'),/tenant mismatch/);
 console.log('PASS: 8 concurrent buyer and 8 NULL-principal seller wallet requests create one wallet each; foreign principal denied.');
}finally{await sql()`DELETE FROM agent_wallets WHERE tenant_id=${id}`;await sql()`DELETE FROM principals WHERE tenant_id=${id}`;await sql()`DELETE FROM tenants WHERE id=${id}`;await closeDatabase();}
