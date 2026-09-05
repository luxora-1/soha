import type { Metadata } from "next";
import { WhyOne } from "@/components/home/WhyOne";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StepCard } from "@/components/StepCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FactsBar } from "@/components/ui/FactsBar";
import { PageIntro } from "@/components/ui/PageIntro";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { productContent as content } from "@/content/pages";

export const metadata: Metadata = {
  title: "The Product",
  description: content.subhead,
};

export default function ProductPage() {
  const { product } = content;

  return (
    <>
      {/* CLAIM_PENDING_LEGAL_REVIEW: the subhead compares Estrada to pills / creams / patches ("replaces"). Convenience framing only — confirm with counsel. */}
      <PageIntro
        layout="split"
        eyebrow={content.eyebrow}
        headline={content.headline}
        subhead={content.subhead}
        aside={
          <figure>
            <SiteImage slot={product.imageSlot} ratio="portrait" mdRatio="landscape" lgRatio="portrait" priority />
            <figcaption className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-[1.5rem] leading-none tracking-heading text-ink">
                {product.name}
              </span>
              <span className="text-base text-ink-muted">{product.byline}</span>
            </figcaption>
          </figure>
        }
      >
        <CTAButton href={siteConfig.cta.href}>{siteConfig.cta.label}</CTAButton>
        <p className="mt-4 text-caption text-ink-muted">{siteConfig.cta.helper}</p>
      </PageIntro>

      {/* Label lines, reproduced from the packaging. */}
      <FactsBar items={product.labelClaims} label="From the label" variant="stack" />

      <SectionWrapper tone="base" id="in-the-box" labelledBy="in-the-box-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeUp className="lg:col-span-5">
            <Eyebrow>{content.inTheBox.eyebrow}</Eyebrow>
            <h2 id="in-the-box-heading" className="mt-5">
              {content.inTheBox.headline}
            </h2>
            <p className="mt-6 max-w-measure text-body text-ink-muted">
              <em className="font-serif not-italic text-ink">{product.tagline}</em> — {content.inTheBox.lead}
            </p>
          </FadeUp>
          <ul className="lg:col-span-6 lg:col-start-7">
            {content.inTheBox.items.map((item, index) => (
              <FadeUp
                key={item.title}
                as="li"
                delay={index * 0.1}
                className="border-t border-accent-soft py-8 first:border-t-0 first:pt-0 lg:py-10"
              >
                <h3 className="text-ink">{item.title}</h3>
                <p className="mt-3 max-w-measure text-body text-ink-muted">{item.body}</p>
              </FadeUp>
            ))}
          </ul>
        </div>
        {/* CLAIM_PENDING_LEGAL_REVIEW: active ingredients / hormone names for "Your regimen" bullet. */}
      </SectionWrapper>

      <SectionWrapper tone="alt" id="dosing" labelledBy="dosing-heading">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeUp className="max-w-measure lg:col-span-6">
            <Eyebrow>{content.dosing.eyebrow}</Eyebrow>
            <h2 id="dosing-heading" className="mt-5">
              {content.dosing.headline}
            </h2>
            <p className="mt-6 text-body-lg text-ink-muted">{content.dosing.intro}</p>
            {/* CLAIM_PENDING_LEGAL_REVIEW: mg amounts per pump / per day. */}
            {/* CLAIM_PENDING_LEGAL_REVIEW: application site and frequency specifics. */}
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <SiteImage slot="product-detail" ratio="landscape" />
          </FadeUp>
        </div>
        <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {content.dosing.steps.map((step, index) => (
            <StepCard
              key={step.title}
              number={`0${index + 1}`}
              title={step.title}
              body={step.body}
              delay={index * 0.1}
            />
          ))}
        </ol>
        {/* CLAIM_PENDING_LEGAL_REVIEW: any comparison to oral / patch / separate-cream regimens beyond convenience. */}
      </SectionWrapper>

      {/* Convenience claim only — shared with the homepage. */}
      <WhyOne tone="base" />

      <SectionWrapper tone="alt" labelledBy="product-cta-heading">
        <FadeUp className="mx-auto flex max-w-measure flex-col items-center text-center">
          <h2 id="product-cta-heading">{content.closingHeadline}</h2>
          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <CTAButton href={siteConfig.cta.href} className="w-full sm:w-auto">
              {siteConfig.cta.label}
            </CTAButton>
            <CTAButton href="/pricing" variant="secondary" className="w-full sm:w-auto">
              See pricing
            </CTAButton>
          </div>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
