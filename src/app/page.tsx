import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatsStrip } from "@/components/stats-strip";
import { images } from "@/lib/images";
import { site } from "@/lib/nav";

export default function Home() {
  return (
    <>
      {/* Hero: brand-first, full-bleed, one composition */}
      <section className="relative min-h-[100dvh] overflow-hidden bg-ink text-[#f2f5f3]">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-scrim)" }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="display text-5xl font-bold uppercase leading-none tracking-[0.14em] md:text-7xl lg:text-8xl">
            {site.name}
          </p>
          <h1 className="mt-5 max-w-xl text-xl font-medium leading-snug text-[#e4ebe6] md:text-2xl">
            The working dog that still expects a job.
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-[#b7c2bb] md:text-lg">
            Blue Heelers for adoption — browse dogs looking for homes, read
            owner reviews, then run the fit check.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/available" className="btn btn-on-dark">
              Adopt a Blue Heeler
            </Link>
            <Link href="/reviews" className="btn btn-ghost-on-dark">
              Read reviews
            </Link>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="speckle mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why this atlas"
              title="Built as a working Blue Heeler. Living in your living room."
              lead="Blue Heelers — Australian Cattle Dogs — were forged for long days of hard work. That engine doesn’t switch off because the fence is a backyard."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/temperament" className="btn btn-primary">
                Temperament
              </Link>
              <Link href="/history" className="btn btn-ghost">
                Origins
              </Link>
            </div>
          </Reveal>
          <Reveal variant="media" className="relative aspect-[4/5] overflow-hidden bg-canvas-deep">
            <Image
              src={images.breed.src}
              alt={images.breed.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-[#e8ece9]">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image
              src={images.work.src}
              alt={images.work.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-16 md:px-12">
            <Reveal>
              <SectionHeading
                light
                eyebrow="The work"
                title="Miles, brains, and a clear brief"
                lead="Training isn’t optional enrichment — it’s how you keep loyalty from turning into chaos. Exercise the body. Employ the mind."
              />
              <Link href="/training" className="btn btn-on-dark mt-8 w-fit">
                Training field notes
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Three paths in"
            title="Start where you are"
          />
        </Reveal>
        <div className="stagger mt-12 grid gap-0 border border-line md:grid-cols-3">
          {[
            {
              href: "/available",
              kicker: "01",
              title: "Adopt",
              body: "Blue Heelers ready for adoption — status, fee, and lineage.",
            },
            {
              href: "/reviews",
              kicker: "02",
              title: "Reviews",
              body: "Honest notes from people who adopted a Blue Heeler.",
            },
            {
              href: "/fit-check",
              kicker: "03",
              title: "Fit check",
              body: "Seven blunt questions before you fall for the ears.",
            },
          ].map((item) => (
            <Reveal key={item.href} as="article">
              <Link
                href={item.href}
                className="group flex h-full flex-col border-line p-7 transition-colors duration-150 not-last:border-b md:not-last:border-b-0 md:not-last:border-r hover:bg-paper"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                  {item.kicker}
                </span>
                <h3 className="display mt-4 text-3xl font-bold uppercase tracking-[0.05em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">
                  {item.body}
                </p>
                <span className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-slate transition-transform duration-150 group-hover:translate-x-1">
                  Open →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <div className="absolute inset-0">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-ink/70" aria-hidden />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-24 md:px-8">
          <p className="display text-4xl font-bold uppercase tracking-[0.06em] text-[#f2f5f3] md:text-5xl">
            Ready for a Blue Heeler?
          </p>
          <p className="max-w-md text-base text-[#c5cec7]">
            An honest fit check before you adopt — drive, exercise, and whether
            this breed matches your life.
          </p>
          <Link href="/fit-check" className="btn btn-on-dark">
            Take the fit check
          </Link>
        </div>
      </section>
    </>
  );
}
