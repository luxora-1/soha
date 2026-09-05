import type { SocialAccount, SocialPage, SocialPost } from "./types";

export type FetchPostsOptions = {
  /** Posts per page. Providers may return fewer. */
  limit: number;
  /** Cursor from a previous page's `nextCursor`. */
  after?: string;
};

/**
 * The seam for a social platform. To add one (TikTok, a Facebook Page),
 * implement this interface in `./providers/` and register it in
 * `getSocialProvider()`; the components and the API route do not change.
 */
export interface SocialProvider {
  readonly name: "instagram" | "placeholder";
  fetchPosts(options: FetchPostsOptions): Promise<SocialPage>;
  /** The account the posts belong to, derived from config or from the posts themselves. */
  account(posts: SocialPost[]): SocialAccount;
}
