import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatsStrip } from "@/components/stats-strip";
import { colorNotes } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Breed",
  description:
    "Australian Cattle Dog overview — size, coat colors, working build, and what “Blue Heeler” really means.",
};

export default function BreedPage() {
  return (
    <>
      <PageHero
        eyebrow="Breed overview"
        title="Strong. Compact. Tireless."
        lead="The Australian Cattle Dog is a symmetrically built working dog — substance and agility without bulk. Built to move cattle all day, then still watch the gate."
        image={images.breed}
      />
      <StatsStrip />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="General appearance"
              title="A dog that looks like it can work"
              lead="Hard muscular condition, level topline, deep chest, and a head that signals alert intelligence. Anything soft, weedy, or overdone fights the job."
            />
            <ul className="mt-8 space-y-4 text-ink-soft">
              <li className="border-l-2 border-slate pl-4">
                Pricked ears, dark oval eyes, and that characteristic watchful glint.
              </li>
              <li className="border-l-2 border-slate pl-4">
                Weather-resistant double coat — short, dense, straight outer hair.
              </li>
              <li className="border-l-2 border-slate pl-4">
                Gait: free, supple, tireless — sudden direction changes are part of the design.
              </li>
            </ul>
          </Reveal>
          <Reveal variant="media" className="relative min-h-[360px] overflow-hidden bg-canvas-deep lg:min-h-full">
            <Image
              src={images.close.src}
              alt={images.close.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Colors"
              title="Blue Heeler & Red Speckle"
              lead="Same breed standard. Different paint. “Blue Heeler” is the nickname; Australian Cattle Dog is the formal name."
            />
          </Reveal>
          <div className="mt-12 grid gap-0 border border-line md:grid-cols-2">
            {colorNotes.map((color) => (
              <Reveal key={color.name} as="article">
                <div className="h-full border-line p-8 not-last:border-b md:not-last:border-b-0 md:not-last:border-r">
                  <h3 className="display text-3xl font-bold uppercase tracking-[0.06em] text-ink">
                    {color.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {color.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link href="/history" className="btn btn-primary mt-10">
            Read the origin story
          </Link>
        </div>
      </section>
    </>
  );
}
