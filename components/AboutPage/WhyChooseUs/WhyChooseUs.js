"use client";

import { motion, useReducedMotion } from "framer-motion";

import { whyChooseUsData } from "../data/aboutData";
import "./why-choose-us.css";

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="why-etra"
      aria-labelledby="why-etra-title"
    >
      <div className="why-etra__container">
        <motion.header
          className="why-etra__header"
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
          <div className="why-etra__section-label">
            
            <span className="why-etra__label-line" />
            <span>{whyChooseUsData.eyebrow}</span>
          </div>

          <div className="why-etra__heading-copy">
            <h2 id="why-etra-title">
              Why Choose <span>Us?</span>
            </h2>

            <p>{whyChooseUsData.description}</p>
          </div>
        </motion.header>

        <div className="why-etra__list">
          {whyChooseUsData.items.map((item, index) => (
            <motion.article
              className="why-etra__item"
              key={item.number}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="why-etra__number">
                {item.number}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <span
                className="why-etra__arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}