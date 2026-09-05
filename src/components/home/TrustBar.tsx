import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/**
 * Single row of trust signals with dot separators. Separators are CSS-only so
 * screen readers hear a clean list.
 */
export function TrustBar() {
  return (
    <section aria-label="Why people trust Soha" className="border-y border-accent-soft bg-alt">
      <Container className="py-5">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-center text-[1rem] text-ink-muted sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3">
          {siteConfig.trustBar.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-x-3 before:hidden before:text-brand/60 before:content-['·'] before:[font-size:1.5em] before:leading-none sm:before:inline sm:first:before:hidden"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
