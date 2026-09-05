import { ImageSlot } from "@/components/landing/ImageSlot";
import { Unverified } from "@/components/landing/Unverified";
import { Container } from "@/components/ui/Container";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Thin band of certification marks, with the disclosure that they belong to the pharmacy. */
export function CredentialStrip() {
  const { credentials } = landingContent;

  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="bg-surface py-8 md:py-10">
      <Container>
        <h2 id="credentials-heading" className="sr-only">
          {credentials.heading}
        </h2>
        <div className="mx-auto max-w-4xl">
          <ImageSlot
            {...slot("trust-badges")}
            sizes="(min-width: 1024px) 896px, 100vw"
            fit="contain"
            className="rounded-card"
          />
        </div>
        <p className="mx-auto mt-4 max-w-measure text-center text-caption text-ink-muted">
          <Unverified note={credentials.caption.verify}>{credentials.caption.text}</Unverified> {credentials.trail}
        </p>
      </Container>
    </section>
  );
}
