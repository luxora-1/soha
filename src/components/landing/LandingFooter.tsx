import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing";

/** Compact footer for ad landing pages: wordmark, one line, legal links, and the site's regulatory disclosures. */
export function LandingFooter() {
  const year = new Date().getFullYear();
  const { footer } = landingContent;

  return (
    <footer className="bg-surface text-ink">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div>
            <p className="font-serif text-[1.75rem] leading-none tracking-heading">{siteConfig.name}</p>
            <p className="mt-4 max-w-md text-base text-ink-muted">{footer.note}</p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="-mx-2 inline-flex min-h-tap items-center px-2 text-base text-ink underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 max-w-measure space-y-3">
          {siteConfig.footer.disclosures.map((line) => (
            <p key={line} className="text-base leading-relaxed text-ink-muted">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 text-base text-ink-muted">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
