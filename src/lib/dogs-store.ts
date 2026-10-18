import { promises as fs } from "fs";
import path from "path";
import type { Dog } from "@/lib/dogs";

const DATA_PATH = path.join(process.cwd(), "data", "dogs.json");

export async function readDogs(): Promise<Dog[]> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as Dog[];
}

export async function writeDogs(dogs: Dog[]): Promise<void> {
  await fs.writeFile(DATA_PATH, `${JSON.stringify(dogs, null, 2)}\n`, "utf8");
}

export async function getDog(id: string): Promise<Dog | undefined> {
  const dogs = await readDogs();
  return dogs.find((dog) => dog.id === id);
}

export function slugifyName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `ridge-${base || "heeler"}-${Date.now().toString(36)}`;
}
