"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  servicesData,
  servicesHeroData,
} from "../data/servicesPageData";

import "./services-hero.css";

const revealEase = [0.16, 1, 0.3, 1];

export default function ServicesHero({
  hero = servicesHeroData,
  services = servicesData,
}) {
  return (
    <section
      className="services-page-hero"
      aria-labelledby="services-page-hero-title"
    >
      <div
        className="services-page-hero-background"
        aria-hidden="true"
      >
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            className="services-page-hero-panel"
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.08 + index * 0.1,
              ease: revealEase,
            }}
          >
            <Image
              src={service.image.src}
              alt=""
              fill
              priority={index < 2}
              sizes="(max-width: 640px) 100vw, 25vw"
              className="services-page-hero-image"
            />
          </motion.div>
        ))}
      </div>

      <div
        className="services-page-hero-overlay"
        aria-hidden="true"
      />

      <div className="site-container services-page-hero-inner">
        <motion.h1
          id="services-page-hero-title"
          className="services-page-hero-title"
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
            delay: 0.25,
            ease: revealEase,
          }}
        >
          Services
          <span>- Etra Dreams</span>
        </motion.h1>

        <motion.div
          className="services-page-hero-bottom"
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
            delay: 0.55,
            ease: revealEase,
          }}
        >
          <p>{hero.description}</p>

          <a
            href="#services-list"
            className="services-page-hero-scroll"
          >
            <span>Explore services</span>

            <span
              className="services-page-hero-scroll-icon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 4V20" />
                <path d="M6 14L12 20L18 14" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}