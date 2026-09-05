import { Carousel } from "@/components/landing/Carousel";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Four steps from quiz to check-ins, each numbered large in the corner. A rail on phones, a row from md. */
export function HowItWorks() {
  const { howItWorks } = landingContent;

  return (
    <SectionWrapper tone="alt" id="how-it-works" labelledBy="how-heading">
      <SectionHeading
        id="how-heading"
        tone="surface"
        align="center"
        headline={
          <>
            {howItWorks.headline.lead} <em className="italic">{howItWorks.headline.accent}</em>
          </>
        }
      />
      <FadeUp delay={0.1}>
        <Carousel
          className="mt-10 md:mt-14"
          label={howItWorks.carouselLabel}
          bleed
          dots
          arrows={false}
          itemClassName="w-[78%] sm:w-[48%] md:w-[calc((100%-4.5rem)/4)]"
          controlsClassName="md:hidden"
          items={howItWorks.steps.map((step, index) => (
            <div
              key={step.slot}
              className="group relative flex h-full gap-4 overflow-hidden rounded-tile bg-base p-4 shadow-soft transition-[transform,box-shadow] duration-500 ease-out hover:shadow-lift motion-safe:hover:-translate-y-1 motion-reduce:transition-none md:flex-col md:p-5"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-4 font-serif text-[5.5rem] italic leading-none tracking-heading text-primary/[0.07] transition-colors duration-500 group-hover:text-primary/[0.12]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="w-20 shrink-0 md:w-24">
                <ImageSlot {...slot(step.slot)} sizes="96px" compact hoverZoom className="rounded-card" />
              </div>
              <div className="relative min-w-0">
                <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-accent">{step.step}</p>
                <h3 className="mt-2 text-ink">{step.title}</h3>
                <p className="mt-2 text-base text-ink-muted">
                  {typeof step.body === "string" ? step.body : <Unverified note={step.body.verify}>{step.body.text}</Unverified>}
                </p>
              </div>
            </div>
          ))}
        />
      </FadeUp>
      <SectionCTA
        location="how-it-works"
        label={landingContent.quizCta.fit}
        helper={
          <>
            {howItWorks.strip.map((item, i) => (
              <span key={item.text}>
                {i > 0 && " "}
                <Unverified note={item.verify}>{item.text}</Unverified>
              </span>
            ))}
          </>
        }
      />
    </SectionWrapper>
  );
}
