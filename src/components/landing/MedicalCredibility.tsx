import { ImageSlot } from "@/components/landing/ImageSlot";
import { CheckIcon } from "@/components/landing/icons";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** The prescriber and clinical oversight behind the product. Portrait beside the copy. */
export function MedicalCredibility() {
  const { medical } = landingContent;

  return (
    <SectionWrapper tone="alt" id="medical" labelledBy="medical-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="medical-heading">{medical.headline}</h2>
          <p className="mt-6 max-w-measure text-body text-ink">
            <Unverified note={medical.lead.verify}>{medical.lead.text}</Unverified>
          </p>
          <p className="mt-4 max-w-measure text-body text-ink-muted">{medical.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {medical.points.map((point) => (
              <li key={point.label} className="flex items-start gap-3 rounded-card bg-base px-4 py-3 text-base text-ink">
                <CheckIcon className="mt-0.5 text-accent" />
                <Unverified note={point.verify}>{point.label}</Unverified>
              </li>
            ))}
          </ul>
        </div>

        <figure className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <ImageSlot {...slot(medical.portrait)} sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-soft" />
          <figcaption className="mt-4 text-base">
            <span className="block font-medium text-ink">
              <Unverified note={medical.name.verify}>{medical.name.text}</Unverified>
            </span>
            <span className="block text-ink-muted">
              <Unverified note={medical.role.verify}>{medical.role.text}</Unverified>
            </span>
          </figcaption>
        </figure>
      </div>
    </SectionWrapper>
  );
}
