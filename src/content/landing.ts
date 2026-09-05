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
      "Estrada combines bioidentical estradiol and progesterone in one prescription cream. Take the two-minute quiz to see if it's right for you.",
  },

  /** The quiz is the primary call to action everywhere. */
  quizCta: {
    label: "Take the 2-min quiz",
    short: "Take the quiz",
    fit: "See if Estrada is right for you",
    helper: "Two minutes. No payment.",
  },

  /** Rotating perks above the header. Each is a claim. */
  announcement: {
    label: "Perks",
    messages: [
      { text: "Special perk: 20% off supplements via Fullscript", verify: "Fullscript partnership and discount" },
      { text: "Free shipping on every order", verify: "shipping policy" },
      { text: "90-day money-back guarantee", verify: "guarantee terms" },
    ] satisfies Claim[],
  },

  header: { cta: "Take the quiz" },

  hero: {
    slides: ["hero-product", "hero-lifestyle", "hero-03", "hero-04"] satisfies LandingSlotId[],
    slidesLabel: "Estrada photos",
    pill: { name: "Estrada", form: "Combination cream" },
    /** Small line above the headline, echoing the packaging tagline. */
    kicker: "Ten seconds a day to feel like yourself again",
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
    bullets: [
      "No patch.",
      "No separate progesterone pill.",
      "No stacked prescriptions.",
      { text: "One pump, once a day.", verify: "dosing frequency" },
    ] satisfies Segment[],
    /* PRICING_PLACEHOLDER: layout figure only, rendered inside <Unverified>. Real pricing lives in src/config/pricing.ts. */
    price: { lead: "From", amount: { text: "$99", verify: "price" }, per: "a month" },
    secondary: "Or join the waitlist",
    cancel: { text: "Cancel anytime", verify: "cancellation terms" },
    delivery: {
      text: "Estimated delivery: 3 to 5 business days after approval",
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
    /** Three short answers under the checklist. */
    accordion: [
      {
        key: "ingredients",
        title: "Ingredients",
        body: { text: "Bioidentical estradiol and progesterone in a pharmaceutical-grade cream base. No fragrance, no dyes.", verify: "composition: full ingredient list" },
      },
      {
        key: "why-it-works",
        title: "Why it works",
        body: { text: "Absorbed through the skin, the hormones reach your bloodstream without passing through the liver first, so a lower dose works steadily all day.", verify: "mechanism: transdermal absorption" },
      },
      {
        key: "why-different",
        title: "Why it's different",
        body: { text: "Most regimens split estrogen and progesterone across a patch and a pill. Estrada combines them in one pump you use once a day.", verify: "combination and dosing frequency" },
      },
    ],
    footnote: { text: "*Prescription-only. Prescribed by board-certified OB/GYNs. A 30-day supply, replenished monthly.", verify: "prescriber credentials and supply cadence" },
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
    headline: { lead: "Eight weeks on Estrada.", accent: "Here's what changed." },
    lead: { text: "In an 8-week outcomes review, women using Estrada reported:", verify: "outcomes review exists and its length" },
    stats: [
      { value: "91%", label: "slept through the night more often" },
      { value: "87%", label: "had fewer hot flashes" },
      { value: "84%", label: "felt steadier from day to day" },
      { value: "82%", label: "had more energy" },
      { value: "79%", label: "noticed less vaginal dryness" },
    ],
    reflect: { text: "These changes reflect restored hormone levels, not temporary symptom masking.", verify: "mechanism claim behind the outcomes" },
    source: {
      text: "Source: Soha internal outcomes review of women using Estrada for 8 weeks. Self-reported. n = [pending].",
      verify: "outcomes source, method, and sample size",
    },
    note: "Individual results vary. Estrada is a prescription treatment, and your clinician decides whether it is right for you.",
  },

  /** Elsie-style product card: the treatment at a glance, with the quiz as the way in. */
  treatment: {
    label: "The treatment",
    headline: { lead: "One bottle.", accent: "Everything you were prescribed." },
    slot: "hero-product" satisfies LandingSlotId,
    name: "Estrada",
    form: "Combination cream",
    /* PRICING_PLACEHOLDER: layout figure only, rendered inside <Unverified>. */
    price: { text: "$99", verify: "price" },
    per: "/mo",
    starting: "Starting",
    body: { text: "A personalized hormone cream made for your body. Your OB/GYN sets the exact estradiol and progesterone dose from your symptoms and history.", verify: "personalized dosing claim" },
    stock: { text: "Ships in 3 to 5 business days after approval", verify: "delivery estimate" },
    learnMore: "Learn more",
    learnMoreHref: "#compare",
  },

  benefits: {
    headline: "Everything included. Nothing hidden.",
    items: [
      { icon: "rx", label: "Prescription treatment" },
      { icon: "truck", label: "Free and fast shipping", verify: "shipping policy and speed" },
      { icon: "chat", label: "Unlimited clinical follow-up", verify: "unlimited clinician access" },
      { icon: "card", label: "HSA/FSA eligible", verify: "HSA/FSA eligibility" },
      { icon: "shield", label: "No insurance needed" },
      { icon: "dial", label: "Dose adjustments if needed", verify: "dose adjustments included in the price" },
      { icon: "refund", label: "90-day money-back guarantee", verify: "guarantee terms" },
      { icon: "leaf", label: "20% off Fullscript supplements", verify: "Fullscript partnership and discount" },
    ] satisfies Array<{ icon: "rx" | "truck" | "chat" | "card" | "shield" | "dial" | "refund" | "leaf"; label: string; verify?: string }>,
  },

  supports: {
    slot: "supports-lifestyle" satisfies LandingSlotId,
    headline: { lead: "For the symptoms that", accent: "took the shine off." },
    lead: "Estrada supports:",
    items: [
      { text: "Clearer thinking and steadier moods", verify: "benefit: cognition and mood" },
      { text: "Deeper, more restorative sleep", verify: "benefit: sleep" },
      { text: "Libido and sexual comfort", verify: "benefit: libido and comfort" },
      { text: "Steadier energy and metabolism", verify: "benefit: energy and metabolism" },
      { text: "Bone, brain, and heart protection", verify: "benefit: long-term protection" },
    ] satisfies Claim[],
  },

  problem: {
    headline: "Menopause care shouldn't feel like a to-do list.",
    subhead: { lead: "Most hormone therapy arrives in pieces.", accent: "Estrada arrives as one." },
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

  /* CLAIM_PENDING_LEGAL_REVIEW: this whole section compares Estrada to other delivery methods clinically. All claims are rendered inside <Unverified>. */
  compare: {
    headline: "What's in the cream. And why the cream.",
    toggle: { estrada: "Estrada", other: "The other methods", label: "Compare Estrada with other methods" },
    hotspots: {
      slot: "product-hotspots" satisfies LandingSlotId,
      label: "Ingredients",
      items: [
        { key: "progesterone", name: "Progesterone", x: 66, y: 26, body: { text: "Balances estradiol and protects the uterine lining. Many women find it helps them sleep.", verify: "ingredient: what progesterone does" } },
        { key: "estradiol", name: "Estradiol", x: 28, y: 46, body: { text: "The main estrogen your body made before menopause. It supports sleep, mood, bone density, and vaginal tissue.", verify: "ingredient: what estradiol does" } },
        { key: "base", name: "The base", x: 68, y: 70, body: { text: "A pharmaceutical-grade cream base made for steady absorption through the skin. No fragrance, no dyes.", verify: "ingredient: the base" } },
      ],
    },
    ingredients: {
      subhead: { text: "Two bioidentical hormones and a base made for the skin. Nothing else.", verify: "composition: full ingredient list" },
      cards: [
        { slot: "ingredient-estradiol" satisfies LandingSlotId, name: "Estradiol", body: "The main estrogen your body made before menopause. It supports sleep, mood, bone density, and vaginal tissue." },
        { slot: "ingredient-progesterone" satisfies LandingSlotId, name: "Progesterone", body: "Balances estradiol and protects the uterine lining. Many women find it helps them sleep." },
        { slot: "ingredient-base" satisfies LandingSlotId, name: "The base", body: "A pharmaceutical-grade cream base made for steady absorption through the skin. No fragrance, no dyes." },
      ],
    },
    table: {
      headline: "Why the delivery method matters.",
      subhead: { text: "How a hormone enters your body changes how much of it you need and how steadily it works.", verify: "delivery-method rationale" },
      columns: { criterion: "Compared on", estrada: "Estrada cream", other: "Pills and patches" },
      rows: [
        { label: "Liver metabolism", estrada: "Absorbed through the skin, so it bypasses first-pass liver metabolism", other: "Oral estrogen is processed by the liver before it reaches the bloodstream" },
        { label: "Dose required", estrada: "A lower dose reaches the same level in your blood", other: "Higher oral doses to make up for what the liver removes" },
        { label: "Hormone levels", estrada: "Steady from day to day with one daily application", other: "Peaks and dips between pills; patches can loosen or vary" },
        { label: "Side effects", estrada: "Lower systemic burden and a lower clotting risk than oral estrogen", other: "Oral estrogen carries a higher risk of blood clots" },
        { label: "Targeted support", estrada: "Estradiol and progesterone together, dosed for you", other: "Separate products, separate schedules, standard doses" },
      ],
      footnote: "Your clinician will talk through which method is right for you.",
    },
    works: {
      headline: "Estrada works with your body, not against it.",
      body: { text: "No digestive breakdown. No first-pass liver metabolism. Just steady hormone support where it matters.", verify: "mechanism claim" },
    },
  },

  timeline: {
    label: "The timeline",
    headline: { lead: "What most women", accent: "notice." },
    tabsLabel: "Weeks",
    steps: [
      { key: "week-2", week: "Week 2", short: "Week 2", slot: "timeline-week-2" satisfies LandingSlotId, title: "Sleep, first", body: "Night sweats ease for many women. Sleep is often the first thing to change.", stat: { text: "Most women report sleeping through the night more often within the first two weeks.", verify: "week 2 outcome" } },
      { key: "week-4", week: "Week 4", short: "Week 4", slot: "timeline-week-4" satisfies LandingSlotId, title: "Fewer hot flashes", body: "Hot flashes come less often and pass more quickly. Mood begins to level out.", stat: { text: "Hot flashes typically drop in frequency and intensity by week four.", verify: "week 4 outcome" } },
      { key: "week-6", week: "Week 6", short: "Week 6", slot: "timeline-week-6" satisfies LandingSlotId, title: "Steadier days", body: "Energy and focus return. Your clinician checks in and adjusts your dose if it's needed.", stat: { text: "By week six most women describe steadier energy and clearer thinking.", verify: "week 6 outcome" } },
      { key: "week-8", week: "Week 8", short: "Week 8", slot: "timeline-week-8" satisfies LandingSlotId, title: "More like yourself", body: "Most women report feeling more like themselves. Your first refill is already on its way.", stat: { text: "At eight weeks, most women report feeling more like themselves across sleep, mood, and energy.", verify: "week 8 outcome" } },
    ],
    note: "Every body is different. Your clinician stays with you through all of it.",
  },

  /* TESTIMONIAL_PLACEHOLDER: quotes, names and verified tags are layout placeholders rendered inside <Unverified>. */
  testimonials: {
    headline: { lead: "From women", accent: "on Estrada." },
    intro: "Every story is different. Here are a few, in their own words.",
    carouselLabel: "Testimonials",
    videoLabel: "Play video testimonial",
    items: [
      { slot: "testimonial-1" satisfies LandingSlotId, quote: "Three weeks in, I slept through the night for the first time in two years.", name: "Karen, 52", tag: "Verified patient" },
      { slot: "testimonial-2" satisfies LandingSlotId, quote: "One pump in the morning. I don't think about it the rest of the day, and that's the point.", name: "Denise, 49", tag: "Verified patient" },
      { slot: "testimonial-3" satisfies LandingSlotId, quote: "My clinician actually adjusted my dose when I asked. I felt heard.", name: "Maria, 56", tag: "Verified patient" },
    ],
  },

  medical: {
    label: { text: "Meet Dr. [Name]", verify: "medical director's name" },
    headline: "Backed by science. Overseen by an OB/GYN.",
    lead: {
      text: "Every Estrada prescription is written by a board-certified OB/GYN after reviewing your history and symptoms.",
      verify: "prescriber credentials and review process",
    },
    body: "Your clinician sets your dose, checks in as you settle in, and adjusts it with you. Follow-up questions are part of your plan, not an extra.",
    bio: { text: "Dr. [Name] is a board-certified OB/GYN who has spent [N] years in women's health and is licensed to practise in [N] states.", verify: "medical director's biography" },
    portrait: "founder-portrait" satisfies LandingSlotId,
    videoLabel: { text: "Hear from Dr. [Name]", verify: "medical director's name" },
    name: { text: "Dr. [Name], MD", verify: "medical director's name and credentials" },
    role: { text: "Medical Director, Soha", verify: "medical director's title" },
    points: [
      { label: "Board-certified OB/GYN prescribers", verify: "prescriber board certification" },
      { label: "Licensed in every state we serve", verify: "clinician licensure by state" },
      { label: "Messaging with your clinician included", verify: "clinician messaging included in the plan" },
      { label: "Dose adjustments included", verify: "dose adjustments included in the price" },
    ],
    featured: {
      label: "Featured in",
      verify: "press coverage",
      logos: ["press-01", "press-02", "press-03", "press-04", "press-05"] satisfies LandingSlotId[],
    },
    qa: {
      headline: "Your questions, answered on camera.",
      carouselLabel: "Doctor Q&A",
      items: [
        { slot: "qa-01" satisfies LandingSlotId, title: "How Estrada is different from traditional hormone therapy", body: { text: "Traditional hormone therapy often targets a few symptoms, like hot flashes or sleep. Estrada takes a broader approach, supporting mood, energy, skin, and long-term health with steady, physiologic dosing.", verify: "comparison to traditional HRT" } },
        { slot: "qa-02" satisfies LandingSlotId, title: "Why a cream instead of a pill", body: { text: "A cream is absorbed through the skin, so the hormones bypass the liver and a lower dose reaches the same level in your blood, with a lower clotting risk than oral estrogen.", verify: "cream vs pill comparison" } },
        { slot: "qa-03" satisfies LandingSlotId, title: "What happens at your check-ins", body: { text: "Your clinician asks how you're sleeping, feeling, and functioning, and adjusts your dose from there. Labs are ordered only when they'll change a decision.", verify: "check-in and lab policy" } },
        { slot: "qa-04" satisfies LandingSlotId, title: "Who Estrada is not for", body: { text: "Women with a history of certain cancers, blood clots, or unexplained bleeding may not be candidates. Your clinician screens for this before prescribing.", verify: "contraindications and screening" } },
      ],
    },
  },

  howItWorks: {
    headline: { lead: "How it", accent: "works." },
    carouselLabel: "Steps",
    steps: [
      { slot: "how-01" satisfies LandingSlotId, step: "Step 1", title: "Take the 2-minute quiz", body: "Tell us about your symptoms so we can see whether Estrada suits you." },
      { slot: "how-02" satisfies LandingSlotId, step: "Step 2", title: "An OB/GYN reviews your answers", body: { text: "A board-certified OB/GYN reviews your history and, if Estrada is right for you, writes your prescription.", verify: "prescriber credentials" } },
      { slot: "how-03" satisfies LandingSlotId, step: "Step 3", title: "Estrada ships to your door", body: { text: "In 3 to 5 business days, in one unbranded box.", verify: "delivery estimate and packaging" } },
      { slot: "how-04" satisfies LandingSlotId, step: "Step 4", title: "Check in. Adjust. Repeat.", body: { text: "Message your clinician anytime. Doses change as you do, at no extra cost.", verify: "messaging and dose adjustments included" } },
    ] satisfies Array<{ slot: LandingSlotId; step: string; title: string; body: Segment }>,
    strip: [
      { text: "Free shipping.", verify: "shipping policy" },
      { text: "Cancel anytime.", verify: "cancellation terms" },
      { text: "HSA/FSA eligible.", verify: "HSA/FSA eligibility" },
    ] satisfies Claim[],
  },

  care: {
    headline: "Every prescription is reviewed and monitored by a licensed clinician.",
    subhead: "Hormones change. Your care adapts.",
    carouselLabel: "Care features",
    slides: [
      { slot: "care-01" satisfies LandingSlotId, title: "Unlimited secured messaging", body: { text: "Ask anything, anytime, through your account. A clinician replies, not a bot.", verify: "messaging terms and response" } },
      { slot: "care-02" satisfies LandingSlotId, title: "Dose adjustments, included", body: { text: "If something isn't right, your dose changes. No new visit fee, no new prescription to chase.", verify: "dose adjustments included in the price" } },
      { slot: "care-03" satisfies LandingSlotId, title: "A clinician who knows your history", body: { text: "The same clinician follows your care, so you never start from zero.", verify: "continuity of care" } },
    ],
  },

  quality: {
    label: "Quality and sourcing",
    headline: "Made carefully. Checked twice.",
    image: "packaging-detail" satisfies LandingSlotId,
    items: [
      { key: "actives", title: "Pharmaceutical-grade actives", body: "Estradiol and progesterone are sourced from FDA-registered manufacturers and tested for identity and purity before compounding.", verify: "sourcing of actives" },
      { key: "pharmacy", title: "Licensed compounding pharmacy", body: "Estrada is compounded by [PHARMACY_NAME_PLACEHOLDER], a licensed U.S. pharmacy accredited by PCAB.", verify: "pharmacy licence and accreditation" },
      { key: "testing", title: "Third-party potency testing", body: "Every batch is tested by an independent lab to confirm the dose on the label is the dose in the bottle.", verify: "third-party potency testing" },
      { key: "shipping", title: "Cold-chain shipping", body: "Insulated packaging keeps the cream stable from the pharmacy to your door, in any season.", verify: "cold-chain shipping" },
    ],
  },

  guarantee: {
    pill: { name: "Estrada", form: "Combination cream" },
    headline: { text: "We're so confident you'll feel the difference that we back Estrada with a 90-day full refund guarantee.", verify: "guarantee terms" },
    helper: [
      "No insurance needed.",
      { text: "Cancel anytime.", verify: "cancellation terms" },
    ] satisfies Segment[],
  },

  pricing: {
    headline: "One price. Everything included.",
    /* PRICING_PLACEHOLDER: layout figure only, rendered inside <Unverified>. */
    amount: { text: "$99", verify: "price" },
    per: "a month",
    starting: "Starting",
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
    secondary: "Or join the waitlist",
  },

  faq: {
    label: "Getting started",
    headline: "Questions, answered plainly.",
    items: [
      { key: "start", question: "How do I get started?", answer: ["Take the two-minute quiz. When Estrada opens in your state, we email you a link to a short online visit. An OB/GYN reviews your answers and, if Estrada is right for you, writes your prescription."] },
      { key: "labs", question: "Do I need lab work first?", answer: [{ text: "Usually not. Your clinician decides based on your history and symptoms, and asks for labs only when they're needed.", verify: "lab-work policy" }] },
      { key: "prescription", question: "Do I need a prescription for Estrada?", answer: ["Yes. Estrada is a prescription treatment. The OB/GYN who reviews your visit writes it if Estrada is right for you, so there's nothing to bring."] },
      { key: "insurance", question: "Is it covered by insurance?", answer: ["No. Soha is cash-pay by design. That means no prior authorizations, no coverage denials, and no surprise bills. You know the price before you start."] },
      { key: "who-prescribes", question: "Who prescribes Estrada?", answer: ["A licensed OB/GYN from MD Integrations reviews your intake and determines whether treatment is appropriate for you. If it isn't, we tell you, and you won't be charged for a regimen you can't use."] },
      { key: "who-fills", question: "Who makes and ships it?", answer: ["Your prescription is filled and dispensed by a licensed pharmacy partner, whose name and address appear on your medication label. Soha coordinates your care and your shipments; the pharmacy dispenses your medication.", "[PHARMACY_NAME_PLACEHOLDER — insert dispensing pharmacy name and address once partner is finalized]"] },
      { key: "vs-patch", question: "How is a cream different from a patch or a pill?", answer: [{ text: "A cream is absorbed through the skin, so the hormones bypass the liver and a lower dose reaches the same level in your blood. Estrada also puts estradiol and progesterone in one product instead of two.", verify: "cream vs patch/pill comparison" }] },
      { key: "different", question: "How is Soha's approach different?", answer: [{ text: "One clinician, one cream, one price. Your OB/GYN sets and adjusts your dose based on how you feel, not just lab numbers, and follow-ups are included.", verify: "approach claims: continuity, symptom-led dosing" }] },
      { key: "not-right", question: "What if it isn't right for me?", answer: ["Tell your clinician. Doses can change, and you can pause or cancel from your account anytime.", { text: "If you don't feel a difference in 90 days, we refund you in full.", verify: "guarantee terms" }] },
      { key: "arrival", question: "When will it arrive?", answer: [{ text: "Estrada ships in 3 to 5 business days once your prescription is approved, in one unbranded outer box.", verify: "delivery estimate and packaging" }] },
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
    headline: "Ready to feel like yourself again?",
    subhead: "Take the two-minute quiz, or leave your email and we'll tell you the moment Estrada opens in your state.",
    or: "Or join the waitlist",
    helper: "No payment now. Leave the list anytime.",
  },

  sticky: { label: "Take the 2-min quiz" },

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
