import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DogCard } from "@/components/dog-card";
import { Reveal } from "@/components/reveal";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
} from "@/lib/dogs";
import { getDog, readDogs } from "@/lib/dogs-store";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) return { title: "Dog not found" };
  return {
    title: `${dog.name} — ${statusLabel(dog.status)}`,
    description: dog.description,
  };
}

export default async function DogDetailPage({ params }: Props) {
  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) notFound();

  const others = (await readDogs())
    .filter((item) => item.id !== dog.id && item.status === "available")
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-ink text-[#f2f5f3]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[640px]">
            <Image
              src={dog.image}
              alt={dog.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-12 md:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#aeb8b1]">
              {statusLabel(dog.status)} · Adoption fee {formatPrice(dog.price)}
            </p>
            <h1 className="display mt-3 text-5xl font-bold uppercase tracking-[0.04em] md:text-7xl">
              {dog.name}
            </h1>
            <p className="mt-4 text-lg text-[#c5cec7]">
              {dog.sex} · {dog.color} · {dogAgeLabel(dog.birthDate)}
              {dog.registered ? " · Registered" : ""}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#d5ddd7]">
              {dog.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {dog.status === "available" ? (
                <Link href={`/adopt/${dog.id}`} className="btn btn-on-dark">
                  Adopt {dog.name}
                </Link>
              ) : (
                <Link href="/available" className="btn btn-on-dark">
                  See other dogs
                </Link>
              )}
              <Link href="/fit-check" className="btn btn-ghost-on-dark">
                Fit check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="display text-3xl font-bold uppercase tracking-[0.05em]">
              Lineage
            </h2>
            <dl className="mt-6 space-y-4 border border-line bg-paper p-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Sire
                </dt>
                <dd className="mt-1 text-lg text-ink">{dog.sire || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Dam
                </dt>
                <dd className="mt-1 text-lg text-ink">{dog.dam || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Birth date
                </dt>
                <dd className="mt-1 text-lg text-ink">{dog.birthDate}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal>
            <h2 className="display text-3xl font-bold uppercase tracking-[0.05em]">
              Traits
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {dog.traits.map((trait) => (
                <li
                  key={trait}
                  className="border border-line bg-paper px-3 py-2 text-sm uppercase tracking-[0.08em] text-ink-soft"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {others.length > 0 ? (
          <div className="mt-16">
            <h2 className="display text-3xl font-bold uppercase tracking-[0.05em]">
              Also available
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <li key={item.id}>
                  <DogCard dog={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  );
}
