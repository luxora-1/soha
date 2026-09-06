import { Accordion } from "@/components/landing/Accordion";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Quality and sourcing: heading and packaging detail beside four plain rows, each claim <Unverified>. */
export function QualityAccordion() {
  const { quality } = landingContent;

  return (
    <SectionWrapper tone="alt" id="quality" labelledBy="quality-heading" className="pb-[calc(theme(spacing.section)+2rem)] lg:pb-[calc(theme(spacing.section-lg)+2rem)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <SectionHeading id="quality-heading" tone="surface" label={quality.label} headline={quality.headline} className="lg:col-span-5 lg:col-start-1 lg:row-start-1" />
        <div data-reveal="" className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <Accordion
            variant="rows"
            tone="surface"
            headingLevel={3}
            label={quality.label}
            items={quality.items.map((item) => ({
              key: item.key,
              heading: item.title,
              body: <Unverified note={item.verify}>{item.body}</Unverified>,
            }))}
          />
        </div>
        <div data-reveal="" className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <ImageSlot {...slot(quality.image)} sizes="(min-width: 1024px) 40vw, 100vw" className="rounded-[2rem]" />
        </div>
      </div>
    </SectionWrapper>
  );
}
