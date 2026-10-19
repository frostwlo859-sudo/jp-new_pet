"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { AdoptionRequest } from "@/lib/adoptions-store";
import {
  dogAgeLabel,
  formatPrice,
  statusLabel,
  type Dog,
  type DogStatus,
} from "@/lib/dogs";
import type { ContactMessage } from "@/lib/messages-store";

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
  initialDogs: Dog[];
  initialRequests: AdoptionRequest[];
  initialMessages: ContactMessage[];
};

export function AdminDashboard({
  initialDogs,
  initialRequests,
  initialMessages,
}: Props) {
  const [dogs, setDogs] = useState(initialDogs);
  const [requests, setRequests] = useState(initialRequests);
  const [messages, setMessages] = useState(initialMessages);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const stats = useMemo(() => {
    return {
      available: dogs.filter((d) => d.status === "available").length,
      reserved: dogs.filter((d) => d.status === "reserved").length,
      sold: dogs.filter((d) => d.status === "sold").length,
    };
  }, [dogs]);

  async function refresh() {
    const [dogsRes, reqRes, msgRes] = await Promise.all([
      fetch("/api/dogs"),
      fetch("/api/adoptions"),
      fetch("/api/messages"),
    ]);
    if (dogsRes.ok) {
      setDogs((await dogsRes.json()) as Dog[]);
    }
    if (reqRes.ok) {
      setRequests((await reqRes.json()) as AdoptionRequest[]);
    }
    if (msgRes.ok) {
      setMessages((await msgRes.json()) as ContactMessage[]);
    }
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setMessage("");
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    const payload = (await res.json()) as { url?: string; error?: string };
    setUploading(false);
    if (!res.ok || !payload.url) {
      setMessage(payload.error || "Image upload failed.");
      return;
    }
    setForm((prev) => ({ ...prev, image: payload.url! }));
    setMessage("Image uploaded to Cloudinary.");
  }

  async function setMessageStatus(
    id: string,
    status: ContactMessage["status"],
  ) {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setMessage("Could not update contact message.");
      return;
    }
    await refresh();
  }

  async function seedDatabase() {
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const payload = (await res.json()) as { message?: string; error?: string };
    setBusy(false);
    setMessage(payload.message || payload.error || "Seed finished.");
    await refresh();
  }

  async function setRequestStatus(
    id: string,
    status: AdoptionRequest["status"],
  ) {
    const res = await fetch(`/api/adoptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setMessage("Could not update adoption request.");
      return;
    }
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function startEdit(dog: Dog) {
    setEditingId(dog.id);
    setForm({
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
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
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

    const res = await fetch(editingId ? `/api/dogs/${editingId}` : "/api/dogs", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setBusy(false);
    if (!res.ok) {
      setMessage("Save failed — check fields and login session.");
      return;
    }

    setMessage(editingId ? "Listing updated." : "Listing created.");
    resetForm();
    await refresh();
  }

  async function removeDog(id: string) {
    if (!confirm("Delete this listing permanently?")) return;
    const res = await fetch(`/api/dogs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Delete failed.");
      return;
    }
    setMessage("Listing deleted.");
    if (editingId === id) resetForm();
    await refresh();
  }

  async function setStatus(id: string, status: DogStatus) {
    const res = await fetch(`/api/dogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setMessage("Status update failed.");
      return;
    }
    await refresh();
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-4xl font-bold uppercase tracking-[0.05em] text-ink">
            Kennel board
          </h1>
          <p className="mt-2 text-ink-soft">
            Create, edit, and mark Blue Heelers available / reserved / adopted.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={seedDatabase}
            disabled={busy}
          >
            Seed sample dogs
          </button>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Available", value: stats.available },
          { label: "Reserved", value: stats.reserved },
          { label: "Adopted", value: stats.sold },
          {
            label: "New requests",
            value: requests.filter((r) => r.status === "new").length,
          },
          {
            label: "New messages",
            value: messages.filter((m) => m.status === "new").length,
          },
        ].map((stat) => (
          <div key={stat.label} className="border border-line bg-paper p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
            <p className="display mt-1 text-4xl font-bold text-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 border border-line bg-paper p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="display text-2xl font-bold uppercase tracking-[0.05em]">
            {editingId ? "Edit listing" : "Add heeler"}
          </h2>
          {editingId ? (
            <button type="button" className="btn btn-ghost !min-h-9" onClick={resetForm}>
              Cancel edit
            </button>
          ) : null}
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
              Photo (Cloudinary)
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                className="field"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
              />
              <label className="btn btn-ghost !min-h-11 cursor-pointer whitespace-nowrap">
                {uploading ? "Uploading…" : "Upload image"}
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
            </div>
            {form.image ? (
              <div className="relative mt-3 h-28 w-40 overflow-hidden bg-canvas-deep">
                <Image
                  src={form.image}
                  alt=""
                  fill
                  sizes="160px"
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
            onChange={(e) =>
              setForm({ ...form, registered: e.target.checked })
            }
          />
          Registered
        </label>

        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : editingId ? "Update listing" : "Publish listing"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="display text-2xl font-bold uppercase tracking-[0.05em]">
          Contact messages ({messages.length})
        </h2>
        {messages.length === 0 ? (
          <p className="border border-line bg-paper p-5 text-ink-soft">
            No contact messages yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li key={msg.id} className="border border-line bg-paper p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="display text-xl font-bold uppercase tracking-[0.04em]">
                      {msg.topic}{" "}
                      <span className="text-sm font-semibold text-slate">
                        {msg.status}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {msg.name} · {msg.email}
                      {msg.dog ? ` · ${msg.dog}` : ""}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {msg.message}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "read", "replied"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                        onClick={() => setMessageStatus(msg.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="display text-2xl font-bold uppercase tracking-[0.05em]">
          Adoption requests ({requests.length})
        </h2>
        {requests.length === 0 ? (
          <p className="border border-line bg-paper p-5 text-ink-soft">
            No adoption requests yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {requests.map((req) => (
              <li key={req.id} className="border border-line bg-paper p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="display text-xl font-bold uppercase tracking-[0.04em]">
                      {req.dogName}{" "}
                      <span className="text-sm font-semibold text-slate">
                        {req.status}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {req.name} · {req.email} · {req.phone}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {req.experience}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["new", "contacted", "approved", "declined"] as const
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                        onClick={() => setRequestStatus(req.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="display text-2xl font-bold uppercase tracking-[0.05em]">
          All listings ({dogs.length})
        </h2>
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
                  <button
                    type="button"
                    className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                    onClick={() => setStatus(dog.id, "available")}
                  >
                    Available
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                    onClick={() => setStatus(dog.id, "reserved")}
                  >
                    Reserved
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                    onClick={() => setStatus(dog.id, "sold")}
                  >
                    Adopted
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col">
                <Link
                  href={`/available/${dog.id}`}
                  className="btn btn-ghost !min-h-9 !text-sm"
                >
                  View
                </Link>
                <button
                  type="button"
                  className="btn btn-primary !min-h-9 !text-sm"
                  onClick={() => startEdit(dog)}
                >
                  Edit
                </button>
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
      </div>
    </div>
  );
}
