/**
 * Operator-only: create seller wallets, fund them with gas from the deployer,
 * and approve them on the SportProofMarket contract. Prints addresses only.
 */
import {readFile} from 'node:fs/promises';
import {createPublicClient,createWalletClient,http,parseEther,formatEther,type Hex} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';
import {baseSepolia} from 'viem/chains';
import {EVENTS} from '../packages/sports/src/index';
import {ensureWallet} from '../packages/server/wallet';
import {closeDatabase} from '../packages/database/index';
const {RPC_URL,DEPLOYER_PRIVATE_KEY,MARKET_CONTRACT_ADDRESS}=process.env;
if(!RPC_URL||!DEPLOYER_PRIVATE_KEY||!MARKET_CONTRACT_ADDRESS)throw new Error('Set RPC_URL, MARKET_CONTRACT_ADDRESS and operator DEPLOYER_PRIVATE_KEY');
const account=privateKeyToAccount(DEPLOYER_PRIVATE_KEY as Hex);
const pub=createPublicClient({chain:baseSepolia,transport:http(RPC_URL)});
const wallet=createWalletClient({account,chain:baseSepolia,transport:http(RPC_URL)});
if(await pub.getChainId()!==84532)throw new Error('Base Sepolia required');
const abi=JSON.parse(await readFile('contracts/out/SportProofMarket.sol/SportProofMarket.json','utf8')).abi;
const GAS_GRANT=parseEther('0.0002');
const results=[];
for(const tenantId of [...new Set(EVENTS.map(e=>e.organizerId))]){
 const w=await ensureWallet(null,tenantId,'seller');
 const address=w.address as Hex;
 const balance=await pub.getBalance({address});
 let funded='already';
 if(balance<GAS_GRANT/2n){
  const tx=await wallet.sendTransaction({to:address,value:GAS_GRANT});
  await pub.waitForTransactionReceipt({hash:tx,confirmations:2});funded='sent '+formatEther(GAS_GRANT);
 }
 const approved=await pub.readContract({address:MARKET_CONTRACT_ADDRESS as Hex,abi,functionName:'approvedSellers',args:[address]}).catch(()=>null);
 let approval='already';
 if(approved!==true){
  const tx=await wallet.writeContract({address:MARKET_CONTRACT_ADDRESS as Hex,abi,functionName:'setSeller',args:[address,true]});
  await pub.waitForTransactionReceipt({hash:tx,confirmations:2});approval='approved';
 }
 results.push({tenantId,address,funded,approval});
}
console.log(JSON.stringify({deployerRemaining:formatEther(await pub.getBalance({address:account.address})),sellers:results},null,1));
await closeDatabase();
