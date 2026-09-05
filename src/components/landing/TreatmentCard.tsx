import { ArrowRightIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * The treatment at a glance: the product hovering over a deep disc, price,
 * one line of what it is, and the quiz as the way in (the reference pages'
 * product card, with the quiz in place of a checkout).
 */
export function TreatmentCard() {
  const { treatment } = landingContent;

  return (
    <SectionWrapper tone="base" id="treatment" labelledBy="treatment-heading" padding="compact" className="lg:py-section">
      <SectionHeading
        id="treatment-heading"
        label={treatment.label}
        align="center"
        headline={
          <>
            {treatment.headline.lead} <em className="italic">{treatment.headline.accent}</em>
          </>
        }
      />
      <FadeUp variant="scale" className="mx-auto mt-10 max-w-4xl md:mt-14">
        <article className="grid overflow-hidden rounded-tile bg-surface shadow-lift md:grid-cols-2">
          <div className="relative isolate flex items-center justify-center overflow-hidden bg-ink p-8 md:p-12">
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 [animation-duration:5s] motion-safe:animate-pulse-ring" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-glow" />
            <div className="w-full max-w-[18rem] motion-safe:animate-float-slow">
              <ImageSlot {...slot(treatment.slot)} fit="contain" sizes="(min-width: 768px) 30vw, 70vw" className="rounded-card shadow-lift" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
            <ProductPill name={treatment.name} form={treatment.form} />
            <p className="flex items-baseline gap-2">
              <Unverified note={treatment.price.verify}>
                <span className="font-serif text-[2.75rem] italic leading-none tracking-heading text-ink tabular-nums">{treatment.price.text}</span>
              </Unverified>
              <span className="text-body-lg text-ink-muted">{treatment.per}</span>
              <span className="ml-1 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">{treatment.starting}</span>
            </p>
            <p className="text-body text-ink-muted">
              <Unverified note={treatment.body.verify}>{treatment.body.text}</Unverified>
            </p>
            <p className="text-base text-ink">
              <Unverified note={treatment.stock.verify}>{treatment.stock.text}</Unverified>
            </p>
            <div className="mt-2 flex flex-col gap-3">
              <QuizCTA location="treatment" className="w-full" />
              <a
                href={treatment.learnMoreHref}
                className="group inline-flex min-h-tap w-full items-center justify-center gap-2 rounded-full bg-base text-[0.9375rem] font-semibold uppercase tracking-[0.08em] text-ink shadow-subtle transition-[background-color,transform] duration-300 ease-out hover:bg-accent-soft/40 motion-safe:hover:-translate-y-0.5"
              >
                {treatment.learnMore}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </article>
      </FadeUp>
    </SectionWrapper>
  );
}
