import { Accordion } from "@/components/landing/Accordion";
import { Carousel } from "@/components/landing/Carousel";
import { CheckIcon, TruckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { RatingLine } from "@/components/landing/RatingLine";
import { Unverified } from "@/components/landing/Unverified";
import { Container } from "@/components/ui/Container";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Hero. On phones the photo carousel leads, then the product pill and
 * rating, headline, subhead, the "no patch, no pill" bullets, price, the
 * quiz button, delivery line, the six-line checklist, and three short
 * answers — so the checklist sits directly above the certification strip
 * that follows. From lg the copy and the carousel sit side by side.
 */
export function Hero() {
  const { hero } = landingContent;

  return (
    <section aria-labelledby="hero-heading" className="bg-base">
      <Container className="pb-12 pt-4 md:pt-8 lg:pb-20 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:order-2 lg:col-span-6 motion-safe:animate-fade-up">
            <Carousel
              label={hero.slidesLabel}
              autoplayMs={5000}
              itemClassName="w-full"
              items={hero.slides.map((id, i) => (
                <div key={id} className="relative aspect-[4/5] overflow-hidden rounded-tile bg-surface shadow-soft">
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
          </div>

          <div className="lg:col-span-6 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <ProductPill name={hero.pill.name} form={hero.pill.form} />
              <RatingLine />
            </div>

            <p className="mt-6 font-serif text-[1.25rem] italic leading-snug tracking-heading text-accent md:text-[1.375rem]">{hero.kicker}</p>
            <h1 id="hero-heading" className="mt-3 text-display">
              {hero.headline.lead} <em className="italic">{hero.headline.accent}</em>
            </h1>

            <p className="mt-6 max-w-measure text-body-lg text-ink-muted">
              {hero.subhead.before}
              <Unverified note={hero.subhead.claim.verify}>{hero.subhead.claim.text}</Unverified>
              {hero.subhead.after}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-base font-medium text-ink">
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

            <p className="mt-7 flex items-baseline gap-2 text-body text-ink-muted">
              <span>{hero.price.lead}</span>
              <Unverified note={hero.price.amount.verify}>
                <span className="font-serif text-[2.5rem] leading-none tracking-heading text-ink tabular-nums">{hero.price.amount.text}</span>
              </Unverified>
              <span>{hero.price.per}</span>
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <QuizCTA location="hero" className="w-full sm:w-auto" />
              <a href="#waitlist" className="inline-flex min-h-tap items-center justify-center text-base text-ink underline underline-offset-4">
                {hero.secondary}
              </a>
            </div>
            <p className="mt-3 text-base text-ink-muted">
              <Unverified note={hero.cancel.verify}>{hero.cancel.text}</Unverified>
            </p>
            <p className="mt-4 flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">
              <TruckIcon className="h-5 w-5 text-accent" />
              <Unverified note={hero.delivery.verify}>{hero.delivery.text}</Unverified>
            </p>

            <ul aria-label="Service details" className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-x-6">
              {hero.trust.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-base font-medium text-ink">
                  <CheckIcon className="text-accent" />
                  {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Accordion
                tone="base"
                headingLevel={2}
                label="About Estrada"
                items={hero.accordion.map((item) => ({
                  key: item.key,
                  heading: item.title,
                  body: <Unverified note={item.body.verify}>{item.body.text}</Unverified>,
                }))}
              />
            </div>

            <p className="mt-5 text-caption text-ink-muted">
              <Unverified note={hero.footnote.verify}>{hero.footnote.text}</Unverified>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
