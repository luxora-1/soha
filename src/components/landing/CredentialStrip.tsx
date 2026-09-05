import { CertificationMarquee } from "@/components/landing/CertificationMarquee";
import { Unverified } from "@/components/landing/Unverified";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { landingContent } from "@/content/landing";

/**
 * "Clinically crafted. Quality assured." over a row of certification marks
 * that glides across the band, with the disclosure that the marks belong to
 * the pharmacy. Follows the hero's checklist directly.
 */
export function CredentialStrip() {
  const { credentials } = landingContent;

  return (
    <section aria-labelledby="credentials-heading" className="overflow-hidden bg-surface py-10 md:py-14">
      <Container>
        <Eyebrow as="h2" id="credentials-heading" className="text-center">
          {credentials.label}
        </Eyebrow>
        <CertificationMarquee items={credentials.items} className="mt-6 md:mt-8" />
        <p className="mx-auto mt-6 max-w-measure text-center text-caption text-ink-muted">
          <Unverified note={credentials.caption.verify}>{credentials.caption.text}</Unverified> {credentials.trail}
        </p>
      </Container>
    </section>
  );
}
