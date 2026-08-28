"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { servicesData } from "../data/servicesPageData";
import "./services-overview.css";

const revealEase = [0.16, 1, 0.3, 1];

export default function ServicesOverview({
  services = servicesData,
}) {
  return (
    <section
      id="services-list"
      className="services-list-section"
      aria-labelledby="services-list-title"
    >
      <div className="site-container">
        <motion.div
          className="services-list-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            <p className="services-list-eyebrow">
              End-to-end VFX
            </p>

            <h2 id="services-list-title">
              Built for every
              <span>stage of the shot.</span>
            </h2>
          </div>

          <p>
            From first-frame preparation to final
            integration, our departments work as
            one connected visual effects pipeline.
          </p>
        </motion.div>

        <div className="services-list-grid">
          {services.map((service, index) => (
            <motion.article
              key={service._id}
              className="services-list-card"
              initial={{
                opacity: 0,
                y: 65,
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
                duration: 0.85,
                delay: Math.min(
                  (index % 2) * 0.1,
                  0.1,
                ),
                ease: revealEase,
              }}
            >
              <Link
                href={`/services/${service.slug.current}`}
                className="services-list-link"
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="services-list-media">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      50vw
                    "
                    className="
                      services-list-image
                      services-list-static
                    "
                  />

                  <Image
                    src={service.preview.src}
                    alt=""
                    fill
                    unoptimized
                    aria-hidden="true"
                    sizes="
                      (max-width: 768px) 100vw,
                      50vw
                    "
                    className="
                      services-list-image
                      services-list-preview
                    "
                  />

                  <div
                    className="services-list-overlay"
                    aria-hidden="true"
                  />

                  <span className="services-list-number">
                    {service.number}
                  </span>

                  <span
                    className="services-list-arrow"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M5 19L19 5" />
                      <path d="M9 5H19V15" />
                    </svg>
                  </span>
                </div>

                <div className="services-list-content">
                  <h3 className="services-list-title">
                    {service.title}
                  </h3>

                  <p className="services-list-summary">
                    {service.summary}
                  </p>

                  <ul className="services-list-capabilities">
                    {service.capabilities.map(
                      (capability) => (
                        <li key={capability}>
                          {capability}
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="services-list-more">
                    <span>Explore service</span>
                    <span className="services-list-more-line" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}