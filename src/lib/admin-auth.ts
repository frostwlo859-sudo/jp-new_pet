import { cookies } from "next/headers";

export const ADMIN_COOKIE = "heeler_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "heeler-admin";
}

export function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || `session-${getAdminPassword()}`;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return value === getAdminSecret();
}
