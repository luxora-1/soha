import { NextResponse } from "next/server";
import { getSocialFeed } from "@/lib/social";

/**
 * GET /api/social?after=<cursor>&limit=<n>
 *
 * The next page of the community feed, for the grid's load-on-scroll. The
 * first page is rendered on the server; this route serves the rest. Posts
 * come from the configured provider (src/lib/social) and are cached there.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") ?? undefined;
  const limitParam = Number(searchParams.get("limit") ?? "12");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(Math.trunc(limitParam), 1), 24) : 12;
  if (after && !/^[A-Za-z0-9_=-]{1,512}$/.test(after)) {
    return NextResponse.json({ ok: false, error: "Invalid cursor." }, { status: 400 });
  }

  const feed = await getSocialFeed({ limit, after });
  return NextResponse.json(
    { ok: true, posts: feed.posts, nextCursor: feed.nextCursor, source: feed.source },
    { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } },
  );
}
