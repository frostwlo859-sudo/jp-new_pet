import { connectMongo } from "@/lib/mongodb";
import {
  ContactMessageModel,
  type ContactMessageDocument,
} from "@/models/ContactMessage";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  dog: string;
  status: "new" | "read" | "replied";
  createdAt: string;
};

function toMessage(doc: ContactMessageDocument): ContactMessage {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    topic: doc.topic ?? "other",
    message: doc.message,
    dog: doc.dog ?? "",
    status: doc.status as ContactMessage["status"],
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
  dog?: string;
}): Promise<ContactMessage> {
  await connectMongo();
  const doc = await ContactMessageModel.create({
    ...input,
    dog: input.dog ?? "",
  });
  return toMessage(doc.toObject() as ContactMessageDocument);
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  await connectMongo();
  const docs = await ContactMessageModel.find()
    .sort({ createdAt: -1 })
    .lean<ContactMessageDocument[]>();
  return docs.map(toMessage);
}

export async function getContactMessage(
  id: string,
): Promise<ContactMessage | null> {
  await connectMongo();
  const doc = await ContactMessageModel.findById(
    id,
  ).lean<ContactMessageDocument | null>();
  return doc ? toMessage(doc) : null;
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessage["status"],
): Promise<ContactMessage | null> {
  await connectMongo();
  const doc = await ContactMessageModel.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true },
  ).lean<ContactMessageDocument | null>();
  return doc ? toMessage(doc) : null;
}
