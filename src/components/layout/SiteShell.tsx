import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { DrawerProductCard } from "@/components/layout/DrawerProductCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * The marketing site's chrome: skip link, fixed navbar with announcement bar
 * and drawer, the main landmark, and the footer. Used by the (site) route
 * group's layout and by the root not-found page. Standalone ad landing pages
 * under (landing) render their own stripped shell instead.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar announcement={<AnnouncementBar />} drawerExtra={<DrawerProductCard />} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
