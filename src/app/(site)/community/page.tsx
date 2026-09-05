import type { Metadata } from "next";
import { SocialFeedGrid } from "@/components/social/SocialFeedGrid";
import { InstagramIcon } from "@/components/social/icons";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { communityContent as content } from "@/content/community";
import { getSocialFeed } from "@/lib/social";

export const metadata: Metadata = {
  title: "Community",
  description: content.description,
};

/** Re-render at most hourly so new Instagram posts appear without a deploy. */
export const revalidate = 3600;

/**
 * Community: Soha's Instagram feed, newest first, loading more as you scroll.
 * Posts come from src/lib/social; placeholders render until an account is
 * connected (SOCIAL_PLACEHOLDER).
 */
export default async function CommunityPage() {
  const feed = await getSocialFeed({ limit: 12 });
  const { follow } = content;

  return (
    <>
      <PageIntro eyebrow={content.eyebrow} headline={content.headline} subhead={content.intro} />

      <SectionWrapper tone="base" padding="none" className="pb-section lg:pb-section-lg" labelledBy="feed-heading">
        <h2 id="feed-heading" className="sr-only">
          {content.feed.label}
        </h2>
        {feed.source === "placeholder" && (
          <p className="mb-8 rounded-card bg-surface px-5 py-4 text-base text-ink-muted">{content.feed.placeholderNotice}</p>
        )}
        <SocialFeedGrid initialPosts={feed.posts} initialCursor={feed.nextCursor} />
      </SectionWrapper>

      <SectionWrapper tone="alt" labelledBy="follow-heading">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="follow-heading">{follow.headline}</h2>
            <p className="mt-4 max-w-measure text-body text-ink-muted">{follow.body}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            {feed.account.url ? (
              <CTAButton href={feed.account.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <InstagramIcon />
                {follow.cta}
                {feed.account.handle && <span className="text-on-brand/80">@{feed.account.handle}</span>}
              </CTAButton>
            ) : (
              <p className="inline-flex min-h-tap items-center gap-2 text-base text-ink-muted">
                <InstagramIcon />
                {follow.ctaPending}
              </p>
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
