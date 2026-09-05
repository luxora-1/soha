import type { FetchPostsOptions, SocialProvider } from "../provider";
import type { SocialAccount, SocialPage, SocialPost } from "../types";

/**
 * SOCIAL_PLACEHOLDER — stands in for the Instagram feed until
 * INSTAGRAM_ACCESS_TOKEN is set (or when the API call fails). Twelve posts
 * with no media and a caption that says what they are, so the layout can be
 * judged and nothing can be mistaken for a real post. Cards render a
 * labelled block ("social-01") instead of an image.
 */
export class PlaceholderSocialProvider implements SocialProvider {
  readonly name = "placeholder" as const;

  async fetchPosts({ limit }: FetchPostsOptions): Promise<SocialPage> {
    const types = ["image", "carousel", "image", "video"] as const;
    const posts: SocialPost[] = Array.from({ length: Math.min(limit, 12) }, (_, i) => {
      const number = String(i + 1).padStart(2, "0");
      return {
        id: `social-${number}`,
        platform: "instagram",
        permalink: null,
        caption: `Placeholder post ${number}. Connect Instagram to show real posts here.`,
        mediaType: types[i % types.length],
        mediaUrl: null,
        // Spread the dates out so the layout shows realistic variety.
        timestamp: new Date(Date.UTC(2026, 8, 1 - i * 3)).toISOString(),
      };
    });
    return { posts, nextCursor: null };
  }

  account(): SocialAccount {
    return { platform: "instagram", handle: null, url: null };
  }
}
