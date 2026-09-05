import { SectionWrapper, type SectionTone } from "@/components/sections/SectionWrapper";

/**
 * TESTIMONIAL_PLACEHOLDER — NOT FOR LAUNCH.
 *
 * Deliberately unstyled so it cannot ship by accident. Inline styles are used
 * on purpose to sit outside the design system. Do not "tidy" this component;
 * replace it with real, approved social proof or delete it before launch.
 */
export function SocialProofPlaceholder({ tone = "base" }: { tone?: SectionTone }) {
  return (
    <SectionWrapper tone={tone} label="Testimonials placeholder">
      <div
        data-not-for-launch="true"
        style={{
          background: "#cccccc",
          border: "4px dashed #555555",
          color: "#111111",
          fontFamily: "monospace",
          fontSize: "18px",
          padding: "48px 24px",
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        TESTIMONIAL_PLACEHOLDER — NOT FOR LAUNCH
      </div>
    </SectionWrapper>
  );
}
