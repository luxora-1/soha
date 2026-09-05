import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

export function ClosingCTA() {
  const { closing } = homeContent;

  return (
    <SectionWrapper tone="alt" id="start" labelledBy="closing-heading">
      <FadeUp className="mx-auto flex max-w-measure flex-col items-center text-center">
        <h2 id="closing-heading">{closing.headline}</h2>
        <p className="mt-6 text-body-lg text-ink-muted">{closing.subhead}</p>
        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <CTAButton href={siteConfig.cta.href} className="w-full sm:w-auto">
            {siteConfig.cta.label}
          </CTAButton>
          <CTAButton href="/pricing" variant="secondary" className="w-full sm:w-auto">
            See pricing
          </CTAButton>
        </div>
        <p className="mt-4 text-caption text-ink-muted">{siteConfig.cta.helper}</p>
      </FadeUp>
    </SectionWrapper>
  );
}
