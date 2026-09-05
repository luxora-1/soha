import type { Metadata } from "next";
import { CycleTiles } from "@/components/home/CycleTiles";
import { PhotoPanel } from "@/components/sections/PhotoPanel";
import { StepSection } from "@/components/sections/StepSection";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { howItWorksContent as content } from "@/content/pages";

export const metadata: Metadata = {
  title: "How it works",
  description: content.intro,
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro eyebrow={content.eyebrow} headline={content.headline} subhead={content.intro}>
        <CTAButton href={siteConfig.cta.href}>{siteConfig.cta.label}</CTAButton>
        <p className="mt-4 text-caption text-ink-muted">{siteConfig.cta.helper}</p>
      </PageIntro>

      <div className="bg-base pb-6 md:pb-10">
        <Container width="wide">
          <SiteImage slot="how-cycle" ratio="landscape" mdRatio="wide" lgRatio="wide" sizes="100vw" priority />
        </Container>
      </div>

      {content.steps.map((step, index) => (
        <StepSection
          key={step.number}
          id={`step-${step.number}`}
          number={step.number}
          title={step.title}
          body={step.body}
          imageSlot={step.imageSlot}
          imageSide={index % 2 === 0 ? "right" : "left"}
          tone={index % 2 === 0 ? "alt" : "base"}
        />
      ))}

      <CycleTiles
        id="cycle"
        tone={content.steps.length % 2 === 0 ? "alt" : "base"}
        eyebrow={content.cycle.eyebrow}
        headline={content.cycle.headline}
        intro={content.cycle.intro}
        options={content.cycle.options}
        note={content.cycle.note}
      />

      <PhotoPanel
        slot="home-closing"
        headingId="how-closing-heading"
        headline="Your regimen, simplified."
        subhead="Start your consult and see what a clinician recommends for you."
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
