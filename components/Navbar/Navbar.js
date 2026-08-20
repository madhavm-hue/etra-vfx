"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./navbar.css";

const navLinks = [
  {
    label: "Work",
    href: "/portfolio",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
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

  return (
    <header className="site-header">
      <div className="site-container navbar-inner">

        <Link href="/" className="navbar-logo" aria-label="ETRA VFX Home">
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
            alt="ETRA VFX"
            width={180}
            height={60}
            priority
            className="logo logo-dark"
          />
        </Link>

        <nav className="navbar-nav" aria-label="Main navigation">
          {navLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`navbar-link ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}