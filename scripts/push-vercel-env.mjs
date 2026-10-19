/**
 * Pushes non-empty keys from .env.local to Vercel (production + preview + development).
 * Usage: node scripts/push-vercel-env.mjs
 */
import { readFileSync, existsSync } from "fs";
import { spawnSync } from "child_process";

const path = ".env.local";
if (!existsSync(path)) {
  console.error("Missing .env.local");
  process.exit(1);
}

const keys = [
  "MONGODB_URI",
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "ADMIN_EMAIL",
];

const env = Object.fromEntries(
  readFileSync(path, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);

const targets = ["production", "preview", "development"];
let pushed = 0;
let skipped = 0;

for (const key of keys) {
  const value = env[key];
  if (!value) {
    console.log(`skip ${key} (empty)`);
    skipped += 1;
    continue;
  }

  for (const target of targets) {
    // remove existing then add (idempotent-ish)
    spawnSync("npx", ["vercel", "env", "rm", key, target, "-y"], {
      stdio: "ignore",
      shell: true,
    });
    const add = spawnSync(
      "npx",
      ["vercel", "env", "add", key, target],
      {
        input: `${value}\n`,
        encoding: "utf8",
        shell: true,
      },
    );
    if (add.status !== 0) {
      console.error(`fail ${key} [${target}]`, add.stderr || add.stdout);
    } else {
      console.log(`ok   ${key} → ${target}`);
      pushed += 1;
    }
  }
}

console.log(`Done. pushed slots=${pushed}, skipped keys=${skipped}`);
