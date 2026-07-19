import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "https://nhanaz.io.vn";
const sitemapUrl = `${baseUrl}/sitemap.xml`;
const liveMode = process.argv.includes("--live");
const ignoredDirectories = new Set([".git", ".agents", ".codex", "node_modules", "outputs"]);

const fail = (message) => {
  throw new Error(message);
};

const toPosixPath = (value) => value.split(path.sep).join("/");

const getAttributes = (tag) => Object.fromEntries(
  Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, name, value]) => [name, value]),
);

const getTags = (html, tagName) => Array.from(
  html.matchAll(new RegExp(`<${tagName}\\s+[^>]*>`, "gi")),
  ([tag]) => getAttributes(tag),
);

const getLinkTags = (html) => getTags(html, "link");
const getMetaTags = (html) => getTags(html, "meta");

const walkHtmlFiles = (directory, relativeDirectory = "") => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        return [];
      }
      return walkHtmlFiles(path.join(directory, entry.name), path.join(relativeDirectory, entry.name));
    }

    if (!entry.isFile() || !entry.name.endsWith(".html")) {
      return [];
    }

    return [toPosixPath(path.join(relativeDirectory, entry.name))];
  });

const getSingle = (values, description) => {
  if (values.length !== 1) {
    fail(`${description} must appear exactly once`);
  }
  return values[0];
};

const getRedirectTarget = (html, label) => {
  const refreshValues = getMetaTags(html)
    .filter((tag) => tag["http-equiv"]?.toLowerCase() === "refresh")
    .map((tag) => tag.content);

  if (refreshValues.length === 0) {
    return null;
  }

  const refresh = getSingle(refreshValues, `${label} refresh redirect`);
  const match = refresh.match(/^\s*0\s*;\s*url=(.+?)\s*$/i);

  if (!match) {
    fail(`${label} must use an immediate refresh redirect`);
  }

  const target = new URL(match[1], baseUrl);

  if (target.origin !== baseUrl || target.search || target.hash) {
    fail(`${label} redirect target must be a clean ${baseUrl} URL`);
  }

  return target.href;
};

const routeToFile = (url) => {
  const parsed = new URL(url);

  if (parsed.origin !== baseUrl || parsed.search || parsed.hash) {
    fail(`Sitemap URL must be a clean canonical ${baseUrl} URL: ${url}`);
  }

  if (parsed.pathname === "/") {
    return "index.html";
  }

  if (parsed.pathname.endsWith("/")) {
    return `${parsed.pathname.slice(1)}index.html`;
  }

  if (parsed.pathname.endsWith(".html")) {
    return parsed.pathname.slice(1);
  }

  fail(`Sitemap URL must resolve to an HTML page: ${url}`);
};

const fileToUrl = (relativePath) => {
  if (relativePath === "index.html") {
    return `${baseUrl}/`;
  }

  if (relativePath.endsWith("/index.html")) {
    return `${baseUrl}/${relativePath.slice(0, -"index.html".length)}`;
  }

  return `${baseUrl}/${relativePath}`;
};

