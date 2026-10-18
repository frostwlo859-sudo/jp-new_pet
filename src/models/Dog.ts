import { Schema, models, model, type InferSchemaType } from "mongoose";

const DogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    sex: { type: String, enum: ["Male", "Female"], required: true },
    color: {
      type: String,
      enum: ["Blue", "Red Speckle", "Blue Mottled"],
      required: true,
    },
    birthDate: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
      index: true,
    },
    description: { type: String, default: "" },
    image: { type: String, default: "/images/hero.jpg" },
    traits: { type: [String], default: [] },
    sire: { type: String, default: "" },
    dam: { type: String, default: "" },
    registered: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type DogDocument = InferSchemaType<typeof DogSchema> & {
  _id: { toString(): string };
  updatedAt: Date;
  createdAt: Date;
};

export const DogModel = models.Dog || model("Dog", DogSchema);
