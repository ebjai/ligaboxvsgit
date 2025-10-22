#!/usr/bin/env node
/**
 * Polls http://localhost:3000/api/health until it returns { ok: true } or times out.
 * Usage: node scripts/ciProbe.mjs [timeoutMs=90000]
 */
import http from 'http';

const timeoutMs = Number(process.argv[2] || 90000);
const start = Date.now();

function once() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000/api/health', (res) => {
      let data = '';
      res.on('data', (d) => (data += d));
      res.on('end', () => {
        try {
          const j = JSON.parse(data || '{}');
          if (j && j.ok) return resolve({ ok: true, detail: j });
          resolve({ ok: false, detail: j });
        } catch {
          resolve({ ok: false, detail: null });
        }
      });
    });
    req.on('error', () => resolve({ ok: false }));
    req.setTimeout(2500, () => {
      try { req.destroy(); } catch {}
      resolve({ ok: false });
    });
  });
}

(async () => {
  while (Date.now() - start < timeoutMs) {
    const r = await once();
    if (r.ok) {
      console.log('✅ /api/health ok:true');
      process.exit(0);
    }
    console.log('… waiting on /api/health');
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.error('❌ Timed out waiting for /api/health to be healthy');
  process.exit(1);
})();