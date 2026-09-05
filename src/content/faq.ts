/**
 * FAQ copy — supplied by the client verbatim (2026-09-05). Two normalizations
 * applied: "Ob/gyn" → "OB/GYN", "md integrations" → "MD Integrations".
 *
 * Regulatory: the "who fills" answer must keep [PHARMACY_NAME_PLACEHOLDER]
 * and must never imply Soha is the dispensing pharmacy. The dispensing
 * pharmacy's name and address appear on the medication label; Soha branding
 * is secondary packaging only.
 */

export type FaqItem = {
  /** Stable key, also used as the accordion item id / URL hash. */
  key: string;
  question: string;
  /** One or more paragraphs. */
  answer: string[];
};

export const faqContent = {
  eyebrow: "FAQ",
  /* COPY_DRAFT: FAQ page headline — review before launch. */
  headline: "Questions, answered plainly.",
  items: [
    {
      key: "who-prescribes",
      question: "Who prescribes my treatment?",
      answer: [
        "A licensed OB/GYN from MD Integrations reviews your intake and determines whether treatment is appropriate for you. If it isn't, we'll tell you — and you won't be charged for a regimen you can't use.",
      ],
    },
    {
      key: "who-fills",
      question: "Who fills my prescription?",
      answer: [
        "Your prescription is filled and dispensed by a licensed pharmacy partner, whose name and address appear on your medication label. Soha coordinates your care and your shipments; the pharmacy dispenses your medication.",
        "[PHARMACY_NAME_PLACEHOLDER — insert dispensing pharmacy name and address once partner is finalized]",
      ],
    },
    {
      key: "insurance",
      question: "Is this covered by insurance?",
      answer: [
        "No. Soha is cash-pay by design. That means no prior authorizations, no coverage denials, and no surprise bills — you know the price before you start.",
      ],
    },
    {
      key: "cancellation",
      question: "What if I want to stop?",
      answer: ["Pause or cancel from your account, anytime, without a phone call."],
    },
    {
      key: "shipping",
      question: "How does shipping work?",
      answer: [
        "Everything arrives in one unbranded outer box on your cycle — every 28 or 84 days, depending on your plan.",
      ],
    },
    {
      key: "clinician-messaging",
      question: "Can I message my clinician?",
      answer: ["Yes. Follow-up questions are part of your plan, not an upsell."],
    },
  ] satisfies FaqItem[],
} as const;
