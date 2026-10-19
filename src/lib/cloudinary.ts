import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Photo storage is not configured.",
    );
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });

  return cloudinary;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  folder = "blue-heeler",
) {
  const cld = configureCloudinary();

  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Photo upload failed"));
          return;
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );
    stream.end(buffer);
  });
}
