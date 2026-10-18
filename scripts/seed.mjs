import { readFile } from "fs/promises";
import path from "path";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI before running seed.");
  process.exit(1);
}

const DogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: String,
    sex: String,
    color: String,
    birthDate: String,
    price: Number,
    status: String,
    description: String,
    image: String,
    traits: [String],
    sire: String,
    dam: String,
    registered: Boolean,
  },
  { timestamps: true },
);

const Dog = mongoose.models.Dog || mongoose.model("Dog", DogSchema);

const file = path.join(process.cwd(), "data", "dogs.json");
const seed = JSON.parse(await readFile(file, "utf8"));

await mongoose.connect(uri);
const count = await Dog.countDocuments();
if (count > 0) {
  console.log(`Already have ${count} dogs — skip seed.`);
} else {
  await Dog.insertMany(
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
  console.log(`Seeded ${seed.length} Blue Heelers.`);
}
await mongoose.disconnect();
