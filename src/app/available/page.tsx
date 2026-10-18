import type { Metadata } from "next";
import Link from "next/link";
import { DogCard } from "@/components/dog-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { readDogs } from "@/lib/dogs-store";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Available Heelers",
  description:
    "Blue Heelers currently available for adoption, reserved, or recently adopted.",
};

export const dynamic = "force-dynamic";

export default async function AvailablePage() {
  let dogs: Awaited<ReturnType<typeof readDogs>> = [];
  let dbError = "";

  try {
    dogs = await readDogs();
  } catch (error) {
    dbError =
      error instanceof Error
        ? error.message
        : "Database unavailable. Set MONGODB_URI to load listings.";
  }

  const forSale = dogs.filter((d) => d.status !== "sold");
  const sold = dogs.filter((d) => d.status === "sold");

  return (
    <>
      <PageHero
        eyebrow="Adoption"
        title="Blue Heelers ready for homes"
        lead="Browse Blue Heelers looking for adoption. Every listing includes temperament notes, lineage, and status — available, reserved, or adopted."
        image={images.hero}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        {dbError ? (
          <p className="mb-8 border border-line bg-paper p-5 text-ink-soft">
            {dbError}
          </p>
        ) : null}
        <Reveal>
          <SectionHeading
            eyebrow="Current kennel"
            title={`${forSale.length} dogs on the board`}
            lead="Serious inquiries only. Run the fit check first if you are new to the breed."
          />
        </Reveal>

        {forSale.length === 0 ? (
          <p className="mt-10 text-ink-soft">
            No dogs listed right now.{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Join the waitlist
            </Link>
            .
          </p>
        ) : (
          <div className="stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forSale.map((dog) => (
              <Reveal key={dog.id}>
                <DogCard dog={dog} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/fit-check" className="btn btn-primary">
            Fit check first
          </Link>
          <Link href="/available" className="btn btn-ghost">
            Pick a Heeler to adopt
          </Link>
        </div>
      </section>

      {sold.length > 0 ? (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Recently placed"
              title="Adopted — still part of the story"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sold.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
