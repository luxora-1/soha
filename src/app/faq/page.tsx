import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { faqContent } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Who prescribes, who fills your prescription, insurance, cancelling, shipping, and messaging your clinician.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow={faqContent.eyebrow} headline={faqContent.headline} />

      <SectionWrapper tone="base" padding="none" className="pb-section lg:pb-section-lg">
        <div className="max-w-3xl">
          <FAQAccordion items={faqContent.items} />
        </div>
      </SectionWrapper>

      <SectionWrapper tone="alt" labelledBy="faq-more-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="faq-more-heading">Still have a question?</h2>
            <p className="mt-4 max-w-measure text-body text-ink-muted">
              Email us at <span className="text-ink [overflow-wrap:anywhere]">{siteConfig.supportEmail}</span> and a person will reply.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <CTAButton href={siteConfig.cta.href}>{siteConfig.cta.label}</CTAButton>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
