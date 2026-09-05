"use client";

import { useEffect, useRef, useState } from "react";
import { SocialPostCard } from "@/components/social/SocialPostCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { communityContent } from "@/content/community";
import type { SocialPost } from "@/lib/social/types";

type SocialFeedGridProps = {
  initialPosts: SocialPost[];
  initialCursor: string | null;
  /** Posts revealed per step and requested per API page. */
  pageSize?: number;
};

type Status = "idle" | "loading" | "error";

/**
 * The community grid. The first page is server-rendered; as the reader
 * nears the end, more posts reveal in steps, and when those run out the
 * next page is fetched from /api/social. A visible "Show more" button does
 * the same job for keyboard users and when IntersectionObserver is absent.
 */
export function SocialFeedGrid({ initialPosts, initialCursor, pageSize = 8 }: SocialFeedGridProps) {
  const copy = communityContent.feed;
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [visible, setVisible] = useState(Math.min(pageSize, initialPosts.length));
  const [status, setStatus] = useState<Status>("idle");
  const sentinel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const exhausted = visible >= posts.length && cursor === null;

  const loadMore = async () => {
    if (busy.current || exhausted) return;
    if (visible < posts.length) {
      setVisible((v) => Math.min(v + pageSize, posts.length));
      return;
    }
    busy.current = true;
    setStatus("loading");
    try {
      const params = new URLSearchParams({ limit: String(pageSize) });
      if (cursor) params.set("after", cursor);
      const response = await fetch(`/api/social?${params}`);
      const payload = (await response.json()) as { ok: boolean; posts?: SocialPost[]; nextCursor?: string | null };
      if (!response.ok || !payload.ok || !payload.posts) throw new Error(`HTTP ${response.status}`);
      const fresh = payload.posts.filter((p) => !posts.some((existing) => existing.id === p.id));
      setPosts((current) => [...current, ...fresh]);
      setVisible((v) => v + fresh.length);
      setCursor(payload.nextCursor ?? null);
      setStatus("idle");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  };

  // Load as the sentinel scrolls into view. The button remains as the fallback.
  useEffect(() => {
    const node = sentinel.current;
    if (!node || exhausted || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        // In view, or already scrolled past (e.g. the page restored a deep scroll position).
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0)) void loadMore();
      },
      { rootMargin: "0px 0px 40% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // loadMore reads the latest state through closures re-created each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, posts.length, cursor, exhausted]);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4" aria-label={copy.label}>
        {posts.slice(0, visible).map((post) => (
          <li key={post.id}>
            <SocialPostCard post={post} />
          </li>
        ))}
      </ul>

      <div ref={sentinel} aria-hidden="true" className="h-px" />

      <div className="mt-10 flex flex-col items-center gap-3 text-center" aria-live="polite">
        {status === "error" && <p className="text-base text-ink-muted">We couldn&apos;t load more posts just now.</p>}
        {exhausted ? (
          <p className="text-base text-ink-muted">{copy.end}</p>
        ) : (
          <CTAButton type="button" variant="secondary" onClick={() => void loadMore()} aria-disabled={status === "loading"}>
            {status === "loading" ? copy.loading : copy.loadMore}
          </CTAButton>
        )}
      </div>
    </div>
  );
}
