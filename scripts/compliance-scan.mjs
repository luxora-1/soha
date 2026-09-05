#!/usr/bin/env node
/**
 * Compliance scan.
 *
 * Lists every file:line in the codebase that carries a legal / clinical /
 * content placeholder so they can be reviewed in one pass before launch, and
 * fails on phrases that must never appear anywhere.
 *
 *   node scripts/compliance-scan.mjs                # print report
 *   node scripts/compliance-scan.mjs --strict       # exit 1 if any marker remains (launch gate)
 *   node scripts/compliance-scan.mjs --update-notes # rewrite the generated block in COMPLIANCE_NOTES.md
 *
 * Forbidden phrases always exit 1. The scan runs from the repo root regardless
 * of the current working directory.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const updateNotes = args.has("--update-notes");

/** Markers that must be resolved before launch, with what each one means. */
export const MARKERS = [
  ["CLAIM_PENDING_LEGAL_REVIEW", "Dosing specifics, mg amounts, comparative claims, or any language stronger than the default wording. Counsel and the medical director must approve."],
  ["TESTIMONIAL_PLACEHOLDER", "Deliberately ugly stand-in for social proof. Replace with approved testimonials or remove."],
  ["NOT FOR LAUNCH", "Content that must not ship."],
  ["PHARMACY_NAME_PLACEHOLDER", "Insert the dispensing pharmacy's legal name. Soha is never the dispensing pharmacy."],
  ["SUPPORT_EMAIL_PLACEHOLDER", "Insert the monitored support address. Rendered as a mailto link automatically once set."],
  ["PRICING_PLACEHOLDER", "Pricing is not finalized. Values live only in src/config/pricing.ts and render as \"$—\"."],
  ["FAQ_ANSWER_PLACEHOLDER", "Answer text not yet supplied. Paste the approved answer verbatim."],
  ["STATE_GATING_PENDING", "Served-state list must be gated before launch; pharmacy partners have state restrictions."],
  ["LEGAL_PLACEHOLDER", "Disclaimer / disclosure / policy wording pending legal review."],
  ["COPY_DRAFT", "Copy written by the developer, not supplied by the client. Needs brand + legal sign-off."],
  ["IMAGE_PLACEHOLDER", "Solid block standing in for brand photography. Swap for real imagery with alt text."],
  ["SOCIAL_PLACEHOLDER", "The community feed shows labelled placeholder posts until INSTAGRAM_ACCESS_TOKEN is set. Connect the account (README, Community feed) before launch."],
  ["<Unverified note=", "A claim on the ad landing page rendered inside <Unverified>: a placeholder figure or an unsourced statement. Replace with a verified figure and remove the wrapper; UNVERIFIED.md is the per-claim checklist. Production builds fail while any remain."],
];

/**
 * Phrases that must never appear anywhere in the repo (copy, comments,
 * placeholders, identifiers). Each entry is { label, re }; `phrase()` builds a
 * regex from fragments joined by an optional separator (space, ASCII hyphen,
 * slash, or any Unicode dash) so hyphenation and casing variants are caught.
 *
 * History: the original brief barred "OB/GYN prescribed" and "bioidentical".
 * The client lifted both on 2026-09-05 and confirmed the wording may be used
 * freely, so the list is empty. Example entry, kept for reference:
 *   { label: '"OB/GYN prescribed"', re: phrase("ob", "gyn", "prescribed") }
 */
const SEP = "\\s*[\\/\\-\\u2010-\\u2015\\u2212]?\\s*";
export const phrase = (...parts) => new RegExp(parts.join(SEP), "i");
export const FORBIDDEN = [];

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "out", "build", "screenshots", ".vercel"]);
const SKIP_FILES = new Set(["package-lock.json"]);
const BINARY_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".ico", ".woff", ".woff2", ".ttf", ".otf", ".pdf", ".zip", ".mp4", ".mp3", ".webm"]);
/** Files allowed to *name* the markers (they document them). Still scanned for forbidden phrases. */
const MARKER_DOCS = new Set([
  "scripts/compliance-scan.mjs",
  "scripts/unverified-list.mjs",
  "COMPLIANCE_NOTES.md",
  "UNVERIFIED.md",
  "README.md",
  "src/components/landing/Unverified.tsx",
]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name) || SKIP_FILES.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (!BINARY_EXT.has(extname(name).toLowerCase())) yield full;
  }
}

