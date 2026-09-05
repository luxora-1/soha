import { CTAButton } from "@/components/ui/CTAButton";
import type { CycleOption } from "@/config/pricing";
import { formatPrice } from "@/config/pricing";
import { siteConfig } from "@/config/site";

type PricingCardProps = {
  /** The selected cycle, from src/config/pricing.ts. Price comes from here — never from JSX. */
  option: CycleOption;
  includes: readonly string[];
  currency: string;
  /** Shown instead of a per-cycle line while the price is unfinalized. */
  pendingNote?: string;
};

/**
 * Cycle-aware pricing card. Everything it shows is a prop sourced from the
 * pricing config; it never hard-codes a number.
 */
export function PricingCard({ option, includes, currency, pendingNote }: PricingCardProps) {
  const price = formatPrice(option.price, currency);
  const pending = option.price === null;

  return (
    <article
      aria-labelledby={`plan-${option.days}-title`}
      className="rounded-2xl border border-accent-soft bg-base p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id={`plan-${option.days}-title`} className="font-sans text-h3 font-medium">
            Every {option.days} days
          </h2>
        </div>
        {option.badge && (
          <span className="rounded-full border border-brand/40 px-3 py-1 font-sans text-eyebrow uppercase tracking-eyebrow text-brand">
            {option.badge}
          </span>
        )}
      </div>

      <div className="mt-8 flex items-baseline gap-3">
        <span
          className="font-serif text-[3rem] leading-none tracking-heading text-ink tabular-nums lg:text-[3.75rem]"
          aria-label={pending ? "Price to be announced" : price}
        >
          {price}
        </span>
        <span className="text-body text-ink-muted">{option.per}</span>
      </div>
      {pending && pendingNote && (
        <p className="mt-3 text-base text-ink-muted">{pendingNote}</p>
      )}

      <ul className="mt-8 divide-y divide-accent-soft border-y border-accent-soft">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-3 py-3 text-body text-ink">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CTAButton href={siteConfig.cta.href} className="w-full sm:w-auto">
          {siteConfig.cta.label}
        </CTAButton>
        <p className="mt-4 text-caption text-ink-muted">{siteConfig.cta.helper}</p>
      </div>
    </article>
  );
}
