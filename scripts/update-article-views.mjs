import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDirectory = path.join(rootDirectory, "posts");
const outputPath = path.join(rootDirectory, "assets", "data", "article-stats.json");
const endpoint = "https://api.counterapi.dev/v1";
const namespace = "nhanaz-io-vn";
const requestInterval = 2200;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const readExistingSnapshot = async () => {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    return { counts: {} };
  }
};

const readCounter = async (counterName) => {
  const counterUrl = [
    endpoint,
    encodeURIComponent(namespace),
    encodeURIComponent(counterName),
    "",
  ].join("/");
  const response = await fetch(counterUrl, {
    headers: {
      accept: "application/json",
      "user-agent": "nhanaz.io.vn article view snapshot",
    },
  });
  const payload = await response.json().catch(() => null);

  if (response.status === 400 && payload?.message === "record not found") {
    return 0;
  }

  if (!response.ok) {
    throw new Error(`CounterAPI returned ${response.status}`);
  }

  const count = Number(payload?.count);

  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error("CounterAPI returned an invalid count");
  }

  return count;
};

const postEntries = await readdir(postsDirectory, { withFileTypes: true });
const articleSlugs = postEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((first, second) => first.localeCompare(second, "vi"));
const existingSnapshot = await readExistingSnapshot();
const counts = {};
let refreshedCount = 0;

for (const [index, slug] of articleSlugs.entries()) {
  const counterName = `article-${slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-")}`;

  if (index > 0) {
    await wait(requestInterval);
  }

  try {
    counts[counterName] = await readCounter(counterName);
    refreshedCount += 1;
  } catch (error) {
    const previousCount = Number(existingSnapshot.counts?.[counterName]);

    if (Number.isSafeInteger(previousCount) && previousCount >= 0) {
      counts[counterName] = previousCount;
      console.warn(`${counterName}: ${error.message}. Kept the previous count.`);
      continue;
    }

    counts[counterName] = 0;
    console.warn(`${counterName}: ${error.message}. Used 0 because no snapshot exists yet.`);
  }
}

const snapshot = {
  generatedAt: new Date().toISOString(),
  namespace,
  counts,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Refreshed ${refreshedCount}/${articleSlugs.length} article view counters.`);
