"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { friendlyAdminError } from "@/lib/admin-ui";
import type { Dog, DogStatus } from "@/lib/dogs";

const emptyForm = {
  name: "",
  sex: "Female" as Dog["sex"],
  color: "Blue" as Dog["color"],
  birthDate: "",
  price: "1800",
  status: "available" as DogStatus,
  description: "",
  image: "/images/hero.jpg",
  traits: "",
  sire: "",
  dam: "",
  registered: true,
};

type Props = {
  dog?: Dog;
};

export function AdminDogForm({ dog }: Props) {
  const router = useRouter();
  const editing = Boolean(dog);
  const [form, setForm] = useState(
    dog
      ? {
          name: dog.name,
          sex: dog.sex,
          color: dog.color,
          birthDate: dog.birthDate,
          price: String(dog.price),
          status: dog.status,
          description: dog.description,
          image: dog.image,
          traits: dog.traits.join(", "),
          sire: dog.sire,
          dam: dog.dam,
          registered: dog.registered,
        }
      : emptyForm,
  );
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);
    setMessage("");
    const body = new FormData();
    body.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const payload = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !payload.url) {
        setMessage(
          friendlyAdminError(
            new Error(payload.error || "upload"),
            "Photo upload failed. Try again.",
          ),
        );
        return;
      }
      setForm((prev) => ({ ...prev, image: payload.url! }));
      setMessage("Photo saved.");
    } catch (error) {
      setMessage(friendlyAdminError(error, "Photo upload failed. Try again."));
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    const payload = {
      name: form.name,
      sex: form.sex,
      color: form.color,
      birthDate: form.birthDate,
      price: Number(form.price),
      status: form.status,
      description: form.description,
      image: form.image,
      traits: form.traits
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      sire: form.sire,
      dam: form.dam,
      registered: form.registered,
    };

    try {
      const res = await fetch(dog ? `/api/dogs/${dog.id}` : "/api/dogs", {
        method: dog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        error?: string;
      };
      if (!res.ok) {
        setMessage(
          friendlyAdminError(
            new Error(data.error || "save"),
            "Could not save this listing. Check the fields and try again.",
          ),
        );
        return;
      }
      const id = dog?.id || data.id;
      router.push(id ? `/admin/dogs/${id}` : "/admin/dogs");
      router.refresh();
    } catch (error) {
      setMessage(
        friendlyAdminError(
          error,
          "Could not save this listing. Try again in a moment.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-line bg-paper p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="display text-3xl font-bold uppercase tracking-[0.05em]">
          {editing ? `Edit ${dog!.name}` : "Add a heeler"}
        </h1>
        <Link href={dog ? `/admin/dogs/${dog.id}` : "/admin/dogs"} className="btn btn-ghost !min-h-9">
          Cancel
        </Link>
      </div>

      {message ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Name
          </span>
          <input
            className="field"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Price (USD)
          </span>
          <input
            className="field"
            type="number"
            min={0}
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Sex
          </span>
          <select
            className="field"
            value={form.sex}
            onChange={(e) =>
              setForm({ ...form, sex: e.target.value as Dog["sex"] })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Color
          </span>
          <select
            className="field"
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value as Dog["color"] })
            }
          >
            <option>Blue</option>
            <option>Red Speckle</option>
            <option>Blue Mottled</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Birth date
          </span>
          <input
            className="field"
            type="date"
            required
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Status
          </span>
          <select
            className="field"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as DogStatus })
            }
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Adopted</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Photo
          </span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="btn btn-ghost !min-h-11 cursor-pointer whitespace-nowrap">
              {uploading ? "Uploading…" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadImage(file);
                  e.target.value = "";
                }}
              />
            </label>
            <p className="text-sm text-muted">
              Choose a clear photo of the dog. It updates when upload finishes.
            </p>
          </div>
          {form.image ? (
            <div className="relative mt-3 h-36 w-48 overflow-hidden bg-canvas-deep">
              <Image
                src={form.image}
                alt=""
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          ) : null}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Traits (comma-separated)
          </span>
          <input
            className="field"
            value={form.traits}
            onChange={(e) => setForm({ ...form, traits: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Sire
          </span>
          <input
            className="field"
            value={form.sire}
            onChange={(e) => setForm({ ...form, sire: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Dam
          </span>
          <input
            className="field"
            value={form.dam}
            onChange={(e) => setForm({ ...form, dam: e.target.value })}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Description
        </span>
        <textarea
          className="field field-area"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          className="size-4 accent-[var(--slate)]"
          checked={form.registered}
          onChange={(e) => setForm({ ...form, registered: e.target.checked })}
        />
        Registered
      </label>

      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Saving…" : editing ? "Save changes" : "Publish listing"}
      </button>
    </form>
  );
}
