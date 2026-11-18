# Metrics log

Lighthouse 13 (lab), production build served by `next start` (gzip), Chromium headless.
Mobile = Lighthouse default (Moto G-class, 4× CPU throttle, slow 4G). Re-measure on the Vercel URL after deploy.

## 2026-11-18 · Phases 2–5 pass

| Page | Device | Perf | A11y | Best pr. | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile (3 runs) | 93 / 93 / 94 | 100 | 100 | 100 | 0.9 s | 270–300 ms | 0 |
| `/` | desktop | 99 | 100 | 100 | 100 | 0.3 s | 10 ms | 0 |
| `/about` | mobile | 95 | 100 | 100 | 100 | 0.8 s | 260 ms | 0 |
| `/about` | desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 ms | 0 |
| `/projects/fraud-detection` | mobile | 96 | 100 | 100 | 100 | 0.8 s | 240 ms | 0 |
| `/projects/fraud-detection` | desktop | 100 | 100 | 100 | 100 | 0.3 s | 10 ms | 0 |

### Page weight vs budget (PRD 17.3), home page initial load

| Asset | Measured | Budget | Status |
|---|---|---|---|
| Initial transfer | 294 KB | ≤ 1 MB | ✅ |
| JavaScript (gzip, local) | 153.7 KB | ≤ 150 KB | ⚠️ +3.7 KB, see note |
| CSS | 13.4 KB | ≤ 40 KB | ✅ |
| Fonts | 3 WOFF2 · 90 KB | ≤ 3 files · 120 KB | ✅ |
| Hero art | inline SVG (~9 KB in HTML) | ≤ 40 KB | ✅ |
| Rail stamps sprite | 14 KB | decorative SVG ≤ 150 KB total | ✅ |
| Above-the-fold images | 0 rasters | 1 hero asset | ✅ |
| Résumé | 163 KB | ≤ 1 MB | ✅ |

**JS note (written reason per PRD 17.3):** ~116 KB of the 153.7 KB is the React + Next.js runtime.
Our own page code is ~10.6 KB gzip; the terminal is lazy-loaded only when scrolled near (~5 KB).
Locally the server uses gzip; Vercel serves brotli (~15 % smaller), so production should land
around 130 KB. Confirm on the production URL.

### Fixes made in this pass
- Filled buttons/badges with cream text moved to `--color-accent-strong` (#C0402E, 4.69:1) for AA contrast.
- Rotating chip: hidden phrases use `visibility: hidden` so only the visible one is checked/announced.
- Phones (< 768 px): SVG-internal loops (leaf sway, twinkle, steam) disabled; whole-illustration float kept.
- Mini terminal lazy-loaded on approach (IntersectionObserver + `next/dynamic`).
