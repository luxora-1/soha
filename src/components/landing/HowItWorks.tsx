import { Carousel } from "@/components/landing/Carousel";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Four steps from quiz to check-ins. A real sequence, so each step carries
 * its number in a small disc; no boxes, the illustration and the number do
 * the structuring. A rail on phones, a row from md.
 */
export function HowItWorks() {
  const { howItWorks } = landingContent;

  return (
    <SectionWrapper tone="alt" id="how-it-works" labelledBy="how-heading">
      <SectionHeading id="how-heading" tone="surface" headline={<>{howItWorks.headline.lead} <em>{howItWorks.headline.accent}</em></>} />
      <div data-reveal="">
        <Carousel
          className="mt-10 md:mt-14"
          label={howItWorks.carouselLabel}
          bleed
          dots
          arrows={false}
          itemClassName="w-[78%] sm:w-[48%] md:w-[calc((100%-4.5rem)/4)]"
          controlsClassName="md:hidden"
          items={howItWorks.steps.map((step, index) => (
            <div key={step.slot} className="flex h-full flex-col">
              <div className="relative">
                <ImageSlot {...slot(step.slot)} sizes="(min-width: 768px) 22vw, 78vw" className="rounded-tile" />
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-base font-sans text-[1rem] font-semibold leading-none text-primary shadow-soft">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-ink">{step.title}</h3>
              <p className="mt-2 text-base text-ink-muted">
                {typeof step.body === "string" ? step.body : <Unverified note={step.body.verify}>{step.body.text}</Unverified>}
              </p>
            </div>
          ))}
        />
      </div>
      <SectionCTA
        location="how-it-works"
        label={landingContent.quizCta.fit}
        align="left"
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