/** Collapse JSX/template whitespace so a phrase split across lines still matches. */
const normalize = (text) => text.replace(/\{\s*["'` ]\s*["'`]?\s*\}/g, " ").replace(/\s+/g, " ");

const hits = [];
const violations = [];
for (const file of walk(root)) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  const seenForbidden = new Set();
  lines.forEach((line, i) => {
    if (!MARKER_DOCS.has(rel)) {
      for (const [marker] of MARKERS) {
        if (line.includes(marker)) hits.push({ file: rel, line: i + 1, marker, text: line.trim() });
      }
    }
    for (const f of FORBIDDEN) {
      if (f.re.test(line)) {
        violations.push({ file: rel, line: i + 1, label: f.label, text: line.trim() });
        seenForbidden.add(f.label);
      }
    }
  });
  // Second pass over the whole file with whitespace collapsed (catches line-wrapped phrases).
  const flat = normalize(text);
  for (const f of FORBIDDEN) {
    if (!seenForbidden.has(f.label) && f.re.test(flat)) {
      violations.push({ file: rel, line: 0, label: f.label, text: "(phrase split across lines)" });
    }
  }
}

// ---- report ---------------------------------------------------------------

if (violations.length) {
  console.error("FORBIDDEN PHRASES FOUND — these must never appear anywhere in the repo:");
  for (const v of violations) console.error(`  ${v.file}:${v.line || "?"}  [${v.label}]  ${v.text}`);
  console.error("");
}

const byMarker = new Map();
for (const h of hits) byMarker.set(h.marker, [...(byMarker.get(h.marker) ?? []), h]);

console.log(`${hits.length} placeholder marker(s) found${hits.length ? ":" : "."}`);
for (const [marker, list] of byMarker) {
  console.log(`\n${marker} (${list.length})`);
  for (const h of list) console.log(`  ${h.file}:${h.line}`);
}

// ---- optional: refresh COMPLIANCE_NOTES.md ---------------------------------

if (updateNotes) {
  const notesPath = join(root, "COMPLIANCE_NOTES.md");
  const BEGIN = "<!-- BEGIN GENERATED: node scripts/compliance-scan.mjs --update-notes -->";
  const END = "<!-- END GENERATED -->";
  const esc = (s) => s.replace(/\|/g, "\\|").replace(/`/g, "'");
  let block = `${BEGIN}\n\n_Generated by \`node scripts/compliance-scan.mjs --update-notes\`. Do not edit by hand; re-run the script._\n\n`;
  block += `**Forbidden phrases:** ${violations.length === 0 ? "none found ✅" : `**${violations.length} FOUND ❌**`}\n\n`;
  block += `**Open placeholder markers:** ${hits.length}\n`;
  for (const [marker, meaning] of MARKERS) {
    const list = byMarker.get(marker) ?? [];
    block += `\n### \`${marker}\` — ${list.length}\n\n${meaning}\n\n`;
    if (!list.length) {
      block += "_None in codebase._\n";
      continue;
    }
    block += "| File | Line | Context |\n| --- | ---: | --- |\n";
    for (const h of list) block += `| \`${h.file}\` | ${h.line} | ${esc(h.text.slice(0, 110))}${h.text.length > 110 ? "…" : ""} |\n`;
  }
  block += `\n${END}`;
  const current = readFileSync(notesPath, "utf8");
  const start = current.indexOf(BEGIN);
  const end = current.indexOf(END);
  if (start === -1 || end === -1) {
    console.error("\nCOMPLIANCE_NOTES.md is missing the GENERATED markers; not updated.");
    process.exit(2);
  }
  writeFileSync(notesPath, current.slice(0, start) + block + current.slice(end + END.length));
  console.log("\nCOMPLIANCE_NOTES.md updated.");
}

if (violations.length || (strict && hits.length)) process.exit(1);
