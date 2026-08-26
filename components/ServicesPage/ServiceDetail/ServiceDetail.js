"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "./service-detail.css";

const revealEase = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 55,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: revealEase,
    },
  },
};

export default function ServiceDetail({ service }) {
  return (
    <article className="service-detail">
      <section
        className="service-detail-hero"
        aria-labelledby="service-detail-title"
      >
        <Image
          src={service.heroMedia.src}
          alt={service.heroMedia.alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="service-detail-hero-image"
        />

        <div
          className="service-detail-hero-overlay"
          aria-hidden="true"
        />

        <div className="site-container service-detail-hero-inner">
          <motion.div
            className="service-detail-glass"
            initial={{
              opacity: 0,
              y: 65,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: revealEase,
            }}
          >
            <Link
              href="/services"
              className="service-detail-back"
            >
              <span aria-hidden="true">←</span>
              <span>All services</span>
            </Link>

            <h1
              id="service-detail-title"
              className="service-detail-title"
            >
              {service.title}
            </h1>

            <p className="service-detail-introduction">
              {service.introduction}
            </p>
          </motion.div>

          <motion.div
            className="service-detail-scroll"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 1,
            }}
            aria-hidden="true"
          >
            <span>Scroll to explore</span>
            <span className="service-detail-scroll-line" />
          </motion.div>
        </div>
      </section>

      <section className="service-detail-story">
        <div className="site-container service-detail-story-grid">
          <motion.div
            className="service-detail-story-content"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.18,
            }}
          >
            <h2 className="service-detail-story-title">
              {service.sectionTitle}
            </h2>

            <div className="service-detail-paragraphs">
              {service.paragraphs.map(
                (paragraph, index) => (
                  <p key={`${service._id}-paragraph-${index}`}>
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            className="service-detail-feature-media"
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={{
              duration: 1,
              ease: revealEase,
            }}
          >
            <Image
              src={service.featureMedia.src}
              alt={service.featureMedia.alt}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className="service-detail-feature-image"
            />

            <div
              className="service-detail-feature-shade"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </section>

      <section className="service-detail-highlights">
        <div className="site-container">
          <motion.h2
            className="service-detail-highlights-title"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
          >
            Highlights
          </motion.h2>

          <div className="service-detail-highlight-grid">
            {service.highlights.map(
              (highlight, index) => (
                <motion.div
                  key={highlight._key}
                  className="service-detail-highlight-card"
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.85,
                    delay: index * 0.1,
                    ease: revealEase,
                  }}
                >
                  <span className="service-detail-highlight-number">
                    {highlight.number}
                  </span>

                  <p>{highlight.text}</p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="service-detail-next">
        <Link
          href={`/services/${service.relatedService.slug.current}`}
          className="service-detail-next-link"
          aria-label={`View ${service.relatedService.title} service`}
        >
          <Image
            src={service.relatedService.image.src}
            alt={service.relatedService.image.alt}
            fill
            sizes="100vw"
            className="service-detail-next-image service-detail-next-static"
          />

          <Image
            src={service.relatedService.preview.src}
            alt=""
            fill
            unoptimized
            aria-hidden="true"
            sizes="100vw"
            className="service-detail-next-image service-detail-next-preview"
          />

          <div
            className="service-detail-next-overlay"
            aria-hidden="true"
          />

          <div className="site-container service-detail-next-content">
            <span>Next service</span>

            <h2>{service.relatedService.title}</h2>

            <span
              className="service-detail-next-arrow"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path d="M5 12H19" />
                <path d="M13 6L19 12L13 18" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      <section className="service-detail-portfolio">
        <div className="site-container">
          <motion.h2
            className="service-detail-portfolio-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35,
            }}
          >
            Related Portfolio
          </motion.h2>

          <motion.div
            className="service-detail-portfolio-layout"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <Link
              href={service.relatedPortfolio.href}
              className="service-detail-portfolio-card"
              aria-label={`View ${service.relatedPortfolio.title} in portfolio`}
            >
              <div className="service-detail-portfolio-media">
               <Image
  key={service.relatedPortfolio.image.src}
  src={service.relatedPortfolio.image.src}
  alt={service.relatedPortfolio.image.alt}
  fill
  unoptimized
  sizes="(max-width: 640px) 82vw, 430px"
  className="service-detail-portfolio-image"
/>

                <div
                  className="service-detail-portfolio-overlay"
                  aria-hidden="true"
                />

                <span
                  className="service-detail-portfolio-arrow"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M5 19L19 5" />
                    <path d="M9 5H19V15" />
                  </svg>
                </span>
              </div>

              <h3>{service.relatedPortfolio.title}</h3>
            </Link>

            <Link
              href="/portfolio"
              className="service-detail-portfolio-button"
            >
              <span>View All Portfolio</span>

              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}