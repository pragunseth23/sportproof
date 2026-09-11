import {readFile} from 'node:fs/promises';
import {createMarketClient} from '../packages/chain/index';
const manifest=JSON.parse(await readFile('deployments/base-sepolia.json','utf8'));
if(manifest.chainId!==84532)throw new Error('Manifest wrong chain');
const client=createMarketClient({rpcUrl:process.env.RPC_URL??'',address:manifest.address,bytecodeHash:manifest.bytecodeHash,confirmations:Number(process.env.CONFIRMATIONS??2),deploymentBlock:BigInt(manifest.deploymentBlock)});
await client.assertReady();await client.confirmReceipt(manifest.deploymentTransaction);console.log('Base Sepolia deployment code and canonical L2 receipt verified. This does not assert explorer source verification.');
