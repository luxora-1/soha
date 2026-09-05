import type { SocialProvider } from "./provider";
import { InstagramProvider } from "./providers/instagram";
import { PlaceholderSocialProvider } from "./providers/placeholder";
import type { SocialFeed } from "./types";

export type { SocialProvider, FetchPostsOptions } from "./provider";
export type { SocialAccount, SocialFeed, SocialMediaType, SocialPage, SocialPlatform, SocialPost } from "./types";

/**
 * Resolve the configured provider: Instagram when a token is set, otherwise
 * placeholders. Add new platforms here — the components and the API route
 * stay unchanged.
 */
export function getSocialProvider(): SocialProvider {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) return new InstagramProvider(token);
  return new PlaceholderSocialProvider();
}

/**
 * The feed for a page or the API route. If the live provider fails (expired
 * token, API outage) the page still renders, with placeholders, and the
 * reason is logged without the token.
 */
export async function getSocialFeed(
  options: { limit?: number; after?: string | null } = {},
): Promise<SocialFeed> {
  const limit = options.limit ?? 12;
  const after = options.after ?? undefined;
  const provider = getSocialProvider();
  try {
    const page = await provider.fetchPosts({ limit, after });
    return { ...page, source: provider.name, account: provider.account(page.posts), fetchedAt: new Date().toISOString() };
  } catch (error) {
    console.error("[social] provider failed; showing placeholders:", error instanceof Error ? error.message : error);
    const fallback = new PlaceholderSocialProvider();
    const page = await fallback.fetchPosts({ limit });
    return { ...page, source: fallback.name, account: fallback.account(), fetchedAt: new Date().toISOString() };
  }
}
