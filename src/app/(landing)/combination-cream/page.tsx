import type { Metadata } from "next";
import { ClosingCTA } from "@/components/landing/ClosingCTA";
import { CommunityRail } from "@/components/landing/CommunityRail";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { CredentialStrip } from "@/components/landing/CredentialStrip";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { Ingredients } from "@/components/landing/Ingredients";
import { LandingAnalytics } from "@/components/landing/LandingAnalytics";
import { MedicalCredibility } from "@/components/landing/MedicalCredibility";
import { Outcomes } from "@/components/landing/Outcomes";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { QualityAccordion } from "@/components/landing/QualityAccordion";
import { Testimonials } from "@/components/landing/Testimonials";
import { Timeline } from "@/components/landing/Timeline";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";

export const metadata: Metadata = {
  title: { absolute: landingContent.meta.title },
  description: landingContent.meta.description,
};

/**
 * Standalone ad landing page for Estrada, the combination cream.
 * Not linked from the main navigation; /estradiol redirects here.
 * Sections live in src/components/landing, copy in src/content/landing.ts.
 */
export default function CombinationCreamPage() {
  return (
    <>
      <LandingAnalytics page={LANDING_PAGE_ID} />
      <Hero />
      <CredentialStrip />
      <Outcomes />
      <Problem />
      <ComparisonTable />
      <Ingredients />
      <Timeline />
      <MedicalCredibility />
      <QualityAccordion />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CommunityRail />
      <ClosingCTA />
    </>
  );
}
