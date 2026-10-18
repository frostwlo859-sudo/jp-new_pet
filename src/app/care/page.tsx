import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { careBlocks } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Care",
  description:
    "Blue Heeler care — grooming, nutrition, routine maintenance, and health topics to discuss with breeders.",
};

export default function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Care & upkeep"
        title="Low fuss coat. High output body."
        lead="Grooming is straightforward. Keeping joints, mind, and metabolism matched to the work is the real care plan."
        image={images.close}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Field maintenance"
            title="What “easy coat” still requires"
          />
        </Reveal>
        <ol className="stagger mt-12 space-y-0 border border-line">
          {careBlocks.map((block, i) => (
            <Reveal key={block.title} as="li">
              <div className="grid gap-4 border-b border-line bg-paper p-6 last:border-b-0 md:grid-cols-[5rem_1fr] md:gap-8 md:p-8">
                <span className="display text-4xl font-bold text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl font-bold uppercase tracking-[0.05em] text-ink md:text-3xl">
                    {block.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                    {block.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Link href="/resources" className="btn btn-primary mt-10">
          Health & club resources
        </Link>
      </section>
    </>
  );
}
