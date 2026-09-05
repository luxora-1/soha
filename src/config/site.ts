/**
 * Site-wide configuration: navigation, primary CTA, trust signals, footer.
 * Keep copy that appears in more than one place here so it is edited once.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Soha",
  /** Used for absolute URLs in metadata. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /* COPY_DRAFT: meta description — review before launch. */
  description:
    "Clinician-prescribed menopause care, combined into a single regimen and shipped to your door on a 28- or 84-day cycle.",

  nav: [
    { label: "How it works", href: "/how-it-works" },
    { label: "The regimen", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavLink[],

  cta: {
    label: "Start your consult",
    href: "/start",
    helper: "Takes about 10 minutes",
  },

  trustBar: [
    "Licensed clinicians",
    "Pharmacy-dispensed",
    "Discreet packaging",
    "Cancel anytime",
  ],

  footer: {
    /* COPY_DRAFT: footer tagline — review before launch. */
    tagline: "Menopause care, simplified.",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "How it works", href: "/how-it-works" },
          { label: "The regimen", href: "/product" },
          { label: "Pricing", href: "/pricing" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        heading: "Get started",
        links: [
          { label: "Start your consult", href: "/start" },
          { label: "Questions", href: "/faq" },
        ],
      },
      {
        heading: "Legal",
        /* Pages are stubs until counsel supplies final documents. */
        links: [
          { label: "Privacy policy", href: "/privacy" },
          { label: "Terms of service", href: "/terms" },
        ],
      },
    ] satisfies Array<{ heading: string; links: NavLink[] }>,
    /*
     * Regulatory disclosures. The dispensing pharmacy's name and address must
     * appear on the medication label; Soha branding is secondary packaging
     * only. Soha must never be presented as the dispensing pharmacy.
     */
    disclosures: [
      /* LEGAL_PLACEHOLDER — [PHARMACY_NAME_PLACEHOLDER] must be replaced with the dispensing pharmacy's legal name before launch. */
      "Soha is not a pharmacy. Prescriptions are filled and shipped by [PHARMACY_NAME_PLACEHOLDER], an independent, licensed pharmacy whose name and address appear on your medication label.",
      /* LEGAL_PLACEHOLDER — standard informational disclaimer; wording pending legal review. */
      "The information on this site is for general informational purposes only and is not medical advice. Treatment decisions are made by a licensed clinician after an individual evaluation.",
    ],
  },
} as const;
