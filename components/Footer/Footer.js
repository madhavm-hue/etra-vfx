import Image from "next/image";
import Link from "next/link";

import "./footer.css";

const footerNavigation = [
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

const footerServices = [
  {
    label: "Rotoscopy & Keying",
    href: "/services",
  },
  {
    label: "Paint & Prep",
    href: "/services",
  },
  {
    label: "Matchmove & Rotomation",
    href: "/services",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link
              href="/"
              className="footer-logo"
              aria-label="ETRA Dreams home"
            >
              <Image
                src="/images/common/etra-vfx-logo-light.png"
                alt="ETRA Dreams"
                width={190}
                height={64}
                className="footer-logo-image footer-logo-light"
              />

              <Image
                src="/images/common/etra-vfx-logo-dark.png"
                alt=""
                width={190}
                height={64}
                aria-hidden="true"
                className="footer-logo-image footer-logo-dark"
              />
            </Link>

            <p className="footer-brand-description">
              Premium visual effects created through imagination, technology,
              and precision.
            </p>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Explore</p>

            <nav className="footer-links" aria-label="Footer navigation">
              {footerNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Services</p>

            <div className="footer-links">
              {footerServices.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-column footer-contact-column">
            <p className="footer-column-title">Get in touch</p>

            <a
              href="mailto:etravfxprod@etradreams.com"
              className="footer-email"
            >
              etravfxprod@etradreams.com
            </a>

            <div className="footer-office">
              <span>Production</span>
              <p>Sattur, Tamil Nadu, India</p>
            </div>

            <div className="footer-office">
              <span>Sales Office</span>
              <p>Montreal, Canada</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ETRA Dreams. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a
              href="https://www.linkedin.com/company/edpvtltd/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
            </a>

            <Link href="/contact">Contact</Link>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={undefined}
            >
              <a href="#top">Back to top ↑</a>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}