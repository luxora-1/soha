import { ImageSlot } from "@/components/landing/ImageSlot";
import { CheckIcon, StarIcon } from "@/components/landing/icons";
import { Unverified } from "@/components/landing/Unverified";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { Container } from "@/components/ui/Container";
import { slot } from "@/config/landing-images";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";

/**
 * Hero: review badge, headline, subhead, price, primary CTA (the waitlist
 * form, collapsed to a button), delivery estimate, then the trust strip.
 * Product shot with the lifestyle portrait tucked over its corner.
 */
export function Hero() {
  const { hero } = landingContent;

  return (
    <section aria-labelledby="hero-heading" className="bg-base">
      <Container className="pb-14 pt-8 md:pt-12 lg:pb-20 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6 motion-safe:animate-fade-up">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-ink">
              <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span>
                <Unverified note={hero.rating.value.verify}>{hero.rating.value.text}</Unverified> {hero.rating.outOf}
              </span>
              <span className="text-ink-muted">
                <Unverified note={hero.rating.count.verify}>{hero.rating.count.text}</Unverified> {hero.rating.countLabel}
              </span>
            </p>

            <h1 id="hero-heading" className="mt-6 text-display">
              {hero.headline.lead} <em className="italic">{hero.headline.accent}</em>
            </h1>

            <p className="mt-6 max-w-measure text-body-lg text-ink-muted">
              {hero.subhead.before}
              <Unverified note={hero.subhead.claim.verify}>{hero.subhead.claim.text}</Unverified>
              {hero.subhead.after}
            </p>

            <p className="mt-8 flex items-baseline gap-2 text-body text-ink-muted">
              <span>{hero.price.lead}</span>
              <Unverified note={hero.price.amount.verify}>
                <span className="font-serif text-[2.5rem] leading-none tracking-heading text-ink tabular-nums">
                  {hero.price.amount.text}
                </span>
              </Unverified>
              <span>{hero.price.per}</span>
            </p>

            <WaitlistForm
              page={LANDING_PAGE_ID}
              location="hero"
              label={hero.cta}
              helper={hero.ctaHelper}
              collapsed
              tone="base"
              className="mt-6"
            />

            <p className="mt-6 text-base text-ink-muted">
              <Unverified note={hero.delivery.verify}>{hero.delivery.text}</Unverified>
            </p>
          </div>

          <div className="lg:col-span-6 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
            <div className="relative pb-10 pr-4 md:pb-12 md:pr-8">
              <ImageSlot
                {...slot("hero-product")}
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="shadow-soft"
              />
              <div className="absolute bottom-0 right-0 w-[40%] max-w-[15rem]">
                <ImageSlot
                  {...slot("hero-lifestyle")}
                  priority
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="shadow-lift"
                />
              </div>
            </div>
          </div>
        </div>

        <ul
          aria-label="Service details"
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-wrap md:justify-between lg:mt-20"
        >
          {hero.trust.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-base text-ink">
              <CheckIcon className="text-accent" />
              {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
