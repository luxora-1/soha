import { Accordion } from "@/components/landing/Accordion";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/** Getting-started questions. Answers that contain claims are <Unverified> paragraph by paragraph. */
export function FAQ() {
  const { faq } = landingContent;

  return (
    <SectionWrapper tone="alt" id="faq" labelledBy="faq-heading">
      <SectionHeading id="faq-heading" tone="surface" label={faq.label} headline={faq.headline} align="center" />
      <div className="mx-auto mt-10 max-w-3xl md:mt-14">
        <Accordion
          tone="surface"
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
      </div>
    </SectionWrapper>
  );
}
