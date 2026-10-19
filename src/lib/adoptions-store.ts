import { connectMongo } from "@/lib/mongodb";
import {
  AdoptionRequestModel,
  type AdoptionRequestDocument,
} from "@/models/AdoptionRequest";

export type AdoptionRequest = {
  id: string;
  dogSlug: string;
  dogName: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  status: "new" | "contacted" | "approved" | "declined";
  createdAt: string;
};

function toRequest(doc: AdoptionRequestDocument): AdoptionRequest {
  return {
    id: doc._id.toString(),
    dogSlug: doc.dogSlug,
    dogName: doc.dogName,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    experience: doc.experience,
    status: doc.status as AdoptionRequest["status"],
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export async function createAdoptionRequest(input: {
  dogSlug: string;
  dogName: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
}): Promise<AdoptionRequest> {
  await connectMongo();
  const doc = await AdoptionRequestModel.create(input);
  return toRequest(doc.toObject() as AdoptionRequestDocument);
}

export async function listAdoptionRequests(): Promise<AdoptionRequest[]> {
  await connectMongo();
  const docs = await AdoptionRequestModel.find()
    .sort({ createdAt: -1 })
    .lean<AdoptionRequestDocument[]>();
  return docs.map(toRequest);
}

export async function getAdoptionRequest(
  id: string,
): Promise<AdoptionRequest | null> {
  await connectMongo();
  const doc = await AdoptionRequestModel.findById(
    id,
  ).lean<AdoptionRequestDocument | null>();
  return doc ? toRequest(doc) : null;
}

export async function updateAdoptionRequestStatus(
  id: string,
  status: AdoptionRequest["status"],
): Promise<AdoptionRequest | null> {
  await connectMongo();
  const doc = await AdoptionRequestModel.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true },
  ).lean<AdoptionRequestDocument | null>();
  return doc ? toRequest(doc) : null;
}
