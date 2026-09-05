import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

/**
 * Hero. Uses a CSS-only fade-up (not the Framer wrapper) so the above-the-fold
 * copy is visible even before hydration.
 */
export function Hero() {
  const { hero } = homeContent;

  return (
    <section aria-labelledby="hero-heading" className="bg-base pt-nav">
      <Container className="py-section lg:py-section-lg">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1
              id="hero-heading"
              className="motion-safe:animate-fade-up"
            >
              {hero.headline.lead}{" "}
              <em className="italic">{hero.headline.accent}</em>
            </h1>
            <p className="mt-6 max-w-measure text-body-lg text-ink-muted motion-safe:animate-fade-up motion-safe:[animation-delay:100ms]">
              {hero.subhead}
            </p>
            <div className="mt-10 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
              <CTAButton href={siteConfig.cta.href}>
                {siteConfig.cta.label}
              </CTAButton>
              <p className="mt-4 text-caption text-ink-muted">
                {siteConfig.cta.helper}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SiteImage
              slot="home-hero"
              ratio="portrait"
              mdRatio="landscape"
              lgRatio="portrait"
              priority
              className="motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
