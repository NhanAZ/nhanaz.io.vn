import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "_site");

const publicPaths = [
  ".nojekyll",
  "404.html",
  "agent.md",
  "CNAME",
  "about",
  "achievements",
  "agent-instructions.md",
  "assets",
  "blog",
  "contact",
  "developers",
  "developers.md",
  "docs",
  "en",
  "entity.json",
  "favicon.ico",
  "github",
  "index.html",
  "index.md",
  "llms-full.txt",
  "llms.md",
  "llms.txt",
  "openapi.json",
  "posts",
  "privacy",
  "projects",
  "robots.txt",
  "sitemap.xml",
  "vibe-code",
  ".well-known",
];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const relativePath of publicPaths) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing public path: ${relativePath}`);
  }
  fs.cpSync(source, path.join(output, relativePath), { recursive: true });
}

// Keep the public API scope explicit. Serverless functions in /api stay at
// the repository root for Vercel and must not be copied into the static site.
const publicApiDirectory = path.join(output, "api");
fs.mkdirSync(publicApiDirectory, { recursive: true });
fs.cpSync(path.join(root, "api", "llms.txt"), path.join(publicApiDirectory, "llms.txt"));

fs.cpSync(path.join(output, "agent.md"), path.join(output, "AGENTS.md"));

if (!fs.existsSync(path.join(output, "index.html"))) {
  throw new Error("Vercel artifact is missing index.html");
}
if (fs.existsSync(path.join(output, "scripts"))) {
  throw new Error("Vercel artifact must not contain scripts");
}
if (fs.readFileSync(path.join(output, "AGENTS.md"), "utf8") !== fs.readFileSync(path.join(output, "agent.md"), "utf8")) {
  throw new Error("Public AGENTS.md must be the safe agent guide");
}

console.log(`Prepared Vercel artifact at ${output}`);
