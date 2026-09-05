"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import "./career-cta.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 55,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CareerCTA() {
  return (
    <section
      className="career-cta"
      aria-labelledby="career-cta-title"
    >
      {/* BACKGROUND */}

      <div
        className="career-cta-background"
        aria-hidden="true"
      >
        <span className="career-cta-glow career-cta-glow-one" />

        <span className="career-cta-glow career-cta-glow-two" />

        <span className="career-cta-circle career-cta-circle-one" />

        <span className="career-cta-circle career-cta-circle-two" />

        <span className="career-cta-word">
          CREATE
        </span>
      </div>

      <div className="site-container career-cta-inner">
        {/* TOP LABEL */}

        <motion.div
          className="career-cta-label"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >
          <span>05</span>

          <span className="career-cta-label-line" />

          <span>Start your journey</span>
        </motion.div>

        {/* MAIN CONTENT */}

        <motion.div
          className="career-cta-content"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <h2
            id="career-cta-title"
            className="career-cta-title"
          >
            Your next great
            <span>story starts here.</span>
          </h2>

          <div className="career-cta-bottom">
            <p className="career-cta-description">
              Share your portfolio, experience,
              and the kind of work that excites
              you. We would love to discover
              what you can bring to ETRA Dreams.
            </p>

            <div className="career-cta-actions">
              <a
                href="mailto:hr@etradreams.com?subject=Career application at ETRA Dreams"
                className="career-cta-link career-cta-link-primary"
              >
                <span>
                  Apply with portfolio
                </span>

                <span
                  className="career-cta-link-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M5 19L19 5" />

                    <path d="M9 5H19V15" />
                  </svg>
                </span>
              </a>

              <Link
                href="/contact"
                className="career-cta-link career-cta-link-secondary"
              >
                <span>
                  Contact our team
                </span>

                <span
                  className="career-cta-link-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12H19" />

                    <path d="M13 6L19 12L13 18" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FOOTER INFORMATION */}

        <motion.div
          className="career-cta-footer"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5,
          }}
        >
          <p>
            ETRA Dreams Private Limited
          </p>

          <div className="career-cta-footer-details">
            <span>
              Sattur, Tamil Nadu
            </span>

            <a href="mailto:hr@etradreams.com">
              hr@etradreams.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}