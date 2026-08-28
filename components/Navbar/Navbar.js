"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./navbar.css";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Team",
    href: "/team",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [introReady, setIntroReady] =
    useState(false);

  const [navbarVisible, setNavbarVisible] =
    useState(pathname !== "/");

  /* =========================
     HANDLE ROUTE CHANGE
  ========================= */

  useEffect(() => {
    const frame =
      window.requestAnimationFrame(() => {
        setMenuOpen(false);

        if (pathname !== "/") {
          setIntroReady(true);
          setNavbarVisible(true);
          return;
        }

        const introAlreadyCompleted =
          document.documentElement.getAttribute(
            "data-etra-intro-complete",
          ) === "true";

        setIntroReady(
          introAlreadyCompleted,
        );

        setNavbarVisible(
          introAlreadyCompleted,
        );
      });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  /* =========================
     CLOSE MOBILE MENU
     WHEN ESCAPE IS PRESSED
  ========================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  /* =========================
     MOBILE MENU SCROLL LOCK
  ========================= */

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  /* =========================
     WAIT FOR HOME INTRO
  ========================= */

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    const handleIntroReady = (event) => {
      setIntroReady(true);

      if (event.detail?.skipped) {
        setNavbarVisible(true);
      }
    };

    window.addEventListener(
      "etra:intro-ready",
      handleIntroReady,
    );

    return () => {
      window.removeEventListener(
        "etra:intro-ready",
        handleIntroReady,
      );
    };
  }, [pathname]);

  /* =========================
     SHOW NAVBAR AFTER
     FIRST LIGHT SCROLL
  ========================= */

  useEffect(() => {
    if (
      pathname !== "/" ||
      !introReady ||
      navbarVisible
    ) {
      return undefined;
    }

    const handleFirstScroll = () => {
      if (window.scrollY > 8) {
        setNavbarVisible(true);
      }
    };

    const frame =
      window.requestAnimationFrame(
        handleFirstScroll,
      );

    window.addEventListener(
      "scroll",
      handleFirstScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        handleFirstScroll,
      );
    };
  }, [
    pathname,
    introReady,
    navbarVisible,
  ]);

  /* =========================
     ACTIVE LINK CHECK
  ========================= */

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =========================
     MENU FUNCTIONS
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(
      (currentState) => !currentState,
    );
  };

  /* =========================
     HEADER CLASSES
  ========================= */

  const headerClasses = [
    "site-header",

    pathname === "/"
      ? "home-intro-header"
      : "",

    navbarVisible
      ? "navbar-visible"
      : "",

    menuOpen
      ? "menu-open"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <div className="site-container navbar-inner">
        {/* LOGO */}

        <Link
          href="/"
          className="navbar-logo"
          aria-label="ETRA VFX Home"
          onClick={closeMenu}
        >
          <Image
            src="/images/common/etra-vfx-logo-light.png"
            alt="ETRA VFX"
            width={180}
            height={60}
            priority
            className="logo logo-light"
          />

          <Image
            src="/images/common/etra-vfx-logo-dark.png"
            alt=""
            width={180}
            height={60}
            priority
            aria-hidden="true"
            className="logo logo-dark"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav
          className="navbar-nav"
          aria-label="Main navigation"
        >
          {navLinks.map((item) => {
            const active =
              isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`navbar-link ${
                  active ? "active" : ""
                }`}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* NAVBAR ACTIONS */}

        <div className="navbar-actions">
          <ThemeToggle />

          <button
            type="button"
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <div
        id="mobile-navigation"
        className="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <nav
          className="site-container mobile-menu-nav"
          aria-label="Mobile navigation"
        >
          {navLinks.map(
            (item, index) => {
              const active =
                isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`mobile-menu-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                >
                  <span className="mobile-menu-number">
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <span>
                    {item.label}
                  </span>
                </Link>
              );
            },
          )}
        </nav>
      </div>
    </header>
  );
}