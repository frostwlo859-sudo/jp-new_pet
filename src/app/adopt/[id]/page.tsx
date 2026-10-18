import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdoptForm } from "@/components/adopt-form";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
} from "@/lib/dogs";
import { getDog } from "@/lib/dogs-store";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) return { title: "Adopt" };
  return {
    title: `Adopt ${dog.name}`,
    description: `Adopt ${dog.name}, a Blue Heeler — adoption fee ${formatPrice(dog.price)}.`,
  };
}

export default async function AdoptPage({ params }: Props) {
  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) notFound();

  if (dog.status === "sold") {
    redirect("/available");
  }

  if (dog.status === "reserved") {
    redirect(`/available/${dog.id}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
        Blue Heeler adoption
      </p>
      <h1 className="display mt-2 text-4xl font-bold uppercase tracking-[0.04em] text-ink md:text-6xl">
        Adopt {dog.name}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Request to adopt this Blue Heeler. We review your home first — no
        payment on this page.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <aside className="border border-line bg-paper">
          <div className="relative aspect-[4/3] overflow-hidden bg-canvas-deep">
            <Image
              src={dog.image}
              alt={`Blue Heeler ${dog.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {statusLabel(dog.status)}
            </p>
            <h2 className="display mt-1 text-3xl font-bold uppercase tracking-[0.05em]">
              {dog.name}
            </h2>
            <p className="mt-2 text-ink-soft">
              Blue Heeler · {dog.sex} · {dog.color} ·{" "}
              {dogAgeLabel(dog.birthDate)}
            </p>
            <p className="display mt-4 text-3xl font-bold text-slate">
              {formatPrice(dog.price)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
              Adoption fee
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {dog.description}
            </p>
            <Link
              href={`/available/${dog.id}`}
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.12em] text-slate"
            >
              ← Back to details
            </Link>
          </div>
        </aside>

        <AdoptForm
          dog={{
            id: dog.id,
            name: dog.name,
            price: dog.price,
            color: dog.color,
            sex: dog.sex,
          }}
        />
      </div>
    </section>
  );
}
