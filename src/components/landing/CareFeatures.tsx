import { Carousel } from "@/components/landing/Carousel";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Clinical oversight: a statement, then three care features, photograph over text, no boxes. */
export function CareFeatures() {
  const { care } = landingContent;

  return (
    <SectionWrapper tone="base" id="care" labelledBy="care-heading">
      <div data-reveal="" className="max-w-3xl">
        <h2 id="care-heading" className="text-h2">
          {care.headline}
        </h2>
        <p className="mt-5 max-w-measure text-body-lg text-ink-muted">{care.subhead}</p>
      </div>
      <div data-reveal="">
        <Carousel
          className="mt-10 md:mt-14"
          label={care.carouselLabel}
          bleed
          itemClassName="w-[85%] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
          controlsClassName="md:hidden"
          items={care.slides.map((item) => (
            <div key={item.slot} className="flex h-full flex-col">
              <ImageSlot {...slot(item.slot)} sizes="(min-width: 768px) 30vw, 85vw" className="rounded-tile" />
              <h3 className="mt-5 text-h3 text-ink">{item.title}</h3>
              <p className="mt-2 max-w-[24rem] text-base text-ink-muted">
                <Unverified note={`care: ${item.body.verify}`}>{item.body.text}</Unverified>
              </p>
            </div>
          ))}
        />
      </div>
      <SectionCTA location="care" align="left" />
    </SectionWrapper>
  );
}
