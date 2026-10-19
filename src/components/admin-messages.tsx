"use client";

import Link from "next/link";
import { useState } from "react";
import type { ContactMessage } from "@/lib/messages-store";

const statusLabel: Record<ContactMessage["status"], string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

export function AdminMessages({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [notice, setNotice] = useState("");

  async function refresh() {
    const res = await fetch("/api/messages");
    if (res.ok) setMessages((await res.json()) as ContactMessage[]);
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
      setNotice("Could not update this message.");
      return;
    }
    setNotice("Message updated.");
    await refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-4xl font-bold uppercase tracking-[0.05em]">
          Messages
        </h1>
        <p className="mt-2 text-ink-soft">
          Contact form inbox — open a message for the full note.
        </p>
      </div>

      {notice ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {notice}
        </p>
      ) : null}

      {messages.length === 0 ? (
        <p className="border border-line bg-paper p-6 text-ink-soft">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li key={msg.id} className="border border-line bg-paper p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="display text-xl font-bold uppercase tracking-[0.04em]">
                    {msg.topic}{" "}
                    <span className="text-sm font-semibold text-slate">
                      {statusLabel[msg.status]}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {msg.name} · {msg.email}
                    {msg.dog ? ` · ${msg.dog}` : ""}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {msg.message}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/messages/${msg.id}`}
                    className="btn btn-primary !min-h-9 !text-sm"
                  >
                    Details
                  </Link>
                  {(["new", "read", "replied"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                      onClick={() => setMessageStatus(msg.id, status)}
                    >
                      {statusLabel[status]}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
