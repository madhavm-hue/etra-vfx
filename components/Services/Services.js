"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import "./services.css";

const services = [
  {
    number: "01",
    title: "Rotoscopy - Keying / Matte extraction",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    number: "02",
    title: "Paint - Prep",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    number: "03",
    title: "Match-move / Rotomation",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
];

export default function Services() {
  const [activeService, setActiveService] =
    useState(null);

  const handleMouseEnter = (index) => {
    setActiveService(index);
  };

  const handleMouseLeave = () => {
    setActiveService(null);
  };

  const handleFocus = (index) => {
    setActiveService(index);
  };

  const handleBlur = (event) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget,
      )
    ) {
      setActiveService(null);
    }
  };

  return (
    <section
      className="services-showcase"
      aria-labelledby="services-title"
    >
      <div className="site-container services-heading">
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
          <span>View All Services</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div
        className={`services-grid ${
          activeService !== null
            ? "has-active-service"
            : ""
        }`}
        onMouseLeave={handleMouseLeave}
      >
        {services.map((service, index) => {
          const isActive =
            activeService === index;

          return (
            <article
              key={service.href}
              className={`service-card ${
                isActive ? "is-active" : ""
              }`}
              onMouseEnter={() =>
                handleMouseEnter(index)
              }
              onFocus={() =>
                handleFocus(index)
              }
              onBlur={handleBlur}
            >
              <Link
                href={service.href}
                className="service-card-link"
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="service-media">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="
                      (max-width: 760px) 100vw,
                      33vw
                    "
                    className="service-image"
                  />

                  {isActive && (
                    <Image
                      key={`${service.gif}-${isActive}`}
                      src={service.gif}
                      alt=""
                      fill
                      unoptimized
                      aria-hidden="true"
                      sizes="
                        (max-width: 760px) 100vw,
                        50vw
                      "
                      className="service-gif"
                    />
                  )}
                </div>

                <div className="service-card-shade" />

                <div className="service-card-top">
                  <span className="service-number">
                    {service.number}
                  </span>

                  <span
                    className="service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <div className="service-card-content">
                  <h3 className="service-name">
                    {service.title}
                  </h3>

                  <div className="service-learn-more">
                    <span>Learn More</span>
                    <span aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="site-container services-mobile-action">
        <Link
          href="/services"
          className="services-view-all"
        >
          <span>View All Services</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}