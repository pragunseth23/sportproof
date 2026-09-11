import {seed} from '../packages/server/seed';import {closeDatabase} from '../packages/database/index';
console.log(await seed(false));await closeDatabase();
