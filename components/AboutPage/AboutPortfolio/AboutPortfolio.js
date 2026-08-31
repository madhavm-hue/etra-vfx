"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { aboutPortfolioData } from "../data/aboutData";
import "./about-portfolio.css";

export default function AboutPortfolio() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="about-work"
      aria-labelledby="about-work-title"
    >
      <div className="about-work__container">
        <motion.header
          className="about-work__header"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 36 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="about-work__section-label">
            <span>04</span>
            <span className="about-work__label-line" />
            <span>{aboutPortfolioData.eyebrow}</span>
          </div>

          <div className="about-work__heading">
            <h2 id="about-work-title">
              Stories We Helped
              <span>Bring to Life</span>
            </h2>

            <p>{aboutPortfolioData.description}</p>
          </div>
        </motion.header>

        <div className="about-work__projects">
          {aboutPortfolioData.projects.map((project, index) => (
            <motion.article
              className="about-work__project"
              key={project.title}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={aboutPortfolioData.buttonHref}
                className="about-work__project-link"
                aria-label={`View ${project.title} in portfolio`}
              >
                <span className="about-work__project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="about-work__project-title">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>

                <span
                  className="about-work__project-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="about-work__action"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={aboutPortfolioData.buttonHref}
            className="about-work__button"
          >
            <span>{aboutPortfolioData.buttonLabel}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}