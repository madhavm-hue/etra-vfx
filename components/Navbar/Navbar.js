"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
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
    children: [
      {
        label: "Demo 1",
        href: "/portfolio/demo1",
      },
    ],
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
  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    portfolioDropdownOpen,
    setPortfolioDropdownOpen,
  ] = useState(false);

  const [introReady, setIntroReady] =
    useState(false);

  const [navbarVisible, setNavbarVisible] =
    useState(pathname !== "/");

  /* ROUTE CHANGE */

  useEffect(() => {
    const frame =
      window.requestAnimationFrame(() => {
        setMenuOpen(false);
        setPortfolioDropdownOpen(false);

        if (pathname !== "/") {
          setIntroReady(true);
          setNavbarVisible(true);
          return;
        }

        const introAlreadyCompleted =
          document.documentElement.getAttribute(
            "data-etra-intro-complete",
          ) === "true";

        setIntroReady(introAlreadyCompleted);
        setNavbarVisible(
          introAlreadyCompleted,
        );
      });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  /* ESCAPE */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPortfolioDropdownOpen(false);
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

  /* CLOSE DESKTOP DROPDOWN OUTSIDE */

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target,
        )
      ) {
        setPortfolioDropdownOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, []);

  /* MOBILE SCROLL LOCK */

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

  /* WAIT FOR HOME INTRO */

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

  /* SHOW NAVBAR AFTER SCROLL */

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

  /* ACTIVE LINK */

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setPortfolioDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(
      (currentState) => !currentState,
    );

    setPortfolioDropdownOpen(false);
  };

  const togglePortfolioDropdown = () => {
    setPortfolioDropdownOpen(
      (currentState) => !currentState,
    );
  };

  const headerClasses = [
    "site-header",
    pathname === "/"
      ? "home-intro-header"
      : "",
    navbarVisible
      ? "navbar-visible"
      : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <div className="site-container navbar-inner">
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

            if (item.children) {
              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className={`navbar-dropdown ${
                    portfolioDropdownOpen
                      ? "open"
                      : ""
                  }`}
                >
                  <div className="navbar-dropdown-trigger">
                    <Link
                      href={item.href}
                      className={`navbar-link ${
                        active ? "active" : ""
                      }`}
                      aria-current={
                        pathname === item.href
                          ? "page"
                          : undefined
                      }
                    >
                      {item.label}
                    </Link>

                    <button
                      type="button"
                      className="navbar-dropdown-toggle"
                      onClick={
                        togglePortfolioDropdown
                      }
                      aria-label="Toggle Portfolio submenu"
                      aria-expanded={
                        portfolioDropdownOpen
                      }
                      aria-controls="portfolio-submenu"
                    >
                      <svg viewBox="0 0 12 12">
                        <path d="M2 4L6 8L10 4" />
                      </svg>
                    </button>
                  </div>

                  <div
                    id="portfolio-submenu"
                    className="navbar-dropdown-menu"
                  >
                    {item.children.map(
                      (child) => {
                        const childActive =
                          pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`navbar-dropdown-link ${
                              childActive
                                ? "active"
                                : ""
                            }`}
                            aria-current={
                              childActive
                                ? "page"
                                : undefined
                            }
                            onClick={() =>
                              setPortfolioDropdownOpen(
                                false,
                              )
                            }
                          >
                            <span>01</span>
                            <strong>
                              {child.label}
                            </strong>
                            <span aria-hidden="true">
                              ↗
                            </span>
                          </Link>
                        );
                      },
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`navbar-link ${
                  active ? "active" : ""
                }`}
                aria-current={
                  pathname === item.href
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

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
          {navLinks.map((item, index) => {
            const active =
              isActiveLink(item.href);

            if (item.children) {
              return (
                <div
                  className={`mobile-menu-group ${
                    portfolioDropdownOpen
                      ? "open"
                      : ""
                  }`}
                  key={item.href}
                >
                  <div className="mobile-menu-parent">
                    <span className="mobile-menu-number">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`mobile-menu-parent-link ${
                        active ? "active" : ""
                      }`}
                    >
                      {item.label}
                    </Link>

                    <button
                      type="button"
                      className="mobile-submenu-toggle"
                      onClick={
                        togglePortfolioDropdown
                      }
                      aria-label="Toggle Portfolio submenu"
                      aria-expanded={
                        portfolioDropdownOpen
                      }
                    >
                      <span />
                      <span />
                    </button>
                  </div>

                  <div className="mobile-submenu">
                    {item.children.map(
                      (child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={
                            pathname === child.href
                              ? "active"
                              : ""
                          }
                        >
                          <span>—</span>
                          <span>
                            {child.label}
                          </span>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`mobile-menu-link ${
                  active ? "active" : ""
                }`}
                aria-current={
                  pathname === item.href
                    ? "page"
                    : undefined
                }
              >
                <span className="mobile-menu-number">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}