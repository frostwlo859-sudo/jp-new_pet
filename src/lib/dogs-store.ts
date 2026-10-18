import type { Dog } from "@/lib/dogs";
import { connectMongo } from "@/lib/mongodb";
import { DogModel, type DogDocument } from "@/models/Dog";

function toDog(doc: DogDocument): Dog {
  return {
    id: doc.slug,
    name: doc.name,
    sex: doc.sex as Dog["sex"],
    color: doc.color as Dog["color"],
    birthDate: doc.birthDate,
    price: doc.price,
    status: doc.status as Dog["status"],
    description: doc.description ?? "",
    image: doc.image || "/images/hero.jpg",
    traits: doc.traits ?? [],
    sire: doc.sire ?? "",
    dam: doc.dam ?? "",
    registered: Boolean(doc.registered),
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export async function readDogs(): Promise<Dog[]> {
  await connectMongo();
  const docs = await DogModel.find().sort({ updatedAt: -1 }).lean<DogDocument[]>();
  return docs.map(toDog);
}

export async function getDog(id: string): Promise<Dog | undefined> {
  await connectMongo();
  const doc = await DogModel.findOne({ slug: id }).lean<DogDocument | null>();
  return doc ? toDog(doc) : undefined;
}

export async function createDog(
  input: Omit<Dog, "id" | "updatedAt"> & { id?: string },
): Promise<Dog> {
  await connectMongo();
  const slug = input.id || slugifyName(input.name);
  const doc = await DogModel.create({
    slug,
    name: input.name,
    sex: input.sex,
    color: input.color,
    birthDate: input.birthDate,
    price: input.price,
    status: input.status,
    description: input.description,
    image: input.image,
    traits: input.traits,
    sire: input.sire,
    dam: input.dam,
    registered: input.registered,
  });
  return toDog(doc.toObject() as DogDocument);
}

export async function updateDog(
  id: string,
  patch: Partial<Omit<Dog, "id" | "updatedAt">>,
): Promise<Dog | null> {
  await connectMongo();
  const doc = await DogModel.findOneAndUpdate(
    { slug: id },
    { $set: { ...patch } },
    { new: true },
  ).lean<DogDocument | null>();
  return doc ? toDog(doc) : null;
}

export async function deleteDog(id: string): Promise<boolean> {
  await connectMongo();
  const result = await DogModel.deleteOne({ slug: id });
  return result.deletedCount > 0;
}

export function slugifyName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `ridge-${base || "heeler"}-${Date.now().toString(36)}`;
}

export async function seedDogsIfEmpty(
  seed: Array<Omit<Dog, "updatedAt">>,
): Promise<number> {
  await connectMongo();
  const count = await DogModel.countDocuments();
  if (count > 0) return 0;

  await DogModel.insertMany(
    seed.map((dog) => ({
      slug: dog.id,
      name: dog.name,
      sex: dog.sex,
      color: dog.color,
      birthDate: dog.birthDate,
      price: dog.price,
      status: dog.status,
      description: dog.description,
      image: dog.image,
      traits: dog.traits,
      sire: dog.sire,
      dam: dog.dam,
      registered: dog.registered,
    })),
  );
  return seed.length;
}
