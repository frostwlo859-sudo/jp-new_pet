import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { historyBeats } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "History",
  description:
    "History of the Australian Cattle Dog — from Australian stations to modern sport and family life.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Origins"
        title="Forged on the stations"
        lead="This isn’t a designer companion breed. It’s a tool that learned to love its handler — shaped by heat, distance, and difficult cattle."
        image={images.landscape}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="How the heeler happened"
          />
        </Reveal>

        <ol className="stagger relative mt-14 space-y-0 border-l-2 border-slate pl-0 md:pl-0">
          {historyBeats.map((beat) => (
            <Reveal key={beat.era} as="li">
              <div className="grid gap-3 border-b border-line py-10 first:pt-0 last:border-b-0 md:grid-cols-[8rem_1fr] md:gap-10">
                <p className="display text-xl font-bold uppercase tracking-[0.08em] text-slate md:pt-1">
                  {beat.era}
                </p>
                <div>
                  <h3 className="display text-3xl font-bold uppercase tracking-[0.05em] text-ink">
                    {beat.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                    {beat.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Link href="/breed" className="btn btn-primary mt-10">
          Back to breed overview
        </Link>
      </section>
    </>
  );
}
