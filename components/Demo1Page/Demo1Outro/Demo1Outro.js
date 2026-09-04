"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import "./demo1-outro.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 60,
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

export default function Demo1Outro() {
  return (
    <section
      className="demo1-outro"
      aria-labelledby="demo1-outro-title"
    >
      {/* DECORATIVE BACKGROUND */}

      <div
        className="demo1-outro-background"
        aria-hidden="true"
      >
        <span className="demo1-outro-circle demo1-outro-circle-one" />
        <span className="demo1-outro-circle demo1-outro-circle-two" />

        <span className="demo1-outro-glow" />

        <span className="demo1-outro-word">
          ETRA
        </span>
      </div>

      <div className="site-container demo1-outro-inner">
        <motion.div
          className="demo1-outro-header"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <p className="demo1-outro-label">
            <span>End of journey</span>
            <span className="demo1-outro-label-line" />
            <span>16 productions</span>
          </p>

          <h2
            id="demo1-outro-title"
            className="demo1-outro-title"
          >
            Every frame holds
            <span>a new possibility.</span>
          </h2>
        </motion.div>

        <motion.div
          className="demo1-outro-footer"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="demo1-outro-description">
            From invisible visual effects to complete
            digital worlds, we bring ambitious stories
            to life with imagination and precision.
          </p>

          <div className="demo1-outro-actions">
            <Link
              href="/portfolio"
              className="demo1-outro-link demo1-outro-link-secondary"
            >
              <span>View standard portfolio</span>

              <span
                className="demo1-outro-link-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 12H5" />
                  <path d="M11 18L5 12L11 6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/contact"
              className="demo1-outro-link demo1-outro-link-primary"
            >
              <span>Start a project</span>

              <span
                className="demo1-outro-link-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M5 12H19" />
                  <path d="M13 6L19 12L13 18" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}