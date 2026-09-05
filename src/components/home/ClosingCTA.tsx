import { PhotoPanel } from "@/components/sections/PhotoPanel";
import { homeContent } from "@/content/home";

/** Closing panel: full-bleed photo tile with the headline over a fade. */
export function ClosingCTA() {
  const { closing } = homeContent;
  return (
    <PhotoPanel
      slot="home-closing"
      headingId="closing-heading"
      headline={closing.headline}
      subhead={closing.subhead}
      secondary={{ label: "See pricing", href: "/pricing" }}
    />
  );
}
