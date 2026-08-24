"use client";

import "./theme-toggle.css";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("etra-vfx-theme", newTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
    >
      <span className="theme-toggle-text">Theme</span>

      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-dot" />
      </span>
    </button>
  );
}