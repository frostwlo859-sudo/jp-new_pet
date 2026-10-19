import { readFile } from "fs/promises";
import path from "path";
import { randomBytes, scryptSync } from "crypto";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI before running seed.");
  process.exit(1);
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
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

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

const Dog = mongoose.models.Dog || mongoose.model("Dog", DogSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const username = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "heeler-admin";

await mongoose.connect(uri);

const admin = await Admin.findOneAndUpdate(
  { username },
  { username, passwordHash: hashPassword(password) },
  { upsert: true, returnDocument: "after" },
);
console.log(`Seeded admin "${admin.username}" (password from ADMIN_PASSWORD).`);

const file = path.join(process.cwd(), "data", "dogs.json");
const seed = JSON.parse(await readFile(file, "utf8"));
const count = await Dog.countDocuments();
if (count > 0) {
  console.log(`Already have ${count} dogs — skip dog seed.`);
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
