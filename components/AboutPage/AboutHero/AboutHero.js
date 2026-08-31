"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { aboutHeroData } from "../data/aboutData";
import "./about-hero.css";

export default function AboutHero() {
  const reduceMotion = useReducedMotion();

  const animation = (delay = 0) => ({
    initial: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 45 },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.9,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
    },
  });

  return (
    <section
      id="top"
      className="about-hero"
      aria-labelledby="about-hero-title"
    >
      <div className="about-hero-glow" aria-hidden="true" />

      <div className="site-container about-hero-container">
        <div className="about-hero-content">
          <motion.div
            className="about-hero-label"
            {...animation()}
          >
            
            <span className="about-hero-label-line" />
            <span>About Us</span>
          </motion.div>

          <motion.p
            className="about-hero-eyebrow"
            {...animation(0.08)}
          >
            {aboutHeroData.eyebrow}
          </motion.p>

          <motion.h1
            id="about-hero-title"
            className="about-hero-title"
            {...animation(0.14)}
          >
            Crafting
            <span>Reality.</span>
          </motion.h1>

          <motion.p
            className="about-hero-description"
            {...animation(0.22)}
          >
            {aboutHeroData.description}
          </motion.p>

          <motion.div
            className="about-hero-scroll"
            {...animation(0.3)}
          >
            <span className="about-hero-scroll-icon" aria-hidden="true">
              ↓
            </span>

            <span>Discover our story</span>
          </motion.div>
        </div>

        <motion.div
          className="about-hero-visual"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 55, scale: 0.96 }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: reduceMotion ? 0 : 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="about-hero-image-wrapper">
            <Image
              src={aboutHeroData.image}
              alt={aboutHeroData.imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 820px) 100vw, 50vw"
              className="about-hero-image"
            />

            <div className="about-hero-image-overlay" />

            <div className="about-hero-image-caption">
              <span>ETRA Dreams</span>
              <span>VFX Production Studio</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}