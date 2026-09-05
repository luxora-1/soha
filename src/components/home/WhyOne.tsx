import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeContent } from "@/content/home";

/**
 * "Why one instead of three".
 *
 * CONVENIENCE CLAIM ONLY. This section explains that a single regimen is
 * simpler to manage than three separate prescriptions. It must not state or
 * imply that the combined regimen is medically superior or more effective.
 */
export function WhyOne() {
  const { whyOne } = homeContent;

  return (
    <SectionWrapper tone="alt" id="why-one" labelledBy="why-one-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-6">
          <Eyebrow>{whyOne.eyebrow}</Eyebrow>
          <h2 id="why-one-heading" className="mt-5">
            {whyOne.headline}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          <p className="max-w-measure text-body text-ink">{whyOne.body}</p>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
