import { CTAButton } from "@/components/ui/CTAButton";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

/* COPY_DRAFT: 404 page copy — review before launch. */
export default function NotFound() {
  return (
    <div className="pt-nav">
      <SectionWrapper tone="base">
        <div className="max-w-measure">
        <h1>That page isn&apos;t here.</h1>
        <p className="mt-6 text-body-lg text-ink-muted">
          The link may be out of date. Head back to the homepage to find what
          you were looking for.
        </p>
          <div className="mt-10">
            <CTAButton href="/" variant="secondary">
              Back to home
            </CTAButton>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
