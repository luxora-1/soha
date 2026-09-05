import type { LandingSlotId } from "@/config/landing-images";

/**
 * Copy for the ad landing page (/combination-cream). Kept out of JSX so
 * brand and legal can review it in one file.
 *
 * Voice: direct, warm, unfussy. Short sentences. No exclamation marks.
 *
 * Every factual claim — statistic, review figure, price, delivery estimate,
 * guarantee term, certification, and any statement about what Estrada does
 * clinically — is rendered inside <Unverified> by the section components.
 * The `verify` fields below name what each one needs. Figures are
 * plausible-shaped placeholders so the layout can be judged; none is real.
 * UNVERIFIED.md is the checklist.
 *
 * Regulatory: Soha is not the dispensing pharmacy. Where the pharmacy is
 * named, [PHARMACY_NAME_PLACEHOLDER] stands in, as elsewhere on the site.
 */

/** A paragraph that is either plain copy or a claim to verify. */
export type Claim = { text: string; verify: string };
export type Segment = string | Claim;

export const LANDING_PAGE_ID = "combination-cream";

export const landingContent = {
  product: { name: "Estrada", byline: "by Soha", form: "Combination cream" },

  /* COPY_DRAFT: page metadata. */
  meta: {
    title: "Estrada by Soha — one cream, not three prescriptions",
    description:
      "Estrada combines bioidentical estradiol and progesterone in one prescription cream. Join the waitlist to be first in line.",
  },

  header: { cta: "Join the waitlist" },

  hero: {
    rating: {
      value: { text: "4.8", verify: "star rating (average review score)" },
      outOf: "out of 5",
      count: { text: "1,200+", verify: "review count" },
      countLabel: "reviews",
    },
    /** One h1: lead, then the accent set in italic. */
    headline: { lead: "One cream.", accent: "Not three prescriptions." },
    subhead: {
      before: "Estrada combines ",
      claim: { text: "bioidentical estradiol and progesterone", verify: "composition: actives in the cream" },
      after: " in a single cream, prescribed for you by an OB/GYN and shipped to your door.",
    },
    /* PRICING_PLACEHOLDER: layout figure only, rendered inside <Unverified>. Real pricing lives in src/config/pricing.ts. */
    price: { lead: "From", amount: { text: "$99", verify: "price" }, per: "a month" },
    cta: "Join the waitlist",
    ctaHelper: "No payment now. We email you when Estrada opens.",
    delivery: {
      text: "Ships in 3 to 5 business days once your prescription is approved.",
      verify: "delivery estimate",
    },
    /** Checklist under the CTA, in the client's order. Claims are <Unverified>. */
    trust: [
      { label: "Cancel anytime", verify: "cancellation terms" },
      { label: "Free shipping", verify: "shipping policy" },
      { label: "20% off Fullscript supplements", verify: "Fullscript partnership and discount" },
      { label: "HSA/FSA eligible", verify: "HSA/FSA eligibility" },
      { label: "Prescription treatment" },
      { label: "Unlimited access to healthcare experts", verify: "unlimited clinician access" },
    ] satisfies Array<{ label: string; verify?: string }>,
  },

  credentials: {
    heading: "Pharmacy certifications",
    /** Client-supplied line, set in small caps above the marks. */
    label: "Clinically crafted. Quality assured.",
    /** Five marks that glide across the strip. Names are placeholders inside <Unverified>. */
    items: [
      { slot: "certification-01" satisfies LandingSlotId, name: "PCAB accredited", verify: "PCAB accreditation of the dispensing pharmacy" },
      { slot: "certification-02" satisfies LandingSlotId, name: "NABP accredited", verify: "NABP accreditation" },
      { slot: "certification-03" satisfies LandingSlotId, name: "LegitScript certified", verify: "LegitScript certification" },
      { slot: "certification-04" satisfies LandingSlotId, name: "State-licensed pharmacy", verify: "state pharmacy licences" },
      { slot: "certification-05" satisfies LandingSlotId, name: "503A compounding pharmacy", verify: "503A registration" },
    ],
    caption: {
      text: "Certification marks belong to [PHARMACY_NAME_PLACEHOLDER], the licensed pharmacy that compounds and fills Estrada prescriptions.",
      verify: "pharmacy certifications shown in the strip",
    },
    trail: "Soha is not a pharmacy.",
  },

  outcomes: {
    label: "Outcomes",
    headline: "What women told us after eight weeks.",
    stats: [
      { value: "91%", label: "slept through the night more often" },
      { value: "87%", label: "had fewer hot flashes" },
      { value: "84%", label: "felt steadier from day to day" },
      { value: "82%", label: "had more energy" },
      { value: "79%", label: "noticed less vaginal dryness" },
    ],
    source: {
      text: "Source: Soha internal outcomes review of women using Estrada for 8 weeks. Self-reported. n = [pending].",
      verify: "outcomes source, method, and sample size",
    },
    note: "Individual results vary. Estrada is a prescription treatment, and your clinician decides whether it is right for you.",
  },

  problem: {
    headline: { lead: "Most hormone therapy arrives in pieces.", accent: "Estrada arrives as one." },
    patchwork: {
      slot: "comparison-patchwork" satisfies LandingSlotId,
      title: "The usual way",
      body: "An estradiol patch. A progesterone pill. Sometimes a separate cream. Each on its own schedule, each with its own refill, often from a different prescriber.",
    },
    single: {
      slot: "comparison-single" satisfies LandingSlotId,
      title: "The Estrada way",
      claim: { text: "The same two hormones, compounded into one cream.", verify: "composition: equivalence to separate prescriptions" },
      body: "One pump. One refill. One thing to remember.",
    },
  },

  /* CLAIM_PENDING_LEGAL_REVIEW: every cell compares delivery methods clinically. All are rendered inside <Unverified>. */
  comparison: {
    headline: "Why the delivery method matters.",
    subhead: {
      text: "How a hormone enters your body changes how much of it you need and how steadily it works.",
      verify: "delivery-method rationale",
    },
    columns: { criterion: "Compared on", estrada: "Estrada cream", other: "Pills and patches" },
    rows: [
      {
        label: "Liver metabolism",
        estrada: "Absorbed through the skin, so it bypasses first-pass liver metabolism",
        other: "Oral estrogen is processed by the liver before it reaches the bloodstream",
      },
      {
        label: "Dose required",
        estrada: "A lower dose reaches the same level in your blood",
        other: "Higher oral doses to make up for what the liver removes",
      },
      {
        label: "Hormone levels",
        estrada: "Steady from day to day with one daily application",
        other: "Peaks and dips between pills; patches can loosen or vary",
      },
      {
        label: "Side effects",
        estrada: "Lower systemic burden and a lower clotting risk than oral estrogen",
        other: "Oral estrogen carries a higher risk of blood clots",
      },
      {
        label: "Targeted support",
        estrada: "Estradiol and progesterone together, dosed for you",
        other: "Separate products, separate schedules, standard doses",
      },
    ],
    footnote: "Your clinician will talk through which method is right for you.",
  },

  ingredients: {
    headline: "What's in the cream.",
    subhead: { text: "Two bioidentical hormones and a base made for the skin. Nothing else.", verify: "composition: full ingredient list" },
    cards: [
      {
        slot: "ingredient-estradiol" satisfies LandingSlotId,
        name: "Estradiol",
        body: "The main estrogen your body made before menopause. It supports sleep, mood, bone density, and vaginal tissue.",
      },
      {
        slot: "ingredient-progesterone" satisfies LandingSlotId,
        name: "Progesterone",
        body: "Balances estradiol and protects the uterine lining. Many women find it helps them sleep.",
      },
      {
        slot: "ingredient-base" satisfies LandingSlotId,
        name: "The base",
        body: "A pharmaceutical-grade cream base made for steady absorption through the skin. No fragrance, no dyes.",
      },
    ],
  },

  timeline: {
    label: "The timeline",
    headline: "What most women notice, week by week.",
    steps: [
      { week: "Week 2", title: "Sleep, first", body: "Night sweats ease for many women. Sleep is often the first thing to change." },
      { week: "Week 4", title: "Fewer hot flashes", body: "Hot flashes come less often and pass more quickly. Mood begins to level out." },
      { week: "Week 6", title: "Steadier days", body: "Energy and focus return. Your clinician checks in and adjusts your dose if it's needed." },
      { week: "Week 8", title: "More like yourself", body: "Most women report feeling more like themselves. Your first refill is already on its way." },
    ],
    note: "Every body is different. Your clinician stays with you through all of it.",
  },

  medical: {
    headline: "Prescribed by an OB/GYN. Overseen throughout.",
    lead: {
      text: "Every Estrada prescription is written by a board-certified OB/GYN after reviewing your history and symptoms.",
      verify: "prescriber credentials and review process",
    },
    body: "Your clinician sets your dose, checks in as you settle in, and adjusts it with you. Follow-up questions are part of your plan, not an extra.",
    portrait: "founder-portrait" satisfies LandingSlotId,
    name: { text: "Dr. [Name], MD", verify: "medical director's name and credentials" },
    role: { text: "Medical Director, Soha", verify: "medical director's title" },
    points: [
      { label: "Board-certified OB/GYN prescribers", verify: "prescriber board certification" },
      { label: "Licensed in every state we serve", verify: "clinician licensure by state" },
      { label: "Messaging with your clinician included", verify: "clinician messaging included in the plan" },
      { label: "Dose adjustments included", verify: "dose adjustments included in the price" },
    ],
  },

  quality: {
    label: "Quality and sourcing",
    headline: "Made carefully. Checked twice.",
    image: "packaging-detail" satisfies LandingSlotId,
    items: [
      {
        key: "actives",
        title: "Pharmaceutical-grade actives",
        body: "Estradiol and progesterone are sourced from FDA-registered manufacturers and tested for identity and purity before compounding.",
        verify: "sourcing of actives",
      },
      {
        key: "pharmacy",
        title: "Licensed compounding pharmacy",
        body: "Estrada is compounded by [PHARMACY_NAME_PLACEHOLDER], a licensed U.S. pharmacy accredited by PCAB.",
        verify: "pharmacy licence and accreditation",
      },
      {
        key: "testing",
        title: "Third-party potency testing",
        body: "Every batch is tested by an independent lab to confirm the dose on the label is the dose in the bottle.",
        verify: "third-party potency testing",
      },
      {
        key: "shipping",
        title: "Cold-chain shipping",
        body: "Insulated packaging keeps the cream stable from the pharmacy to your door, in any season.",
        verify: "cold-chain shipping",
      },
    ],
  },

  /* TESTIMONIAL_PLACEHOLDER: quotes, names and verified tags are layout placeholders rendered inside <Unverified>. */
  testimonials: {
    headline: "From women on Estrada.",
    items: [
      {
        slot: "testimonial-1" satisfies LandingSlotId,
        quote: "Three weeks in, I slept through the night for the first time in two years.",
        name: "Karen, 52",
        tag: "Verified patient",
      },
      {
        slot: "testimonial-2" satisfies LandingSlotId,
        quote: "One pump in the morning. I don't think about it the rest of the day, and that's the point.",
        name: "Denise, 49",
        tag: "Verified patient",
      },
      {
        slot: "testimonial-3" satisfies LandingSlotId,
        quote: "My clinician actually adjusted my dose when I asked. I felt heard.",
        name: "Maria, 56",
        tag: "Verified patient",
      },
    ],
  },

  pricing: {
    headline: "One price. Everything included.",
    /* PRICING_PLACEHOLDER: layout figure only, rendered inside <Unverified>. */
    amount: { text: "$99", verify: "price" },
    per: "a month",
    subline: "No insurance needed. No surprise pharmacy bill.",
    includes: [
      { label: "Your OB/GYN consult and prescription" },
      { label: "Estrada, compounded for you and shipped to your door" },
      { label: "Messaging with your clinician between visits", verify: "clinician messaging included in the plan" },
      { label: "Dose adjustments", verify: "dose adjustments included in the price" },
      { label: "Free shipping", verify: "shipping policy" },
      { label: "Pause or cancel anytime", verify: "cancellation terms" },
    ] satisfies Array<{ label: string; verify?: string }>,
    guarantee: {
      title: { text: "90-day guarantee", verify: "guarantee period" },
      body: { text: "If you don't feel a difference in 90 days, we refund you in full.", verify: "guarantee terms" },
    },
    cta: "Join the waitlist",
    ctaHelper: "No payment now. We email you when Estrada opens.",
  },

  faq: {
    headline: "Questions, answered plainly.",
    items: [
      {
        key: "start",
        question: "How do I get started?",
        answer: [
          "Join the waitlist. When Estrada opens in your state, we email you a link to a short online visit. An OB/GYN reviews your answers and, if Estrada is right for you, writes your prescription.",
        ],
      },
      {
        key: "labs",
        question: "Do I need lab work first?",
        answer: [
          {
            text: "Usually not. Your clinician decides based on your history and symptoms, and asks for labs only when they're needed.",
            verify: "lab-work policy",
          },
        ],
      },
      {
        key: "insurance",
        question: "Is it covered by insurance?",
        /** Client-supplied answer, shared with the site FAQ. */
        answer: [
          "No. Soha is cash-pay by design. That means no prior authorizations, no coverage denials, and no surprise bills. You know the price before you start.",
        ],
      },
      {
        key: "who-prescribes",
        question: "Who prescribes Estrada?",
        /** Client-supplied answer, shared with the site FAQ. */
        answer: [
          "A licensed OB/GYN from MD Integrations reviews your intake and determines whether treatment is appropriate for you. If it isn't, we tell you, and you won't be charged for a regimen you can't use.",
        ],
      },
      {
        key: "who-fills",
        question: "Who makes and ships it?",
        answer: [
          "Your prescription is filled and dispensed by a licensed pharmacy partner, whose name and address appear on your medication label. Soha coordinates your care and your shipments; the pharmacy dispenses your medication.",
          "[PHARMACY_NAME_PLACEHOLDER — insert dispensing pharmacy name and address once partner is finalized]",
        ],
      },
      {
        key: "vs-patch",
        question: "How is a cream different from a patch or a pill?",
        answer: [
          {
            text: "A cream is absorbed through the skin, so the hormones bypass the liver and a lower dose reaches the same level in your blood. Estrada also puts estradiol and progesterone in one product instead of two.",
            verify: "cream vs patch/pill comparison",
          },
        ],
      },
      {
        key: "not-right",
        question: "What if it isn't right for me?",
        answer: [
          "Tell your clinician. Doses can change, and you can pause or cancel from your account anytime.",
          { text: "If you don't feel a difference in 90 days, we refund you in full.", verify: "guarantee terms" },
        ],
      },
      {
        key: "arrival",
        question: "When will it arrive?",
        answer: [
          {
            text: "Estrada ships in 3 to 5 business days once your prescription is approved, in one unbranded outer box.",
            verify: "delivery estimate and packaging",
          },
        ],
      },
    ] satisfies Array<{ key: string; question: string; answer: Segment[] }>,
  },

  /* COPY_DRAFT: community strip. Cards lead to /community, not out to Instagram. */
  community: {
    headline: "Follow along.",
    subhead: "New posts from Soha on Instagram, and the conversations around them.",
    label: "Recent Instagram posts",
    cta: "See the community page",
    href: "/community",
  },

  closing: {
    headline: "Ready when you are.",
    subhead: "Join the waitlist and we tell you the moment Estrada opens in your state.",
    cta: "Join the waitlist",
    helper: "No payment now. Leave the list anytime.",
  },

  waitlist: {
    label: "Email address",
    placeholder: "you@example.com",
    submitting: "Joining…",
    success: {
      headline: "You're on the list.",
      body: "We email you when Estrada opens. Nothing else, and you can leave the list anytime.",
    },
    privacy: { lead: "We use your email only to tell you about Estrada. See our", link: "privacy policy", trail: "." },
  },

  footer: {
    /* COPY_DRAFT: landing footer line. */
    note: "Estrada is a prescription treatment. An OB/GYN decides whether it is right for you after reviewing your health history.",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
} as const;
