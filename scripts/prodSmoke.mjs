#!/usr/bin/env node
/**
 * Probes /api/health until ok:true or times out.
 * Usage: node scripts/prodSmoke.mjs https://your.site [timeoutMs]
 */
import https from 'https';
import http from 'http';

const base = process.argv[2];
const timeoutMs = Number(process.argv[3] || 120000);

if (!base) {
  console.error('Usage: node scripts/prodSmoke.mjs https://your.site [timeoutMs]');
  process.exit(2);
}

const lib = base.startsWith('https:') ? https : http;
const start = Date.now();

function once() {
  return new Promise((resolve) => {
    const url = new URL('/api/health', base).toString();
    const req = lib.get(url, (res) => {
      let data = '';
      res.on('data', (d) => (data += d));
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          resolve(!!j?.ok);
        } catch {
          resolve(false);
        }
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(4000, () => {
      try { req.destroy(); } catch {}
      resolve(false);
    });
  });
}

(async () => {
  while (Date.now() - start < timeoutMs) {
    const ok = await once();
    if (ok) {
      console.log('✅ Production health ok:true');
      process.exit(0);
    }
    console.log('… waiting for production health');
    await new Promise((r) => setTimeout(r, 2500));
  }
  console.error('❌ Timed out waiting for production health');
  process.exit(1);
})();