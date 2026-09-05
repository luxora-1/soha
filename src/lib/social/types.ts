/**
 * Social feed domain types — the contract between the providers, the API
 * route, and the components. Instagram is the first platform; the shape is
 * platform-neutral so TikTok or a Facebook Page can be added as providers.
 */

export type SocialPlatform = "instagram";

export type SocialMediaType = "image" | "video" | "carousel";

export type SocialPost = {
  /** Provider's id for the post. */
  id: string;
  platform: SocialPlatform;
  /** Link to the post on the platform. Null for placeholders. */
  permalink: string | null;
  caption: string;
  mediaType: SocialMediaType;
  /**
   * Still image to show for the post (the thumbnail for videos). Null for
   * placeholders, which render a labelled block instead.
   */
  mediaUrl: string | null;
  /** ISO 8601. */
  timestamp: string;
  /** Account handle, when the provider returns it. */
  username?: string;
};

export type SocialAccount = {
  platform: SocialPlatform;
  handle: string | null;
  url: string | null;
};

export type SocialPage = {
  posts: SocialPost[];
  /** Opaque cursor for the next page, or null when there is no more. */
  nextCursor: string | null;
};

export type SocialFeed = SocialPage & {
  /** Which provider produced the posts; "placeholder" until an account is connected. */
  source: "instagram" | "placeholder";
  account: SocialAccount;
  fetchedAt: string;
};
