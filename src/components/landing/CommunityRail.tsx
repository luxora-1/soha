import Link from "next/link";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { SocialPostCard } from "@/components/social/SocialPostCard";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";
import { getSocialFeed } from "@/lib/social";

/**
 * A compact strip of recent Instagram posts on the landing page. Every card
 * leads to the site's Community page rather than out to Instagram, so paid
 * traffic stays on the site. Swipeable on phones, a row from md.
 */
export async function CommunityRail() {
  const { community } = landingContent;
  const feed = await getSocialFeed({ limit: 8 });

  return (
    <SectionWrapper tone="base" id="community" labelledBy="community-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="community-heading" headline={community.headline} subhead={community.subhead} />
        <Link
          href={community.href}
          className="hidden shrink-0 items-center gap-1 text-base font-medium text-ink underline-offset-4 hover:underline md:inline-flex"
        >
          {community.cta}
        </Link>
      </div>

      <ul
        aria-label={community.label}
        className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
      >
        {feed.posts.slice(0, 8).map((post) => (
          <li key={post.id} className="w-[58%] shrink-0 snap-start sm:w-[42%] md:w-auto">
            <SocialPostCard post={post} href={community.href} sizes="(min-width: 1024px) 22vw, 58vw" />
          </li>
        ))}
      </ul>

      <div className="mt-8 md:hidden">
        <Link href={community.href} className="inline-flex min-h-tap items-center text-base font-medium text-ink underline underline-offset-4">
          {community.cta}
        </Link>
      </div>
    </SectionWrapper>
  );
}
