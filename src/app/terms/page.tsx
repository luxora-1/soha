import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of service",
  robots: { index: false, follow: false },
};

/* LEGAL_PLACEHOLDER: terms of service — counsel supplies the final document. */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      summary="The terms that apply when you use Soha."
    >
      <p className="rounded-2xl border border-dashed border-ink/30 bg-base p-6 text-ink-muted">
        [LEGAL_PLACEHOLDER — the terms of service have not been supplied yet. This page exists so
        the footer link resolves; it will be replaced with the counsel-approved document before
        launch.]
      </p>
    </LegalPage>
  );
}
