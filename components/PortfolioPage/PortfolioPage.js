"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useState,
} from "react";

import "./portfolio-page.css";

const projects = [
  {
    number: "01",
    title: "House of Guinness",
    category: "Episodic",
    image:
      "/images/portfolio/house-of-guinness.jpg",
    slug: "house-of-guinness",
    featured: true,
  },
  {
    number: "02",
    title: "9-1-1: Lone Star",
    category: "Episodic",
    image:
      "/images/portfolio/911-lone-star.jpg",
    slug: "911-lone-star",
  },
  {
    number: "03",
    title: "And Just Like That…",
    category: "Episodic",
    image:
      "/images/portfolio/and-just-like-that.jpg",
    slug: "and-just-like-that",
  },
  {
    number: "04",
    title: "Dexter: Resurrection",
    category: "Episodic",
    image:
      "/images/portfolio/dexter-resurrection.jpg",
    slug: "dexter-resurrection",
  },
  {
    number: "05",
    title: "The Equalizer",
    category: "Episodic",
    image:
      "/images/portfolio/the-equalizer.jpg",
    slug: "the-equalizer",
  },
  {
    number: "06",
    title: "Nobody 2",
    category: "Feature Film",
    image:
      "/images/portfolio/nobody-2.jpg",
    slug: "nobody-2",
  },
  {
    number: "07",
    title:
      "Only Murders in the Building",
    category: "Episodic",
    image:
      "/images/portfolio/only-murders-building.jpg",
    slug:
      "only-murders-in-the-building",
  },
  {
    number: "08",
    title: "Ransom Canyon",
    category: "Episodic",
    image:
      "/images/portfolio/ransom-canyon.jpg",
    slug: "ransom-canyon",
  },
  {
    number: "09",
    title: "Sarah’s Oil",
    category: "Feature Film",
    image:
      "/images/portfolio/sarahs-oil.jpg",
    slug: "sarahs-oil",
  },
  {
    number: "10",
    title: "Sirens",
    category: "Episodic",
    image:
      "/images/portfolio/sirens.jpg",
    slug: "sirens",
  },
  {
    number: "11",
    title: "Song Sung Blue",
    category: "Feature Film",
    image:
      "/images/portfolio/song-sung-blue.jpg",
    slug: "song-sung-blue",
  },
  {
    number: "12",
    title: "The Bear",
    category: "Episodic",
    image:
      "/images/portfolio/the-bear.jpg",
    slug: "the-bear",
  },
  {
    number: "13",
    title: "Tulsa King",
    category: "Episodic",
    image:
      "/images/portfolio/tulsa-king.jpg",
    slug: "tulsa-king",
  },
  {
    number: "14",
    title: "1923",
    category: "Episodic",
    image:
      "/images/portfolio/1923.jpg",
    slug: "1923",
  },
  {
    number: "15",
    title: "Fire Country",
    category: "Episodic",
    image:
      "/images/portfolio/fire-country.jpg",
    slug: "fire-country",
  },
  {
    number: "16",
    title: "The Chosen",
    category: "Episodic",
    image:
      "/images/portfolio/the-chosen.jpg",
    slug: "the-chosen",
  },
];

const filters = [
  "All",
  "Feature Film",
  "Episodic",
];

