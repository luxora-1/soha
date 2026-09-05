import { StarIcon } from "@/components/landing/icons";
import { Unverified } from "@/components/landing/Unverified";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/** Five stars, the score, and the review count. Both figures are <Unverified>. */
export function RatingLine({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { rating } = landingContent.hero;
  const dark = tone === "dark";
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-base", dark ? "text-on-primary" : "text-ink", className)}>
      <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <span>
        <Unverified note={rating.value.verify}>{rating.value.text}</Unverified> {rating.outOf}
      </span>
      <span className={dark ? "text-on-primary/75" : "text-ink-muted"}>
        <Unverified note={rating.count.verify}>{rating.count.text}</Unverified> {rating.countLabel}
      </span>
    </p>
  );
}
