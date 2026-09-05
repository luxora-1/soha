import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageIntro } from "@/components/ui/PageIntro";
import { startContent as content } from "@/content/pages";

export const metadata: Metadata = {
  title: "Start your consult",
  description: content.intro,
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return (
    <>
      <PageIntro eyebrow={content.eyebrow} headline={content.headline} subhead={content.intro} />

      <SectionWrapper tone="alt" padding="default" labelledBy="intake-heading">
        <h2 id="intake-heading" className="sr-only">
          Your details
        </h2>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-accent-soft bg-base p-6 sm:p-8 lg:p-10">
              <IntakeForm
                submitLabel={content.submit}
                privacyNote={content.privacyNote}
                confirmationHeadline={content.confirmation.headline}
              />
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <ImagePlaceholder ratio="portrait" brief="Woman mid-40s on a sofa with her phone, relaxed" />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
