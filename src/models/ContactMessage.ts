import { Schema, models, model, type InferSchemaType } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    topic: { type: String, default: "other" },
    message: { type: String, required: true },
    dog: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export type ContactMessageDocument = InferSchemaType<
  typeof ContactMessageSchema
> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const ContactMessageModel =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);
