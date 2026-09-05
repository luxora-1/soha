import type { ReactNode } from "react";
import { LandingAnnouncement } from "@/components/landing/LandingAnnouncement";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { StickyQuizBar } from "@/components/landing/StickyQuizBar";
import { Unverified } from "@/components/landing/Unverified";
import { landingContent } from "@/content/landing";

/**
 * Stripped shell for standalone ad landing pages: skip link, rotating perks
 * bar, wordmark-and-quiz header, main, compact footer, and a sticky quiz bar
 * on phones. No site navigation.
 */
export default function LandingLayout({ children }: { children: ReactNode }) {
  const { announcement } = landingContent;
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LandingAnnouncement
        label={announcement.label}
        messages={announcement.messages.map((message) => (
          <Unverified key={message.text} note={message.verify} className="text-ink">
            {message.text}
          </Unverified>
        ))}
      />
      <LandingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <LandingFooter />
      <StickyQuizBar />
    </>
  );
}
