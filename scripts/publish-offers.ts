import {EVENTS} from '../packages/sports/src/index';import {enqueue,closeDatabase} from '../packages/database/index';
for(const tenantId of new Set(EVENTS.map(e=>e.organizerId)))await enqueue('seller:'+tenantId+':catalog','seller',{tenantId});console.log('Durable seller catalog jobs queued. Worker makes real model decisions; missing providers remain blocked.');await closeDatabase();
