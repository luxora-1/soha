import type { Metadata } from "next";
import { BenefitsGrid } from "@/components/landing/BenefitsGrid";
import { CareFeatures } from "@/components/landing/CareFeatures";
import { ClosingCTA } from "@/components/landing/ClosingCTA";
import { CommunityRail } from "@/components/landing/CommunityRail";
import { Compare } from "@/components/landing/Compare";
import { CredentialStrip } from "@/components/landing/CredentialStrip";
import { FAQ } from "@/components/landing/FAQ";
import { GuaranteePanel } from "@/components/landing/GuaranteePanel";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingAnalytics } from "@/components/landing/LandingAnalytics";
import { MedicalCredibility } from "@/components/landing/MedicalCredibility";
import { Outcomes } from "@/components/landing/Outcomes";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { QualityAccordion } from "@/components/landing/QualityAccordion";
import { Quiz } from "@/components/landing/Quiz";
import { Supports } from "@/components/landing/Supports";
import { Testimonials } from "@/components/landing/Testimonials";
import { Timeline } from "@/components/landing/Timeline";
import { Unverified } from "@/components/landing/Unverified";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";
import { quizResultNotes } from "@/content/quiz";

export const metadata: Metadata = {
  title: { absolute: landingContent.meta.title },
  description: landingContent.meta.description,
};

/**
 * Standalone ad landing page for Estrada, the combination cream.
 * Not linked from the main navigation; /estradiol redirects here.
 * Sections live in src/components/landing, copy in src/content/landing.ts.
 * The quiz dialog is mounted once and opened by every quiz button.
 */
export default function CombinationCreamPage() {
  const resultNotes = Object.fromEntries(
    Object.entries(quizResultNotes).map(([key, note]) => [
      key,
      <Unverified key={key} note={`quiz result: ${note.verify}`}>
        {note.text}
      </Unverified>,
    ]),
  );

  return (
    <>
      <LandingAnalytics page={LANDING_PAGE_ID} />
      <Hero />
      <CredentialStrip />
      <Outcomes />
      <BenefitsGrid />
      <Supports />
      <Problem />
      <Compare />
      <Timeline />
      <Testimonials />
      <MedicalCredibility />
      <HowItWorks />
      <CareFeatures />
      <QualityAccordion />
      <GuaranteePanel />
      <Pricing />
      <FAQ />
      <CommunityRail />
      <ClosingCTA />
      <Quiz page={LANDING_PAGE_ID} resultNotes={resultNotes} />
    </>
  );
}
