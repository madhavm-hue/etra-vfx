"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { contactHeroData } from "../data/contactData";
import "./contact-hero.css";

export default function ContactHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 42 },
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
      className="contact-page-hero"
      aria-labelledby="contact-page-hero-title"
    >
      <div
        className="contact-page-hero-background"
        aria-hidden="true"
      >
        <span className="contact-page-hero-orbit contact-page-hero-orbit-one" />
        <span className="contact-page-hero-orbit contact-page-hero-orbit-two" />
        <span className="contact-page-hero-orbit contact-page-hero-orbit-three" />
        <span className="contact-page-hero-glow" />
      </div>

      <div className="site-container contact-page-hero-container">
        <div className="contact-page-hero-content">
          <motion.div
            className="contact-page-hero-label"
            {...reveal()}
          >
          
            <span className="contact-page-hero-label-line" />
            <span>{contactHeroData.eyebrow}</span>
          </motion.div>

          <motion.h1
            id="contact-page-hero-title"
            className="contact-page-hero-title"
            {...reveal(0.08)}
          >
            {contactHeroData.title}
            <span>{contactHeroData.highlightedTitle}</span>
          </motion.h1>

          <motion.div
            className="contact-page-hero-copy"
            {...reveal(0.16)}
          >
            <p>{contactHeroData.description}</p>

            <div className="contact-page-hero-availability">
              <span
                className="contact-page-hero-status"
                aria-hidden="true"
              />
              <span>{contactHeroData.availability}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="contact-page-hero-action"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  scale: 0.85,
                  rotate: -8,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1,
            delay: reduceMotion ? 0 : 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            href="#contact-form"
            className="contact-page-hero-action-link"
            aria-label="Go to the contact form"
          >
            <span className="contact-page-hero-action-label">
              Start a project
            </span>

            <span
              className="contact-page-hero-action-arrow"
              aria-hidden="true"
            >
              ↘
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="site-container contact-page-hero-footer"
        {...reveal(0.28)}
      >
        <span>India</span>
        <span className="contact-page-hero-footer-line" />
        <span>Canada</span>
        <span className="contact-page-hero-footer-space" />
        <span>Scroll to connect</span>
      </motion.div>
    </section>
  );
}