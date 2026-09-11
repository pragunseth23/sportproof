import {readFile,readdir} from 'node:fs/promises';import {sql,closeDatabase} from '../packages/database/index';
const dir=new URL('../packages/database/migrations/',import.meta.url);for(const file of (await readdir(dir)).filter(f=>f.endsWith('.sql')).sort()){await sql().unsafe(await readFile(new URL(file,dir),'utf8'));console.log('Applied '+file)}await closeDatabase();
