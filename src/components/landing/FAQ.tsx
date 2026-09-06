import { Accordion } from "@/components/landing/Accordion";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/** Getting-started questions as plain rows inside one soft container. Answers that contain claims are <Unverified> paragraph by paragraph. */
export function FAQ() {
  const { faq } = landingContent;

  return (
    <SectionWrapper tone="alt" id="faq" labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeading id="faq-heading" tone="surface" label={faq.label} headline={faq.headline} className="lg:col-span-4" />
        <div data-reveal="" className="rounded-[2rem] bg-base px-6 py-2 md:px-10 md:py-4 lg:col-span-8">
          <Accordion
            variant="rows"
            tone="base"
            headingLevel={3}
            label="Frequently asked questions"
            items={faq.items.map((item) => ({
              key: item.key,
              heading: item.question,
              body: (
                <div className="flex flex-col gap-4">
                  {item.answer.map((segment, index) => (
                    <p key={index}>{typeof segment === "string" ? segment : <Unverified note={`FAQ — ${segment.verify}`}>{segment.text}</Unverified>}</p>
                  ))}
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
