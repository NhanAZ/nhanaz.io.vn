document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const SITE_SEARCH_INDEX = [
  {
    title: "Nguyễn Thành Nhân",
    type: "Giới thiệu",
    url: "/about/",
    excerpt: "Thông tin về Nhân, NhanAZ, open source, Minecraft, PocketMine-MP và cách liên hệ.",
    keywords: "NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu nhanaz.io.vn itsnhanaz@gmail.com Discord Bà Rịa Vũng Tàu Thành phố Hồ Chí Minh sinh ngày 02.08.2005",
  },
  {
    title: "NhanAZ",
    type: "Trang chủ",
    url: "/",
    excerpt: "Góc nhỏ của Nguyễn Thành Nhân cho code, kiến thức, dự án, thành tích và ghi chép cá nhân.",
    keywords: "Nguyễn Thành Nhân NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu personal archive open source GitHub",
  },
  {
    title: "Bài viết",
    type: "Kho lưu trữ",
    url: "/blog/",
    excerpt: "Các ghi chép của Nhân về code, việc học và đời thường.",
    keywords: "blog nhật ký bài viết kiến thức",
  },
  {
    title: "Chào internet, mình dựng lại căn nhà này",
    type: "Bài viết",
    url: "/posts/chao-internet/",
    date: "2026-06-29",
    excerpt: "Bài viết mở đầu cho căn nhà số nhanaz.io.vn.",
    keywords: "internet blog cá nhân căn nhà số",
  },
  {
    title: "Dự án",
    type: "Kho dự án",
    url: "/projects/",
    excerpt: "Những thứ Nhân đã làm, đang làm và đủ tự tin để kể lại quá trình.",
    keywords: "project portfolio sản phẩm",
  },
  {
    title: "nhanaz.io.vn",
    type: "Dự án",
    url: "/projects/#nhanaz",
    date: "2026",
    excerpt: "Website cá nhân được làm bằng HTML, CSS, JavaScript và triển khai qua GitHub Pages.",
    keywords: "website cá nhân github pages html css javascript",
  },
  {
    title: "Connect Brandbook",
    type: "Dự án",
    url: "/projects/#connect",
    date: "2026",
    excerpt: "Đồ án tốt nghiệp mảng Thiết kế đồ họa, đạt 9.5 điểm.",
    keywords: "brandbook connect thiết kế đồ họa đồ án tốt nghiệp canva",
  },
  {
    title: "Dấu mốc",
    type: "Thành tích",
    url: "/achievements/",
    excerpt: "Thành tích học tập, hoạt động Đoàn Thanh niên, Hội Sinh viên và tình nguyện.",
    keywords: "thành tích Nguyễn Thành Nhân Sinh viên 5 Tốt tốt nghiệp Công nghệ thông tin",
  },
  {
    title: "Công tác Đoàn Thanh niên và Hội Sinh viên",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Các vai trò ở Văn phòng Đoàn Thanh niên và Hội Sinh viên, Ban Chấp hành, Ban Thường vụ và truyền thông Đoàn trường.",
    keywords: "Đoàn Thanh niên Hội Sinh viên Văn phòng Đoàn Ban Chấp hành Ban Thường vụ Chủ nhiệm Đội truyền thông",
  },
  {
    title: "Sinh viên 5 Tốt và học tập",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Sinh viên 5 Tốt cấp Trường hai năm liền, học tập Giỏi, rèn luyện Xuất sắc và tốt nghiệp ngành Công nghệ thông tin loại Giỏi.",
    keywords: "Sinh viên 5 Tốt học tập Giỏi rèn luyện Xuất sắc tốt nghiệp Công nghệ thông tin",
  },
  {
    title: "Xuân tình nguyện",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Các ghi nhận trong Chiến dịch Xuân tình nguyện, bao gồm bằng khen cấp Thành phố năm 2025.",
    keywords: "Xuân tình nguyện tình nguyện cộng đồng bằng khen cấp Thành phố",
  },
  {
    title: "Kỹ năng và hội nhập",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Tập huấn kỹ năng AI, kiến thức tài chính cá nhân và hoạt động hội nhập sinh viên.",
    keywords: "AI tài chính cá nhân 5 Tốt Challenges kỹ năng hội nhập",
  },
  {
    title: "PocketMine-MP Việt Nam",
    type: "Cộng đồng",
    url: "/about/",
    excerpt: "Group PocketMine-MP Việt Nam do Nhân lập từ năm 2019, hiện hơn 350 thành viên và vẫn duy trì.",
    keywords: "PocketMine-MP Việt Nam Minecraft Bedrock server plugin",
  },
  {
    title: "Minecraft",
    type: "Sở thích",
    url: "/about/",
    excerpt: "Minecraft là một phần lớn trong hành trình học server, plugin, cấu hình và cộng đồng của Nhân.",
    keywords: "Minecraft Pocket Edition Bedrock server PocketMine",
  },
  {
    title: "GitHub NhanAZ",
    type: "Open source",
    url: "https://github.com/NhanAZ",
    excerpt: "Các repo open source của NhanAZ trên GitHub.",
    keywords: "GitHub NhanAZ open source repository code",
  },
];

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim();

