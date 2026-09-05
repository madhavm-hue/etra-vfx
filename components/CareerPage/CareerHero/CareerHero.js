"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import "./career-hero.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 50,
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

export default function CareerHero() {
  return (
    <section
      className="career-hero"
      aria-labelledby="career-hero-title"
    >
      {/* BACKGROUND DECORATION */}

      <div
        className="career-hero-background"
        aria-hidden="true"
      >
        <span className="career-hero-orbit career-hero-orbit-one" />

        <span className="career-hero-orbit career-hero-orbit-two" />

        <span className="career-hero-glow" />

        <span className="career-hero-grid" />
      </div>

      <div className="site-container career-hero-inner">
        <motion.div
          className="career-hero-top"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <div className="career-hero-label">
            <span>01</span>

            <span className="career-hero-label-line" />

            <span>Careers at ETRA</span>
          </div>

          <p className="career-hero-intro">
            Join a team of artists,
            technologists, and storytellers
            creating visual experiences for
            audiences around the world.
          </p>
        </motion.div>

        <motion.div
          className="career-hero-content"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <h1
            id="career-hero-title"
            className="career-hero-title"
          >
            Create the
            <span>impossible.</span>
          </h1>

          <div className="career-hero-bottom">
            <p className="career-hero-description">
              Bring your imagination, craft,
              and curiosity. Together, we
              transform ambitious ideas into
              unforgettable frames.
            </p>

            <Link
              href="#open-positions"
              className="career-hero-link"
            >
              <span>
                View open positions
              </span>

              <span
                className="career-hero-link-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 5V19" />
                  <path d="M6 13L12 19L18 13" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>

        <div
          className="career-hero-scroll"
          aria-hidden="true"
        >
          <span>Scroll to discover</span>

          <span className="career-hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}