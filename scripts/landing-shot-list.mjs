#!/usr/bin/env node
/**
 * Regenerates the table in public/images/landing/README.md from the image
 * manifest (src/config/landing-images.ts), so the shot list never drifts
 * from the code. Run after adding or changing a slot:
 *
 *   node scripts/landing-shot-list.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { landingSlots } = await import(join(root, "src/config/landing-images.ts"));

const rows = Object.entries(landingSlots).map(
  ([id, s]) => `| \`${id}\` | ${s.width} × ${s.height} | ${s.ratio} | ${s.section} | ${s.description}${s.video ? " Also accepts a video of the same name." : ""} |`,
);
const table = ["| Slot id | Dimensions | Ratio | Where | What the image should show |", "| --- | --- | --- | --- | --- |", ...rows].join("\n");

const path = join(root, "public/images/landing/README.md");
const BEGIN = "<!-- BEGIN GENERATED: node scripts/landing-shot-list.mjs -->";
const END = "<!-- END GENERATED -->";
const current = readFileSync(path, "utf8");
const start = current.indexOf(BEGIN);
const end = current.indexOf(END);
if (start === -1 || end === -1) {
  console.error("README is missing the GENERATED markers; not updated.");
  process.exit(2);
}
writeFileSync(path, `${current.slice(0, start)}${BEGIN}\n\n${table}\n\n${END}${current.slice(end + END.length)}`);
console.log(`${rows.length} slots written to public/images/landing/README.md`);
