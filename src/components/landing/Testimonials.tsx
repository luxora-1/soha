import { Carousel } from "@/components/landing/Carousel";
import { CheckIcon, QuoteIcon, StarIcon } from "@/components/landing/icons";
import { RatingLine } from "@/components/landing/RatingLine";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Testimonial carousel: portrait (a video, when one is dropped in), stars,
 * quote, name in small capitals, verified tag, under the rating line.
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
      <FadeUp delay={0.1}>
        <RatingLine className="mt-6 justify-center" />
      </FadeUp>

      <FadeUp delay={0.15}>
        <Carousel
          className="mt-10 md:mt-14"
          label={testimonials.carouselLabel}
          bleed
          itemClassName="w-[82%] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
          controlsClassName="md:hidden"
          items={testimonials.items.map((item) => (
            <article
              key={item.slot}
              className="group flex h-full flex-col rounded-tile bg-base p-4 shadow-soft transition-[transform,box-shadow] duration-500 ease-out hover:shadow-lift motion-safe:hover:-translate-y-1 motion-reduce:transition-none md:p-5"
            >
              <VideoSlot id={item.slot} label={`${testimonials.videoLabel}: ${item.name}`} sizes="(min-width: 768px) 30vw, 80vw" hoverZoom />
              <div className="mt-5 flex items-center justify-between">
                <Unverified note="testimonial star rating">
                  <span className="flex gap-0.5 text-accent" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                </Unverified>
                <QuoteIcon className="h-7 w-7 text-accent-soft" />
              </div>
              <blockquote className="mt-3 flex-1 font-serif text-[1.375rem] leading-snug tracking-heading text-ink">
                <Unverified note="testimonial quote">“{item.quote}”</Unverified>
              </blockquote>
              <p className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="font-sans text-[0.8125rem] font-semibold uppercase tracking-eyebrow text-ink">
                  <Unverified note="testimonial name and age">{item.name}</Unverified>
                </span>
                <span className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] font-medium uppercase tracking-eyebrow text-ink-muted">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  <Unverified note="verified-patient status">{item.tag}</Unverified>
                </span>
              </p>
            </article>
          ))}
        />
      </FadeUp>
      <SectionCTA location="testimonials" />
    </SectionWrapper>
  );
}
