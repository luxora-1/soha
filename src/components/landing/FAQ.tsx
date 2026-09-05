import { Accordion } from "@/components/landing/Accordion";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/** Getting-started questions as plain rows inside one soft card. Answers that contain claims are <Unverified> paragraph by paragraph. */
export function FAQ() {
  const { faq } = landingContent;

  return (
    <SectionWrapper tone="alt" id="faq" labelledBy="faq-heading">
      <SectionHeading id="faq-heading" tone="surface" label={faq.label} headline={faq.headline} align="center" />
      <FadeUp delay={0.1} className="mx-auto mt-10 max-w-3xl rounded-tile bg-base px-6 py-2 shadow-soft md:mt-14 md:px-10 md:py-4">
        <Accordion
          variant="rows"
          tone="base"
          headingLevel={3}
          label="Frequently asked questions"
          items={faq.items.map((item) => ({
            key: item.key,
            heading: item.question,
            body: (
              <div className="space-y-4">
                {item.answer.map((segment, index) => (
                  <p key={index}>
                    {typeof segment === "string" ? (
                      segment
                    ) : (
                      <Unverified note={`FAQ — ${segment.verify}`}>{segment.text}</Unverified>
                    )}
                  </p>
                ))}
              </div>
            ),
          }))}
        />
      </FadeUp>
    </SectionWrapper>
  );
}
