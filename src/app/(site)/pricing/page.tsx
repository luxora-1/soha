import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { PricingSection } from "@/components/pricing/PricingSection";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { pricingConfig } from "@/config/pricing";
import { pricingContent as content } from "@/content/pages";

export const metadata: Metadata = {
  title: "Pricing",
  description: content.subhead,
};

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow={content.eyebrow} headline={content.headline} subhead={content.subhead} />

      <SectionWrapper tone="alt" labelledBy="plans-heading">
        <h2 id="plans-heading" className="sr-only">
          Plans
        </h2>
        <PricingSection toggleLabel={content.toggleLabel} pendingNote={content.pendingNote} />
        <FadeUp className="mx-auto mt-10 max-w-measure text-center">
          <p className="text-body-lg text-ink">{pricingConfig.footnote}</p>
        </FadeUp>
      </SectionWrapper>

      <SectionWrapper tone="base" padding="compact">
        <p className="text-center text-base text-ink-muted">
          {content.faqPointer}{" "}
          <Link href="/faq" className="inline-flex min-h-tap items-center text-ink underline underline-offset-4 hover:text-brand">
            {content.faqLink}
          </Link>
        </p>
      </SectionWrapper>
    </>
  );
}
