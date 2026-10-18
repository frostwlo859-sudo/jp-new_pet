import { Schema, models, model, type InferSchemaType } from "mongoose";

const AdoptionRequestSchema = new Schema(
  {
    dogSlug: { type: String, required: true, index: true },
    dogName: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    experience: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "approved", "declined"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export type AdoptionRequestDocument = InferSchemaType<
  typeof AdoptionRequestSchema
> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const AdoptionRequestModel =
  models.AdoptionRequest || model("AdoptionRequest", AdoptionRequestSchema);
