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
    /* COPY_DRAFT: hero subhead — convenience framing only, review before launch. */
    subhead:
      "Clinician-prescribed menopause care, combined into a single regimen and shipped to your door. One thing to remember, not three.",
  },

  howItWorks: {
    eyebrow: "How it works",
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

  closing: {
    headline: "Your regimen, simplified.",
    subhead:
      "Start your consult and see what a clinician recommends for you.",
  },
} as const;
