import { QuizCTA } from "@/components/landing/QuizCTA";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing";

/**
 * Stripped header for ad landing pages: the wordmark and the quiz button.
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
        <QuizCTA location="header" label={landingContent.header.cta} size="sm" />
      </Container>
    </header>
  );
}
