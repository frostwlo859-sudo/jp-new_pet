"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
  type Dog,
  type DogStatus,
} from "@/lib/dogs";

export function AdminDogDetail({ dog }: { dog: Dog }) {
  const router = useRouter();
  const [status, setStatusState] = useState(dog.status);
  const [message, setMessage] = useState("");

  async function setStatus(next: DogStatus) {
    const res = await fetch(`/api/dogs/${dog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setMessage("Could not update status.");
      return;
    }
    setStatusState(next);
    setMessage("Status updated.");
    router.refresh();
  }

  async function removeDog() {
    if (!confirm(`Delete ${dog.name} permanently?`)) return;
    const res = await fetch(`/api/dogs/${dog.id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Could not delete this listing.");
      return;
    }
    router.push("/admin/dogs");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Dog details
          </p>
          <h1 className="display mt-1 text-4xl font-bold uppercase tracking-[0.05em]">
            {dog.name}
          </h1>
          <p className="mt-2 text-ink-soft">
            {statusLabel(status)} · {formatPrice(dog.price)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/dogs" className="btn btn-ghost !min-h-9">
            Back
          </Link>
          <Link
            href={`/available/${dog.id}`}
            className="btn btn-ghost !min-h-9"
            target="_blank"
          >
            View on site
          </Link>
          <Link
            href={`/admin/dogs/${dog.id}/edit`}
            className="btn btn-primary !min-h-9"
          >
            Edit
          </Link>
        </div>
      </div>

      {message ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      <div className="grid gap-6 border border-line bg-paper p-5 md:grid-cols-[280px_1fr] md:p-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-canvas-deep">
          <Image
            src={dog.image}
            alt={dog.name}
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              ["Sex", dog.sex],
              ["Color", dog.color],
              ["Age", dogAgeLabel(dog.birthDate)],
              ["Birth date", dog.birthDate],
              ["Sire", dog.sire || "—"],
              ["Dam", dog.dam || "—"],
              ["Registered", dog.registered ? "Yes" : "No"],
              ["Updated", new Date(dog.updatedAt).toLocaleString()],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          {dog.traits.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Traits
              </p>
              <p className="mt-1 text-ink">{dog.traits.join(" · ")}</p>
            </div>
          ) : null}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Description
            </p>
            <p className="mt-1 whitespace-pre-wrap leading-relaxed text-ink-soft">
              {dog.description}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Set status
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["available", "Available"],
                  ["reserved", "Reserved"],
                  ["sold", "Adopted"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`btn !min-h-9 !text-sm ${
                    status === value ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => setStatus(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-ghost !text-tan"
            onClick={removeDog}
          >
            Delete listing
          </button>
        </div>
      </div>
    </div>
  );
}
