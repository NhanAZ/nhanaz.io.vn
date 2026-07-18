(() => {
  "use strict";

  const root = document.documentElement;
  const storageKey = "nhanaz-color-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeColors = {
    light: "#ffffff",
    dark: "#11110f",
  };

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const writeStoredTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The theme still works for this page when storage is unavailable.
    }
  };

  const getSystemTheme = () => systemTheme.matches ? "dark" : "light";

  const updateThemeColor = (theme) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", themeColors[theme]);
    }
  };

  const applyTheme = (theme, { persist = false, notify = false } = {}) => {
    const nextTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    updateThemeColor(nextTheme);

    if (persist) {
      writeStoredTheme(nextTheme);
    }

    if (notify) {
      window.dispatchEvent(new CustomEvent("site:theme-change", {
        detail: { theme: nextTheme },
      }));
    }
  };

  applyTheme(readStoredTheme() || getSystemTheme());

  const handleSystemThemeChange = () => {
    if (!readStoredTheme()) {
      applyTheme(getSystemTheme(), { notify: true });
    }
  };

  if (typeof systemTheme.addEventListener === "function") {
    systemTheme.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemTheme.addListener === "function") {
    systemTheme.addListener(handleSystemThemeChange);
  }

  const initThemeSwitch = () => {
    const navigation = document.querySelector(".site-nav");
    if (!navigation || navigation.querySelector(".theme-switch")) {
      root.classList.add("theme-transition-ready");
      return;
    }

    const isEnglish = root.lang.toLowerCase().startsWith("en");
    const button = document.createElement("button");
    button.className = "theme-switch";
    button.type = "button";

    const syncButton = () => {
      const isDark = root.dataset.theme === "dark";
      const label = isEnglish
        ? (isDark ? "Switch to light theme" : "Switch to dark theme")
        : (isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");

      button.textContent = "";
      button.dataset.activeTheme = isDark ? "dark" : "light";
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(isDark));
      button.title = label;
    };

    button.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, { persist: true, notify: true });
    });
    window.addEventListener("site:theme-change", syncButton);

    syncButton();
    const languageSwitch = navigation.querySelector(".language-switch");
    if (languageSwitch) {
      languageSwitch.after(button);
    } else {
      navigation.append(button);
    }

    requestAnimationFrame(() => {
      root.classList.add("theme-transition-ready");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeSwitch, { once: true });
  } else {
    initThemeSwitch();
  }
})();
