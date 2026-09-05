import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Grain } from "@/components/ui/Grain";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

/**
 * Dark full-bleed product panel in the Hims idiom: two-tone headline, the
 * bottle floating in a warm glow, label chips, one cream CTA.
 */
export function ProductPanel() {
  const { product } = homeContent;

  return (
    <section aria-labelledby="product-panel-heading" className="bg-base pt-6 md:pt-8">
      <Container width="wide">
        <FadeUp className="relative isolate overflow-hidden rounded-tile bg-ink text-on-ink">
          <div aria-hidden="true" className="absolute inset-0 bg-glow" />
          <Grain className="opacity-[0.22] mix-blend-screen" />

          <div className="relative flex flex-col items-center px-6 pb-12 pt-12 text-center md:pb-16 md:pt-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:py-24 lg:text-left">
            <div className="lg:col-span-6">
              <Chip variant="glass" className="mx-auto lg:mx-0">
                {product.eyebrow} · {product.name} {product.byline}
              </Chip>
              <h2 id="product-panel-heading" className="mt-6 text-on-ink">
                {product.headline.lead}
                <br />
                <em className="italic text-accent-soft">{product.headline.accent}</em>
              </h2>
              <p className="mx-auto mt-5 max-w-measure text-body-lg text-on-ink/80 lg:mx-0">{product.body}</p>
            </div>

            <div className="relative mt-10 w-full max-w-[22rem] lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none">
              <div className="relative aspect-[4/5] w-full">
                <SiteImage slot="product-hero" mode="fill" fit="contain" sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </div>

            <div className="mt-10 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mt-0">
              <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {product.labelClaims.map((claim) => (
                  <li key={claim}>
                    <Chip variant="glass">{claim}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <CTAButton href={siteConfig.cta.href} variant="inverse" className="w-full sm:w-auto">
                  {siteConfig.cta.label}
                </CTAButton>
                <Link
                  href="/product"
                  className="inline-flex min-h-tap items-center text-base text-on-ink/85 underline underline-offset-4 hover:text-on-ink focus-visible:outline-base"
                >
                  {product.cta}
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
