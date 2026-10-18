import Image from "next/image";
import Link from "next/link";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
  type Dog,
} from "@/lib/dogs";

export function DogCard({ dog }: { dog: Dog }) {
  return (
    <Link
      href={`/available/${dog.id}`}
      className="group flex h-full flex-col border border-line bg-paper transition-[transform,background-color] duration-150 hover:bg-canvas active:scale-[0.99]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas-deep">
        <Image
          src={dog.image}
          alt={`${dog.name} — ${dog.color} ${dog.sex.toLowerCase()} Blue Heeler`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
        />
        <span
          className={`absolute left-3 top-3 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
            dog.status === "available"
              ? "bg-slate text-[#f4f7f5]"
              : dog.status === "reserved"
                ? "bg-tan text-ink"
                : "bg-ink text-[#f4f7f5]"
          }`}
        >
          {statusLabel(dog.status)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-3xl font-bold uppercase tracking-[0.05em] text-ink">
            {dog.name}
          </h3>
          <p className="text-sm font-semibold text-slate">
            {formatPrice(dog.price)}
          </p>
        </div>
        <p className="mt-2 text-sm uppercase tracking-[0.08em] text-muted">
          {dog.sex} · {dog.color} · {dogAgeLabel(dog.birthDate)}
        </p>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {dog.description}
        </p>
        <span className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate transition-transform duration-150 group-hover:translate-x-1">
          {dog.status === "available" ? "View & adopt →" : "View details →"}
        </span>
      </div>
    </Link>
  );
}
