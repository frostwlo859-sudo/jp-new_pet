import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImageBuffer } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageBuffer(bytes, "blue-heeler/dogs");

    return NextResponse.json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch {
    return NextResponse.json(
      { error: "Photo upload failed. Try another image." },
      { status: 500 },
    );
  }
}
