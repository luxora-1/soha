import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/**
 * Trust signals. Two stacked lines of two on phones (no separators, just
 * spacing); a single row with dot separators from `md` up. Separators are
 * CSS-only so screen readers hear a clean list.
 */
export function TrustBar() {
  return (
    <section aria-label="Service details" className="border-y border-accent-soft bg-alt">
      <Container className="py-5 md:py-6">
        <ul className="grid grid-cols-1 gap-x-4 gap-y-3 text-center text-base text-ink-muted min-[375px]:grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-3">
          {siteConfig.trustBar.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-x-3 before:hidden before:text-ink-muted before:content-['·'] before:[font-size:1.5em] before:leading-none md:before:inline md:first:before:hidden"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
