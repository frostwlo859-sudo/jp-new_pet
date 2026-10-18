import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Dog } from "@/lib/dogs";
import { seedDogsIfEmpty } from "@/lib/dogs-store";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = path.join(process.cwd(), "data", "dogs.json");
    const raw = await readFile(file, "utf8");
    const seed = JSON.parse(raw) as Array<Omit<Dog, "updatedAt">>;
    const inserted = await seedDogsIfEmpty(seed);
    return NextResponse.json({
      ok: true,
      inserted,
      message:
        inserted > 0
          ? `Seeded ${inserted} Blue Heelers.`
          : "Database already has dogs — nothing inserted.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
