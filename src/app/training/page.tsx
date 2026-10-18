import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { trainingPillars } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Training a Blue Heeler — exercise volume, mental work, heel instinct, and consistent leadership.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training & exercise"
        title="Give them a job or they take one"
        lead="Long walks aren’t enough. Heelers need pace, purpose, and practice. Underemployed dogs don’t “settle” — they escalate."
        image={images.work}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Operating system"
              title="Four pillars that keep the peace"
            />
          </Reveal>
          <Reveal variant="media" className="relative aspect-[16/11] overflow-hidden bg-canvas-deep lg:mt-10">
            <Image
              src={images.landscape.src}
              alt={images.landscape.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="stagger mt-14 grid gap-8 md:grid-cols-2">
          {trainingPillars.map((pillar, i) => (
            <Reveal key={pillar.title} as="article">
              <div className="border-t-2 border-slate pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Pillar {i + 1}
                </p>
                <h3 className="display mt-2 text-3xl font-bold uppercase tracking-[0.05em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/fit-check" className="btn btn-primary">
            Still think you’re ready?
          </Link>
          <Link href="/faq" className="btn btn-ghost">
            Common objections
          </Link>
        </div>
      </section>
    </>
  );
}
