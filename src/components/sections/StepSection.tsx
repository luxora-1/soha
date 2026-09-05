import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";

type StepSectionProps = {
  number: string;
  title: string;
  body: readonly string[];
  imageBrief: string;
  /** Alternate the image side down the page. */
  imageSide: "left" | "right";
  tone: "base" | "alt";
  id: string;
};

/** One full section per step on /how-it-works, alternating text and image. */
export function StepSection({ number, title, body, imageBrief, imageSide, tone, id }: StepSectionProps) {
  const headingId = `${id}-heading`;
  return (
    <SectionWrapper tone={tone} id={id} labelledBy={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeUp
          className={cn(
            "lg:col-span-5",
            imageSide === "left" ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
          )}
        >
          <Eyebrow>Step {number}</Eyebrow>
          <h2 id={headingId} className="mt-5">
            {title}
          </h2>
          <div className="mt-6 max-w-measure space-y-4 text-body text-ink-muted">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeUp>
        <FadeUp
          delay={0.1}
          className={cn("lg:col-span-6", imageSide === "left" ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}
        >
          <ImagePlaceholder ratio="landscape" brief={imageBrief} />
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
