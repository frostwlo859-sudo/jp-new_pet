"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContactMessage } from "@/lib/messages-store";

const statusLabel: Record<ContactMessage["status"], string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

export function AdminMessageDetail({
  message: initial,
}: {
  message: ContactMessage;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initial.status);
  const [notice, setNotice] = useState("");

  async function updateStatus(next: ContactMessage["status"]) {
    const res = await fetch(`/api/messages/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setNotice("Could not update this message.");
      return;
    }
    setStatus(next);
    setNotice("Message updated.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Contact message
          </p>
          <h1 className="display mt-1 text-4xl font-bold uppercase tracking-[0.05em]">
            {initial.topic}
          </h1>
          <p className="mt-2 text-ink-soft">{statusLabel[status]}</p>
        </div>
        <Link href="/admin/messages" className="btn btn-ghost !min-h-9">
          Back
        </Link>
      </div>

      {notice ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {notice}
        </p>
      ) : null}

      <div className="space-y-5 border border-line bg-paper p-6 md:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ["From", initial.name],
            ["Email", initial.email],
            ["About dog", initial.dog || "—"],
            ["Received", new Date(initial.createdAt).toLocaleString()],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {label}
              </dt>
              <dd className="mt-1 text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Message
          </p>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-ink-soft">
            {initial.message}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Set status
          </p>
          <div className="flex flex-wrap gap-2">
            {(["new", "read", "replied"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={`btn !min-h-9 !text-sm ${
                  status === value ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => updateStatus(value)}
              >
                {statusLabel[value]}
              </button>
            ))}
          </div>
        </div>

        <a
          href={`mailto:${initial.email}?subject=Re: ${encodeURIComponent(initial.topic)}`}
          className="btn btn-primary !min-h-9"
        >
          Reply by email
        </a>
      </div>
    </div>
  );
}
