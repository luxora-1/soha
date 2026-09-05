import type { ReactNode } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

type LegalPageProps = {
  title: string;
  /** Short line under the title. */
  summary: string;
  children: ReactNode;
};

/**
 * Stub layout for legal documents. Counsel supplies the final text; until
 * then each page shows a clearly labelled placeholder so footer links resolve
 * without pretending a policy exists.
 */
export function LegalPage({ title, summary, children }: LegalPageProps) {
  return (
    <>
      <PageIntro eyebrow="Legal" headline={title} subhead={summary} />
      <SectionWrapper tone="alt">
        <div className="max-w-measure space-y-6 text-body text-ink">{children}</div>
      </SectionWrapper>
    </>
  );
}
