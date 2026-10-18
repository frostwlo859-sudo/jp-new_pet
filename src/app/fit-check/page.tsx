import type { Metadata } from "next";
import { FitCheck } from "@/components/fit-check";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Fit Check",
  description:
    "Is a Blue Heeler right for you? An honest lifestyle checklist for Australian Cattle Dog ownership.",
};

export default function FitCheckPage() {
  return (
    <>
      <PageHero
        eyebrow="Fit check"
        title="Seven questions. No fluff."
        lead="Check every box you can honestly own today — not the lifestyle you hope a puppy will magically create."
        image={images.bond}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Lifestyle audit"
            title="Mark what you can sustain"
            lead="This isn’t a pass/fail quiz for strangers on the internet. It’s a mirror. Heelers reward honesty."
          />
        </Reveal>
        <div className="mt-12">
          <FitCheck />
        </div>
      </section>
    </>
  );
}
