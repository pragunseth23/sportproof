import { describe,it,expect } from 'vitest';
import {createMarketClient} from './index';
const config={rpcUrl:'http://127.0.0.1:1',address:`0x${'11'.repeat(20)}` as const,bytecodeHash:`0x${'22'.repeat(32)}` as const,deploymentBlock:1n};
describe('chain fails closed',()=>{
 it('rejects preconfirmation-only configuration',()=>{expect(()=>createMarketClient({...config,confirmations:1})).toThrow('at least 2');expect(()=>createMarketClient({...config,confirmations:2.5})).toThrow();});
 it('rejects missing manifest and RPC',()=>{expect(()=>createMarketClient({...config,rpcUrl:''})).toThrow();});
 it('disconnected chain cannot unlock a report',async()=>{const client=createMarketClient(config);await expect(client.assertReportAccess({orderId:1n,buyer:config.address,fundingHash:config.bytecodeHash,deliveryHash:config.bytecodeHash})).rejects.toThrow();});
});
