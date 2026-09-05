import { Carousel } from "@/components/landing/Carousel";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Four steps from quiz to check-ins. A rail on phones, a row from md. */
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
      <Carousel
        className="mt-10 md:mt-14"
        label={howItWorks.carouselLabel}
        bleed
        dots
        arrows={false}
        itemClassName="w-[78%] sm:w-[48%] md:w-[calc((100%-4.5rem)/4)]"
        controlsClassName="md:hidden"
        items={howItWorks.steps.map((step) => (
          <div key={step.slot} className="flex h-full gap-4 rounded-tile bg-base p-4 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none md:flex-col md:p-5">
            <div className="w-20 shrink-0 md:w-24">
              <ImageSlot {...slot(step.slot)} sizes="96px" compact className="rounded-card" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">{step.step}</p>
              <h3 className="mt-2 text-ink">{step.title}</h3>
              <p className="mt-2 text-base text-ink-muted">
                {typeof step.body === "string" ? step.body : <Unverified note={step.body.verify}>{step.body.text}</Unverified>}
              </p>
            </div>
          </div>
        ))}
      />
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
