import { Carousel } from "@/components/landing/Carousel";
import { Expandable } from "@/components/landing/Expandable";
import { CheckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { Unverified } from "@/components/landing/Unverified";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Meet the doctor: portrait (video when present), credentials, the press
 * strip, and a carousel of on-camera answers, each titled on a pill over
 * the poster with an expandable summary beneath.
 */
export function MedicalCredibility() {
  const { medical } = landingContent;

  return (
    <SectionWrapper tone="base" id="medical" labelledBy="medical-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-6 lg:col-start-7">
          <p className="inline-flex min-h-[2.25rem] items-center gap-2 rounded-full bg-surface px-4 text-base font-medium leading-none text-ink">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            <Unverified note={medical.label.verify}>{medical.label.text}</Unverified>
          </p>
          <h2 id="medical-heading" className="mt-5">
            {medical.headline}
          </h2>
          <p className="mt-6 max-w-measure text-body text-ink">
            <Unverified note={medical.lead.verify}>{medical.lead.text}</Unverified>
          </p>
          <p className="mt-4 max-w-measure text-body text-ink-muted">{medical.body}</p>
          <p className="mt-4 max-w-measure text-body text-ink-muted">
            <Unverified note={medical.bio.verify}>{medical.bio.text}</Unverified>
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {medical.points.map((point, index) => (
              <FadeUp key={point.label} as="li" delay={0.1 + index * 0.06} className="flex items-start gap-3 rounded-card bg-surface px-4 py-3 text-base text-ink">
                <CheckIcon className="mt-0.5 text-accent" />
                <Unverified note={point.verify}>{point.label}</Unverified>
              </FadeUp>
            ))}
          </ul>
        </FadeUp>

        <FadeUp as="figure" variant="scale" className="group lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <VideoSlot id={medical.portrait} label={medical.videoLabel.text} sizes="(min-width: 1024px) 40vw, 100vw" hoverZoom className="shadow-soft [&>div]:rounded-tile" />
          <figcaption className="mt-4 text-base">
            <span className="block font-medium text-ink">
              <Unverified note={medical.name.verify}>{medical.name.text}</Unverified>
            </span>
            <span className="block text-ink-muted">
              <Unverified note={medical.role.verify}>{medical.role.text}</Unverified>
            </span>
          </figcaption>
        </FadeUp>
      </div>

      <div className="mt-16 md:mt-20">
        <FadeUp>
          <Eyebrow className="text-center">
            <Unverified note={medical.featured.verify}>{medical.featured.label}</Unverified>
          </Eyebrow>
        </FadeUp>
        <ul className="mt-6 flex flex-wrap justify-center gap-3 md:gap-6" aria-label={medical.featured.label}>
          {medical.featured.logos.map((id, index) => (
            <FadeUp
              key={id}
              as="li"
              variant="fade"
              delay={index * 0.07}
              className="w-[calc(50%-0.375rem)] rounded-card bg-surface p-3 transition-colors duration-300 hover:bg-accent-soft/40 sm:w-[calc(33.333%-0.5rem)] md:w-[calc(20%-1.2rem)]"
            >
              <ImageSlot {...slot(id)} sizes="200px" fit="contain" className="rounded-[0.75rem]" />
            </FadeUp>
          ))}
        </ul>
      </div>

      <div className="mt-16 md:mt-20">
        <FadeUp as="p" className="text-center font-serif text-h2 text-ink">
          {medical.qa.headline}
        </FadeUp>
        <FadeUp delay={0.1}>
          <Carousel
            className="mt-10"
            label={medical.qa.carouselLabel}
            bleed
            itemClassName="w-[82%] sm:w-[48%] md:w-[calc((100%-4.5rem)/4)]"
            controlsClassName="md:hidden"
            items={medical.qa.items.map((item) => (
              <div key={item.slot} className="group flex h-full flex-col gap-4">
                <VideoSlot
                  id={item.slot}
                  label={`Play: ${item.title}`}
                  sizes="(min-width: 768px) 25vw, 80vw"
                  hoverZoom
                  overlay={
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-4 bottom-4 rounded-card bg-primary/90 px-4 py-2.5 text-center text-[0.9375rem] font-medium leading-snug text-on-primary shadow-soft backdrop-blur-sm"
                    >
                      {item.title}
                    </span>
                  }
                />
                <Expandable title={item.title}>
                  <Unverified note={`doctor Q&A: ${item.body.verify}`}>{item.body.text}</Unverified>
                </Expandable>
              </div>
            ))}
          />
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
