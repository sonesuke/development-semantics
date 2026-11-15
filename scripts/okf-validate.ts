// Validate an OKF v0.2 bundle against the conformance rules (SPEC §7):
//   1. Every non-reserved .md file has parseable YAML frontmatter.
//   2. Every frontmatter block has a non-empty `type`.
//   3. index.md has no frontmatter, except `okf_version` at the bundle root.
//   4. log.md has no frontmatter and its date headings are newest-first.

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
const DATE_HEADING = /^#+\s+(\d{4}-\d{2}-\d{2})\s*$/gm;

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.name.endsWith(".md")) yield p;
  }
}

function frontmatter(text: string): string | null {
  return FRONTMATTER.exec(text)?.[1] ?? null;
}

function isMapping(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkConcept(text: string): string[] {
  const raw = frontmatter(text);
  if (raw === null) return ["missing YAML frontmatter"];
  let data: unknown;
  try {
    data = parse(raw);
  } catch (e) {
    return [`unparseable frontmatter: ${(e as Error).message}`];
  }
  if (!isMapping(data)) return ["frontmatter is not a mapping"];
  if (typeof data.type !== "string" || data.type.trim() === "") {
    return ["`type` is missing or empty"];
  }
  return [];
}

function checkIndex(text: string, isRoot: boolean): string[] {
  const raw = frontmatter(text);
  if (raw === null) return [];
  if (!isRoot) return ["non-root index.md must not have frontmatter"];
  const data: unknown = parse(raw) ?? {};
  if (!isMapping(data)) return ["frontmatter is not a mapping"];
  const extra = Object.keys(data).filter((k) => k !== "okf_version");
  return extra.length
    ? [`root index.md has disallowed keys: ${extra.join(", ")}`]
    : [];
}

function checkLog(text: string): string[] {
  const errors: string[] = [];
  if (frontmatter(text) !== null) {
    errors.push("log.md must not have frontmatter");
  }
  const dates = [...text.matchAll(DATE_HEADING)].map((m) => m[1]);
  if (dates.join() !== [...dates].sort().reverse().join()) {
    errors.push("date headings are not newest-first");
  }
  return errors;
}

function check(file: string, text: string, root: string): string[] {
  switch (path.basename(file)) {
    case "index.md":
      return checkIndex(text, path.dirname(file) === path.normalize(root));
    case "log.md":
      return checkLog(text);
    default:
      return checkConcept(text);
  }
}

const roots = process.argv.slice(2);
if (roots.length === 0) roots.push("knowledge");

let failures = 0;
for (const root of roots) {
  for await (const file of walk(root)) {
    const errors = check(file, await readFile(file, "utf8"), root);
    for (const err of errors) console.error(`${file}: ${err}`);
    failures += errors.length;
  }
}

if (failures) {
  console.error(`OKF validation failed: ${failures} error(s)`);
  process.exit(1);
}
console.log("OKF validation passed");
