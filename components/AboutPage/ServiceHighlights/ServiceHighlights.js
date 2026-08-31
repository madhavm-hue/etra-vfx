"use client";

import { motion, useReducedMotion } from "framer-motion";

import { serviceHighlightsData } from "../data/aboutData";
import "./service-highlights.css";

export default function ServiceHighlights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="about-highlights"
      aria-labelledby="about-highlights-title"
    >
      <div className="about-highlights__container">
        <motion.header
          className="about-highlights__header"
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
          <div className="about-highlights__section-label">
        
            <span className="about-highlights__label-line" />
            <span>{serviceHighlightsData.eyebrow}</span>
          </div>

          <div className="about-highlights__heading">
            <h2 id="about-highlights-title">
              Our Service
              <span>Highlights</span>
            </h2>

            <p>{serviceHighlightsData.description}</p>
          </div>
        </motion.header>

        <div className="about-highlights__grid">
          {serviceHighlightsData.items.map((item, index) => (
            <motion.article
              className="about-highlights__card"
              key={item.number}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 35 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion
                  ? 0
                  : (index % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="about-highlights__card-top">
                <span className="about-highlights__number">
                  {item.number}
                </span>

                <span
                  className="about-highlights__plus"
                  aria-hidden="true"
                >
                  +
                </span>
              </div>

              <div className="about-highlights__card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}