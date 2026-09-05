import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeContent } from "@/content/home";

/** Product card inside the mobile drawer, in the Hims "Top treatments" idiom. */
export function DrawerProductCard() {
  const { product } = homeContent;
  return (
    <div>
      <Eyebrow>{product.eyebrow}</Eyebrow>
      <Link
        href="/product"
        className="mt-3 flex items-center gap-4 rounded-2xl bg-alt p-3 text-ink hover:bg-accent-soft"
      >
        <span className="relative block h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-accent-soft">
          <SiteImage slot="product-hero" mode="fill" fit="contain" sizes="80px" />
        </span>
        <span>
          <span className="block font-serif text-[1.375rem] leading-none tracking-heading">
            {product.name} <span className="font-sans text-base text-ink-muted">{product.byline}</span>
          </span>
          <span className="mt-2 block text-base text-ink-muted">The 3-in-1 regimen</span>
          <span className="mt-1 block text-base underline underline-offset-4">{product.cta} ›</span>
        </span>
      </Link>
    </div>
  );
}
