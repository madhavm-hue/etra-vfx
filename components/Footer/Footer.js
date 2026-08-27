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
          {/* BRAND */}

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
                className="
                  footer-logo-image
                  footer-logo-light
                "
              />

              <Image
                src="/images/common/etra-vfx-logo-dark.png"
                alt=""
                width={190}
                height={64}
                aria-hidden="true"
                className="
                  footer-logo-image
                  footer-logo-dark
                "
              />
            </Link>

            <p className="footer-brand-description">
              Premium visual effects created
              through imagination, technology,
              and precision.
            </p>
          </div>

          {/* NAVIGATION */}

          <div className="footer-column">
            <p className="footer-column-title">
              Explore
            </p>

            <nav
              className="footer-links"
              aria-label="Footer navigation"
            >
              {footerNavigation.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* SERVICES */}

          <div className="footer-column">
            <p className="footer-column-title">
              Services
            </p>

            <div className="footer-links">
              {footerServices.map(
                (item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* CONTACT */}

          <div className="footer-column footer-contact-column">
            <p className="footer-column-title">
              Get in touch
            </p>

            <div className="footer-office">
              <span className="footer-office-title">
                Production
              </span>

              <p className="footer-office-location">
                Sattur, Tamil Nadu, India
              </p>

              <div className="footer-office-links">
                <a
                  href="mailto:hr@etradreams.com"
                  className="footer-contact-link"
                >
                  hr@etradreams.com
                </a>

                <a
                  href="tel:+919965573184"
                  className="footer-contact-link"
                >
                  +91 99655 73184
                </a>
              </div>
            </div>

            <div className="footer-office">
              <span className="footer-office-title">
                Sales Office
              </span>

              <p className="footer-office-location">
                Montreal, Canada
              </p>

              <div className="footer-office-links">
                <a
                  href="mailto:etravfxprod@etradreams.com"
                  className="footer-contact-link"
                >
                  etravfxprod@etradreams.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">
          <p>
            © 2026 ETRA Dreams. All rights
            reserved.
          </p>

          <div className="footer-bottom-links">
            <a
              href="https://www.linkedin.com/company/edpvtltd/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn

              <span aria-hidden="true">
                ↗
              </span>
            </a>

            <Link href="/contact">
              Contact
            </Link>

            <a
              href="#top"
              className="footer-back-to-top"
              aria-label="Back to the top of the page"
            >
              <span>Back to top</span>

              <span
                className="footer-back-to-top-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 19V5" />
                  <path d="M6 11L12 5L18 11" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}