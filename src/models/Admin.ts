import { Schema, models, model, type InferSchemaType } from "mongoose";

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export type AdminDoc = InferSchemaType<typeof AdminSchema> & {
  _id: { toString(): string };
};

export const Admin = models.Admin || model("Admin", AdminSchema);
