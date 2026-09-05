import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Slim line above the nav with a pill CTA, in the Hims/Hers idiom. Hidden when the copy is null. */
export function AnnouncementBar() {
  if (!siteConfig.announcement) return null;
  return (
    <div className="flex h-bar items-center justify-center gap-3 bg-accent-soft px-4 text-center text-base text-ink">
      <p className="truncate">{siteConfig.announcement}</p>
      <Link
        href={siteConfig.cta.href}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 text-base font-medium text-on-ink hover:bg-brand-hover"
      >
        Start <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