const initSiteSearch = () => {
  const form = document.querySelector("[data-site-search-form]");
  const input = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-site-search-results]");

  if (!form || !input || !results) {
    return;
  }

  const indexedItems = SITE_SEARCH_INDEX.map((item) => ({
    ...item,
    search: normalizeText([item.title, item.type, item.excerpt, item.keywords, item.date].join(" ")),
  }));

  let currentMatches = [];

  const createText = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    element.textContent = text;
    return element;
  };

  const renderResults = () => {
    const tokens = normalizeText(input.value).split(/\s+/).filter(Boolean);
    results.replaceChildren();

    if (!tokens.length) {
      currentMatches = [];
      results.hidden = true;
      return;
    }

    currentMatches = indexedItems
      .filter((item) => tokens.every((token) => item.search.includes(token)))
      .slice(0, 8);

    results.hidden = false;

    if (!currentMatches.length) {
      const empty = createText("p", "site-search-empty", "Chưa thấy kết quả phù hợp. Thử gõ ngắn hơn hoặc bỏ dấu.");
      results.append(empty);
      return;
    }

    currentMatches.forEach((item) => {
      const link = document.createElement("a");
      link.className = "site-search-result";
      link.href = item.url;

      const type = createText("span", "site-search-result-type", item.type);
      const content = document.createElement("span");
      content.append(createText("strong", "", item.title));
      content.append(createText("span", "", item.excerpt));

      link.append(type, content);
      results.append(link);
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currentMatches[0]) {
      window.location.href = currentMatches[0].url;
    }
  });

  input.addEventListener("input", renderResults);

  const query = new URLSearchParams(window.location.search).get("q");
  if (query) {
    input.value = query;
    renderResults();
    input.focus();
  }
};

const initAchievementFilters = () => {
  const list = document.querySelector(".records-list");
  const searchInput = document.querySelector("[data-achievement-search]");
  const categorySelect = document.querySelector("[data-achievement-category]");
  const yearSelect = document.querySelector("[data-achievement-year]");
  const sortSelect = document.querySelector("[data-achievement-sort]");
  const countElement = document.querySelector("[data-achievement-count]");
  const emptyElement = document.querySelector("[data-achievement-empty]");
  const resetButton = document.querySelector("[data-achievement-reset]");

  if (!list || !searchInput || !categorySelect || !yearSelect || !sortSelect) {
    return;
  }

  const records = Array.from(list.querySelectorAll(".record-item")).map((item, index) => {
    const timeElement = item.querySelector("time");
    const titleElement = item.querySelector("h3");
    const issuerElement = item.querySelector("p");
    const numberElement = item.querySelector(".record-number");
    const categoryElement = item.children[item.children.length - 1];
    const date = timeElement?.getAttribute("datetime") || "";
    const category = categoryElement?.textContent?.trim() || "";
    const title = titleElement?.textContent?.trim() || "";
    const issuer = issuerElement?.textContent?.trim() || "";
    const displayDate = timeElement?.textContent?.trim() || "";
    const number = numberElement?.textContent?.trim().padStart(2, "0") || "";
    const year = date.slice(0, 4);
    const search = normalizeText([title, issuer, category, displayDate, year, number].join(" "));

    if (number && !item.id) {
      item.id = `achievement-${number}`;
    }

    return {
      category,
      date,
      index,
      item,
      search,
      time: Date.parse(date) || 0,
      year,
    };
  });

  const applyFilters = () => {
    const tokens = normalizeText(searchInput.value).split(/\s+/).filter(Boolean);
    const selectedCategory = categorySelect.value;
    const selectedYear = yearSelect.value;
    const sortMode = sortSelect.value;

    const sortedRecords = records.slice().sort((a, b) => {
      if (sortMode === "newest") {
        return b.time - a.time || a.index - b.index;
      }

      if (sortMode === "oldest") {
        return a.time - b.time || a.index - b.index;
      }

      return a.index - b.index;
    });

    let visibleCount = 0;

    sortedRecords.forEach((record) => {
      const matchesKeyword = !tokens.length || tokens.every((token) => record.search.includes(token));
      const matchesCategory = !selectedCategory || record.category === selectedCategory;
      const matchesYear = !selectedYear || record.year === selectedYear;
      const isVisible = matchesKeyword && matchesCategory && matchesYear;

      record.item.hidden = !isVisible;
      visibleCount += isVisible ? 1 : 0;
      list.append(record.item);
    });

    if (countElement) {
      countElement.textContent = `Đang hiện ${visibleCount}/${records.length} mục.`;
    }

    if (emptyElement) {
      emptyElement.hidden = visibleCount > 0;
    }

    if (resetButton) {
      resetButton.disabled = !searchInput.value.trim() && !selectedCategory && !selectedYear && sortMode === "default";
    }
  };

  searchInput.addEventListener("input", applyFilters);
  categorySelect.addEventListener("change", applyFilters);
  yearSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  resetButton?.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "";
    yearSelect.value = "";
    sortSelect.value = "default";
    applyFilters();
    searchInput.focus();
  });

  applyFilters();

  if (location.hash.startsWith("#achievement-")) {
    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
    });
  }
};

const initCanvaEmbeds = () => {
  document.querySelectorAll("[data-canva-embed]").forEach((embed) => {
    const frame = embed.querySelector("[data-canva-frame]");
    if (!frame) {
      return;
    }

    frame.addEventListener("load", () => {
      embed.classList.add("is-loaded");
    }, { once: true });
  });
};

initSiteSearch();
initAchievementFilters();
initCanvaEmbeds();
