import type { ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ImageSlotName } from "@/config/images";
import { siteConfig } from "@/config/site";

type PhotoPanelProps = {
  slot: ImageSlotName;
  headline: ReactNode;
  subhead?: ReactNode;
  headingId: string;
  /** Secondary button; omit for a single CTA. */
  secondary?: { label: string; href: string };
};

/** Full-bleed photo tile with the headline over a bottom fade and the primary CTA. */
export function PhotoPanel({ slot, headline, subhead, headingId, secondary }: PhotoPanelProps) {
  return (
    <section aria-labelledby={headingId} className="bg-base py-4 md:py-6">
      <Container width="wide">
        <FadeUp className="relative isolate min-h-[480px] overflow-hidden rounded-tile bg-ink text-on-ink md:min-h-[560px]">
          <SiteImage slot={slot} mode="fill" sizes="100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-tile-fade" />
          <div className="absolute inset-x-5 bottom-6 md:inset-x-12 md:bottom-12 lg:max-w-[44rem]">
            <h2 id={headingId} className="text-on-ink">
              {headline}
            </h2>
            {subhead && <p className="mt-4 max-w-measure text-body-lg text-on-ink/85">{subhead}</p>}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <CTAButton href={siteConfig.cta.href} variant="inverse">
                {siteConfig.cta.label}
              </CTAButton>
              {secondary && (
                <CTAButton
                  href={secondary.href}
                  variant="secondary"
                  className="border-base/50 text-on-ink hover:bg-base/10 active:bg-base/15"
                >
                  {secondary.label}
                </CTAButton>
              )}
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
