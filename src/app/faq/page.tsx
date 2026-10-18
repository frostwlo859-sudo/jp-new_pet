import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Blue Heeler FAQ — first dogs, apartments, shedding, aggression myths, blue vs red, and where to get one.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers"
        lead="The questions people ask after the cute photos — and before the crate arrives."
        image={images.breed}
      />

      <section className="mx-auto max-w-3xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading eyebrow="Common questions" title="Clear the fog" />
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <Reveal key={item.q}>
              <details className="faq-item group border border-line bg-paper open:bg-canvas">
                <summary className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="display text-left text-xl font-bold uppercase tracking-[0.04em] text-ink md:text-2xl">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 text-slate transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="border-t border-line px-5 py-4 text-base leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Link href="/contact" className="btn btn-primary mt-10">
          Ask something else
        </Link>
      </section>
    </>
  );
}
