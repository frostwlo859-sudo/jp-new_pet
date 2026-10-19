"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdoptionRequest } from "@/lib/adoptions-store";

const statusLabel: Record<AdoptionRequest["status"], string> = {
  new: "New",
  contacted: "Contacted",
  approved: "Approved",
  declined: "Declined",
};

export function AdminAdoptionDetail({
  request,
}: {
  request: AdoptionRequest;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);
  const [message, setMessage] = useState("");

  async function updateStatus(next: AdoptionRequest["status"]) {
    const res = await fetch(`/api/adoptions/${request.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setMessage("Could not update this request.");
      return;
    }
    setStatus(next);
    setMessage("Request updated.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Adoption request
          </p>
          <h1 className="display mt-1 text-4xl font-bold uppercase tracking-[0.05em]">
            {request.dogName}
          </h1>
          <p className="mt-2 text-ink-soft">{statusLabel[status]}</p>
        </div>
        <Link href="/admin/adoptions" className="btn btn-ghost !min-h-9">
          Back
        </Link>
      </div>

      {message ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      <div className="space-y-5 border border-line bg-paper p-6 md:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ["Applicant", request.name],
            ["Email", request.email],
            ["Phone", request.phone],
            ["Dog", request.dogName],
            ["Submitted", new Date(request.createdAt).toLocaleString()],
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
            Experience & home notes
          </p>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-ink-soft">
            {request.experience}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Set status
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              ["new", "contacted", "approved", "declined"] as const
            ).map((value) => (
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

        <Link
          href={`/available/${request.dogSlug}`}
          className="btn btn-ghost !min-h-9"
          target="_blank"
        >
          View dog on site
        </Link>
      </div>
    </div>
  );
}
