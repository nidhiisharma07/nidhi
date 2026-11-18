#!/usr/bin/env node
// Release gate for content (PRD R1, R3 step 11). Fails while placeholders remain.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const warn = [];

// 1. Placeholder strings like "[GitHub URL]" in content + config
const files = ["src/lib/site-config.ts", ...readdirSync(join(root, "src/content")).map((f) => `src/content/${f}`)];
for (const f of files) {
  readFileSync(join(root, f), "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/["'`](\[[^\]]+\])["'`]/g)) errors.push(`${f}:${i + 1} placeholder ${m[1]}`);
    for (const m of line.matchAll(/["'`](https?:\/\/[^"'`\s]+)["'`]/g)) {
      try { new URL(m[1]); } catch { errors.push(`${f}:${i + 1} invalid URL ${m[1]}`); }
    }
  });
}

// 2. Résumé present, real, and within budget (1 MB)
const resume = join(root, "public/resume.pdf");
if (!existsSync(resume)) errors.push("public/resume.pdf is missing");
else {
  const buf = readFileSync(resume);
  if (buf.includes("PLACEHOLDER-RESUME")) errors.push("public/resume.pdf is still the placeholder");
  if (buf.length > 1024 * 1024) errors.push(`résumé is ${(buf.length / 1024).toFixed(0)} KB (budget 1024 KB)`);
}

// 3. Font budget: ≤ 3 WOFF2 files, ≤ 120 KB combined
const fontDir = join(root, "src/fonts");
const fonts = readdirSync(fontDir).filter((f) => f.endsWith(".woff2"));
const fontKB = fonts.reduce((s, f) => s + statSync(join(fontDir, f)).size, 0) / 1024;
if (fonts.length > 3) errors.push(`${fonts.length} font files (budget 3)`);
if (fontKB > 120) errors.push(`fonts total ${fontKB.toFixed(0)} KB (budget 120 KB)`);

// 4. Project screenshots ≤ 150 KB each and referenced files exist
const projSrc = readFileSync(join(root, "src/content/projects.ts"), "utf8");
for (const m of projSrc.matchAll(/src:\s*["'](\/[^"']+)["']/g)) {
  const p = join(root, "public", m[1]);
  if (!existsSync(p)) errors.push(`missing image ${m[1]}`);
  else if (statSync(p).size > 150 * 1024) errors.push(`${m[1]} exceeds 150 KB`);
}
if (!/src:\s*["']\//.test(projSrc)) warn.push("no project screenshots yet (designed placeholders will show)");

warn.forEach((w) => console.log(`  warn  ${w}`));
console.log(`  info  fonts: ${fonts.length} files, ${fontKB.toFixed(1)} KB`);
if (errors.length) {
  console.error(`\n✗ Content check failed (${errors.length}):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("✓ Content check passed");
