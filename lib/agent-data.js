const SITE_ORIGIN = "https://nhanaz.io.vn";

export const ARCHIVE_ENTRIES = [
  {
    path: "/",
    name: "nhanaz.io.vn",
    description: "Trang chủ của kho lưu trữ cá nhân Nguyễn Thành Nhân - NhanAZ.",
    topics: "Nguyễn Thành Nhân NhanAZ website cá nhân archive",
  },
  {
    path: "/developers/",
    name: "Developer resources",
    description: "Các tài nguyên Markdown, JSON-LD, OpenAPI, API catalog và Agent Skills.",
    topics: "developer resources API OpenAPI agent MCP documentation",
  },
  {
    path: "/blog/",
    name: "Bài viết",
    description: "Mục lục các bài viết kỹ thuật, quan sát và ghi chép cá nhân.",
    topics: "blog articles technical writing",
  },
  {
    path: "/posts/gioi-thieu/",
    name: "Giới thiệu Nguyễn Thành Nhân",
    description: "Bài viết về Nguyễn Thành Nhân, NhanAZ, con đường từ Minecraft và PocketMine-MP đến code, cùng những điều mình tin và muốn chia sẻ.",
    topics: "Nguyễn Thành Nhân NhanAZ identity profile Minecraft PocketMine-MP open source",
  },
  {
    path: "/posts/dau-moc/",
    name: "Dấu mốc",
    description: "Bài viết giữ lại các mốc học tập, hoạt động Đoàn Thanh niên và Hội Sinh viên, tình nguyện cùng các vai trò của Nguyễn Thành Nhân.",
    topics: "achievements milestones study Youth Union Students Association volunteering",
  },
  {
    path: "/posts/connect-brandbook/",
    name: "Connect Brandbook",
    description: "Câu chuyện đồ án tốt nghiệp Thiết kế đồ họa Connect, đạt 9.5 điểm.",
    topics: "Connect Brandbook graphic design graduation project Canva",
  },
  {
    path: "/posts/glyph/",
    name: "glyph, một tool sinh ra vì sợ một trang wiki biến mất",
    description: "Câu chuyện về glyph, công cụ custom emoji cho Minecraft Bedrock bắt đầu từ nhu cầu cá nhân rồi được Bedrock Wiki giới thiệu.",
    topics: "glyph Minecraft Bedrock custom emoji glyph atlas Bedrock Wiki personal project",
  },
  {
    path: "/posts/dang-chet-va-quyen-giet/",
    name: "Một người đáng chết, rồi ai có quyền giết?",
    description: "Mình nghĩ về quyền sống, án tử hình và giới hạn quyền trừng phạt của Nhà nước. Từ một vụ án đến câu hỏi ai có quyền kết thúc một mạng người.",
    topics: "quyền sống tử hình Nhà nước trừng phạt nạn nhân tù chung thân an tử right to life capital punishment legal philosophy",
  },
  {
    path: "/posts/chao-internet/",
    name: "Chào Internet",
    description: "Bài mở đầu giải thích vì sao website cá nhân này được dựng lại.",
    topics: "hello internet personal website archive",
  },
  {
    path: "/posts/pocketmine-mp-la-gi/",
    name: "PocketMine-MP là gì",
    description: "Lịch sử và vai trò của PocketMine-MP trong hành trình code của NhanAZ.",
    topics: "PocketMine-MP Minecraft Bedrock PHP plugins history",
  },
  {
    path: "/posts/minecraft-bedrock-dang-giet-nhung-thu-tung-nuoi-no-lon/",
    name: "Minecraft Bedrock đang giết những thứ từng nuôi nó lớn",
    description: "Một bài phê bình có nguồn về hệ sinh thái Bedrock, PMMP và các server.",
    topics: "Minecraft Bedrock PocketMine-MP NetherGames server ecosystem",
  },
  {
    path: "/posts/dich-nguoc-zalo-pc-backup/",
    name: "Dịch ngược Zalo PC backup",
    description: "Phân tích kỹ thuật về lớp mã hóa backup Zalo PC và giới hạn của bài viết.",
    topics: "Zalo PC backup reverse engineering encryption security",
  },
  {
    path: "/posts/hanh-trinh-minecraft-tu-2015/",
    name: "Hành trình Minecraft từ 2015",
    description: "Câu chuyện từ Minecraft, server và plugin đến PocketMine-MP và Công nghệ thông tin.",
    topics: "Minecraft journey PocketMine-MP coding",
  },
];

