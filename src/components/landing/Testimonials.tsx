import { Carousel } from "@/components/landing/Carousel";
import { CheckIcon } from "@/components/landing/icons";
import { RatingLine } from "@/components/landing/RatingLine";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Testimonial carousel: portrait (a video, when one is dropped in), quote,
 * name, verified tag, under the rating line.
 *
 * TESTIMONIAL_PLACEHOLDER: every quote, name and tag is a layout placeholder
 * rendered inside <Unverified>. Replace with approved testimonials.
 */
export function Testimonials() {
  const { testimonials } = landingContent;

  return (
    <SectionWrapper tone="alt" id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        tone="surface"
        align="center"
        headline={
          <>
            {testimonials.headline.lead} <em className="italic">{testimonials.headline.accent}</em>
          </>
        }
        subhead={testimonials.intro}
      />
      <RatingLine className="mt-6 justify-center" />

      <Carousel
        className="mt-10 md:mt-14"
        label={testimonials.carouselLabel}
        bleed
        itemClassName="w-[82%] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
        controlsClassName="md:hidden"
        items={testimonials.items.map((item) => (
          <article key={item.slot} className="flex h-full flex-col rounded-tile bg-base p-4 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none md:p-5">
            <VideoSlot id={item.slot} label={`${testimonials.videoLabel}: ${item.name}`} sizes="(min-width: 768px) 30vw, 80vw" />
            <blockquote className="mt-6 flex-1 font-serif text-[1.375rem] leading-snug tracking-heading text-ink">
              <Unverified note="testimonial quote">“{item.quote}”</Unverified>
            </blockquote>
            <p className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-base">
              <span className="font-medium text-ink">
                <Unverified note="testimonial name and age">{item.name}</Unverified>
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-muted">
                <CheckIcon className="h-5 w-5 text-accent" />
                <Unverified note="verified-patient status">{item.tag}</Unverified>
              </span>
            </p>
          </article>
        ))}
      />
      <SectionCTA location="testimonials" />
    </SectionWrapper>
  );
}
