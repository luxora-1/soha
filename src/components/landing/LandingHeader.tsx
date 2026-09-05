import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing";

/**
 * Stripped header for ad landing pages: the wordmark and one call to action.
 * No navigation, so paid traffic has nowhere to leak; the wordmark is not a
 * link for the same reason. Sticky, translucent, no border.
 */
export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 bg-base/85 backdrop-blur-md">
      <Container className="flex h-nav items-center justify-between gap-4">
        <span className="font-serif text-[1.75rem] leading-none tracking-heading text-ink">
          <span className="sr-only">{siteConfig.name}</span>
          <span aria-hidden="true">{siteConfig.name}</span>
        </span>
        <CTAButton href="#waitlist" size="sm">
          {landingContent.header.cta}
        </CTAButton>
      </Container>
    </header>
  );
}
