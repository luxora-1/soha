/**
 * Copy for the Community page and the landing page's community strip.
 * Everything here is COPY_DRAFT until brand signs it off. The feed itself
 * shows Soha's own Instagram posts, captions verbatim — no copy is written
 * about individual posts.
 */
export const communityContent = {
  eyebrow: "Community",
  /* COPY_DRAFT: community page headline + intro. */
  headline: "From our Instagram.",
  intro: "Plain talk about menopause, hormone therapy, and feeling like yourself again. Follow along and join in.",
  /* COPY_DRAFT: page meta description. */
  description: "Soha on Instagram: plain talk about menopause and hormone therapy.",

  feed: {
    label: "Instagram posts",
    loadMore: "Show more posts",
    loading: "Loading more posts…",
    end: "That's everything for now.",
    /** Shown while the feed is placeholders (no account connected). */
    placeholderNotice: "Placeholder posts. Connect an Instagram account to show real posts here — see README.md, Community feed.",
    viewOn: "View on Instagram",
  },

  follow: {
    /* COPY_DRAFT */
    headline: "Join the conversation.",
    body: "New posts and plain-spoken answers about menopause, on Instagram.",
    cta: "Follow on Instagram",
    /** When no handle is configured yet. */
    ctaPending: "Instagram account coming soon",
  },
} as const;
