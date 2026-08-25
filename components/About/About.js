"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "./about.css";

const reveal = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  return (
    <section className="home-about" aria-labelledby="home-about-title">
      <div className="site-container home-about-inner">
        <motion.div
          className="home-about-header"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="home-about-label">
            <span className="home-about-number">02</span>
            <span className="home-about-line" />
            <span>About our studio</span>
          </div>

          <h2 id="home-about-title" className="home-about-title">
            Etra Dreams
            <span>1st Choice VFX</span>
          </h2>
        </motion.div>

        <div className="home-about-grid">
          <motion.div
            className="home-about-media"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="home-about-image-wrapper">
              <Image
                src="/images/about/about-studio.jpg"
                alt="ETRA Dreams visual effects studio"
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
                className="home-about-image"
              />

              <div className="home-about-image-overlay" />

              <div className="home-about-image-caption">
                <span>Creativity</span>
                <span>Technology</span>
                <span>Imagination</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="home-about-content"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <p className="home-about-lead">
              We specialize in delivering premium VFX services for Feature
              Films, Animated Movies, Television Episodic Work, Advertising,
              and the Entertainment Industry.
            </p>

            <p className="home-about-description">
              Our studio is driven by creativity and a commitment to providing
              high-quality outputs with unparalleled efficiency. Whether the
              project is simple or highly complex, our team ensures stunning
              visual results delivered on time.
            </p>

            <Link href="/about" className="home-about-link">
              <span>Discover our studio</span>

              <span className="home-about-link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12H19" />
                  <path d="M13 6L19 12L13 18" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="home-about-marquee" aria-hidden="true">
          <div className="home-about-marquee-track">
            <span>Dream</span>
            <span className="home-about-marquee-dot" />
            <span>Create</span>
            <span className="home-about-marquee-dot" />
            <span>Transform</span>
            <span className="home-about-marquee-dot" />

            <span>Dream</span>
            <span className="home-about-marquee-dot" />
            <span>Create</span>
            <span className="home-about-marquee-dot" />
            <span>Transform</span>
            <span className="home-about-marquee-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}