import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

/**
 * Hero. Uses a CSS-only fade-up (not the Framer wrapper) so the above-the-fold
 * copy is visible even before hydration.
 */
export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-base pt-nav"
    >
      <Container className="py-16 md:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1
              id="hero-heading"
              className="motion-safe:animate-fade-up"
            >
              {hero.headline}
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
            <ImagePlaceholder
              ratio="landscape"
              lgRatio="portrait"
              brief="Hero — woman 45+, warm natural light, at home; editorial not clinical"
              className="motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
