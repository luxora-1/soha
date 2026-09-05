import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { faqContent } from "@/content/faq";
import { faqPageContent } from "@/content/pages";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqPageContent.description,
};

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow={faqContent.eyebrow} headline={faqContent.headline} />

      <SectionWrapper tone="base" padding="none" className="pb-section lg:pb-section-lg">
        <div className="max-w-3xl">
          <FAQAccordion items={faqContent.items} headingLevel={2} />
        </div>
      </SectionWrapper>

      <SectionWrapper tone="alt" labelledBy="faq-more-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="faq-more-heading">{faqPageContent.moreHeadline}</h2>
            <p className="mt-4 max-w-measure text-body text-ink-muted">
              {faqPageContent.moreLead}{" "}
              <span className="text-ink [overflow-wrap:anywhere]">{siteConfig.supportEmail}</span>{" "}
              {faqPageContent.moreTrail}
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
