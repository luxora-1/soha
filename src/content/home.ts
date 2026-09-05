/**
 * Homepage copy. Kept out of JSX so legal/brand review can happen in one file.
 *
 * Anything marked as draft copy (see COMPLIANCE_NOTES.md) was not supplied in
 * the brief and needs brand + legal sign-off.
 * The "why one instead of three" section is a CONVENIENCE claim only — do not
 * add language implying the combined regimen is medically superior or more
 * effective than separate prescriptions.
 */

export const homeContent = {
  hero: {
    /** Rendered as one h1: "One prescription. Not three." — the accent is set in italic. */
    headline: { lead: "One prescription.", accent: "Not three." },
    subhead:
      "Menopause treatment shouldn't mean juggling separate pills, patches, and creams from three different scripts. Soha combines what you need into one regimen — reviewed by a clinician, shipped to your door.",
  },

  /* COPY_DRAFT: the two hero tiles and the quick rows under them. */
  heroTiles: {
    product: { lead: "Meet Estrada,", accent: "the 3-in-1 regimen", cta: "See the product" },
    consult: { lead: "Start your", accent: "consult today", cta: "Takes about 10 minutes" },
  },
  quickRows: [
    { lead: "How it", accent: "works", href: "/how-it-works", slot: "how-step-01" },
    { lead: "Straightforward", accent: "pricing", href: "/pricing", slot: "how-step-03" },
    { lead: "Choose your", accent: "cycle", href: "/how-it-works#cycle", slot: "how-cycle" },
    { lead: "Questions,", accent: "answered", href: "/faq", slot: "how-step-02" },
  ],

  howItWorks: {
    eyebrow: "How it works",
    headline: "Three steps, and then it just arrives.",
    steps: [
      {
        number: "01",
        title: "Tell us what's going on",
        body: "A quick online visit. No waiting rooms, no guessing what to ask for.",
      },
      {
        number: "02",
        title: "A clinician reviews your case",
        body: "A licensed clinician evaluates your history and determines the right treatment for you — not a generic quiz result.",
      },
      {
        number: "03",
        title: "It ships, on your cycle",
        body: "Your regimen arrives in one box, on a 28- or 84-day cycle. Refills happen automatically, so you're never scrambling.",
      },
    ],
  },

  whyOne: {
    eyebrow: "Why one instead of three",
    headline: "You've probably been prescribed more than you needed to manage.",
    body: "Most menopause regimens combine an oral hormone, a topical cream, and sometimes a patch — each from a separate prescription, each requiring its own refill timeline. Soha's approach combines what you need into a single regimen, so there's one thing to remember, not three.",
  },

  /* Product panel. Headline is the product page h1 from the brief; the rest is draft. */
  product: {
    eyebrow: "The flagship",
    name: "Estrada",
    byline: "by Soha",
    headline: { lead: "Three prescriptions,", accent: "combined into one." },
    /* COPY_DRAFT: product panel body (client calls it "the 3-in-1 cream"). */
    body: "One topical regimen in one pump bottle, prescribed for you by a licensed clinician and shipped in one box.",
    /** Label lines reproduced from the packaging. */
    labelClaims: ["Bioidentical hormones", "USA compounded", "OB/GYN prescribed"],
    cta: "See the product",
  },

  /* "Three into one" visual beside the why-one copy. Convenience framing only. */
  threeToOne: {
    before: ["Oral hormone", "Topical cream", "Patch"],
    after: "One regimen",
    /* COPY_DRAFT */
    caption: "Three refill timelines become one.",
  },

  /* Cycle tiles. "Fewer shipments, better price." is the brief's framing line. */
  cycles: {
    eyebrow: "Your cycle",
    /* COPY_DRAFT */
    headline: "Pick a rhythm. We keep it.",
    options: [
      { days: 28, title: "Every 28 days", body: "A new box every four weeks." },
      { days: 84, title: "Every 84 days", body: "Fewer shipments, better price." },
    ],
    cta: "See pricing",
  },

  closing: {
    headline: "Your regimen, simplified.",
    subhead:
      "Start your consult and see what a clinician recommends for you.",
  },
} as const;
