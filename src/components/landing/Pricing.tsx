import { benefitIcons } from "@/components/landing/icons";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * One price, what's included as icon rows, the guarantee, and the quiz
 * button. The price is a layout placeholder inside <Unverified>; real
 * pricing lives in src/config/pricing.ts (PRICING_PLACEHOLDER).
 */
export function Pricing() {
  const { pricing } = landingContent;

  return (
    <SectionWrapper tone="base" id="pricing" labelledBy="pricing-heading">
      <FadeUp variant="scale" className="relative mx-auto max-w-2xl">
        <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-accent-soft/40 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="rounded-tile bg-surface p-6 shadow-lift sm:p-10 lg:p-12">
          <h2 id="pricing-heading" className="text-center">
            {pricing.headline}
          </h2>

          <p className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <Unverified note={pricing.amount.verify}>
              <span className="font-serif italic text-stat text-ink tabular-nums">{pricing.amount.text}</span>
            </Unverified>
            <span className="text-body-lg text-ink-muted">{pricing.per}</span>
            <span className="w-full text-center font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">{pricing.starting}</span>
          </p>
          <p className="mt-3 text-center text-body text-ink-muted">{pricing.subline}</p>

          <ul className="mt-8 grid gap-2.5" aria-label="What's included">
            {pricing.includes.map((item, index) => {
              const Icon = benefitIcons[item.icon];
              return (
                <FadeUp key={item.label} as="li" delay={index * 0.05} className="flex items-center gap-4 rounded-card bg-base px-4 py-3 text-body text-ink">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
                </FadeUp>
              );
            })}
          </ul>

          <div className="mt-8 rounded-card bg-primary/[0.07] p-5">
            <p className="font-medium text-ink">
              <Unverified note={pricing.guarantee.title.verify}>{pricing.guarantee.title.text}</Unverified>
            </p>
            <p className="mt-1 text-base text-ink-muted">
              <Unverified note={pricing.guarantee.body.verify}>{pricing.guarantee.body.text}</Unverified>
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <QuizCTA location="pricing" className="w-full sm:w-auto" />
            <a href="#waitlist" className="inline-flex min-h-tap items-center text-base text-ink underline decoration-accent-soft underline-offset-4 transition-colors hover:decoration-accent">
              {pricing.secondary}
            </a>
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
