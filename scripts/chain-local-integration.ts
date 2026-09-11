/** Explicit LOCAL Anvil integration; never a public-testnet acceptance receipt. */
import {spawn} from 'node:child_process';import {readFile} from 'node:fs/promises';
import {createPublicClient,createWalletClient,http,keccak256,type Hex} from 'viem';import {privateKeyToAccount,generatePrivateKey} from 'viem/accounts';import {baseSepolia} from 'viem/chains';
import {createMarketClient} from '../packages/chain/index';import assert from 'node:assert/strict';
const anvil=spawn(process.env.ANVIL_BIN??'anvil',['--port','18545','--chain-id','84532','--silent'],{stdio:'ignore'});
try{
 const rpc='http://127.0.0.1:18545';const p=createPublicClient({chain:baseSepolia,transport:http(rpc,{retryCount:0})});
 for(let i=0;i<50;i++){try{await p.getChainId();break;}catch{await new Promise(r=>setTimeout(r,100));}}
 const keys=Array.from({length:4},()=>generatePrivateKey());const [admin,seller,buyer,verifier]=keys.map(key=>privateKeyToAccount(key));
 const request=(method:string,params:unknown[])=>p.request({method,params} as never);
 for(const a of [admin,seller,buyer,verifier])await request('anvil_setBalance',[a.address,'0x56BC75E2D63100000']);
 const a=JSON.parse(await readFile('contracts/out/SportProofMarket.sol/SportProofMarket.json','utf8'));
 const w=createWalletClient({account:admin,chain:baseSepolia,transport:http(rpc)});const tx=await w.deployContract({abi:a.abi,bytecode:a.bytecode.object,args:[admin.address,verifier.address]});const deployed=await p.waitForTransactionReceipt({hash:tx});const address=deployed.contractAddress!;const code=(await p.getCode({address}))!;
 const c=createMarketClient({rpcUrl:rpc,address,bytecodeHash:keccak256(code),deploymentBlock:deployed.blockNumber});
 const send=async(key:Hex,role:'admin'|'seller'|'buyer'|'verifier',functionName:Parameters<typeof c.prepareWrite>[0]['functionName'],args:unknown[],value=0n)=>{
 let saved=false;const hash=await c.prepareWrite({privateKey:key,role,functionName,args,value,maxValueWei:10000n,maxGasCostWei:10n**17n,authorize:async()=>{},persistSigned:async(t)=>{assert.equal(t.hash,keccak256(t.rawTransaction));saved=true;}});assert(saved);await p.waitForTransactionReceipt({hash});await assert.rejects(c.confirmReceipt(hash),/sealed L2 confirmations/);await request('evm_mine',[]);await c.confirmReceipt(hash);return hash;
 };
 await send(keys[0],'admin','setSeller',[seller.address,true]);const h=`0x${'12'.repeat(32)}` as Hex;const block=await p.getBlock();const terms={termsHash:h,datasetCommitment:h,reportCommitment:h,priceWei:100n,expiry:block.timestamp+10000n,deliveryWindow:600,reviewWindow:600,resolutionWindow:600,allowedBuyer:'0x0000000000000000000000000000000000000000',purchaseLimit:0};
 await send(keys[1],'seller','registerOffer',[h,terms]);const funding=await send(keys[2],'buyer','purchase',[1n,h,h],100n);
 await assert.rejects(c.assertReportAccess({orderId:1n,buyer:buyer.address,fundingHash:funding,deliveryHash:funding}));
 const delivery=await send(keys[3],'verifier','attestDelivery',[1n,h,h]);await c.assertReportAccess({orderId:1n,buyer:buyer.address,fundingHash:funding,deliveryHash:delivery});
 await assert.rejects(c.assertReportAccess({orderId:1n,buyer:seller.address,fundingHash:funding,deliveryHash:delivery}));
 await send(keys[2],'buyer','acceptDelivery',[1n]);await send(keys[1],'seller','withdraw',[]);
 const h2=`0x${'13'.repeat(32)}` as Hex;await send(keys[1],'seller','registerOffer',[h2,terms]);await send(keys[2],'buyer','purchase',[2n,h,h2],100n);await send(keys[3],'verifier','rejectOrder',[2n,2,h]);await send(keys[2],'buyer','withdraw',[]);assert.equal((await c.readOrder(2n)).status,5);
 const wrong=createMarketClient({rpcUrl:rpc,address,bytecodeHash:h,deploymentBlock:0n});await assert.rejects(wrong.assertReady());
 console.log('LOCAL ANVIL integration PASS: real signed publication, payment, private entitlement, unauthorized denial, acceptance, payout, objective refund, refund withdrawal, code rejection. Not public Base Sepolia acceptance.');
}finally{anvil.kill();}
