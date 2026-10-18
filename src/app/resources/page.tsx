import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { resources } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blue Heeler resources — breed clubs, AKC references, and rescue starting points.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Go to the source"
        lead="Clubs, standards, and rescue channels beat impulse listings every time. Start informed."
        image={images.landscape}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted starting points"
            title="Clubs, registries, next steps"
          />
        </Reveal>

        <ul className="stagger mt-12 space-y-0 border border-line">
          {resources.map((item) => (
            <Reveal key={item.title} as="li">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 border-b border-line bg-paper px-6 py-7 transition-colors duration-150 last:border-b-0 hover:bg-canvas md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="display text-2xl font-bold uppercase tracking-[0.05em] text-ink md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-soft">{item.note}</p>
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-slate transition-transform duration-150 group-hover:translate-x-1">
                  Visit →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 border border-line bg-ink p-8 text-[#e8ece9] md:p-10">
          <h3 className="display text-3xl font-bold uppercase tracking-[0.05em]">
            Before you buy
          </h3>
          <p className="mt-3 max-w-2xl text-[#c5cec7]">
            Ask for health testing, meet parents when possible, and be honest
            about your exercise capacity. A good breeder will turn you away if
            the match is wrong — that&apos;s a feature.
          </p>
          <Link href="/fit-check" className="btn btn-on-dark mt-7">
            Revisit fit check
          </Link>
        </div>
      </section>
    </>
  );
}
