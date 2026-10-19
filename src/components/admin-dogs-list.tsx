"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { friendlyAdminError } from "@/lib/admin-ui";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
  type Dog,
  type DogStatus,
} from "@/lib/dogs";

export function AdminDogsList({ initialDogs }: { initialDogs: Dog[] }) {
  const router = useRouter();
  const [dogs, setDogs] = useState(initialDogs);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await fetch("/api/dogs");
    if (res.ok) setDogs((await res.json()) as Dog[]);
  }

  async function seedDatabase() {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const payload = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setMessage(
          friendlyAdminError(
            new Error(payload.error || "seed"),
            "Could not load sample dogs.",
          ),
        );
      } else {
        setMessage(payload.message || "Sample dogs added.");
      }
      await refresh();
      router.refresh();
    } catch (error) {
      setMessage(friendlyAdminError(error, "Could not load sample dogs."));
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: DogStatus) {
    const res = await fetch(`/api/dogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setMessage("Could not update status.");
      return;
    }
    await refresh();
  }

  async function removeDog(id: string) {
    if (!confirm("Delete this listing permanently?")) return;
    const res = await fetch(`/api/dogs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Could not delete this listing.");
      return;
    }
    setMessage("Listing deleted.");
    await refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-4xl font-bold uppercase tracking-[0.05em]">
            Dogs
          </h1>
          <p className="mt-2 text-ink-soft">
            All Blue Heeler listings — open one for full details.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={seedDatabase}
            disabled={busy}
          >
            Load sample dogs
          </button>
          <Link href="/admin/dogs/new" className="btn btn-primary">
            Add heeler
          </Link>
        </div>
      </div>

      {message ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      {dogs.length === 0 ? (
        <p className="border border-line bg-paper p-6 text-ink-soft">
          No dogs yet. Add a listing or load sample dogs.
        </p>
      ) : (
        <ul className="space-y-3">
          {dogs.map((dog) => (
            <li
              key={dog.id}
              className="grid gap-4 border border-line bg-paper p-4 md:grid-cols-[96px_1fr_auto] md:items-center"
            >
              <div className="relative aspect-square overflow-hidden bg-canvas-deep">
                <Image
                  src={dog.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="display text-2xl font-bold uppercase tracking-[0.04em]">
                  {dog.name}{" "}
                  <span className="text-base font-semibold text-slate">
                    {statusLabel(dog.status)}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {dog.sex} · {dog.color} · {dogAgeLabel(dog.birthDate)} ·{" "}
                  {formatPrice(dog.price)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
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
                      className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                      onClick={() => setStatus(dog.id, value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col">
                <Link
                  href={`/admin/dogs/${dog.id}`}
                  className="btn btn-primary !min-h-9 !text-sm"
                >
                  Details
                </Link>
                <Link
                  href={`/admin/dogs/${dog.id}/edit`}
                  className="btn btn-ghost !min-h-9 !text-sm"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost !min-h-9 !text-sm"
                  onClick={() => removeDog(dog.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
