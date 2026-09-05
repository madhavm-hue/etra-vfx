"use client";

import { motion } from "framer-motion";

import { careerBenefits } from "../data/careerData";

import "./career-benefits.css";

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

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function CareerBenefits() {
  return (
    <section
      className="career-benefits"
      aria-labelledby="career-benefits-title"
    >
      {/* BACKGROUND */}

      <div
        className="career-benefits-background"
        aria-hidden="true"
      >
        <span className="career-benefits-glow" />

        <span className="career-benefits-circle career-benefits-circle-one" />

        <span className="career-benefits-circle career-benefits-circle-two" />
      </div>

      <div className="site-container career-benefits-inner">
        {/* HEADER */}

        <motion.div
          className="career-benefits-header"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="career-benefits-label">
            <span>04</span>

            <span className="career-benefits-label-line" />

            <span>Why ETRA</span>
          </div>

          <div className="career-benefits-heading">
            <h2
              id="career-benefits-title"
              className="career-benefits-title"
            >
              Grow your craft.
              <span>
                Build what matters.
              </span>
            </h2>

            <p className="career-benefits-intro">
              We create an environment where
              talented people can learn,
              collaborate, and turn ambitious
              ideas into exceptional visual
              experiences.
            </p>
          </div>
        </motion.div>

        {/* BENEFITS GRID */}

        <motion.div
          className="career-benefits-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            staggerChildren: 0.12,
          }}
        >
          {careerBenefits.map(
            (benefit, index) => (
              <motion.article
                key={benefit.number}
                className="career-benefit-card"
                variants={cardReveal}
                transition={{
                  duration: 0.8,
                  delay: index * 0.06,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                <div className="career-benefit-card-top">
                  <span className="career-benefit-number">
                    {benefit.number}
                  </span>

                  <span
                    className="career-benefit-icon"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M5 19L19 5" />

                      <path d="M9 5H19V15" />
                    </svg>
                  </span>
                </div>

                <div className="career-benefit-card-content">
                  <h3 className="career-benefit-title">
                    {benefit.title}
                  </h3>

                  <p className="career-benefit-description">
                    {benefit.description}
                  </p>
                </div>

                <span
                  className="career-benefit-corner"
                  aria-hidden="true"
                />

                <span
                  className="career-benefit-hover-background"
                  aria-hidden="true"
                >
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>
              </motion.article>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}