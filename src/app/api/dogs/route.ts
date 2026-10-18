import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Dog } from "@/lib/dogs";
import { createDog, readDogs } from "@/lib/dogs-store";

export async function GET() {
  try {
    const dogs = await readDogs();
    return NextResponse.json(dogs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<Dog>;
    if (!body.name || !body.sex || !body.color || !body.birthDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const dog = await createDog({
      name: body.name,
      sex: body.sex,
      color: body.color,
      birthDate: body.birthDate,
      price: Number(body.price ?? 0),
      status: body.status ?? "available",
      description: body.description ?? "",
      image: body.image || "/images/hero.jpg",
      traits: body.traits ?? [],
      sire: body.sire ?? "",
      dam: body.dam ?? "",
      registered: Boolean(body.registered ?? true),
    });

    return NextResponse.json(dog, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
