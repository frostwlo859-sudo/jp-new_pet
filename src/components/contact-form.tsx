"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const dog = searchParams.get("dog");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent("generate_lead", {
      form: "contact",
      dog_interest: dog || "none",
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-paper p-8">
        <p className="display text-3xl font-bold uppercase tracking-[0.06em] text-ink">
          Message logged
        </p>
        <p className="mt-3 max-w-md text-ink-soft">
          Thanks — we&apos;ve received your message and will get back to you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 border border-line bg-paper p-6 md:p-8"
    >
      {dog ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          Inquiring about <strong>{dog}</strong>
        </p>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Name
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
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Topic
        </span>
        <select
          className="field"
          name="topic"
          defaultValue={dog ? "puppy" : "fit"}
        >
          <option value="puppy">Blue Heeler adoption inquiry</option>
          <option value="fit">Fit check / lifestyle</option>
          <option value="training">Training advice</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Message
        </span>
        <textarea
          className="field field-area"
          name="message"
          required
          defaultValue={
            dog
              ? `Hi — I'm interested in ${dog}. Here's about our home and experience:\n`
              : undefined
          }
        />
      </label>
      <input type="hidden" name="dog" value={dog ?? ""} />
      <button type="submit" className="btn btn-primary">
        Send message
      </button>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="border border-line bg-paper p-8 text-ink-soft">
          Loading form…
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
