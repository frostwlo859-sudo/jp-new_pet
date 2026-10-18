import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Dog } from "@/lib/dogs";
import { readDogs, writeDogs } from "@/lib/dogs-store";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const dogs = await readDogs();
  const dog = dogs.find((item) => item.id === id);
  if (!dog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(dog);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<Dog>;
  const dogs = await readDogs();
  const index = dogs.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  dogs[index] = {
    ...dogs[index],
    ...body,
    id,
    price: body.price !== undefined ? Number(body.price) : dogs[index].price,
    updatedAt: new Date().toISOString(),
  };

  await writeDogs(dogs);
  return NextResponse.json(dogs[index]);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const dogs = await readDogs();
  const next = dogs.filter((item) => item.id !== id);
  if (next.length === dogs.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await writeDogs(next);
  return NextResponse.json({ ok: true });
}
