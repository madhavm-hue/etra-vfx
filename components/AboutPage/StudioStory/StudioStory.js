"use client";

import { motion, useReducedMotion } from "framer-motion";

import { studioStoryData } from "../data/aboutData";
import "./studio-story.css";

export default function StudioStory() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 36 },
    whileInView: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      className="studio-story"
      aria-labelledby="studio-story-title"
    >
      <div className="studio-story__container">
        <motion.div
          className="studio-story__heading"
          initial={reveal.initial}
          whileInView={reveal.whileInView}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="studio-story__section-label">
          
            <span className="studio-story__label-line" />
            <span>{studioStoryData.eyebrow}</span>
          </div>

          <h2 id="studio-story-title">
            Welcome to Our
            <span>High-End VFX Studio</span>
          </h2>
        </motion.div>

        <div className="studio-story__body">
          <div className="studio-story__statement">
            <motion.p
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: shouldReduceMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              We transform ambitious ideas into
              <span> unforgettable visual experiences.</span>
            </motion.p>
          </div>

          <div className="studio-story__copy">
            {studioStoryData.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="studio-story__stats">
          {studioStoryData.stats.map((stat, index) => (
            <motion.article
              className="studio-story__stat"
              key={stat.label}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="studio-story__stat-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{stat.value}</strong>

              <span className="studio-story__stat-label">
                {stat.label}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}