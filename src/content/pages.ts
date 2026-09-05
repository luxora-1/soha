/**
 * Copy for the secondary pages. Client-supplied lines are used verbatim;
 * anything marked COPY_DRAFT was written by the developer and needs brand +
 * legal sign-off. Dosing, mg amounts, and comparative claims are never
 * written here — they are marked CLAIM_PENDING_LEGAL_REVIEW in the JSX.
 */

export const howItWorksContent = {
  eyebrow: "How it works",
  headline: "Three steps, and then it just arrives.",
  /* COPY_DRAFT: how-it-works intro. */
  intro:
    "No waiting room, no pharmacy line, no juggling refills. Here's what actually happens between starting your consult and your first box.",
  steps: [
    {
      number: "01",
      title: "Tell us what's going on",
      summary: "A quick online visit. No waiting rooms, no guessing what to ask for.",
      /* COPY_DRAFT: expanded step 01. */
      body: [
        "Answer a short set of questions about your symptoms, your history, and what you've already tried. It takes about 10 minutes and you can do it from your phone.",
        "There's nothing to book and no one to call. When you're done, your answers go straight to a clinician.",
      ],
      imageBrief: "Woman mid-40s at a kitchen table with a laptop, morning light",
    },
    {
      number: "02",
      title: "A clinician reviews your case",
      summary:
        "A licensed clinician evaluates your history and determines the right treatment for you — not a generic quiz result.",
      /* COPY_DRAFT: expanded step 02 (second sentence adapted from the client's FAQ answer). */
      body: [
        "A licensed clinician reads your intake and decides whether treatment is appropriate for you, and what it should look like. It's an individual evaluation, not an automated result.",
        "If treatment isn't right for you, we'll tell you — and you won't be charged for a regimen you can't use.",
      ],
      imageBrief: "Clinician at a warm desk reviewing notes, no white coat",
    },
    {
      number: "03",
      title: "It ships, on your cycle",
      summary:
        "Your regimen arrives in one box, on a 28- or 84-day cycle. Refills happen automatically, so you're never scrambling.",
      /* COPY_DRAFT: expanded step 03 (shipping detail adapted from the client's FAQ answer). */
      body: [
        "Your regimen arrives in one unbranded outer box, on the cycle you choose. Refills happen automatically, so there's nothing to remember.",
        "Follow-up questions are part of your plan. Message your clinician between visits, and pause or cancel from your account anytime.",
      ],
      imageBrief: "Plain cream box on an entryway console, soft light",
    },
  ],
  cycle: {
    eyebrow: "Your cycle",
    /* COPY_DRAFT: cycle-choice section. */
    headline: "28 days or 84 days. Your call.",
    intro:
      "Both cycles deliver the same regimen. The difference is how often a box arrives, and what you pay per cycle.",
    options: [
      {
        days: 28,
        title: "Every 28 days",
        /* COPY_DRAFT */
        body: "A new box every four weeks. A good place to start if you'd like to check in with your clinician more often before committing to a longer cycle.",
      },
      {
        days: 84,
        title: "Every 84 days",
        /* COPY_DRAFT (framing line from the brief). */
        body: "One box every twelve weeks. Fewer shipments, better price — and nothing to think about for three months at a time.",
      },
    ],
    note: "You can switch cycles from your account.",
  },
} as const;

export const productContent = {
  eyebrow: "The flagship",
  headline: "Three prescriptions, combined into one.",
  subhead:
    "A single topical regimen that replaces what's usually dispensed as separate pills, creams, and patches.",
  /** Product identity, from the client's packaging. */
  product: {
    name: "Estrada",
    byline: "by Soha",
    tagline: "feel like yourself again",
    /** Label lines reproduced from the packaging, in order. */
    labelClaims: ["Bioidentical hormones", "USA compounded", "OB/GYN prescribed"],
    imageBrief: "Estrada pump bottle, frosted with gold band, on warm stone in morning light",
  },
  inTheBox: {
    eyebrow: "What's in the box",
    /* COPY_DRAFT: three bullets; the first describes the product in general terms only. */
    items: [
      {
        title: "Your regimen",
        body: "One pump bottle of Estrada — your combined topical regimen, prescribed for you by a licensed clinician.",
      },
      {
        title: "How to use it",
        body: "Plain-language instructions for applying your regimen, written for you by your clinician.",
      },
      {
        title: "A direct line",
        body: "Follow-up questions are part of your plan. Message your clinician between visits — it's not an upsell.",
      },
    ],
  },
  dosing: {
    eyebrow: "How it's dosed",
    /* COPY_DRAFT: no dosing specifics; each specific is a CLAIM_PENDING_LEGAL_REVIEW point in the JSX. */
    intro:
      "Your clinician sets your dose based on your history and symptoms, and adjusts it over time. Estrada is applied topically, as directed.",
    steps: [
      { title: "Prescribed for you", body: "Your dose is set by your clinician after reviewing your intake, not picked from a menu." },
      { title: "Applied topically", body: "A measured pump, applied to the skin as directed by your clinician." },
      { title: "Adjusted over time", body: "Tell your clinician how you're feeling. Doses can change as you do." },
    ],
  },
} as const;

export const pricingContent = {
  eyebrow: "Pricing",
  headline: "Straightforward pricing. No insurance maze.",
  subhead:
    "Cash-pay, so there's no coverage denial, no surprise pharmacy bill, no prior authorization.",
  toggleLabel: "Choose your cycle",
  /* COPY_DRAFT: label above the price while unfinalized. */
  pendingNote: "Final pricing will be published before launch.",
} as const;

export const startContent = {
  eyebrow: "Start your consult",
  /* COPY_DRAFT: intake page headline + intro. */
  headline: "Let's start with the basics.",
  intro:
    "Four quick details to get you set up. Your full consult comes next and takes about 10 minutes.",
  submit: "Continue",
  /** Confirmation copy — client-supplied. Nothing about timelines or next steps until the real intake flow exists. */
  confirmation: {
    headline: "Thanks — we'll be in touch shortly.",
  },
  /* LEGAL_PLACEHOLDER: consent / privacy line under the form; wording pending legal review. */
  privacyNote:
    "Your details are used only to set up your consult. See our privacy policy for how we handle your information.",
} as const;
