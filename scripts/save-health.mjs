#!/usr/bin/env node
import fs from 'fs';
import http from 'http';

const out = process.argv[2] || 'health-report.json';
const base = process.env.SITE_URL || 'http://localhost:3000';

function fetchJSON(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(4000, () => {
      try { req.destroy(); } catch {}
      resolve(null);
    });
  });
}

(async () => {
  const j = await fetchJSON(new URL('/api/health', base).toString());
  fs.writeFileSync(out, JSON.stringify(j || { ok: false, error: 'unreachable' }, null, 2));
  console.log('Saved', out);
})();