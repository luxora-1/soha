import { cn } from "@/lib/cn";

type GuaranteeSealProps = {
  /** Text around the ring, e.g. "90-day money-back guarantee". */
  ring: string;
  /** Large figure in the middle, e.g. "90". */
  center: string;
  /** Small word under the figure, e.g. "days". */
  unit: string;
  /** Distinguishes the SVG path id when more than one seal is on the page. */
  id?: string;
  className?: string;
};

/**
 * A stamp: the guarantee spelled around a slowly turning ring, the figure
 * still in the middle. Inherits its colour. Wrap in <Unverified> where the
 * terms are not yet confirmed.
 */
export function GuaranteeSeal({ ring, center, unit, id = "seal", className }: GuaranteeSealProps) {
  const pathId = `${id}-ring`;
  return (
    <span className={cn("relative inline-flex h-36 w-36 items-center justify-center", className)}>
      <svg viewBox="0 0 160 160" aria-hidden="true" className="absolute inset-0 h-full w-full motion-safe:animate-spin-slow">
        <defs>
          <path id={pathId} d="M80,80 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
        </defs>
        <text className="fill-current font-sans text-[0.72rem] font-semibold uppercase" style={{ letterSpacing: "0.22em" }}>
          <textPath href={`#${pathId}`} textLength="414" lengthAdjust="spacing">
            {`${ring} · `}
          </textPath>
        </text>
      </svg>
      <span className="flex h-[5.75rem] w-[5.75rem] flex-col items-center justify-center rounded-full bg-[rgb(var(--bg-rgb)/0.1)] ring-1 ring-[rgb(var(--bg-rgb)/0.3)]">
        <span className="font-sans text-[2rem] font-bold leading-none tracking-[-0.03em]">{center}</span>
        <span className="mt-1 font-sans text-[0.6875rem] font-medium uppercase tracking-eyebrow opacity-80">{unit}</span>
      </span>
    </span>
  );
}
