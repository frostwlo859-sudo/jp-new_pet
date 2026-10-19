import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAdoptionRequest,
  listAdoptionRequests,
} from "@/lib/adoptions-store";
import { sendAdminMail } from "@/lib/mail";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const requests = await listAdoptionRequests();
    return NextResponse.json(requests);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      dogSlug?: string;
      dogName?: string;
      name?: string;
      email?: string;
      phone?: string;
      experience?: string;
    };

    if (
      !body.dogSlug ||
      !body.dogName ||
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.experience
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const saved = await createAdoptionRequest({
      dogSlug: body.dogSlug,
      dogName: body.dogName,
      name: body.name,
      email: body.email,
      phone: body.phone,
      experience: body.experience,
    });

    try {
      await sendAdminMail({
        subject: `[Blue Heeler] Adoption request — ${body.dogName}`,
        replyTo: body.email,
        text: [
          `New adoption request for ${body.dogName} (${body.dogSlug})`,
          ``,
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Phone: ${body.phone}`,
          ``,
          body.experience,
          ``,
          `Review in admin: /admin`,
        ].join("\n"),
      });
    } catch (mailError) {
      console.error("Adoption mail failed:", mailError);
    }

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
