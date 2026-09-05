import { CheckIcon } from "@/components/landing/icons";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * One price, what's included, the guarantee, and the quiz button. The price
 * is a layout placeholder inside <Unverified>; real pricing lives in
 * src/config/pricing.ts (PRICING_PLACEHOLDER).
 */
export function Pricing() {
  const { pricing } = landingContent;

  return (
    <SectionWrapper tone="base" id="pricing" labelledBy="pricing-heading">
      <div className="mx-auto max-w-2xl rounded-tile bg-surface p-6 shadow-soft sm:p-10 lg:p-12">
        <h2 id="pricing-heading" className="text-center">
          {pricing.headline}
        </h2>

        <p className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
          <Unverified note={pricing.amount.verify}>
            <span className="font-serif text-stat text-ink tabular-nums">{pricing.amount.text}</span>
          </Unverified>
          <span className="text-body-lg text-ink-muted">{pricing.per}</span>
          <span className="w-full text-center font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">{pricing.starting}</span>
        </p>
        <p className="mt-3 text-center text-body text-ink-muted">{pricing.subline}</p>

        <ul className="mt-8 space-y-3" aria-label="What's included">
          {pricing.includes.map((item) => (
            <li key={item.label} className="flex items-start gap-3 text-body text-ink">
              <CheckIcon className="mt-0.5 text-accent" />
              {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-card bg-base p-5">
          <p className="font-medium text-ink">
            <Unverified note={pricing.guarantee.title.verify}>{pricing.guarantee.title.text}</Unverified>
          </p>
          <p className="mt-1 text-base text-ink-muted">
            <Unverified note={pricing.guarantee.body.verify}>{pricing.guarantee.body.text}</Unverified>
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <QuizCTA location="pricing" className="w-full sm:w-auto" />
          <a href="#waitlist" className="inline-flex min-h-tap items-center text-base text-ink underline underline-offset-4">
            {pricing.secondary}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
