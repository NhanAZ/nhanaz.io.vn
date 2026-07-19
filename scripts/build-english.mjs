import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "https://nhanaz.io.vn";

// English pages are edited by hand. This historical script now validates the
// language pairs without rewriting either version.
const pagePairs = [
  { vi: "/", en: "/en/" },
  { vi: "/404.html", en: "/en/404.html" },
  { vi: "/about/", en: "/en/about/" },
  { vi: "/achievements/", en: "/en/achievements/" },
  { vi: "/blog/", en: "/en/blog/" },
  { vi: "/github/", en: "/en/github/" },
  { vi: "/posts/chao-internet/", en: "/en/posts/hello-internet/" },
  { vi: "/posts/dich-nguoc-zalo-pc-backup/", en: "/en/posts/reverse-engineering-zalo-pc-backup/" },
  { vi: "/posts/hanh-trinh-minecraft-tu-2015/", en: "/en/posts/minecraft-since-2015/" },
  {
    vi: "/posts/luu-y-bai-thu-hoach-lop-boi-duong-nhan-thuc-ve-dang/",
    en: "/en/posts/party-awareness-reflection-paper-notes/",
  },
  {
    vi: "/posts/may-cau-hoi-hoi-qua-kho-cho-mot-doi-nguoi/",
    en: "/en/posts/questions-slightly-too-large-for-one-lifetime/",
  },
  {
    vi: "/posts/minecraft-bedrock-dang-giet-nhung-thu-tung-nuoi-no-lon/",
    en: "/en/posts/minecraft-bedrock-is-killing-the-things-that-helped-it-grow/",
  },
  { vi: "/posts/pocketmine-mp-la-gi/", en: "/en/posts/what-is-pocketmine-mp/" },
  { vi: "/projects/", en: "/en/projects/" },
  { vi: "/vibe-code/", en: "/en/vibe-code/" },
  { vi: "/vibe-code/glyph/", en: "/en/vibe-code/glyph/" },
];

const routeToFile = (route) => {
  if (route === "/") {
    return "index.html";
  }

  const relative = route.replace(/^\//, "");
  return route.endsWith(".html") ? relative : path.join(relative, "index.html");
};

const readAttributes = (tag) => Object.fromEntries(
  Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, name, value]) => [name, value]),
);

const getLinkTags = (html) => Array.from(html.matchAll(/<link\s+[^>]*>/g), ([tag]) => readAttributes(tag));

const voidElements = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr",
]);

const getProseChildTags = (html) => {
  const proseTag = Array.from(html.matchAll(/<div\b[^>]*class="([^"]*)"[^>]*>/g))
    .find(([, classes]) => classes.split(/\s+/).includes("prose"));

  if (!proseTag) {
    return null;
  }

  const tokenPattern = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w:-]*)\b[^>]*>/g;
  const childTags = [];
  let depth = 1;
  let token;

  tokenPattern.lastIndex = proseTag.index + proseTag[0].length;

  while ((token = tokenPattern.exec(html))) {
    if (!token[1]) {
      continue;
    }

    const tagName = token[1].toLowerCase();
    const isClosing = token[0].startsWith("</");

    if (isClosing) {
      depth -= 1;
      if (depth === 0) {
        break;
      }
      continue;
    }

    if (depth === 1) {
      childTags.push(tagName);
    }

    if (!voidElements.has(tagName) && !token[0].endsWith("/>")) {
      depth += 1;
    }
  }

  return childTags;
};

const validateReadingStructure = ({ pair, viHtml, enHtml }) => {
  const viTags = getProseChildTags(viHtml);
  const enTags = getProseChildTags(enHtml);

  if (!viTags && !enTags) {
    return;
  }

  if (!viTags || !enTags) {
    throw new Error(`${pair.vi} and ${pair.en} must either both use .prose or both omit it`);
  }

  const mismatchIndex = viTags.findIndex((tag, index) => tag !== enTags[index]);

  if (viTags.length !== enTags.length || mismatchIndex !== -1) {
    const index = mismatchIndex === -1 ? Math.min(viTags.length, enTags.length) : mismatchIndex;
    throw new Error(
      `${pair.vi} and ${pair.en} differ at .prose item ${index + 1} `
      + `(vi: ${viTags[index] || "missing"}, en: ${enTags[index] || "missing"})`,
    );
  }
};

const validatePage = ({ route, language, alternates }) => {
  const relativePath = routeToFile(route);
  const filePath = path.join(root, relativePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing ${language} page: ${relativePath}`);
  }

  const html = fs.readFileSync(filePath, "utf8");
  const documentLanguage = html.match(/<html\s+lang="([^"]+)"/)?.[1];

  if (documentLanguage !== language) {
    throw new Error(`${relativePath} must use <html lang="${language}">`);
  }

  const links = getLinkTags(html);
  const canonicals = links.filter((link) => link.rel === "canonical");
  const expectedCanonical = `${baseUrl}${route}`;

  if (canonicals.length !== 1 || canonicals[0].href !== expectedCanonical) {
    throw new Error(`${relativePath} must have canonical ${expectedCanonical}`);
  }

  for (const [hreflang, expectedHref] of Object.entries(alternates)) {
    const matches = links.filter((link) => link.rel === "alternate" && link.hreflang === hreflang);
    if (matches.length !== 1 || matches[0].href !== expectedHref) {
      throw new Error(`${relativePath} must have hreflang ${hreflang} -> ${expectedHref}`);
    }
  }

  return html;
};

for (const pair of pagePairs) {
  const alternates = {
    vi: `${baseUrl}${pair.vi}`,
    en: `${baseUrl}${pair.en}`,
    "x-default": `${baseUrl}${pair.vi}`,
  };

  const viHtml = validatePage({ route: pair.vi, language: "vi", alternates });
  const enHtml = validatePage({ route: pair.en, language: "en", alternates });
  validateReadingStructure({ pair, viHtml, enHtml });
}

console.log(`Validated ${pagePairs.length} Vietnamese-English page pairs and their reading structure.`);
