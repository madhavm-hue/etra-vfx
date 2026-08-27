"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "./services-portfolio.css";

const portfolioProjects = [
  {
    _id: "portfolio-house-of-guinness",
    number: "01",
    title: "House of Guinness",
    category: "Episodic",
    image: {
      src: "/images/portfolio/house-of-guinness.jpg",
      alt: "House of Guinness",
    },
  },
  {
    _id: "portfolio-911-lone-star",
    number: "02",
    title: "9-1-1: Lone Star",
    category: "Episodic",
    image: {
      src: "/images/portfolio/911-lone-star.jpg",
      alt: "9-1-1 Lone Star",
    },
  },
  {
    _id: "portfolio-and-just-like-that",
    number: "03",
    title: "And Just Like That",
    category: "Episodic",
    image: {
      src: "/images/portfolio/and-just-like-that.jpg",
      alt: "And Just Like That",
    },
  },
  {
    _id: "portfolio-dexter-resurrection",
    number: "04",
    title: "Dexter: Resurrection",
    category: "Episodic",
    image: {
      src: "/images/portfolio/dexter-resurrection.jpg",
      alt: "Dexter Resurrection",
    },
  },
  {
    _id: "portfolio-equalizer",
    number: "05",
    title: "The Equalizer",
    category: "Episodic",
    image: {
      src: "/images/portfolio/the-equalizer.jpg",
      alt: "The Equalizer",
    },
  },
  {
    _id: "portfolio-nobody-2",
    number: "06",
    title: "Nobody 2",
    category: "Feature Film",
    image: {
      src: "/images/portfolio/nobody-2.jpg",
      alt: "Nobody 2",
    },
  },
  {
    _id: "portfolio-only-murders",
    number: "07",
    title: "Only Murders in the Building",
    category: "Episodic",
    image: {
      src: "/images/portfolio/only-murders-building.jpg",
      alt: "Only Murders in the Building",
    },
  },
  {
    _id: "portfolio-ransom-canyon",
    number: "08",
    title: "Ransom Canyon",
    category: "Episodic",
    image: {
      src: "/images/portfolio/ransom-canyon.jpg",
      alt: "Ransom Canyon",
    },
  },
  {
    _id: "portfolio-sarahs-oil",
    number: "09",
    title: "Sarah’s Oil",
    category: "Feature Film",
    image: {
      src: "/images/portfolio/sarahs-oil.jpg",
      alt: "Sarah’s Oil",
    },
  },
  {
    _id: "portfolio-sirens",
    number: "10",
    title: "Sirens",
    category: "Episodic",
    image: {
      src: "/images/portfolio/sirens.jpg",
      alt: "Sirens",
    },
  },
  {
    _id: "portfolio-song-sung-blue",
    number: "11",
    title: "Song Sung Blue",
    category: "Feature Film",
    image: {
      src: "/images/portfolio/song-sung-blue.jpg",
      alt: "Song Sung Blue",
    },
  },
  {
    _id: "portfolio-the-bear",
    number: "12",
    title: "The Bear",
    category: "Episodic",
    image: {
      src: "/images/portfolio/the-bear.jpg",
      alt: "The Bear",
    },
  },
  {
    _id: "portfolio-tulsa-king",
    number: "13",
    title: "Tulsa King",
    category: "Episodic",
    image: {
      src: "/images/portfolio/tulsa-king.jpg",
      alt: "Tulsa King",
    },
  },
  {
    _id: "portfolio-1923",
    number: "14",
    title: "1923",
    category: "Episodic",
    image: {
      src: "/images/portfolio/1923.jpg",
      alt: "1923",
    },
  },
  {
    _id: "portfolio-fire-country",
    number: "15",
    title: "Fire Country",
    category: "Episodic",
    image: {
      src: "/images/portfolio/fire-country.jpg",
      alt: "Fire Country",
    },
  },
  {
    _id: "portfolio-the-chosen",
    number: "16",
    title: "The Chosen",
    category: "Episodic",
    image: {
      src: "/images/portfolio/the-chosen.jpg",
      alt: "The Chosen",
    },
  },
];

const revealEase = [0.16, 1, 0.3, 1];

function PortfolioCard({
  project,
  duplicate = false,
}) {
  return (
    <article
      className="services-portfolio-card"
      aria-hidden={duplicate ? "true" : undefined}
    >
      <Link
        href="/portfolio"
        className="services-portfolio-link"
        tabIndex={duplicate ? -1 : undefined}
        aria-label={
          duplicate
            ? undefined
            : `View ${project.title} in portfolio`
        }
      >
        <div className="services-portfolio-media">
          <Image
            src={project.image.src}
            alt={
              duplicate
                ? ""
                : project.image.alt
            }
            fill
            sizes="
              (max-width: 640px) 68vw,
              (max-width: 1024px) 34vw,
              22vw
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

            <span>{project.category}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

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
          <div>
            <p className="services-portfolio-eyebrow">
              Selected productions
            </p>

            <h2
              id="services-portfolio-title"
              className="services-portfolio-title"
            >
              Portfolio
            </h2>
          </div>

          <p className="services-portfolio-description">
            A selection of productions brought
            to life through precision,
            imagination, and visual effects craft.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="services-portfolio-marquee"
        initial={{
          opacity: 0,
          y: 45,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 1,
          ease: revealEase,
        }}
      >
        <div className="services-portfolio-track">
          <div className="services-portfolio-group">
            {projects.map((project) => (
              <PortfolioCard
                key={project._id}
                project={project}
              />
            ))}
          </div>

          <div
            className="services-portfolio-group"
            aria-hidden="true"
          >
            {projects.map((project) => (
              <PortfolioCard
                key={`duplicate-${project._id}`}
                project={project}
                duplicate
              />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="site-container">
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
          <p>
            Explore our complete collection of
            film and episodic productions.
          </p>

          <Link
            href="/portfolio"
            className="services-portfolio-button"
          >
            <span>View all portfolio</span>

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