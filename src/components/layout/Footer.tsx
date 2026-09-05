import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-ink text-on-ink">
      <Container className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-serif text-[2rem] leading-none tracking-heading">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-xs text-body text-on-ink/70">
              {siteConfig.footer.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7"
          >
            {siteConfig.footer.columns.map((column) => (
              <div key={column.heading}>
                <h2 className="font-sans text-eyebrow uppercase tracking-eyebrow text-on-ink/60">
                  {column.heading}
                </h2>
                <ul className="mt-4">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-tap items-center text-[1rem] text-on-ink/85 transition-colors hover:text-on-ink focus-visible:outline-base motion-reduce:transition-none"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-base/15 pt-8">
          <div className="max-w-measure space-y-3">
            {siteConfig.footer.disclosures.map((line) => (
              <p key={line} className="text-[1rem] leading-relaxed text-on-ink/60">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-8 text-[1rem] text-on-ink/60">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        {/* Oversized wordmark anchoring the page, in the DTC idiom. Decorative. */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-12 select-none text-center font-serif leading-[0.78] tracking-heading text-on-ink/[0.08] lg:mt-16"
          style={{ fontSize: "clamp(7rem, 33vw, 30rem)" }}
        >
          {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
