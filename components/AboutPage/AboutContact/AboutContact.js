"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { aboutContactData } from "../data/aboutData";
import "./about-contact.css";

export default function AboutContact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="about-contact"
      aria-labelledby="about-contact-title"
    >
      <div className="about-contact__background" aria-hidden="true">
        <div className="about-contact__circle about-contact__circle--one" />
        <div className="about-contact__circle about-contact__circle--two" />
        <div className="about-contact__circle about-contact__circle--three" />
      </div>

      <div className="about-contact__container">
        <motion.div
          className="about-contact__label"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
         
          <span className="about-contact__label-line" />
          <span>{aboutContactData.eyebrow}</span>
        </motion.div>

        <motion.div
          className="about-contact__content"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 40 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.85,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 id="about-contact-title">
            Let&apos;s Create Something
            <span>Extraordinary.</span>
          </h2>

          <p>{aboutContactData.description}</p>
        </motion.div>

        <motion.div
          className="about-contact__actions"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 28 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: shouldReduceMotion ? 0 : 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={aboutContactData.primaryButton.href}
            className="about-contact__button about-contact__button--primary"
          >
            <span>{aboutContactData.primaryButton.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href={aboutContactData.secondaryButton.href}
            className="about-contact__button about-contact__button--secondary"
          >
            <span>{aboutContactData.secondaryButton.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>

        <motion.div
          className="about-contact__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.25,
          }}
        >
          <span>Production</span>
          <span>India</span>
          <span className="about-contact__footer-line" />
          <span>Sales Office</span>
          <span>Canada</span>
        </motion.div>
      </div>
    </section>
  );
}