import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

/** Closing panel: full-bleed photo tile with the headline over a fade. */
export function ClosingCTA() {
  const { closing } = homeContent;

  return (
    <section aria-labelledby="closing-heading" className="bg-base py-4 md:py-6">
      <Container width="wide">
        <FadeUp className="relative isolate min-h-[520px] overflow-hidden rounded-tile bg-ink text-on-ink md:min-h-[560px]">
          <SiteImage slot="home-closing" mode="fill" sizes="100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-tile-fade" />
          <div className="absolute inset-x-6 bottom-8 md:inset-x-12 md:bottom-12 lg:max-w-[44rem]">
            <h2 id="closing-heading" className="text-on-ink">
              {closing.headline}
            </h2>
            <p className="mt-5 max-w-measure text-body-lg text-on-ink/85">{closing.subhead}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CTAButton href={siteConfig.cta.href} className="bg-base text-ink hover:bg-alt active:bg-alt">
                {siteConfig.cta.label}
              </CTAButton>
              <CTAButton
                href="/pricing"
                variant="secondary"
                className="border-base/50 text-on-ink hover:bg-base/10 active:bg-base/15"
              >
                See pricing
              </CTAButton>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
