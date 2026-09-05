import { ImageSlot } from "@/components/landing/ImageSlot";
import { CheckIcon } from "@/components/landing/icons";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Three testimonial cards: portrait, quote, name, verified tag. A swipeable
 * rail on phones, a grid from md.
 *
 * TESTIMONIAL_PLACEHOLDER: every quote, name and tag is a layout placeholder
 * rendered inside <Unverified>. Replace with approved testimonials.
 */
export function Testimonials() {
  const { testimonials } = landingContent;

  return (
    <SectionWrapper tone="alt" id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" tone="surface" align="center" headline={testimonials.headline} />

      <ul
        aria-label="Testimonials"
        className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0"
      >
        {testimonials.items.map((item) => (
          <li
            key={item.slot}
            className="flex w-[80%] shrink-0 snap-start flex-col rounded-tile bg-base p-4 shadow-soft md:w-auto md:p-5"
          >
            <ImageSlot {...slot(item.slot)} sizes="(min-width: 768px) 30vw, 80vw" className="rounded-card" />
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
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
