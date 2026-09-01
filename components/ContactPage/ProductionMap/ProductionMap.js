"use client";

import { motion, useReducedMotion } from "framer-motion";

import { productionMapData } from "../data/contactData";
import "./production-map.css";

export default function ProductionMap() {
  const reduceMotion = useReducedMotion();

  const encodedAddress = encodeURIComponent(
    `${productionMapData.company}, ${productionMapData.address}`,
  );

  const mapEmbedUrl =
    `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  const mapDirectionsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section
      className="production-map"
      aria-labelledby="production-map-title"
    >
      <div className="site-container">
        <motion.header
          className="production-map-header"
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
          <div className="production-map-label">
            <span></span>
            <span className="production-map-label-line" />
            <span>{productionMapData.eyebrow}</span>
          </div>

          <div className="production-map-heading">
            <h2 id="production-map-title">
              {productionMapData.title}
              <span>{productionMapData.highlightedTitle}</span>
            </h2>

            <div className="production-map-address">
              <p>{productionMapData.company}</p>

              <address>
                {productionMapData.address}
              </address>
            </div>
          </div>
        </motion.header>

        <motion.div
          className="production-map-frame"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  y: 50,
                  scale: 0.98,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <iframe
            src={mapEmbedUrl}
            title="Etra Dreams Production Office location"
            className="production-map-iframe"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="production-map-card">
            <span className="production-map-card-label">
              India Production Office
            </span>

            <strong>{productionMapData.company}</strong>

            <p>{productionMapData.address}</p>

            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{productionMapData.mapButtonLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}