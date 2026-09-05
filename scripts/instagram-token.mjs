#!/usr/bin/env node
/**
 * Instagram access-token helper for the community feed.
 *
 *   node scripts/instagram-token.mjs check     # who the token belongs to
 *   node scripts/instagram-token.mjs refresh   # extend a long-lived token (valid 60 days) and print the new one
 *
 * Reads INSTAGRAM_ACCESS_TOKEN from the environment (or --token <value>) and
 * INSTAGRAM_GRAPH_URL when set. Long-lived tokens expire 60 days after they
 * were last refreshed, so run `refresh` at least monthly and paste the printed
 * token into the INSTAGRAM_ACCESS_TOKEN environment variable (Vercel:
 * Project → Settings → Environment Variables), then redeploy.
 */
const args = process.argv.slice(2);
const command = args.find((a) => !a.startsWith("--")) ?? "check";
const tokenIndex = args.indexOf("--token");
const token = tokenIndex === -1 ? process.env.INSTAGRAM_ACCESS_TOKEN : args[tokenIndex + 1];
const base = process.env.INSTAGRAM_GRAPH_URL ?? "https://graph.instagram.com/v23.0";

if (!token) {
  console.error("No token. Set INSTAGRAM_ACCESS_TOKEN or pass --token <value>.");
  process.exit(2);
}

async function call(path, params) {
  const url = new URL(`${base}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.error) {
    throw new Error(`Instagram API ${response.status}: ${body.error?.message ?? "unknown error"}`);
  }
  return body;
}

try {
  if (command === "check") {
    const me = await call("/me", { fields: "id,username,account_type", access_token: token });
    console.log(`Token is valid for @${me.username} (${me.account_type ?? "account"}, id ${me.id}).`);
  } else if (command === "refresh") {
    const refreshed = await call("/refresh_access_token", { grant_type: "ig_refresh_token", access_token: token });
    const days = Math.round((refreshed.expires_in ?? 0) / 86400);
    console.log(`Refreshed. New token (valid ${days} days) — set it as INSTAGRAM_ACCESS_TOKEN:\n\n${refreshed.access_token}\n`);
  } else {
    console.error(`Unknown command "${command}". Use "check" or "refresh".`);
    process.exit(2);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
