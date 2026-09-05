import { ThreeToOne } from "@/components/home/ThreeToOne";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper, type SectionTone } from "@/components/sections/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeContent } from "@/content/home";

/**
 * "Why one instead of three".
 *
 * CONVENIENCE CLAIM ONLY. This section explains that a single regimen is
 * simpler to manage than three separate prescriptions. It must not state or
 * imply that the combined regimen is medically superior or more effective.
 */
export function WhyOne({ tone = "alt" }: { tone?: SectionTone }) {
  const { whyOne } = homeContent;

  return (
    <SectionWrapper tone={tone} id="why-one" labelledBy="why-one-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-5">
          <Eyebrow>{whyOne.eyebrow}</Eyebrow>
          <h2 id="why-one-heading" className="mt-5">
            {whyOne.headline}
          </h2>
          <p className="mt-6 max-w-measure text-body text-ink">{whyOne.body}</p>
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ThreeToOne />
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
