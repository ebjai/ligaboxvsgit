#!/usr/bin/env bash
set -euo pipefail

# Make sure roster and assets exist before build
echo "📦 Building fighter roster…"
npm run fighters:build

echo "🏗️ Building app…"
npm run build

echo "🚀 Starting server on :3000…"
# start in the background
npx next start -p 3000 &

# Poll health until ok:true or timeout (90s)
node scripts/ciProbe.mjs 90000

echo "🎉 Health OK. Running preflight as extra guard…"
SITE_URL=http://localhost:3000 npm run verify:real