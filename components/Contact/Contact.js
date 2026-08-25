"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import "./contact.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 60,
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

export default function Contact() {
  const handlePointerMove = (event) => {
    const section = event.currentTarget;
    const bounds = section.getBoundingClientRect();

    section.style.setProperty(
      "--contact-pointer-x",
      `${event.clientX - bounds.left}px`,
    );

    section.style.setProperty(
      "--contact-pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <section
      className="home-contact"
      aria-labelledby="home-contact-title"
      onPointerMove={handlePointerMove}
    >
      <div className="home-contact-glow" aria-hidden="true" />

      <div className="site-container home-contact-inner">
        <motion.div
          className="home-contact-label"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >
          <span className="home-contact-number">05</span>
          <span className="home-contact-label-line" />
          <span>Start a project</span>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <Link
            href="/contact"
            className="home-contact-link"
            aria-label="Contact ETRA Dreams"
          >
            <div className="home-contact-heading-wrapper">
              <h2 id="home-contact-title" className="home-contact-title">
                Let&apos;s create
                <span>something extraordinary.</span>
              </h2>

              <span className="home-contact-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 19L19 5" />
                  <path d="M9 5H19V15" />
                </svg>
              </span>
            </div>

            <div className="home-contact-bottom">
              <p>
                Have a project in mind? Let&apos;s bring your vision to life
                through world-class visual effects.
              </p>

              <span className="home-contact-action">
                <span>Get in touch</span>
                <span className="home-contact-action-line" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}