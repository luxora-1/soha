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
  app/
    layout.tsx         document, fonts, colour palette, analytics
    (site)/            marketing pages, wrapped in the full navbar + footer
    (landing)/         standalone ad landing pages, stripped header + footer
      combination-cream/   the Estrada landing page (/estradiol redirects here)
    api/               intake and waitlist stubs, community feed pagination
  components/
    StepCard.tsx  numbered step card (composes ui + motion)
    ui/           primitives: Container, CTAButton, Eyebrow, ImagePlaceholder
    layout/       Navbar, Footer, SiteShell
    landing/      landing page sections + ImageSlot, Unverified, WaitlistForm
    social/       community feed: SocialPostCard, SocialFeedGrid
    motion/       FadeUp, MotionProvider
    sections/     SectionWrapper (bg alternation + padding rhythm)
    home/         homepage sections
  config/         design tokens (colour palette), image manifests, site config
  content/        page copy, kept out of JSX for review
  lib/            fonts, analytics, UTM capture, waitlist, social feed, small helpers
scripts/
  compliance-scan.mjs   lists every placeholder / claim marker by file:line
  unverified-list.mjs   lists every <Unverified> claim on the landing page
  instagram-token.mjs   checks or refreshes the Instagram access token
```

Copy `.env.example` to `.env.local` for local settings; everything in it is optional.

## Community feed (Instagram)

`/community` shows the posts of Soha's Instagram account, newest first,
loading more as you scroll; the landing page shows a strip of the latest
eight that leads to that page. Until an account is connected both render
labelled placeholder posts (`SOCIAL_PLACEHOLDER`).

The feed is read directly from the Instagram API (no third-party service),
cached for an hour, and falls back to placeholders if the API call fails so
the pages always render. Code: `src/lib/social` (providers), `/api/social`
(pagination), `src/components/social` (cards, grid).

To connect the account:

1. In the Instagram app, make the account a **professional** account
   (Business or Creator). Settings → Account type and tools.
2. At [developers.facebook.com](https://developers.facebook.com/apps/),
   create an app, add the **Instagram** product, and choose **API setup with
   Instagram login**. Under "Generate access tokens", add the account as an
   Instagram tester, then accept the invite in the Instagram app (Settings →
   Apps and websites → Tester invites).
3. Click **Generate token** next to the account and copy the long-lived token
   it returns (valid 60 days).
4. Set `INSTAGRAM_ACCESS_TOKEN` (and optionally `INSTAGRAM_HANDLE`) in Vercel
   → Settings → Environment Variables, and redeploy. Locally, put them in
   `.env.local`.
5. Verify with `node scripts/instagram-token.mjs check`.

Long-lived tokens expire 60 days after they were last refreshed. Run
`node scripts/instagram-token.mjs refresh` at least monthly and paste the
printed token into the environment variable. Displaying the account's own
posts needs no Meta app review; the app can stay in development mode.

To add another platform, implement `SocialProvider` in
`src/lib/social/providers/` and register it in `getSocialProvider()`.

## Colour palette

The palette (A · Warm Clay) lives in `src/config/design-tokens.ts` and is
documented in `PALETTES.md`. Every colour on the site is a CSS custom
property written to `:root`, so no component carries a hex value. To trial
another scheme, add an entry there and point `defaultPalette` at it.

## Ad landing page

`/combination-cream` is a standalone page for paid traffic. It is not in the
navigation. Its sections are in `src/components/landing/`, its copy in
`src/content/landing.ts`, and its images resolve to
`public/images/landing/{id}.{ext}` (shot list in that folder's README).

- Every factual claim is wrapped in `<Unverified>`: highlighted in
  development and on Vercel Preview, a build error in any other production
  build. `UNVERIFIED.md` is the checklist; regenerate it with
  `node scripts/unverified-list.mjs --update`. `ALLOW_UNVERIFIED=1 npm run build`
  lets a placeholder build through for a local check.
- The CTA is a waitlist email capture. `src/lib/waitlist/submit.ts` is the
  handler to point at a real endpoint; today it posts to `/api/waitlist`,
  which logs a masked line. UTM parameters are captured on arrival and sent
  with the submission and the `waitlist_submit` event.
- Events (`landing_view`, `waitlist_submit`) leave through
  `src/lib/analytics.ts`, gated by `NEXT_PUBLIC_ANALYTICS=on` like page views.

## Before launch

- Read `COMPLIANCE_NOTES.md` and run `npm run compliance`. Every marker it
  lists must be resolved or signed off; `npm run launch-check` must pass.
- `src/app/layout.tsx` sets `robots: { index: false }` while the site is
  pre-launch. Flip it at launch.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel so absolute metadata URLs are correct.
- Set `NEXT_PUBLIC_ANALYTICS=on` in Vercel to enable Vercel Analytics at launch.
- Photos: drop numbered files into `public/images/` (see the README there);
  an optional hero clip goes in `public/video/01.mp4`. Landing page images go
  in `public/images/landing/` by slot id.
- Resolve every item in `UNVERIFIED.md`; the landing page will not build for
  production until they are gone.
