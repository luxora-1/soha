import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * The treatment at a glance: the product on a deep disc, price, one line of
 * what it is, and the quiz as the way in (the reference pages' product card,
 * with the quiz in place of a checkout).
 */
export function TreatmentCard() {
  const { treatment } = landingContent;

  return (
    <SectionWrapper tone="base" id="treatment" labelledBy="treatment-heading" padding="compact" className="lg:py-section">
      <SectionHeading id="treatment-heading" label={treatment.label} align="center" headline={`${treatment.headline.lead} ${treatment.headline.accent}`} />
      <article data-reveal="" className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-[2rem] bg-surface shadow-lift md:mt-14 md:grid-cols-2">
        <div className="relative isolate flex items-center justify-center overflow-hidden bg-ink p-8 md:p-12">
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-glow" />
          <div className="w-full max-w-[18rem]">
            <ImageSlot {...slot(treatment.slot)} fit="contain" sizes="(min-width: 768px) 30vw, 70vw" className="rounded-card shadow-lift" />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
          <ProductPill name={treatment.name} form={treatment.form} />
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <Unverified note={treatment.price.verify}>
              <span className="font-serif text-[2.75rem] leading-none tracking-heading text-ink tabular-nums">{treatment.price.text}</span>
            </Unverified>
            <span className="text-body-lg text-ink-muted">{treatment.per}</span>
            <span className="text-base text-ink-muted">{treatment.starting}</span>
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
              className="inline-flex min-h-tap w-full items-center justify-center rounded-full bg-base text-base font-semibold text-ink shadow-subtle transition-[background-color,transform] duration-300 ease-out hover:bg-accent-soft/40 motion-safe:hover:-translate-y-0.5"
            >
              {treatment.learnMore}
            </a>
          </div>
        </div>
      </article>
    </SectionWrapper>
  );
}
