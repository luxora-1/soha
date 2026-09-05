import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CycleTiles } from "@/components/home/CycleTiles";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductPanel } from "@/components/home/ProductPanel";
import { QuickRows } from "@/components/home/QuickRows";
import { SocialProofPlaceholder } from "@/components/home/SocialProofPlaceholder";
import { WhyOne } from "@/components/home/WhyOne";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickRows />
      <ProductPanel />
      <HowItWorks />
      <WhyOne tone="alt" />
      <CycleTiles />
      <SocialProofPlaceholder tone="alt" />
      <ClosingCTA />
    </>
  );
}
