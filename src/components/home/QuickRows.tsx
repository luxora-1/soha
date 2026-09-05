import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ImageSlotName } from "@/config/images";
import { homeContent } from "@/content/home";

/** Tappable rows into the main sections, each with a small photo thumb. */
export function QuickRows() {
  const { quickRows } = homeContent;

  return (
    <section aria-label="Explore" className="bg-base pb-4 pt-3 md:pt-5">
      <Container width="wide">
        <ul className="grid gap-3 md:grid-cols-2 md:gap-5">
          {quickRows.map((row, index) => (
            <li key={row.href} className="motion-safe:animate-fade-up" style={{ animationDelay: `${220 + index * 60}ms` }}>
              <Link
                href={row.href}
                className="group flex min-h-[5.5rem] items-center justify-between gap-4 rounded-tile bg-alt px-5 py-3 text-ink transition-colors hover:bg-accent-soft motion-reduce:transition-none md:min-h-[6.5rem] md:px-7"
              >
                <span className="font-sans text-h3 font-medium leading-tight">
                  {row.lead} <span className="text-brand">{row.accent}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="relative block h-16 w-16 overflow-hidden rounded-2xl md:h-[4.5rem] md:w-[4.5rem]">
                    <SiteImage slot={row.slot as ImageSlotName} mode="fill" sizes="80px" />
                  </span>
                  <span aria-hidden="true" className="text-2xl text-ink transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">›</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
