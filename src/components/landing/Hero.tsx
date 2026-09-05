import { Accordion } from "@/components/landing/Accordion";
import { Carousel } from "@/components/landing/Carousel";
import { benefitIcons, CheckIcon, StarIcon, TruckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { RatingLine } from "@/components/landing/RatingLine";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";
import { Container } from "@/components/ui/Container";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Blurred fields of the palette's colours wandering slowly behind the hero. Decorative. */
function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="absolute -top-40 right-[-12%] h-[38rem] w-[38rem] rounded-full bg-accent-soft/40 blur-3xl will-change-transform motion-safe:animate-drift" />
      <span className="absolute left-[-18%] top-[28%] hidden h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl will-change-transform [animation-delay:-9s] [animation-duration:28s] motion-safe:animate-drift md:block" />
      <span className="absolute bottom-[-24%] right-[18%] hidden h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl will-change-transform [animation-delay:-15s] [animation-duration:24s] motion-safe:animate-drift md:block" />
    </div>
  );
}

/** Seconds into the hero choreography at which step `i` begins. */
const step = (i: number) => 0.08 + i * 0.09;

/**
 * Hero. On phones the photo carousel leads, then the product pill and
 * rating, kicker, headline, subhead, the "no patch, no pill" bullets, price,
 * the quiz button, delivery line, the six-line checklist, then three short
 * answers, so the checklist sits directly above the certification strip that
 * follows. From lg the copy runs down the left while the carousel and the
 * short answers stack on the right, so both columns finish together.
 *
 * Everything arrives in a single choreography on load: the words of the
 * headline rise one by one, each block below follows a beat later, and two
 * small cards float over the photograph.
 */
export function Hero() {
  const { hero } = landingContent;
  const RxIcon = benefitIcons.rx;
  const headlineStart = step(2);
  // The italic run queues behind the lead: one beat (0.07s) per word, matching SplitWords' default stagger.
  const accentStart = headlineStart + hero.headline.lead.split(" ").length * 0.07;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-base">
      <Aurora />
      <Container className="pb-12 pt-4 md:pt-8 lg:pb-20 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          {/* Photographs */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <Parallax distance={44}>
              <FadeUp immediate variant="scale" delay={0.12} duration={0.9}>
                <div className="relative">
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

                  {/* Two cards floating over the slide frame (4:5, full width), the way the reference pages dress their hero photo. */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5]">
                    <FadeUp immediate delay={0.95} className="absolute right-3 top-3 md:right-5 md:top-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-base/85 px-3.5 py-2 text-[0.875rem] font-medium text-ink shadow-soft backdrop-blur-md motion-safe:animate-float-slow">
                        <RxIcon className="h-5 w-5 text-accent" />
                        {hero.badges.rx}
                      </span>
                    </FadeUp>
                    <FadeUp immediate delay={1.1} className="absolute bottom-4 left-3 w-[min(17rem,80%)] md:-left-6 md:bottom-10">
                      <figure className="rounded-card bg-base/90 p-4 shadow-lift backdrop-blur-md motion-safe:animate-float">
                        <span className="flex gap-0.5 text-accent" aria-hidden="true">
                          {Array.from({ length: 5 }, (_, i) => (
                            <StarIcon key={i} className="h-3.5 w-3.5" />
                          ))}
                        </span>
                        <blockquote className="mt-2 font-serif text-[1.0625rem] leading-snug tracking-heading text-ink">
                          <Unverified note="testimonial quote">“{hero.badges.review.quote}”</Unverified>
                        </blockquote>
                        <figcaption className="mt-2 flex flex-wrap items-center gap-x-2 text-[0.75rem] font-medium uppercase tracking-eyebrow text-ink-muted">
                          <Unverified note="testimonial name and age">{hero.badges.review.name}</Unverified>
                          <span aria-hidden="true">·</span>
                          <Unverified note="verified-patient status">{hero.badges.review.tag}</Unverified>
                        </figcaption>
                      </figure>
                    </FadeUp>
                  </div>
                </div>
              </FadeUp>
            </Parallax>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <FadeUp immediate delay={step(0)} className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <ProductPill name={hero.pill.name} form={hero.pill.form} />
              <RatingLine />
            </FadeUp>

            <FadeUp immediate as="p" delay={step(1)} className="mt-6 font-serif text-[1.25rem] italic leading-snug tracking-heading text-accent md:text-[1.375rem]">
              {hero.kicker}
            </FadeUp>
            <h1 id="hero-heading" className="mt-3 text-display">
              <SplitWords text={hero.headline.lead} delay={headlineStart} />{" "}
              <em className="italic">
                <SplitWords text={hero.headline.accent} delay={accentStart} />
              </em>
            </h1>

            <FadeUp immediate as="p" delay={step(5)} className="mt-6 max-w-measure text-body-lg text-ink-muted">
              {hero.subhead.before}
              <Unverified note={hero.subhead.claim.verify}>{hero.subhead.claim.text}</Unverified>
              {hero.subhead.after}
            </FadeUp>

            <FadeUp immediate as="ul" delay={step(6)} className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-base font-medium text-ink">
              {hero.bullets.map((bullet) => {
                const text = typeof bullet === "string" ? bullet : bullet.text;
                return (
                  <li key={text} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {typeof bullet === "string" ? bullet : <Unverified note={bullet.verify}>{bullet.text}</Unverified>}
                  </li>
                );
              })}
            </FadeUp>

            <FadeUp immediate delay={step(7)}>
              <p className="mt-7 flex items-baseline gap-2 text-body text-ink-muted">
                <span>{hero.price.lead}</span>
                <Unverified note={hero.price.amount.verify}>
                  <span className="font-serif text-[2.5rem] italic leading-none tracking-heading text-ink tabular-nums">{hero.price.amount.text}</span>
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
              <p className="mt-4 flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">
                <TruckIcon className="h-5 w-5 text-accent" />
                <Unverified note={hero.delivery.verify}>{hero.delivery.text}</Unverified>
              </p>
            </FadeUp>

            <FadeUp immediate delay={step(8)} className="mt-8">
              <ul aria-label="Service details" className="grid gap-x-6 gap-y-3 rounded-tile bg-surface/70 p-5 sm:grid-cols-2 md:p-6">
                {hero.trust.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-base font-medium text-ink">
                    <CheckIcon className="text-accent" />
                    {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Short answers, under the photographs from lg */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start">
            <FadeUp delay={0.1}>
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
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
