import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { temperamentTraits } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Temperament",
  description:
    "Blue Heeler temperament — loyalty, drive, stranger wariness, and what happens without a job.",
};

export default function TemperamentPage() {
  return (
    <>
      <PageHero
        eyebrow="Temperament"
        title="Loyal. Watchful. Wired for work."
        lead="AKC sums them up as loyal, intelligent, tenacious. Live with one and you’ll add: opinionated, sticky, and endlessly busy unless you lead."
        image={images.bond}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What you’ll feel day to day"
            title="Four truths before the honeymoon"
          />
        </Reveal>
        <div className="stagger mt-12 grid gap-0 border border-line sm:grid-cols-2">
          {temperamentTraits.map((trait, i) => (
            <Reveal key={trait.title} as="article">
              <div className="h-full border-line bg-paper p-7 sm:odd:border-r sm:[&:nth-child(-n+2)]:border-b">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                  0{i + 1}
                </span>
                <h3 className="display mt-3 text-2xl font-bold uppercase tracking-[0.05em] text-ink md:text-3xl">
                  {trait.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {trait.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-[#e8ece9]">
        <div className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Household fit"
              title="Not soft. Not mean. Specific."
              lead="They can be wonderful with their people and sharp with chaos they weren’t taught to handle. Socialize early. Supervise kids. Respect the guardian instinct instead of pretending it isn’t there."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/fit-check" className="btn btn-on-dark">
                Check your fit
              </Link>
              <Link href="/training" className="btn btn-ghost-on-dark">
                Training notes
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
