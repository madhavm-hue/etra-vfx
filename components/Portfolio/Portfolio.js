"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "./portfolio.css";

const projects = [
  {
    number: "01",
    title: "Cinematic Worlds",
    category: "Visual Effects",
    image: "/images/portfolio/poster1.png",
    featured: true,
  },
  {
    number: "02",
    title: "Beyond Reality",
    category: "CGI & Compositing",
    image: "/images/portfolio/project-02-cover.jpg",
  },
  {
    number: "03",
    title: "Invisible Art",
    category: "Rotoscopy & Paint",
    image: "/images/portfolio/project-03-cover.jpg",
  },
  {
    number: "04",
    title: "Digital Motion",
    category: "Matchmove & Rotomation",
    image: "/images/portfolio/project-04-cover.jpg",
  },
  {
    number: "05",
    title: "Crafted Frames",
    category: "VFX Production",
    image: "/images/portfolio/project-05-cover.jpg",
  },
];

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

export default function Portfolio() {
  return (
    <section
      className="home-portfolio"
      aria-labelledby="home-portfolio-title"
    >
      <div className="site-container">
        <motion.div
          className="home-portfolio-header"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="home-portfolio-label">
            <span className="home-portfolio-section-number"></span>
            <span className="home-portfolio-label-line" />
            <span>Selected work</span>
          </div>

          <div className="home-portfolio-heading-group">
            <h2 id="home-portfolio-title" className="home-portfolio-title">
              Work that
              <span>moves people.</span>
            </h2>

            <p className="home-portfolio-intro">
              A selection of visual effects crafted through imagination,
              precision, and powerful storytelling.
            </p>
          </div>
        </motion.div>

        <div className="home-portfolio-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              className={`home-project-card ${
                project.featured ? "home-project-featured" : ""
              }`}
              initial={{
                opacity: 0,
                y: 70,
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
                duration: 0.9,
                delay: Math.min(index * 0.08, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href="/portfolio"
                className="home-project-link"
                aria-label={`View ${project.title} in portfolio`}
              >
                <div className="home-project-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={
                      project.featured
                        ? "(max-width: 768px) 100vw, 70vw"
                        : "(max-width: 768px) 100vw, 45vw"
                    }
                    className="home-project-image"
                  />

                  <div className="home-project-overlay" />

                  <div className="home-project-top">
                    <span className="home-project-number">
                      {project.number}
                    </span>

                    <span className="home-project-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 19L19 5" />
                        <path d="M9 5H19V15" />
                      </svg>
                    </span>
                  </div>

                  <div className="home-project-content">
                    <p className="home-project-category">
                      {project.category}
                    </p>

                    <h3 className="home-project-title">
                      {project.title}
                    </h3>

                    <div className="home-project-view">
                      <span>View portfolio</span>
                      <span className="home-project-view-line" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="home-portfolio-footer"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5,
          }}
        >
          <p>
            Explore more of our visual effects, animation, and creative
            production work.
          </p>

          <Link href="/portfolio" className="home-portfolio-button">
            <span>View all work</span>

            <span className="home-portfolio-button-icon" aria-hidden="true">
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