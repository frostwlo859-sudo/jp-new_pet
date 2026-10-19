import { cookies } from "next/headers";
import { connectMongo } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";
import { Admin } from "@/models/Admin";

export const ADMIN_COOKIE = "heeler_admin";

export function getAdminUsername(): string {
  return (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "heeler-admin";
}

export function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || `session-${getAdminPassword()}`;
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const user = username.trim().toLowerCase() || getAdminUsername();
  if (!password) return false;

  // Env credentials always work (seeded into .env.local / Vercel)
  if (user === getAdminUsername() && password === getAdminPassword()) {
    return true;
  }

  // Also accept Mongo-seeded admin hash when available
  try {
    await connectMongo();
    const admin = await Admin.findOne({ username: user }).lean();
    if (admin?.passwordHash) {
      return verifyPassword(password, admin.passwordHash);
    }
  } catch {
    // Mongo down — env check above already ran
  }

  return false;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return value === getAdminSecret();
}
