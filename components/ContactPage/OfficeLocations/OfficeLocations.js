"use client";

import { motion, useReducedMotion } from "framer-motion";

import { officeLocationsData } from "../data/contactData";
import "./office-locations.css";

export default function OfficeLocations() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="office-locations"
      aria-labelledby="office-locations-title"
    >
      <div className="site-container">
        <motion.header
          className="office-locations-header"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 38 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="office-locations-label">
         
            <span className="office-locations-label-line" />
            <span>{officeLocationsData.eyebrow}</span>
          </div>

          <div className="office-locations-heading">
            <h2 id="office-locations-title">
              {officeLocationsData.title}
              <span>{officeLocationsData.highlightedTitle}</span>
            </h2>

            <p>{officeLocationsData.description}</p>
          </div>
        </motion.header>

        <div className="office-locations-grid">
          {officeLocationsData.offices.map((office, index) => (
            <motion.article
              key={office.number}
              className={`office-location-card office-location-card-${office.accent}`}
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 50 }
              }
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
                delay: reduceMotion ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="office-location-card-top">
                <span className="office-location-number">
                  {office.number}
                </span>

                <span className="office-location-timezone">
                  {office.timezoneShort}
                </span>
              </div>

              <div className="office-location-card-content">
                <p className="office-location-type">
                  {office.type}
                </p>

                <h3>{office.location}</h3>

                <p className="office-location-time">
                  {office.timezone}
                </p>
              </div>

              <div className="office-location-card-links">
                <a
                  href={`mailto:${office.email}`}
                  className="office-location-link"
                >
                  <span>Email</span>
                  <strong>{office.email}</strong>
                  <span aria-hidden="true">↗</span>
                </a>

                {office.phone && (
                  <a
                    href={`tel:${office.phoneHref}`}
                    className="office-location-link"
                  >
                    <span>Phone</span>
                    <strong>{office.phone}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              <span
                className="office-location-card-orbit"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}