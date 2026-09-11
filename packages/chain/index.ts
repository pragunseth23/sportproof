import { createPublicClient, createWalletClient, http, keccak256, encodeFunctionData, decodeFunctionData, parseTransaction, parseEventLogs, type Address, type Hash, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import abi from './abi.json';
export const marketAbi = abi;
export const CHAIN_ID = 84532;
export const explorerTransaction = (hash: Hash) => `https://sepolia.basescan.org/tx/${hash}`;
export const explorerAddress = (address: Address) => `https://sepolia.basescan.org/address/${address}`;
export type Role = 'buyer' | 'seller' | 'verifier' | 'maintenance' | 'admin';
export type MarketFunction = 'registerOffer'|'cancelOffer'|'purchase'|'attestDelivery'|'rejectOrder'|'acceptDelivery'|'openDispute'|'resolveDispute'|'finalize'|'expire'|'withdraw'|'setSeller'|'setPaused';
const permissions: Record<Role, MarketFunction[]> = { buyer:['purchase','acceptDelivery','openDispute','withdraw'],seller:['registerOffer','cancelOffer','withdraw'],verifier:['attestDelivery','rejectOrder','resolveDispute'],maintenance:['finalize','expire'],admin:['setSeller','setPaused'] };
export type ChainConfig = {rpcUrl:string;address:Address;bytecodeHash:Hash;confirmations?:number;deploymentBlock:bigint};
export type ChainOrder = {offerId:bigint;buyer:Address;priceWei:bigint;fundedAt:bigint;deliveryDeadline:bigint;deliveredAt:bigint;reviewDeadline:bigint;resolutionDeadline:bigint;status:number};
export type OfferTerms = {termsHash:Hash;datasetCommitment:Hash;reportCommitment:Hash;priceWei:bigint;expiry:bigint;deliveryWindow:number;reviewWindow:number;resolutionWindow:number;allowedBuyer:Address;purchaseLimit:number};
export type ChainOffer = {seller:Address;terms:OfferTerms;purchases:number;cancelled:boolean};
export type SignedTransaction = {hash:Hash;rawTransaction:Hex;nonce:number};
export function createMarketClient(config:ChainConfig) {
 const confirmations=config.confirmations??2;
 if(!Number.isInteger(confirmations)||confirmations<2)throw new Error('CONFIRMATIONS must be at least 2 sealed L2 blocks');
 if(!config.rpcUrl||!/^0x[0-9a-fA-F]{40}$/.test(config.address)||!/^0x[0-9a-fA-F]{64}$/.test(config.bytecodeHash))throw new Error('Missing valid RPC or deployment manifest');
 const publicClient=createPublicClient({chain:baseSepolia,transport:http(config.rpcUrl,{retryCount:2,timeout:15000})});
 async function assertReady(){if(await publicClient.getChainId()!==CHAIN_ID)throw new Error('Wrong network: Base Sepolia 84532 required');const code=await publicClient.getCode({address:config.address,blockTag:'latest'});if(!code||keccak256(code)!==config.bytecodeHash)throw new Error('Market bytecode does not match deployment manifest');}
 async function readOrder(id:bigint):Promise<ChainOrder>{await assertReady();return await publicClient.readContract({address:config.address,abi:marketAbi,functionName:'getOrder',args:[id]}) as ChainOrder;}
 async function readOffer(id:bigint):Promise<ChainOffer>{await assertReady();return await publicClient.readContract({address:config.address,abi:marketAbi,functionName:'getOffer',args:[id]}) as ChainOffer;}
 async function confirmReceipt(hash:Hash){await assertReady();const receipt=await publicClient.getTransactionReceipt({hash});if(receipt.status!=='success')throw new Error('Transaction reverted');const [canonical,latest]=await Promise.all([publicClient.getBlock({blockNumber:receipt.blockNumber}),publicClient.getBlock({blockTag:'latest'})]);if(canonical.hash!==receipt.blockHash)throw new Error('Receipt was reorganized');if(latest.number-receipt.blockNumber+1n<BigInt(confirmations))throw new Error('Awaiting sealed L2 confirmations');return receipt;}
 async function assertReportAccess(input:{orderId:bigint;buyer:Address;fundingHash:Hash;deliveryHash:Hash}){
  const funding=await confirmReceipt(input.fundingHash);const delivery=await confirmReceipt(input.deliveryHash);
  if(funding.to?.toLowerCase()!==config.address.toLowerCase()||delivery.to?.toLowerCase()!==config.address.toLowerCase())throw new Error('Receipt contract mismatch');
  const paid=parseEventLogs({abi:marketAbi,logs:funding.logs,eventName:'Purchased'}) as unknown as {address:Address;args:{orderId:bigint;buyer:Address;offerId:bigint;priceWei:bigint;termsHash:Hash}}[];
  const attested=parseEventLogs({abi:marketAbi,logs:delivery.logs,eventName:'Delivered'}) as unknown as {address:Address;args:{orderId:bigint;reportCommitment:Hash}}[];
  const purchase=paid.find(e=>e.address.toLowerCase()===config.address.toLowerCase()&&e.args.orderId===input.orderId&&e.args.buyer.toLowerCase()===input.buyer.toLowerCase());
  const attestation=attested.find(e=>e.address.toLowerCase()===config.address.toLowerCase()&&e.args.orderId===input.orderId);
  const order=await readOrder(input.orderId);const offer=await readOffer(order.offerId);
  if(!purchase||!attestation||order.buyer.toLowerCase()!==input.buyer.toLowerCase()||![2,3,4].includes(order.status)||purchase.args.priceWei!==order.priceWei||purchase.args.offerId!==order.offerId||purchase.args.termsHash!==offer.terms.termsHash||attestation.args.reportCommitment!==offer.terms.reportCommitment)throw new Error('No current authorized paid delivery');
  return {order,offer,funding,delivery,label:'L2-confirmed' as const};
 }
 async function broadcastSigned(rawTransaction:Hex){await assertReady();const tx=parseTransaction(rawTransaction);if(tx.chainId!==CHAIN_ID||tx.to?.toLowerCase()!==config.address.toLowerCase()||!tx.data)throw new Error('Stored transaction policy mismatch');const call=decodeFunctionData({abi:marketAbi,data:tx.data});if(!Object.values(permissions).flat().includes(call.functionName as MarketFunction))throw new Error('Stored selector forbidden');return publicClient.sendRawTransaction({serializedTransaction:rawTransaction});}
 /** Caller MUST hold a durable per-wallet SQL lock and reserve budget. persistSigned commits before broadcast. */
 async function prepareWrite(input:{privateKey:Hex;role:Role;functionName:MarketFunction;args:readonly unknown[];value?:bigint;maxValueWei:bigint;maxGasCostWei:bigint;authorize:()=>Promise<void>;persistSigned:(tx:SignedTransaction)=>Promise<void>}){
  await assertReady();if(!permissions[input.role].includes(input.functionName))throw new Error('Signer role forbidden');
  const value=input.value??0n;if(value<0n||value>input.maxValueWei||(input.functionName!=='purchase'&&value!==0n))throw new Error('Value policy rejected');
  const account=privateKeyToAccount(input.privateKey);
  if(input.functionName==='purchase'){const o=await readOffer(input.args[0] as bigint);if(o.terms.priceWei!==value||o.terms.termsHash!==input.args[1]||(o.terms.allowedBuyer!=='0x0000000000000000000000000000000000000000'&&o.terms.allowedBuyer.toLowerCase()!==account.address.toLowerCase()))throw new Error('Offer price, terms, or buyer mismatch');}
  await input.authorize();
  const data=encodeFunctionData({abi:marketAbi,functionName:input.functionName,args:input.args});
  const wallet=createWalletClient({account,chain:baseSepolia,transport:http(config.rpcUrl)});
  const nonce=await publicClient.getTransactionCount({address:account.address,blockTag:'pending'});
  const request=await wallet.prepareTransactionRequest({account,to:config.address,data,value,nonce});
  const gasCost=(request.gas??0n)*(request.maxFeePerGas??request.gasPrice??0n);
  if(gasCost<=0n||gasCost>input.maxGasCostWei)throw new Error('Gas cap exceeded');
  if(await publicClient.getBalance({address:account.address})<value+input.maxGasCostWei)throw new Error('Insufficient balance including gas reserve');
  await assertReady();const rawTransaction=await wallet.signTransaction(request);const hash=keccak256(rawTransaction);await input.persistSigned({hash,rawTransaction,nonce});
  await broadcastSigned(rawTransaction);return hash;
 }
 return {config,publicClient,assertReady,readOrder,readOffer,confirmReceipt,assertReportAccess,prepareWrite,broadcastSigned};
}
