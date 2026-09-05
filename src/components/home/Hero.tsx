import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";

/**
 * Hero in the Hims/Hers mobile idiom: a large headline on the page ground,
 * then two tappable tiles side by side — the product on a dark panel and a
 * photo tile that starts the consult.
 */
export function Hero() {
  const { hero, heroTiles } = homeContent;

  return (
    <section aria-labelledby="hero-heading" className="bg-base pt-header">
      <Container className="pt-8 md:pt-12">
        <h1 id="hero-heading" className="motion-safe:animate-fade-up">
          {hero.headline.lead} <em className="italic">{hero.headline.accent}</em>
        </h1>
        <p className="mt-5 max-w-measure text-body-lg text-ink-muted motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
          {hero.subhead}
        </p>
      </Container>

      <Container width="wide" className="mt-8 md:mt-10">
        <div className="grid grid-cols-2 gap-3 md:gap-5 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
          {/* Product tile */}
          <Link
            href="/product"
            className="group relative isolate flex aspect-[0.86] flex-col justify-between overflow-hidden rounded-tile bg-ink p-4 text-on-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-base motion-reduce:transition-none md:aspect-[4/3] md:p-8"
          >
            <SiteImage slot="product-hero" mode="fill" sizes="(min-width: 768px) 50vw, 50vw" priority />
            <span aria-hidden="true" className="absolute inset-0 bg-tile-fade" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink/60 to-transparent" />
            <span className="relative z-10 block font-sans text-h3 font-medium leading-tight">
              {heroTiles.product.lead}
              <br />
              <span className="text-accent-soft">{heroTiles.product.accent}</span>
            </span>
            <span className="relative z-10 flex items-center justify-between text-base font-medium">
              {heroTiles.product.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">›</span>
            </span>
          </Link>

          {/* Consult tile */}
          <Link
            href={siteConfig.cta.href}
            className="group relative isolate flex aspect-[0.86] flex-col justify-between overflow-hidden rounded-tile bg-brand p-4 text-on-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-base motion-reduce:transition-none md:aspect-[4/3] md:p-8"
          >
            <SiteImage slot="home-hero" mode="fill" sizes="(min-width: 768px) 50vw, 50vw" priority withVideo />
            <span aria-hidden="true" className="absolute inset-0 bg-tile-fade" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink/60 to-transparent" />
            <span className="relative z-10 block font-sans text-h3 font-medium leading-tight">
              {heroTiles.consult.lead}
              <br />
              <span className="text-accent-soft">{heroTiles.consult.accent}</span>
            </span>
            <span className="relative z-10 flex items-center justify-between text-base font-medium">
              {heroTiles.consult.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">›</span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
