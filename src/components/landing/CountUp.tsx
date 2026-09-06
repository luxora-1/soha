type CountUpProps = {
  /** The final figure as shown, e.g. "91%", "$99", "1,200+". Prefix and suffix are kept. */
  value: string;
  /** Seconds to wait once in view; use to stagger siblings. */
  delay?: number;
  className?: string;
};

/**
 * A figure that counts up from zero the first time it scrolls into view.
 * Renders the final value, so the page reads correctly without JavaScript and
 * in the first frame; the counting is done by the motion orchestrator, which
 * reads the target from `data-count` rather than the live text. Wrap the figure in <Unverified> as usual.
 */
export function CountUp({ value, delay = 0, className }: CountUpProps) {
  return (
    <span data-count={value} data-delay={delay ? Math.round(delay * 1000) : undefined} className={className}>
      {value}
    </span>
  );
}
