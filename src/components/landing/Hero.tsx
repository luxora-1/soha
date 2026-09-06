import { Accordion } from "@/components/landing/Accordion";
import { Carousel } from "@/components/landing/Carousel";
import { CheckIcon, StarIcon, TruckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { RatingLine } from "@/components/landing/RatingLine";
import { Unverified } from "@/components/landing/Unverified";
import { Container } from "@/components/ui/Container";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Milliseconds into the page-load choreography at which step `i` begins. */
const beat = (i: number) => 80 + i * 90;

/**
 * Hero. On phones the photo carousel leads, then the product pill and
 * rating, kicker, headline, subhead, the "no patch, no pill" bullets, price,
 * the quiz button, delivery line, the six-line checklist, then three short
 * answers, so the checklist sits directly above the certification strip that
 * follows. From lg the copy runs down the left while the carousel and the
 * short answers stack on the right, so both columns finish together.
 *
 * The page's one load choreography lives here: the headline's lines rise out
 * of a mask, each block below follows a beat later, and the review card
 * settles onto the photograph last (data attributes read by the motion
 * script, see lib/motion/orchestrate.ts).
 */
export function Hero() {
  const { hero } = landingContent;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-base">
      <Container className="pb-12 pt-4 md:pt-8 lg:pb-20 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          {/* Photographs */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div data-parallax="44">
              <div data-reveal-hero="" data-delay={beat(1)} className="relative">
                <Carousel
                  label={hero.slidesLabel}
                  autoplayMs={5000}
                  itemClassName="w-full"
                  items={hero.slides.map((id, i) => (
                    <div key={id} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-soft">
                      <ImageSlot
                        {...slot(id)}
                        fill
                        priority={i === 0}
                        fit={id === "hero-product" ? "contain" : "cover"}
                        sizes="(min-width: 1024px) 44vw, 100vw"
                        className={id === "hero-product" ? undefined : "motion-safe:animate-kenburns"}
                      />
                    </div>
                  ))}
                />
                {/* One card over the slide frame (4:5, full width): a short verified review. */}
                <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5]">
                  <figure data-reveal-hero="" data-delay={beat(11)} className="absolute bottom-5 left-4 w-[min(17rem,78%)] rounded-card bg-base/92 p-4 shadow-lift backdrop-blur-md md:-left-6 md:bottom-10">
                    <span className="flex gap-0.5 text-accent" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5" />
                      ))}
                    </span>
                    <blockquote className="mt-2 font-serif text-[1.0625rem] leading-snug tracking-heading text-ink">
                      <Unverified note="testimonial quote">“{hero.badges.review.quote}”</Unverified>
                    </blockquote>
                    <figcaption className="mt-3 flex items-center justify-between gap-3 text-[0.875rem] text-ink-muted">
                      <Unverified note="testimonial name and age">{hero.badges.review.name}</Unverified>
                      <span className="inline-flex items-center gap-1">
                        <CheckIcon className="h-4 w-4 text-accent" />
                        <Unverified note="verified-patient status">{hero.badges.review.tag}</Unverified>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div data-reveal-hero="" data-delay={beat(0)} className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <ProductPill name={hero.pill.name} form={hero.pill.form} />
              <RatingLine />
            </div>

            <p data-reveal-hero="" data-delay={beat(1)} className="mt-6 font-serif text-[1.25rem] italic leading-snug tracking-heading text-accent md:text-[1.375rem]">
              {hero.kicker}
            </p>
            <h1 id="hero-heading" data-split="" data-delay={beat(2)} className="mt-3 text-display">
              {hero.headline.lead} <em className="italic">{hero.headline.accent}</em>
            </h1>

            <p data-reveal-hero="" data-delay={beat(5)} className="mt-6 max-w-measure text-body-lg text-ink-muted">
              {hero.subhead.before}
              <Unverified note={hero.subhead.claim.verify}>{hero.subhead.claim.text}</Unverified>
              {hero.subhead.after}
            </p>

            <ul data-reveal-hero="" data-delay={beat(6)} className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-base font-medium text-ink">
              {hero.bullets.map((bullet) => {
                const text = typeof bullet === "string" ? bullet : bullet.text;
                return (
                  <li key={text} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {typeof bullet === "string" ? bullet : <Unverified note={bullet.verify}>{bullet.text}</Unverified>}
                  </li>
                );
              })}
            </ul>

            <div data-reveal-hero="" data-delay={beat(7)}>
              <p className="mt-7 flex items-baseline gap-2 text-body text-ink-muted">
                <span>{hero.price.lead}</span>
                <Unverified note={hero.price.amount.verify}>
                  <span className="font-serif text-[2.5rem] leading-none tracking-heading text-ink tabular-nums">{hero.price.amount.text}</span>
                </Unverified>
                <span>{hero.price.per}</span>
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <QuizCTA location="hero" pulse className="w-full sm:w-auto" />
                <a href="#waitlist" className="inline-flex min-h-tap items-center justify-center text-base text-ink underline decoration-accent-soft underline-offset-4 transition-colors hover:decoration-accent">
                  {hero.secondary}
                </a>
              </div>
              <p className="mt-3 text-base text-ink-muted">
                <Unverified note={hero.cancel.verify}>{hero.cancel.text}</Unverified>
              </p>
              <p className="mt-3 flex items-center gap-2 text-base text-ink-muted">
                <TruckIcon className="h-5 w-5 text-accent" />
                <Unverified note={hero.delivery.verify}>{hero.delivery.text}</Unverified>
              </p>
            </div>

            <div data-reveal-hero="" data-delay={beat(8)} className="mt-8">
              <ul aria-label="Service details" className="grid gap-x-6 gap-y-3 rounded-[1.5rem] bg-surface/70 p-5 sm:grid-cols-2 md:p-6">
                {hero.trust.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-base font-medium text-ink">
                    <CheckIcon className="text-accent" />
                    {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Short answers, under the photographs from lg */}
          <div data-reveal="" className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start">
            <Accordion
              variant="rows"
              tone="base"
              headingLevel={2}
              label="About Estrada"
              items={hero.accordion.map((item) => ({
                key: item.key,
                heading: item.title,
                body: <Unverified note={item.body.verify}>{item.body.text}</Unverified>,
              }))}
            />
            <p className="mt-5 text-caption text-ink-muted">
              <Unverified note={hero.footnote.verify}>{hero.footnote.text}</Unverified>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
