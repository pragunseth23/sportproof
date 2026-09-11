import type { NextConfig } from 'next';
import path from 'node:path';
const repoRoot = path.join(__dirname, '../..');
// Standalone output is for the Docker/self-hosted path; Vercel does its own packaging.
const config: NextConfig = { ...(process.env.VERCEL ? {} : { output: 'standalone' as const }), poweredByHeader: false, serverExternalPackages: ['postgres'], outputFileTracingRoot: repoRoot, turbopack: {root: repoRoot} };
export default config;
