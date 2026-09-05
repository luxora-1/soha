import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StepCard } from "@/components/StepCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeContent } from "@/content/home";

export function HowItWorks() {
  const { howItWorks } = homeContent;

  return (
    <SectionWrapper
      tone="base"
      id="how-it-works"
      labelledBy="how-it-works-heading"
    >
      <FadeUp className="max-w-measure">
        <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        <h2 id="how-it-works-heading" className="mt-5">
          {howItWorks.headline}
        </h2>
      </FadeUp>

      <ol className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {howItWorks.steps.map((step, index) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            body={step.body}
            delay={index * 0.1}
          />
        ))}
      </ol>
    </SectionWrapper>
  );
}
