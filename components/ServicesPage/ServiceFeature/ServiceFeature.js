"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { servicesData } from "../data/servicesPageData";
import "./service-feature.css";

const revealEase = [0.16, 1, 0.3, 1];

export default function ServiceFeature({
  services = servicesData,
}) {
  return (
    <section
      className="service-feature-section"
      aria-labelledby="service-feature-title"
    >
      <div className="site-container service-feature-intro">
        <motion.div
          className="service-feature-label"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            ease: revealEase,
          }}
        >
          <span className="service-feature-section-number">
            03
          </span>

          <span className="service-feature-label-line" />

          <span>Core capabilities</span>
        </motion.div>

        <motion.div
          className="service-feature-heading-group"
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
            duration: 0.9,
            ease: revealEase,
          }}
        >
          <h2
            id="service-feature-title"
            className="service-feature-main-title"
          >
            Every detail
            <span>matters.</span>
          </h2>

          <p className="service-feature-main-description">
            Our artists combine technical precision and
            creative understanding to deliver work that
            disappears naturally into every frame.
          </p>
        </motion.div>
      </div>

      <div className="service-feature-list">
        {services.map((service, index) => {
          const reverse = index % 2 !== 0;

          return (
            <article
              key={service._id}
              className={`service-feature-item ${
                reverse ? "service-feature-reverse" : ""
              }`}
            >
              <div className="site-container service-feature-row">
                <motion.div
                  className="service-feature-media"
                  initial={{
                    opacity: 0,
                    x: reverse ? 80 : -80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.16,
                  }}
                  transition={{
                    duration: 1,
                    ease: revealEase,
                  }}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="service-feature-image service-feature-static-image"
                  />

                  <Image
                    src={service.preview.src}
                    alt=""
                    fill
                    unoptimized
                    aria-hidden="true"
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="service-feature-image service-feature-preview-image"
                  />

                  <div
                    className="service-feature-media-shade"
                    aria-hidden="true"
                  />

                  <span className="service-feature-media-number">
                    {service.number}
                  </span>

                  <span
                    className="service-feature-media-caption"
                    aria-hidden="true"
                  >
                    Hover to preview
                  </span>
                </motion.div>

                <motion.div
                  className="service-feature-content"
                  initial={{
                    opacity: 0,
                    x: reverse ? -70 : 70,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.95,
                    delay: 0.08,
                    ease: revealEase,
                  }}
                >
                  <div className="service-feature-content-label">
                    <span>{service.number}</span>

                    <span className="service-feature-content-line" />

                    <span>ETRA Dreams VFX</span>
                  </div>

                  <h3 className="service-feature-title">
                    {service.title}
                  </h3>

                  <p className="service-feature-description">
                    {service.description}
                  </p>

                  <div className="service-feature-capabilities">
                    <p>Capabilities</p>

                    <ul>
                      {service.capabilities.map(
                        (capability, capabilityIndex) => (
                          <li key={capability}>
                            <span className="service-feature-capability-number">
                              {String(
                                capabilityIndex + 1,
                              ).padStart(2, "0")}
                            </span>

                            <span>{capability}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug.current}`}
                    className="service-feature-button"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>Explore service</span>

                    <span
                      className="service-feature-button-icon"
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
            </article>
          );
        })}
      </div>
    </section>
  );
}