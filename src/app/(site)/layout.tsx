import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/** Every marketing page shares the full site chrome. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
