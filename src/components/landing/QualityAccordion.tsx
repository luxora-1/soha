import { Accordion } from "@/components/landing/Accordion";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Quality and sourcing: heading and packaging detail beside an accordion of four claims, each <Unverified>. */
export function QualityAccordion() {
  const { quality } = landingContent;

  return (
    <SectionWrapper tone="base" id="quality" labelledBy="quality-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <SectionHeading
          id="quality-heading"
          label={quality.label}
          headline={quality.headline}
          className="lg:col-span-5 lg:col-start-1 lg:row-start-1"
        />
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <Accordion
            tone="base"
            headingLevel={3}
            label={quality.label}
            items={quality.items.map((item) => ({
              key: item.key,
              heading: item.title,
              body: <Unverified note={item.verify}>{item.body}</Unverified>,
            }))}
          />
        </div>
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <ImageSlot {...slot(quality.image)} sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-soft" />
        </div>
      </div>
    </SectionWrapper>
  );
}