export const DOCUMENT_RESOURCES = [
  { uri: `${SITE_ORIGIN}/llms.txt`, name: "llms.txt", mimeType: "text/plain" },
  { uri: `${SITE_ORIGIN}/llms-full.txt`, name: "llms-full.txt", mimeType: "text/plain" },
  { uri: `${SITE_ORIGIN}/agent.md`, name: "agent.md", mimeType: "text/markdown" },
  { uri: `${SITE_ORIGIN}/developers.md`, name: "developers.md", mimeType: "text/markdown" },
  { uri: `${SITE_ORIGIN}/openapi.json`, name: "openapi.json", mimeType: "application/json" },
  { uri: `${SITE_ORIGIN}/entity.json`, name: "entity.json", mimeType: "application/ld+json" },
  { uri: `${SITE_ORIGIN}/sitemap.xml`, name: "sitemap.xml", mimeType: "application/xml" },
];

export const SITE_ORIGIN_VALUE = SITE_ORIGIN;

const safePaths = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/agent.md",
  "/agent-instructions.md",
  "/developers.md",
  "/developers/llms.txt",
  "/openapi.json",
  "/entity.json",
  "/sitemap.xml",
  "/schema-map.xml",
  "/pricing.md",
  "/pricing.json",
  "/auth.md",
  "/api/llms.txt",
  "/api/llms.txt.md",
  "/.well-known/ai-catalog.json",
  "/.well-known/agent-skills/index.json",
  "/.well-known/api-catalog",
]);

export function publicUrl(pathname) {
  if (typeof pathname !== "string") return null;
  try {
    const url = new URL(pathname, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN || !safePaths.has(url.pathname)) return null;
    return url;
  } catch {
    return null;
  }
}

export function searchArchive(query, limit = 8) {
  const needle = String(query ?? "").trim().toLocaleLowerCase("vi");
  if (!needle) return [];
  const terms = needle.split(/\s+/u).filter(Boolean);
  return ARCHIVE_ENTRIES
    .map((entry) => {
      const haystack = `${entry.name} ${entry.description} ${entry.topics}`.toLocaleLowerCase("vi");
      const matches = terms.filter((term) => haystack.includes(term)).length;
      return { entry, matches };
    })
    .filter(({ matches }) => matches > 0)
    .sort((a, b) => b.matches - a.matches || a.entry.path.localeCompare(b.entry.path))
    .slice(0, limit)
    .map(({ entry, matches }) => ({
      url: `${SITE_ORIGIN}${entry.path}`,
      name: entry.name,
      site: SITE_ORIGIN,
      score: Number((matches / terms.length).toFixed(3)),
      description: entry.description,
      schema_object: {
        "@type": entry.path.startsWith("/posts/") ? "BlogPosting" : "WebPage",
        name: entry.name,
        url: `${SITE_ORIGIN}${entry.path}`,
        description: entry.description,
      },
    }));
}

export function archiveIdentity() {
  return {
    name: "Nguyễn Thành Nhân",
    alternateName: "NhanAZ",
    url: SITE_ORIGIN,
    description: "Website cá nhân và kho lưu trữ công khai về code, open source, PocketMine-MP, Minecraft Bedrock, project và ghi chép của Nguyễn Thành Nhân.",
    readOnly: true,
    canonicalSources: [`${SITE_ORIGIN}/llms.txt`, `${SITE_ORIGIN}/entity.json`, `${SITE_ORIGIN}/sitemap.xml`],
  };
}
