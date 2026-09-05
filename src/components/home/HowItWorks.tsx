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
      <FadeUp>
        <Eyebrow as="h2" id="how-it-works-heading">
          {howItWorks.eyebrow}
        </Eyebrow>
      </FadeUp>

      <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-4 lg:mt-14 lg:gap-8">
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