const getJsonLdDocuments = (html, label) => Array.from(
  html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ([, source], index) => {
    try {
      return JSON.parse(source);
    } catch (error) {
      fail(`${label} has invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  },
);

const collectProperty = (value, property, results = []) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectProperty(item, property, results));
    return results;
  }

  if (value && typeof value === "object") {
    if (typeof value[property] === "string") {
      results.push(value[property]);
    }
    Object.values(value).forEach((item) => collectProperty(item, property, results));
  }

  return results;
};

const getPageMetadata = (html, label) => {
  const robots = getSingle(
    getMetaTags(html).filter((tag) => tag.name === "robots").map((tag) => tag.content),
    `${label} robots meta`,
  );
  const links = getLinkTags(html);
  const canonical = getSingle(
    links.filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
    `${label} canonical`,
  );
  const alternates = Object.fromEntries(
    ["vi", "en", "x-default"].map((hreflang) => [
      hreflang,
      getSingle(
        links.filter((tag) => tag.rel === "alternate" && tag.hreflang === hreflang).map((tag) => tag.href),
        `${label} hreflang ${hreflang}`,
      ),
    ]),
  );
  const modifiedDates = [...new Set(getJsonLdDocuments(html, label)
    .flatMap((document) => collectProperty(document, "dateModified")))];

  if (modifiedDates.length > 1) {
    fail(`${label} has conflicting JSON-LD dateModified values: ${modifiedDates.join(", ")}`);
  }

  return {
    alternates,
    canonical,
    dateModified: modifiedDates[0] || null,
    robots,
  };
};

const parseSitemap = (xml, label) => {
  const entries = Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g), ([, block]) => {
    const url = getSingle(
      Array.from(block.matchAll(/<loc>([^<]+)<\/loc>/g), ([, value]) => value.trim()),
      `${label} URL location`,
    );
    const lastmod = getSingle(
      Array.from(block.matchAll(/<lastmod>([^<]+)<\/lastmod>/g), ([, value]) => value.trim()),
      `${label} lastmod for ${url}`,
    );
    const alternates = Object.fromEntries(
      Array.from(block.matchAll(/<xhtml:link\s+[^>]*\/>/g), ([tag]) => getAttributes(tag))
        .map((attributes) => [attributes.hreflang, attributes.href]),
    );

    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || Number.isNaN(Date.parse(`${lastmod}T00:00:00Z`))) {
      fail(`${label} has invalid lastmod for ${url}: ${lastmod}`);
    }

    return { alternates, lastmod, url };
  });

  if (entries.length === 0) {
    fail(`${label} has no URL entries`);
  }

  if (new Set(entries.map((entry) => entry.url)).size !== entries.length) {
    fail(`${label} contains duplicate URL entries`);
  }

  return entries;
};

const validateSitemapEntries = async (entries, readPage, sourceLabel) => {
  for (const entry of entries) {
    const relativePath = routeToFile(entry.url);
    const html = await readPage(relativePath, entry.url);
    const metadata = getPageMetadata(html, sourceLabel === "live" ? entry.url : relativePath);

    if (metadata.robots.toLowerCase() !== "index, follow") {
      fail(`${sourceLabel} sitemap URL must be indexable: ${entry.url}`);
    }

    if (metadata.canonical !== entry.url) {
      fail(`${sourceLabel} canonical mismatch for ${entry.url}: ${metadata.canonical}`);
    }

    for (const hreflang of ["vi", "en"]) {
      if (entry.alternates[hreflang] !== metadata.alternates[hreflang]) {
        fail(`${sourceLabel} sitemap hreflang ${hreflang} mismatch for ${entry.url}`);
      }
    }

    if (metadata.dateModified && metadata.dateModified !== entry.lastmod) {
      fail(
        `${sourceLabel} date mismatch for ${entry.url}: JSON-LD dateModified is ${metadata.dateModified}, `
        + `sitemap lastmod is ${entry.lastmod}`,
      );
    }
  }
};

const validateLocalCoverage = (entries) => {
  const sitemapUrls = new Set(entries.map((entry) => entry.url));

  for (const relativePath of walkHtmlFiles(root)) {
    const html = fs.readFileSync(path.join(root, relativePath), "utf8");
    const metadata = getPageMetadata(html, relativePath);
    const expectedUrl = fileToUrl(relativePath);
    const is404 = relativePath === "404.html" || relativePath === "en/404.html";
    const redirectTarget = getRedirectTarget(html, relativePath);
    const isRedirect = Boolean(redirectTarget);
    const isNoindex = metadata.robots.toLowerCase().includes("noindex");

    if ((is404 || isRedirect) !== isNoindex) {
      fail(`${relativePath} must ${is404 || isRedirect ? "use" : "not use"} noindex`);
    }

    if (isRedirect) {
      const targetPath = routeToFile(redirectTarget);

      if (
        !html.includes("window.location.search")
        || !html.includes("window.location.hash")
        || !html.includes("window.location.replace")
      ) {
        fail(`${relativePath} redirect must preserve query and hash with location.replace`);
      }

      if (metadata.canonical !== redirectTarget) {
        fail(`${relativePath} redirect canonical must be ${redirectTarget}`);
      }

      if (!fs.existsSync(path.join(root, targetPath))) {
        fail(`${relativePath} redirect target does not exist: ${redirectTarget}`);
      }

      if (!sitemapUrls.has(redirectTarget)) {
        fail(`${relativePath} redirect target is missing from sitemap.xml: ${redirectTarget}`);
      }

      if (sitemapUrls.has(expectedUrl)) {
        fail(`${relativePath} redirect URL must not appear in sitemap.xml`);
      }

      continue;
    }

    if (metadata.canonical !== expectedUrl) {
      fail(`${relativePath} canonical must be ${expectedUrl}`);
    }

    if (!isNoindex && !sitemapUrls.has(expectedUrl)) {
      fail(`${relativePath} is indexable but missing from sitemap.xml`);
    }

    if (isNoindex && sitemapUrls.has(expectedUrl)) {
      fail(`${relativePath} is noindex but appears in sitemap.xml`);
    }
  }
};

const validateRobots = (robots, label) => {
  const sitemapMatches = Array.from(robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim), ([, url]) => url);

  if (sitemapMatches.length !== 1 || sitemapMatches[0] !== sitemapUrl) {
    fail(`${label} must advertise only ${sitemapUrl}`);
  }
};

const validateLanguageDelivery = () => {
  const themeScript = fs.readFileSync(path.join(root, "assets/js/theme.js"), "utf8");

  if (/\b(?:window\.)?location\.(?:assign|replace)\s*\(/.test(themeScript)) {
    fail("assets/js/theme.js must not redirect visitors to an alternate language URL");
  }
};

const readLocalPage = (relativePath) => {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`Missing sitemap page: ${relativePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
};

const fetchText = async (url) => {
  const response = await fetch(url, { redirect: "manual" });
  if (response.status !== 200) {
    fail(`Live URL must return 200: ${url} returned ${response.status}`);
  }
  return response.text();
};

const validateLiveSite = async (localEntries) => {
  const [liveSitemap, liveRobots] = await Promise.all([
    fetchText(sitemapUrl),
    fetchText(`${baseUrl}/robots.txt`),
  ]);
  const liveEntries = parseSitemap(liveSitemap, "live sitemap.xml");
  const localFingerprint = localEntries.map((entry) => JSON.stringify(entry)).sort().join("\n");
  const liveFingerprint = liveEntries.map((entry) => JSON.stringify(entry)).sort().join("\n");

  if (liveFingerprint !== localFingerprint) {
    fail("Live sitemap.xml does not match the checked-out sitemap.xml yet");
  }

  validateRobots(liveRobots, "live robots.txt");
  await validateSitemapEntries(
    liveEntries,
    (_relativePath, url) => fetchText(url),
    "live",
  );
};

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
const entries = parseSitemap(sitemap, "sitemap.xml");

validateRobots(robots, "robots.txt");
validateLanguageDelivery();
await validateSitemapEntries(entries, (relativePath) => readLocalPage(relativePath), "local");
validateLocalCoverage(entries);

if (liveMode) {
  await validateLiveSite(entries);
}

console.log(
  `SEO validation passed: ${entries.length} canonical indexable URLs${liveMode ? " and live production" : ""}.`,
);
