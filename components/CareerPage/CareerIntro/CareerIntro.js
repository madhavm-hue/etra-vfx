"use client";

import { motion } from "framer-motion";

import { careerStats } from "../data/careerData";

import "./career-intro.css";

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

const statReveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function CareerIntro() {
  return (
    <section
      className="career-intro"
      aria-labelledby="career-intro-title"
    >
      {/* DECORATIVE BACKGROUND */}

      <div
        className="career-intro-background"
        aria-hidden="true"
      >
        <span className="career-intro-glow" />

        <span className="career-intro-circle career-intro-circle-one" />

        <span className="career-intro-circle career-intro-circle-two" />
      </div>

      <div className="site-container career-intro-inner">
        {/* SECTION LABEL */}

        <motion.div
          className="career-intro-label"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >
          <span></span>

          <span className="career-intro-label-line" />

          <span>Life at ETRA</span>
        </motion.div>

        {/* MAIN CONTENT */}

        <div className="career-intro-content">
          <motion.div
            className="career-intro-heading-group"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <h2
              id="career-intro-title"
              className="career-intro-title"
            >
              Your ideas can
              <span>
                shape new worlds.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="career-intro-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <p className="career-intro-lead">
              At ETRA Dreams, every frame is
              built through collaboration,
              curiosity, and attention to
              detail.
            </p>

            <p className="career-intro-description">
              We bring together artists,
              technicians, and creative
              problem-solvers who believe
              exceptional visual effects are
              created when imagination meets
              precision.
            </p>

            <p className="career-intro-description">
              Whether you are beginning your
              career or bringing years of
              experience, you will have the
              opportunity to learn, contribute,
              and create work seen by audiences
              around the world.
            </p>
          </motion.div>
        </div>

        {/* STATISTICS */}

        <motion.div
          className="career-intro-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            staggerChildren: 0.12,
          }}
        >
          {careerStats.map(
            (stat, index) => (
              <motion.article
                key={stat.label}
                className="career-intro-stat"
                variants={statReveal}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                <span className="career-intro-stat-number">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <strong className="career-intro-stat-value">
                  {stat.value}
                </strong>

                <p className="career-intro-stat-label">
                  {stat.label}
                </p>
              </motion.article>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}