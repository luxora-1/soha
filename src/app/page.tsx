import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProofPlaceholder } from "@/components/home/SocialProofPlaceholder";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyOne } from "@/components/home/WhyOne";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhyOne />
      <SocialProofPlaceholder />
      <ClosingCTA />
    </>
  );
}