export default function PortfolioPage() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] =
    useState("All");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const posterOneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -45],
  );

  const posterTwoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -90],
  );

  const posterThreeY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -62],
  );

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeFilter,
        );

  const getFilterCount = (filter) => {
    if (filter === "All") {
      return projects.length;
    }

    return projects.filter(
      (project) =>
        project.category === filter,
    ).length;
  };

  return (
    <main
      id="top"
      className="portfolio-page"
    >
      {/* HERO */}

      <section
        ref={heroRef}
        className="portfolio-page-hero"
        aria-labelledby="portfolio-page-title"
      >
        <div
          className="portfolio-hero-art"
          aria-hidden="true"
        >
          <motion.div
            className="
              portfolio-hero-poster
              portfolio-hero-poster-one
            "
            style={{
              y: reduceMotion
                ? 0
                : posterOneY,
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              rotate: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -5,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <Image
              src="/images/portfolio/house-of-guinness.jpg"
              alt=""
              fill
              priority
              sizes="28vw"
            />
          </motion.div>

          <motion.div
            className="
              portfolio-hero-poster
              portfolio-hero-poster-two
            "
            style={{
              y: reduceMotion
                ? 0
                : posterTwoY,
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              rotate: 4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 4,
            }}
            transition={{
              duration: 1.1,
              delay: 0.35,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <Image
              src="/images/portfolio/911-lone-star.jpg"
              alt=""
              fill
              priority
              sizes="28vw"
            />
          </motion.div>

          <motion.div
            className="
              portfolio-hero-poster
              portfolio-hero-poster-three
            "
            style={{
              y: reduceMotion
                ? 0
                : posterThreeY,
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              rotate: -2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -2,
            }}
            transition={{
              duration: 1.1,
              delay: 0.45,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <Image
              src="/images/portfolio/and-just-like-that.jpg"
              alt=""
              fill
              priority
              sizes="28vw"
            />
          </motion.div>
        </div>

        <div className="site-container">
          <div className="portfolio-page-hero-layout">
            <motion.h1
              id="portfolio-page-title"
              className="portfolio-page-title"
              initial={{
                opacity: 0,
                y: 70,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.08,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              Stories shaped
              <span>
                beyond the frame.
              </span>
            </motion.h1>

            <motion.div
              className="portfolio-page-hero-copy"
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                delay: 0.22,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              <p>
                A selection of films and episodic
                productions brought to life through
                precision, imagination, and visual
                effects craft.
              </p>

              <div className="portfolio-page-count">
                <strong>
                  {projects.length}
                </strong>

                <span>Productions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section
        className="portfolio-page-work"
        aria-label="ETRA Dreams productions"
      >
        <div className="site-container">
          <motion.div
            className="portfolio-filter-bar"
            initial={{
              opacity: 0,
              y: 25,
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
              duration: 0.7,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <p>Explore our work</p>

            <div
              className="portfolio-filters"
              aria-label="Filter productions"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter
                      ? "portfolio-filter active"
                      : "portfolio-filter"
                  }
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  aria-pressed={
                    activeFilter === filter
                  }
                >
                  {filter}

                  <span>
                    {getFilterCount(filter)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="portfolio-project-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(
                (project, index) => (
                  <motion.article
                    layout
                    key={project.slug}
                    className={`portfolio-project-card ${
                      project.featured &&
                      activeFilter === "All"
                        ? "portfolio-project-featured"
                        : ""
                    }`}
                    initial={{
                      opacity: 0,
                      y: 45,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: Math.min(
                        index * 0.035,
                        0.22,
                      ),
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="portfolio-project-link"
                      aria-label={`View ${project.title}`}
                    >
                      <div className="portfolio-project-media">
                        <Image
                          src={project.image}
                          alt={`${project.title} production poster`}
                          fill
                          sizes={
                            project.featured
                              ? "(max-width: 640px) 100vw, 50vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          }
                          className="portfolio-project-image"
                          priority={index < 4}
                        />

                        <div className="portfolio-project-overlay" />

                        <div className="portfolio-project-top">
                          <span>
                            {project.number}
                          </span>

                          <span
                            className="portfolio-project-arrow"
                            aria-hidden="true"
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M5 19L19 5" />
                              <path d="M9 5H19V15" />
                            </svg>
                          </span>
                        </div>

                        <div className="portfolio-project-hover-copy">
                          <span>
                            View project
                          </span>

                          <span className="portfolio-project-hover-line" />
                        </div>
                      </div>

                      <div className="portfolio-project-details">
                        <h2>
                          {project.title}
                        </h2>

                        <p>
                          {project.category}
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}

      <section className="portfolio-page-cta">
        <div className="site-container">
          <motion.div
            className="portfolio-cta-inner"
            initial={{
              opacity: 0,
              y: 55,
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
              duration: 0.9,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <div className="portfolio-cta-content">
              <h2>
                Seen what
                <span>
                  we can create?
                </span>
              </h2>

              <div className="portfolio-cta-action">
                <p>
                  Let’s shape the next story
                  together through imagination,
                  precision, and visual craft.
                </p>

                <Link
                  href="/contact"
                  className="portfolio-cta-button"
                >
                  <span>
                    Start a conversation
                  </span>

                  <span
                    className="portfolio-cta-arrow"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12H19" />
                      <path d="M13 6L19 12L13 18" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}