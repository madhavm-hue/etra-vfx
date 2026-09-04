"use client";

import { motion } from "framer-motion";

import "./demo1-hero.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 40,
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

export default function Demo1Hero() {
  const scrollToProjects = () => {
    document
      .getElementById("demo1-projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="demo1-hero"
      className="demo1-hero"
      aria-labelledby="demo1-hero-title"
    >
      <div
        className="demo1-hero-background"
        aria-hidden="true"
      >
        <span className="demo1-orb demo1-orb-one" />
        <span className="demo1-orb demo1-orb-two" />
        <span className="demo1-hero-grid" />
        <span className="demo1-hero-noise" />
      </div>

      <div className="site-container demo1-hero-inner">
        <motion.div
          className="demo1-hero-copy"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <p className="demo1-hero-eyebrow">
            <span>01</span>
            <span className="demo1-hero-eyebrow-line" />
            <span>Demo 1</span>
          </p>

          <h1
            id="demo1-hero-title"
            className="demo1-hero-title"
          >
            Enter the world
            <span>behind every frame.</span>
          </h1>

          <div className="demo1-hero-meta">
            <p>
              A scroll-driven journey through cinematic
              worlds shaped by imagination, precision,
              and visual effects.
            </p>

            <span className="demo1-hero-count">
              16 Productions
            </span>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="demo1-scroll-button"
          onClick={scrollToProjects}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
          aria-label="Scroll to explore projects"
        >
          <span
            className="demo1-scroll-mouse"
            aria-hidden="true"
          >
            <span />
          </span>

          <span>Scroll to explore</span>
        </motion.button>

        <span
          className="demo1-hero-index"
          aria-hidden="true"
        >
          01 / 16
        </span>
      </div>
    </section>
  );
}