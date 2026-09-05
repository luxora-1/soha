import { Carousel } from "@/components/landing/Carousel";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Clinical oversight: a statement, then three care features in a carousel. */
export function CareFeatures() {
  const { care } = landingContent;

  return (
    <SectionWrapper tone="base" id="care" labelledBy="care-heading">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="care-heading" className="text-h2">
          {care.headline}
        </h2>
        <p className="mt-5 font-serif text-[1.5rem] italic leading-snug tracking-heading text-primary md:text-[1.75rem]">{care.subhead}</p>
      </div>
      <Carousel
        className="mt-10 md:mt-14"
        label={care.carouselLabel}
        bleed
        itemClassName="w-[85%] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
        controlsClassName="md:hidden"
        items={care.slides.map((item) => (
          <div key={item.slot} className="flex h-full flex-col rounded-tile bg-surface p-4 md:p-5">
            <ImageSlot {...slot(item.slot)} sizes="(min-width: 768px) 30vw, 85vw" className="rounded-card" />
            <h3 className="mt-5 font-serif text-[1.5rem] leading-tight tracking-heading text-ink">{item.title}</h3>
            <p className="mt-2 text-base text-ink-muted">
              <Unverified note={`care: ${item.body.verify}`}>{item.body.text}</Unverified>
            </p>
          </div>
        ))}
      />
      <SectionCTA location="care" />
    </SectionWrapper>
  );
}
