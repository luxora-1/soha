import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StepCard } from "@/components/StepCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ImageSlotName } from "@/config/images";
import { homeContent } from "@/content/home";

const stepSlots: ImageSlotName[] = ["how-step-01", "how-step-02", "how-step-03"];

/** Three image-led step cards: a swipeable rail on phones, a grid from md. */
export function HowItWorks() {
  const { howItWorks } = homeContent;

  return (
    <SectionWrapper tone="base" id="how-it-works" labelledBy="how-it-works-heading" padding="compact" className="lg:py-section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <FadeUp className="max-w-measure">
          <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
          <h2 id="how-it-works-heading" className="mt-5">
            {howItWorks.headline}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="hidden shrink-0 md:block">
          <CTAButton href="/how-it-works" variant="secondary">
            See every step
          </CTAButton>
        </FadeUp>
      </div>

      <ol
        className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:mt-16 lg:gap-8"
        aria-label="Steps"
      >
        {howItWorks.steps.map((step, index) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            body={step.body}
            imageSlot={stepSlots[index]}
            delay={index * 0.1}
            className="w-[78%] shrink-0 snap-start md:w-auto"
          />
        ))}
      </ol>

      <div className="mt-8 md:hidden">
        <CTAButton href="/how-it-works" variant="secondary" className="w-full">
          See every step
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
