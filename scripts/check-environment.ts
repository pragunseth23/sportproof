import {getHealth} from '../packages/server/index';
import {closeDatabase} from '../packages/database/index';
import {chain} from '../packages/server/wallet';
const health=await getHealth();console.log(JSON.stringify(health,null,2));
if(process.env.RPC_URL&&process.env.MARKET_CONTRACT_ADDRESS){try{await chain().assertReady();console.log('Configured chain and bytecode verified')}catch{console.error('Configured chain / bytecode verification failed');process.exitCode=1}}
if(!health.ready)process.exitCode=1;await closeDatabase();
