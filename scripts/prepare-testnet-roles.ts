/** Generate fresh operator/verifier wallets; never logs private keys. Does not spend. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {generatePrivateKey,privateKeyToAccount} from 'viem/accounts';
import type {Hex} from 'viem';
await mkdir('.local',{recursive:true});
let operator='';try{operator=await readFile('.local/operator.env','utf8')}catch{}
let env=await readFile('.env','utf8');
const existing=(name:string,text:string)=>text.split('\n').find(l=>l.startsWith(name+'='))?.slice(name.length+1);
const deployer=(existing('DEPLOYER_PRIVATE_KEY',operator)||generatePrivateKey()) as Hex;
const verifier=(existing('VERIFIER_PRIVATE_KEY',env)||generatePrivateKey()) as Hex;
const deployerAddress=privateKeyToAccount(deployer).address,verifierAddress=privateKeyToAccount(verifier).address;
await writeFile('.local/operator.env',`DEPLOYER_PRIVATE_KEY=${deployer}\nVERIFIER_ADDRESS=${verifierAddress}\n`,{mode:0o600});
if(!existing('VERIFIER_PRIVATE_KEY',env)){env=env.replace(/^VERIFIER_PRIVATE_KEY=.*\n?/m,'');await writeFile('.env',env+`VERIFIER_PRIVATE_KEY=${verifier}\n`,{mode:0o600})}
console.log(JSON.stringify({network:'Base Sepolia',chainId:84532,deployer:deployerAddress,verifier:verifierAddress,instruction:'Fund these fresh roles with faucet test ETH only. Deployer key remains operator-only. Buyer/seller wallets are created separately in encrypted database.'},null,2));
