"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Site navigation. Transparent while sitting over the hero, becomes a solid
 * bar with a hairline border once the page scrolls. Collapses to an
 * accessible disclosure menu below `md`.
 */
export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid background once the page has scrolled past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes (state adjusted during
  // render, per React guidance, rather than in an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 motion-reduce:transition-none",
        solid
          ? "border-accent-soft bg-base/95 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main">
        <Container className="flex h-nav items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex min-h-tap items-center font-serif text-[1.75rem] leading-none tracking-heading text-ink"
          >
            <span className="sr-only">{siteConfig.name} — home</span>
            <span aria-hidden="true">{siteConfig.name}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-tap items-center border-b border-transparent text-[1rem] transition-colors motion-reduce:transition-none",
                      current
                        ? "border-ink text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <CTAButton href={siteConfig.cta.href} size="sm">
              {siteConfig.cta.label}
            </CTAButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-200 motion-reduce:transition-none",
                  open && "translate-y-[7.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-200 motion-reduce:transition-none",
                  open && "-translate-y-[7.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </Container>

        {/* Mobile menu panel */}
        <div
          id={menuId}
          hidden={!open}
          className="border-t border-accent-soft bg-base md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <ul>
              {siteConfig.nav.map((item) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-[3rem] items-center border-b border-accent-soft text-[1.125rem]",
                        current ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pt-4">
              <CTAButton href={siteConfig.cta.href} className="w-full">
                {siteConfig.cta.label}
              </CTAButton>
            </div>
          </Container>
        </div>
      </nav>
    </header>
  );
}
