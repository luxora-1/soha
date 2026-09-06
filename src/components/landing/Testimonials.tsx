import { Carousel } from "@/components/landing/Carousel";
import { CheckIcon, StarIcon } from "@/components/landing/icons";
import { RatingLine } from "@/components/landing/RatingLine";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Testimonial carousel: portrait (a video, when one is dropped in), stars,
 * quote, name and verified tag, under the rating line.
 *
 * TESTIMONIAL_PLACEHOLDER: every quote, name and tag is a layout placeholder
 * rendered inside <Unverified>. Replace with approved testimonials.
 */
export function Testimonials() {
  const { testimonials } = landingContent;

  return (
    <SectionWrapper tone="alt" id="testimonials" labelledBy="testimonials-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <SectionHeading id="testimonials-heading" tone="surface" headline={`${testimonials.headline.lead} ${testimonials.headline.accent}`} subhead={testimonials.intro} />
        <RatingLine className="shrink-0 md:pb-1" />
      </div>

      <div data-reveal="">
        <Carousel
          className="mt-10 md:mt-14"
          label={testimonials.carouselLabel}
          bleed
          itemClassName="w-[82%] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
          controlsClassName="md:hidden"
          items={testimonials.items.map((item) => (
            <article key={item.slot} className="flex h-full flex-col rounded-tile bg-base p-4 md:p-5">
              <VideoSlot id={item.slot} label={`${testimonials.videoLabel}: ${item.name}`} sizes="(min-width: 768px) 30vw, 80vw" className="[&>div]:rounded-card" />
              <Unverified note="testimonial star rating" className="mt-5 self-start">
                <span className="flex gap-0.5 text-accent" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
              </Unverified>
              <blockquote className="mt-3 flex-1 text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
                <Unverified note="testimonial quote">“{item.quote}”</Unverified>
              </blockquote>
              <p className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-base">
                <span className="font-medium text-ink">
                  <Unverified note="testimonial name and age">{item.name}</Unverified>
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink-muted">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  <Unverified note="verified-patient status">{item.tag}</Unverified>
                </span>
              </p>
            </article>
          ))}
        />
      </div>
      <SectionCTA location="testimonials" align="left" />
    </SectionWrapper>
  );
}
