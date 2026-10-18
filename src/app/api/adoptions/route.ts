import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAdoptionRequest,
  listAdoptionRequests,
} from "@/lib/adoptions-store";

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

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
