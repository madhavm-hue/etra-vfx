"use client";

import { motion } from "framer-motion";

import { openPositions } from "../data/careerData";

import "./open-positions.css";

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

const jobReveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function OpenPositions() {
  return (
    <section
      id="open-positions"
      className="open-positions"
      aria-labelledby="open-positions-title"
    >
      {/* BACKGROUND */}

      <div
        className="open-positions-background"
        aria-hidden="true"
      >
        <span className="open-positions-glow" />

        <span className="open-positions-word">
          JOIN
        </span>
      </div>

      <div className="site-container open-positions-inner">
        {/* HEADER */}

        <motion.div
          className="open-positions-header"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="open-positions-label">
            <span>03</span>

            <span className="open-positions-label-line" />

            <span>
              Current opportunities
            </span>
          </div>

          <div className="open-positions-heading">
            <h2
              id="open-positions-title"
              className="open-positions-title"
            >
              Find your place
              <span>in the frame.</span>
            </h2>

            <p className="open-positions-intro">
              Explore our current opportunities
              and discover where your craft,
              curiosity, and ideas can make an
              impact.
            </p>
          </div>
        </motion.div>

        {/* JOB LIST */}

        {openPositions.length > 0 ? (
          <motion.div
            className="open-positions-list"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              staggerChildren: 0.1,
            }}
          >
            {openPositions.map(
              (position, index) => (
                <motion.article
                  key={position.id}
                  className="open-position-card"
                  variants={jobReveal}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.05,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <span className="open-position-number">
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <div className="open-position-main">
                    <p className="open-position-department">
                      {position.department}
                    </p>

                    <h3 className="open-position-title">
                      {position.title}
                    </h3>
                  </div>

                  <div className="open-position-meta">
                    <div>
                      <span>
                        Location
                      </span>

                      <p>
                        {position.location}
                      </p>
                    </div>

                    <div>
                      <span>
                        Employment
                      </span>

                      <p>
                        {position.type}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`mailto:hr@etradreams.com?subject=${encodeURIComponent(
                      `Application for ${position.title}`,
                    )}`}
                    className="open-position-apply"
                    aria-label={`Apply for ${position.title}`}
                  >
                    <span>Apply now</span>

                    <span
                      className="open-position-apply-icon"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M5 19L19 5" />

                        <path d="M9 5H19V15" />
                      </svg>
                    </span>
                  </a>

                  <span
                    className="open-position-hover-line"
                    aria-hidden="true"
                  />
                </motion.article>
              ),
            )}
          </motion.div>
        ) : (
          <motion.div
            className="open-positions-empty"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
          >
            <p>
              There are no open positions at
              the moment.
            </p>

            <a
              href="mailto:hr@etradreams.com?subject=Career enquiry at ETRA Dreams"
            >
              Send us your portfolio
            </a>
          </motion.div>
        )}

        {/* BOTTOM NOTE */}

        <motion.div
          className="open-positions-footer"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5,
          }}
        >
          <p>
            Cannot find the right role?
            We are always interested in
            meeting talented artists.
          </p>

          <a
            href="mailto:hr@etradreams.com?subject=Portfolio submission for ETRA Dreams"
            className="open-positions-general-link"
          >
            <span>
              Submit your portfolio
            </span>

            <span aria-hidden="true">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}