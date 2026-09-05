# Soha — marketing site

Marketing website for Soha, a cash-pay menopause telehealth subscription for
women 45+. Pre-launch: no live payments or EHR integration yet, but the
project is laid out so both can be added at the API layer without
restructuring.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v3 — the design system lives in `tailwind.config.ts`
- Framer Motion — subtle fade-up on scroll only
- Deploys to Vercel with no extra configuration

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run compliance # list every placeholder / claim marker by file:line
npm run launch-check  # launch gate: fails while any marker remains
```

## Project layout

```
src/
  app/            routes (App Router), global styles, metadata
  components/
    StepCard.tsx  numbered step card (composes ui + motion)
    ui/           primitives: Container, CTAButton, Eyebrow, ImagePlaceholder
    layout/       Navbar, Footer
    motion/       FadeUp, MotionProvider
    sections/     SectionWrapper (bg alternation + padding rhythm)
    home/         homepage sections
  config/         design tokens, site config (nav, CTA, trust bar, footer)
  content/        page copy, kept out of JSX for review
  lib/            fonts, small helpers
scripts/
  compliance-scan.mjs   lists every placeholder / claim marker by file:line
```

## Before launch

- Read `COMPLIANCE_NOTES.md` and run `npm run compliance`. Every marker it
  lists must be resolved or signed off; `npm run launch-check` must pass.
- `src/app/layout.tsx` sets `robots: { index: false }` while the site is
  pre-launch. Flip it at launch.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel so absolute metadata URLs are correct.
- Set `NEXT_PUBLIC_ANALYTICS=on` in Vercel to enable Vercel Analytics at launch.
- Photos: drop numbered files into `public/images/` (see the README there);
  an optional hero clip goes in `public/video/01.mp4`.
