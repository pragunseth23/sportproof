import {existsSync} from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
process.env.DATABASE_URL=process.env.TEST_DATABASE_URL??'';
import { defineConfig } from 'vitest/config';
export default defineConfig({test:{include:['tests/**/*.test.ts','packages/**/*.test.ts'],exclude:['tests/e2e/**'],testTimeout:30000}});
