import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StepSection } from "@/components/sections/StepSection";
import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

      <SectionWrapper tone="base" padding="none">
        <FadeUp className="py-10 lg:py-14">
          <SiteImage slot="how-cycle" ratio="landscape" mdRatio="wide" lgRatio="wide" sizes="(min-width: 1280px) 1200px, 100vw" />
        </FadeUp>
      </SectionWrapper>

      <SectionWrapper tone="alt" id="cycle" labelledBy="cycle-heading">
        <FadeUp className="max-w-measure">
          <Eyebrow>{content.cycle.eyebrow}</Eyebrow>
          <h2 id="cycle-heading" className="mt-5">
            {content.cycle.headline}
          </h2>
          <p className="mt-6 text-body-lg text-ink-muted">{content.cycle.intro}</p>
        </FadeUp>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {content.cycle.options.map((option, index) => (
            <FadeUp
              key={option.days}
              as="li"
              delay={index * 0.1}
              className="flex h-full flex-col rounded-2xl border border-accent-soft bg-base p-8 lg:p-10"
            >
              <span aria-hidden="true" className="font-serif text-[2.5rem] leading-none tracking-heading text-brand tabular-nums">
                {option.days}
              </span>
              <h3 className="mt-6 text-ink">{option.title}</h3>
              <p className="mt-3 max-w-measure text-body text-ink-muted">{option.body}</p>
            </FadeUp>
          ))}
        </ul>
        <p className="mt-6 text-base text-ink-muted">{content.cycle.note}</p>

        <FadeUp className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <CTAButton href={siteConfig.cta.href}>{siteConfig.cta.label}</CTAButton>
          <CTAButton href="/pricing" variant="secondary">
            See pricing
          </CTAButton>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
