/** Friendly copy for admin UI — never surface raw infra/error jargon. */
export function friendlyAdminError(error: unknown, fallback: string): string {
  const raw = error instanceof Error ? error.message : String(error || "");
  const lower = raw.toLowerCase();

  if (
    lower.includes("mongodb") ||
    lower.includes("querysrv") ||
    lower.includes("econnrefused") ||
    lower.includes("atlas") ||
    lower.includes("mongoose")
  ) {
    return "Could not reach the kennel database. Please try again in a moment.";
  }
  if (lower.includes("cloudinary") || lower.includes("upload")) {
    return "Photo upload failed. Try another image or try again later.";
  }
  if (lower.includes("smtp") || lower.includes("mail") || lower.includes("nodemailer")) {
    return "Message could not be emailed. It may still be saved in your inbox.";
  }
  if (lower.includes("unauthorized") || lower.includes("auth")) {
    return "Your session expired. Please sign in again.";
  }

  return fallback;
}
