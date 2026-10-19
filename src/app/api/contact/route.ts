import { NextResponse } from "next/server";
import { sendAdminMail } from "@/lib/mail";
import { createContactMessage } from "@/lib/messages-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      topic?: string;
      message?: string;
      dog?: string;
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const saved = await createContactMessage({
      name: body.name,
      email: body.email,
      topic: body.topic || "other",
      message: body.message,
      dog: body.dog || "",
    });

    try {
      await sendAdminMail({
        subject: `[Blue Heeler] Contact — ${body.topic || "message"} from ${body.name}`,
        replyTo: body.email,
        text: [
          `New contact message`,
          ``,
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Topic: ${body.topic || "other"}`,
          body.dog ? `Dog: ${body.dog}` : null,
          ``,
          body.message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (mailError) {
      console.error("Contact mail failed:", mailError);
    }

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
