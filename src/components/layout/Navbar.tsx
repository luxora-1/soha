"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type NavbarProps = {
  announcement?: ReactNode;
  /** Rendered inside the mobile drawer under the links (e.g. a product card). */
  drawerExtra?: ReactNode;
};

/**
 * Site navigation. Transparent while sitting over the hero, becomes a solid
 * bar with a hairline border once the page scrolls. Below `md` the links live
 * in a slide-in drawer (Hims/Hers idiom) with a backdrop, Escape to close,
 * focus returned to the toggle, and body scroll locked while open.
 */
export function Navbar({ announcement, drawerExtra }: NavbarProps) {
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change (state adjusted during render, per React guidance).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // While open: Escape closes, focus moves into the drawer, body scroll is locked.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 motion-reduce:transition-none",
        solid ? "border-accent-soft bg-base" : "border-transparent bg-base/0",
      )}
    >
      {announcement}
      <nav aria-label="Main">
        <Container className="flex h-nav items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-tap items-center font-serif text-[1.75rem] leading-none tracking-heading text-ink"
          >
            <span className="sr-only">{siteConfig.name} — home</span>
            <span aria-hidden="true">{siteConfig.name}</span>
          </Link>

          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {siteConfig.nav.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-tap min-w-tap items-center justify-center border-b px-1 text-base transition-colors motion-reduce:transition-none",
                      current ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <CTAButton
              href={siteConfig.cta.href}
              size="sm"
              className={cn(announcement ? "hidden md:inline-flex" : "inline-flex")}
            >
              {siteConfig.cta.label}
            </CTAButton>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-full text-ink md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-4 w-6">
                <span className={cn("absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-200 motion-reduce:transition-none", open && "translate-y-[7.5px] rotate-45")} />
                <span className={cn("absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none", open && "opacity-0")} />
                <span className={cn("absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-200 motion-reduce:transition-none", open && "-translate-y-[7.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile drawer */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-50 md:hidden"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto rounded-l-tile bg-base p-5 shadow-none motion-safe:animate-[slide-in_.3s_ease-out]"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-h3 font-medium text-ink">Menu</span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-full text-ink"
            >
              <span className="sr-only">Close menu</span>
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
            </button>
          </div>

          <ul className="mt-4 divide-y divide-accent-soft border-y border-accent-soft">
            {siteConfig.nav.map((item, index) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-[3.5rem] items-center justify-between text-[1.125rem]",
                      current ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-xl text-ink">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {drawerExtra && <div className="mt-6">{drawerExtra}</div>}

          <div className="mt-6">
            <CTAButton href={siteConfig.cta.href} className="w-full">
              {siteConfig.cta.label}
            </CTAButton>
            <p className="mt-3 text-center text-caption text-ink-muted">{siteConfig.cta.helper}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
