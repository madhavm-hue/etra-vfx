"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "./services-portfolio.css";

const portfolioProjects = [
  {
    _id: "services-portfolio-911",
    _type: "project",
    number: "01",
    title: "9-1-1: Lone Star",
    image: {
      src: "/images/portfolio/911-lone-star.jpg",
      alt: "9-1-1 Lone Star",
    },
    href: "/portfolio",
    order: 1,
  },
  {
    _id: "services-portfolio-dexter",
    _type: "project",
    number: "02",
    title: "Dexter: Resurrection",
    image: {
      src: "/images/portfolio/dexter-resurrection.jpg",
      alt: "Dexter Resurrection",
    },
    href: "/portfolio",
    order: 2,
  },
  {
    _id: "services-portfolio-nobody",
    _type: "project",
    number: "03",
    title: "Nobody 2",
    image: {
      src: "/images/portfolio/nobody-2.jpg",
      alt: "Nobody 2",
    },
    href: "/portfolio",
    order: 3,
  },
  {
    _id: "services-portfolio-only-murders",
    _type: "project",
    number: "04",
    title: "Only Murders in the Building",
    image: {
      src: "/images/portfolio/only-murders-building.jpg",
      alt: "Only Murders in the Building",
    },
    href: "/portfolio",
    order: 4,
  },
];

const revealEase = [0.16, 1, 0.3, 1];

export default function ServicesPortfolio({
  projects = portfolioProjects,
}) {
  return (
    <section
      className="services-portfolio"
      aria-labelledby="services-portfolio-title"
    >
      <div className="site-container">
        <motion.div
          className="services-portfolio-header"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: revealEase,
          }}
        >
          <h2
            id="services-portfolio-title"
            className="services-portfolio-title"
          >
            Portfolio
          </h2>
        </motion.div>

        <div className="services-portfolio-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project._id}
              className={`services-portfolio-card services-portfolio-card-${
                index + 1
              }`}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.95,
                delay: Math.min(index * 0.1, 0.3),
                ease: revealEase,
              }}
            >
              <Link
                href={project.href}
                className="services-portfolio-link"
                aria-label={`View ${project.title} in portfolio`}
              >
                <div className="services-portfolio-media">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="
                      (max-width: 640px) 86vw,
                      (max-width: 1024px) 45vw,
                      25vw
                    "
                    className="services-portfolio-image"
                  />

                  <div
                    className="services-portfolio-overlay"
                    aria-hidden="true"
                  />

                  <span className="services-portfolio-number">
                    {project.number}
                  </span>

                  <span
                    className="services-portfolio-arrow"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M5 19L19 5" />
                      <path d="M9 5H19V15" />
                    </svg>
                  </span>

                  <div className="services-portfolio-card-content">
                    <p>{project.title}</p>
                    <span>View portfolio</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="services-portfolio-footer"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.85,
            ease: revealEase,
          }}
        >
          <Link
            href="/portfolio"
            className="services-portfolio-button"
          >
            <span>View All Portfolio</span>

            <span
              className="services-portfolio-button-icon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path d="M5 12H19" />
                <path d="M13 6L19 12L13 18" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}