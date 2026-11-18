# Nidhi Sharma — Notebook Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 portfolio, built from **PRD v1.1**. Phases 1–3 implemented; Phase 4/5 checks partly done.

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run check        # content gate: fails while placeholders remain
npm run build:release  # check + build (use this for the real launch)
```

## Where to edit (no component changes needed)
| What | File |
|---|---|
| Name, headline, email, GitHub, LinkedIn, domain | `src/lib/site-config.ts` |
| Projects (+ detail pages) | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |
| Experience & education | `src/content/experience.ts` |
| Articles (Writing shows only when non-empty) | `src/content/articles.ts` |
| Résumé | replace `public/resume.pdf` (< 1 MB) |
| Screenshots | `public/projects/*.webp` (≤ 150 KB) + `image` field in projects.ts |

Values in `[square brackets]` are placeholders: hidden on the page, and `npm run check` fails until they're replaced.

## Still to fill before launch
- GitHub repo links for the projects (`src/content/projects.ts`)
- Project screenshots → `public/projects/*.webp` + `image` field
- Optional: more scrapbook photos → `public/scrapbook/*.webp` + `src/content/moments.ts`

## Content imported from the old site (portnew-nu.vercel.app)
- Email, GitHub, LinkedIn, résumé PDF, skills/tools, experience bullets, leadership roles, coursework, 5 scrapbook photos (converted to WebP).
- Disease Prediction, Credit Card Fraud Detection and AI-Based Learning System are in `projects.ts` with `published: false`.
  Set `published: true` (and add a repo link) only for the ones that are built and you can walk through in an interview.
- The 85% / 90% project accuracy figures are not shown on project cards; add them under `results` only with the dataset and evaluation method.

## Implementation notes
- Fonts: 3 self-hosted WOFF2 (Caveat 600, DM Serif Display, Source Sans 3) = ~90 KB, `display: swap`.
- Scroll path (`src/components/scroll-path.tsx`): geometry measured from `[data-path-marker]` anchors; recomputed on ResizeObserver, `document.fonts.ready`, image load; one rAF per update. Below 768 px a static CSS dotted line is used and no path JS runs.
- Active section: one IntersectionObserver on the middle viewport band + 120 ms dwell; updates the hash with `replaceState`.
- Reveals are progressive: content is visible without JS and under reduced motion.
- Mobile menu: focus moves in, Tab is trapped, Escape closes and returns focus.

## Extras
- Social preview: `public/og.png` (1200×630). Favicon: `src/app/icon.svg` (smiley).
- Mini terminal commands live in `src/components/mini-terminal.tsx` (`run()` switch). Data comes from the content files.
- Notebook cover shows once per browser session; delete `cover-seen` from sessionStorage to see it again.
- Lighthouse results and the page-weight budget: `docs/metrics.md`.

## Deploy (Vercel)
Push to GitHub → import in Vercel → deploy. Then set `siteUrl` in site-config so canonical, sitemap and robots use the real domain.
