/**
 * Repairs a local .env that was overwritten by the .env.example template.
 * Idempotent: only fills values that are empty. Never prints secret values.
 * Local development defaults only; hosted deployments configure their own store.
 */
import {readFile,writeFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
const LOCAL_DEFAULTS:Record<string,string>={
 DATABASE_URL:'postgres://sportproof@127.0.0.1:54329/sportproof',
 TEST_DATABASE_URL:'postgres://sportproof@127.0.0.1:54329/sportproof_unit_test',
 APP_BASE_URL:'http://127.0.0.1:3000',
};
const GENERATED=['REPORT_ENCRYPTION_KEY','AGENT_KEY_ENCRYPTION_KEY','SESSION_SECRET','PRIVATE_DEMO_SEED'];
let env=await readFile('.env','utf8');
const filled:string[]=[];
function fill(key:string,value:string){
 const line=new RegExp('^'+key+'=(.*)$','m');
 const match=env.match(line);
 if(!match)return;
 if(match[1]!=='')return; // never overwrite a configured value
 env=env.replace(line,key+'='+value);
 filled.push(key);
}
for(const [key,value] of Object.entries(LOCAL_DEFAULTS))fill(key,value);
for(const key of GENERATED)fill(key,randomBytes(32).toString('hex'));
// Special case: DATABASE_URL may hold the non-local template default while the
// workspace database runs on 127.0.0.1:54329.
if(/^DATABASE_URL=postgres:\/\/sportproof:sportproof@localhost:5432\/sportproof$/m.test(env)){
 env=env.replace(/^DATABASE_URL=.*$/m,'DATABASE_URL='+LOCAL_DEFAULTS.DATABASE_URL);
 filled.push('DATABASE_URL (replaced template default)');
}
await writeFile('.env',env,{mode:0o600});
console.log(JSON.stringify({repaired:filled,note:'VERIFIER_PRIVATE_KEY is refilled separately by scripts/prepare-testnet-roles.ts'},null,1));
