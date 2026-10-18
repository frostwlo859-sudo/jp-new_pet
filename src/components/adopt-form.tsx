"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { formatPrice, type Dog } from "@/lib/dogs";

type Props = {
  dog: Pick<Dog, "id" | "name" | "price" | "color" | "sex">;
};

export function AdoptForm({ dog }: Props) {
  const [sent, setSent] = useState(false);
  const adoptionFee = dog.price;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent("generate_lead", {
      form: "adoption_application",
      dog_id: dog.id,
      dog_name: dog.name,
      value: dog.price,
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-paper p-8">
        <p className="display text-3xl font-bold uppercase tracking-[0.06em] text-ink">
          Adoption request received
        </p>
        <p className="mt-3 max-w-lg text-ink-soft">
          Thanks — your adoption request for <strong>{dog.name}</strong> is with
          the kennel. They&apos;ll follow up about a meet, the adoption fee (
          {formatPrice(adoptionFee)}), and next steps. Nothing is charged on
          this form.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/available" className="btn btn-primary">
            See more Heelers
          </Link>
          <Link href={`/available/${dog.id}`} className="btn btn-ghost">
            View {dog.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 border border-line bg-paper p-6 md:p-8"
    >
      <div>
        <h2 className="display text-2xl font-bold uppercase tracking-[0.05em] text-ink">
          Adopt {dog.name}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Tell us about your home. If it&apos;s a fit, we&apos;ll walk through
          the adoption fee of <strong>{formatPrice(adoptionFee)}</strong> after
          we confirm — not on this page.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Full name
          </span>
          <input className="field" name="name" required autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Email
          </span>
          <input
            className="field"
            type="email"
            name="email"
            required
            autoComplete="email"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Phone
          </span>
          <input
            className="field"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Home & experience with Heelers
        </span>
        <textarea
          className="field field-area"
          name="experience"
          required
          placeholder="Yard / acreage, other dogs, daily exercise, prior Blue Heeler or herding breed experience…"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="fit"
          required
          className="mt-1 size-4 accent-[var(--slate)]"
        />
        <span>
          I understand Blue Heelers need serious exercise and training, and
          I&apos;ve reviewed the{" "}
          <Link href="/fit-check" className="underline underline-offset-2">
            fit check
          </Link>
          .
        </span>
      </label>

      <input type="hidden" name="dogId" value={dog.id} />
      <input type="hidden" name="dogName" value={dog.name} />
      <input type="hidden" name="price" value={dog.price} />

      <button type="submit" className="btn btn-primary">
        Submit adoption request for {dog.name}
      </button>
    </form>
  );
}
