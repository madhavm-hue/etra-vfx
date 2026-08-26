"use client";

import "./theme-toggle.css";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;

    const currentTheme =
      root.getAttribute("data-theme") ||
      "light";

    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    root.setAttribute(
      "data-theme",
      newTheme,
    );

    localStorage.setItem(
      "etra-vfx-theme",
      newTheme,
    );
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      title="Switch colour theme"
    >
      <span
        className="theme-toggle-icon theme-toggle-sun"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />

          <path d="M12 2V4" />
          <path d="M12 20V22" />
          <path d="M4.93 4.93L6.34 6.34" />
          <path d="M17.66 17.66L19.07 19.07" />
          <path d="M2 12H4" />
          <path d="M20 12H22" />
          <path d="M4.93 19.07L6.34 17.66" />
          <path d="M17.66 6.34L19.07 4.93" />
        </svg>
      </span>

      <span
        className="theme-toggle-icon theme-toggle-moon"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5A8.6 8.6 0 1 0 20.5 14.2Z" />
        </svg>
      </span>
    </button>
  );
}