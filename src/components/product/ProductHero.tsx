import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Grain } from "@/components/ui/Grain";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { productContent as content } from "@/content/pages";

/** Product page opener: the dark Estrada panel, with the page h1. */
export function ProductHero() {
  const { product } = content;
  return (
    <section aria-labelledby="page-heading" className="bg-base pt-[calc(var(--header-h)+1rem)] md:pt-[calc(var(--header-h)+1.5rem)]">
      <Container width="wide">
        <div className="relative isolate overflow-hidden rounded-tile bg-ink text-on-ink">
          <div aria-hidden="true" className="absolute inset-0 bg-glow" />
          <Grain className="opacity-[0.22] mix-blend-screen" />
          <div className="relative grid gap-10 px-6 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:py-24">
            <div className="lg:col-span-6 motion-safe:animate-fade-up">
              <Chip variant="glass">
                {content.eyebrow} · {product.name} {product.byline}
              </Chip>
              <h1 id="page-heading" className="mt-6 text-on-ink">
                {content.headline}
              </h1>
              <p className="mt-6 max-w-measure text-body-lg text-on-ink/80">{content.subhead}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {product.labelClaims.map((claim) => (
                  <li key={claim}>
                    <Chip variant="glass">{claim}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <CTAButton href={siteConfig.cta.href} className="bg-base text-ink hover:bg-alt active:bg-alt">
                  {siteConfig.cta.label}
                </CTAButton>
                <p className="text-caption text-on-ink/75">{siteConfig.cta.helper}</p>
              </div>
            </div>
            <figure className="lg:col-span-5 lg:col-start-8 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tile">
                <SiteImage slot={product.imageSlot} mode="fill" priority sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
              <figcaption className="mt-4 text-base text-on-ink/70">
                <span className="font-serif italic text-on-ink">{product.tagline}</span> — {product.name} {product.byline}.{" "}
                <Link href="#in-the-box" className="underline underline-offset-4 hover:text-on-ink">
                  What&apos;s in the box
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
