import type { NextConfig } from 'next';
import path from 'node:path';
const repoRoot = path.join(__dirname, '../..');
const config: NextConfig = { output: 'standalone', poweredByHeader: false, serverExternalPackages: ['postgres'], outputFileTracingRoot: repoRoot, turbopack: {root: repoRoot} };
export default config;
