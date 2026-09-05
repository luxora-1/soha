import type { FetchPostsOptions, SocialProvider } from "../provider";
import type { SocialAccount, SocialPage, SocialPost } from "../types";

/**
 * Instagram API with Instagram Login (graph.instagram.com).
 *
 * Reads the connected professional account's own media with a long-lived
 * access token. Setup and token refresh are documented in README.md under
 * "Community feed". Environment:
 *
 *   INSTAGRAM_ACCESS_TOKEN  required; long-lived token, valid 60 days, refresh
 *                           with `node scripts/instagram-token.mjs refresh`
 *   INSTAGRAM_HANDLE        optional; shown in "Follow" links. Falls back to
 *                           the username the API returns with each post
 *   INSTAGRAM_GRAPH_URL     optional; API base, default graph.instagram.com/v23.0.
 *                           Point it at a mock server in tests
 *
 * Responses are cached by Next's data cache for an hour, so a burst of
 * visitors does not become a burst of API calls.
 */

export const INSTAGRAM_GRAPH_URL = process.env.INSTAGRAM_GRAPH_URL ?? "https://graph.instagram.com/v23.0";

/** Seconds a page of posts stays cached before the API is asked again. */
export const INSTAGRAM_REVALIDATE_SECONDS = 60 * 60;

const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username";
const MAX_LIMIT = 50;

type RawMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  username?: string;
};

type RawResponse = {
  data?: RawMedia[];
  paging?: { cursors?: { after?: string }; next?: string };
  error?: { message?: string; type?: string; code?: number };
};

export class InstagramProvider implements SocialProvider {
  readonly name = "instagram" as const;

  constructor(private readonly accessToken: string) {}

  async fetchPosts({ limit, after }: FetchPostsOptions): Promise<SocialPage> {
    const url = new URL(`${INSTAGRAM_GRAPH_URL}/me/media`);
    url.searchParams.set("fields", FIELDS);
    url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), MAX_LIMIT)));
    if (after) url.searchParams.set("after", after);
    url.searchParams.set("access_token", this.accessToken);

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
    });
    const body = (await response.json().catch(() => ({}))) as RawResponse;
    if (!response.ok || body.error) {
      // Never include the URL: it carries the token.
      throw new Error(
        `Instagram API ${response.status}${body.error?.message ? `: ${body.error.message}` : ""}`,
      );
    }

    const posts = (body.data ?? []).map(normalize).filter((post): post is SocialPost => post !== null);
    const nextCursor = body.paging?.next ? (body.paging.cursors?.after ?? null) : null;
    return { posts, nextCursor };
  }

  account(posts: SocialPost[]): SocialAccount {
    const handle = process.env.INSTAGRAM_HANDLE?.replace(/^@/, "") ?? posts.find((p) => p.username)?.username ?? null;
    return { platform: "instagram", handle, url: handle ? `https://www.instagram.com/${handle}/` : null };
  }
}

/** Maps one API record to a SocialPost, or null when it has nothing we can show. */
export function normalize(raw: RawMedia): SocialPost | null {
  const mediaType = raw.media_type === "VIDEO" ? "video" : raw.media_type === "CAROUSEL_ALBUM" ? "carousel" : "image";
  // Videos: media_url is the video file; the still to show is thumbnail_url.
  const mediaUrl = (mediaType === "video" ? raw.thumbnail_url ?? null : raw.media_url ?? raw.thumbnail_url ?? null) ?? null;
  if (!raw.id || !mediaUrl) return null;
  return {
    id: raw.id,
    platform: "instagram",
    permalink: raw.permalink ?? null,
    caption: (raw.caption ?? "").trim(),
    mediaType,
    mediaUrl,
    timestamp: raw.timestamp ?? new Date(0).toISOString(),
    username: raw.username,
  };
}
