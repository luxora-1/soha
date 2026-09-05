import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false, follow: false },
};

/* LEGAL_PLACEHOLDER: privacy policy — counsel supplies the final document. */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      summary="How Soha collects, uses, and protects your information."
    >
      <p className="rounded-2xl border border-dashed border-ink/30 bg-base p-6 text-ink-muted">
        [LEGAL_PLACEHOLDER — the privacy policy has not been supplied yet. This page exists so the
        footer link resolves; it will be replaced with the counsel-approved document before launch.]
      </p>
    </LegalPage>
  );
}
