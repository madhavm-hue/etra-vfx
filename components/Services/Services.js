"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useState,
} from "react";

import ServiceWaveGrid from "./ServiceWaveGrid/ServiceWaveGrid";
import "./services.css";

const services = [
  {
    id: "service-01",
    number: "01",
    title: "Rotoscopy",
    category: "Keying / Matte Extraction",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    id: "service-02",
    number: "02",
    title: "Paint & Prep",
    category: "Frame Restoration",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    id: "service-03",
    number: "03",
    title: "Match-move",
    category: "Rotomation",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
  {
    id: "service-04",
    number: "04",
    title: "Rotoscopy",
    category: "Precision Extraction",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    id: "service-05",
    number: "05",
    title: "Paint & Prep",
    category: "Clean-up",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    id: "service-06",
    number: "06",
    title: "Match-move",
    category: "Camera Tracking",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
  {
    id: "service-07",
    number: "07",
    title: "Rotoscopy",
    category: "Matte Creation",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    id: "service-08",
    number: "08",
    title: "Paint & Prep",
    category: "Beauty Work",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    id: "service-09",
    number: "09",
    title: "Match-move",
    category: "Object Tracking",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
  {
    id: "service-10",
    number: "10",
    title: "Rotoscopy",
    category: "VFX Production",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
];

function RibbonCard({
  service,
  index,
  progress,
  activeIndex,
  reducedMotion,
}) {
  const [hovered, setHovered] =
    useState(false);

  const distance = useTransform(
    progress,
    (latestProgress) =>
      index -
      latestProgress *
        (services.length - 1),
  );

  const y = useTransform(
    distance,
    (currentDistance) => {
      if (reducedMotion) {
        return 0;
      }

      return (
        Math.sin(
          currentDistance * 0.92,
        ) *
          72 +
        Math.min(
          Math.abs(currentDistance),
          4,
        ) *
          12
      );
    },
  );

  const rotateZ = useTransform(
    distance,
    (currentDistance) => {
      if (reducedMotion) {
        return 0;
      }

      return Math.max(
        -13,
        Math.min(
          13,
          currentDistance * -4.2,
        ),
      );
    },
  );

  const rotateY = useTransform(
    distance,
    (currentDistance) => {
      if (reducedMotion) {
        return 0;
      }

      return Math.max(
        -34,
        Math.min(
          34,
          currentDistance * -9,
        ),
      );
    },
  );

  const scale = useTransform(
    distance,
    (currentDistance) => {
      if (reducedMotion) {
        return 1;
      }

      return Math.max(
        0.76,
        1 -
          Math.abs(currentDistance) *
            0.065,
      );
    },
  );

  const opacity = useTransform(
    distance,
    (currentDistance) =>
      Math.max(
        0.38,
        1 -
          Math.abs(currentDistance) *
            0.13,
      ),
  );

  const isActive =
    activeIndex === index;

  return (
    <motion.article
      className={`service-ribbon-card ${
        isActive ? "is-active" : ""
      }`}
      style={{
        y,
        rotateZ,
        rotateY,
        scale,
        opacity,
      }}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
      onFocus={() =>
        setHovered(true)
      }
      onBlur={() =>
        setHovered(false)
      }
    >
      <Link
        href={service.href}
        className="service-ribbon-link"
        aria-label={`Learn more about ${service.title}`}
      >
        <div className="service-ribbon-media">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="
              (max-width: 760px) 78vw,
              (max-width: 1200px) 42vw,
              31vw
            "
            className="service-ribbon-image"
          />

          {hovered && (
            <Image
              src={service.gif}
              alt=""
              fill
              unoptimized
              aria-hidden="true"
              sizes="
                (max-width: 760px) 78vw,
                (max-width: 1200px) 42vw,
                31vw
              "
              className="service-ribbon-gif"
            />
          )}
        </div>

        <div className="service-ribbon-overlay" />

        <div className="service-ribbon-glass" />

        <div className="service-ribbon-top">
          <span>{service.number}</span>

          <span
            className="service-ribbon-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        <div className="service-ribbon-content">
          <p>{service.category}</p>

          <h3>{service.title}</h3>

          <div className="service-ribbon-action">
            <span>
              Explore service
            </span>

            <span aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);

  const reducedMotion =
    useReducedMotion();

  const [activeIndex, setActiveIndex] =
    useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 72,
      damping: 22,
      mass: 0.45,
    },
  );

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latestProgress) => {
      const nextIndex = Math.min(
        services.length - 1,
        Math.max(
          0,
          Math.round(
            latestProgress *
              (services.length - 1),
          ),
        ),
      );

      setActiveIndex(
        (currentIndex) =>
          currentIndex === nextIndex
            ? currentIndex
            : nextIndex,
      );
    },
  );

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    reducedMotion
      ? ["0%", "-68%"]
      : ["5%", "-73%"],
  );

  const headingOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.82, 0.94],
    [1, 1, 1, 0.45],
  );

  const progressScale = useTransform(
    smoothProgress,
    [0, 1],
    [0.04, 1],
  );

  return (
    <>
      {/* 10-CARD RIBBON */}

      <section
        ref={sectionRef}
        className="services-showcase"
        aria-labelledby="services-title"
      >
        <div className="services-sticky">
          <div className="services-ambient">
            <span className="services-orb services-orb-one" />
            <span className="services-orb services-orb-two" />
          </div>

          <motion.div
            className="site-container services-heading"
            style={{
              opacity: headingOpacity,
            }}
          >
            <div className="services-heading-copy">
              <p className="services-eyebrow">
                Services
              </p>

              <h2
                id="services-title"
                className="services-title"
              >
                Premium VFX services for every frame.
              </h2>
            </div>

            <Link
              href="/services"
              className="services-view-all services-view-all-desktop"
            >
              <span>
                View All Services
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </motion.div>

          <div className="services-ribbon-window">
            <motion.div
              className="services-ribbon-track"
              style={{
                x: trackX,
              }}
            >
              {services.map(
                (service, index) => (
                  <RibbonCard
                    key={service.id}
                    service={service}
                    index={index}
                    progress={
                      smoothProgress
                    }
                    activeIndex={
                      activeIndex
                    }
                    reducedMotion={
                      reducedMotion
                    }
                  />
                ),
              )}
            </motion.div>
          </div>

          <div className="site-container services-interface">
            <div className="services-counter">
              <span className="services-current">
                {
                  services[
                    activeIndex
                  ].number
                }
              </span>

              <span className="services-counter-line" />

              <span>
                {String(
                  services.length,
                ).padStart(2, "0")}
              </span>
            </div>

            <p className="services-scroll-hint">
              Scroll to explore
            </p>
          </div>

          <div className="services-progress">
            <motion.span
              style={{
                scaleX:
                  progressScale,
              }}
            />
          </div>

          <div className="site-container services-mobile-action">
            <Link
              href="/services"
              className="services-view-all"
            >
              <span>
                View All Services
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6-CARD WAVE TO GRID */}

      <ServiceWaveGrid />
    </>
  );
}