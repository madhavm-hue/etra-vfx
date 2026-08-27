"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import "./clients.css";

const clients = [
  {
    name: "Paramount Plus",
    image:
      "/images/clients/client1.png",
    className:
      "client-logo-paramount",
  },
  {
    name: "NBCUniversal",
    image:
      "/images/clients/client2.jpg",
    className:
      "client-logo-nbcu",
  },
  {
    name: "Lionsgate Studios",
    image:
      "/images/clients/client4.png",
    className:
      "client-logo-lionsgate",
  },
  {
    name: "Warner Bros",
    image:
      "/images/clients/client6.png",
    className:
      "client-logo-warner",
  },
  {
    name: "AMC Networks",
    image:
      "/images/clients/client7.png",
    className:
      "client-logo-amc",
  },
  {
    name: "Netflix",
    image:
      "/images/clients/client8.png",
    className:
      "client-logo-netflix",
  },
  {
    name: "Amazon",
    image:
      "/images/clients/client12.png",
    className:
      "client-logo-amazon",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ClientLogo({
  client,
  duplicate = false,
}) {
  return (
    <div
      className={`client-logo-item ${client.className}`}
      aria-hidden={
        duplicate ? "true" : undefined
      }
    >
      <div className="client-logo-canvas">
        <Image
          src={client.image}
          alt={
            duplicate
              ? ""
              : client.name
          }
          width={320}
          height={180}
          sizes="
            (max-width: 640px) 180px,
            280px
          "
          className="client-logo-image"
        />
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section
      className="clients-section"
      aria-labelledby="clients-title"
    >
      <div className="site-container clients-header">
        <motion.div
          className="clients-label"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >
          <span className="clients-section-number">
            04
          </span>

          <span className="clients-label-line" />

          <span>Our clients</span>
        </motion.div>

        <motion.div
          className="clients-heading-group"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <h2
            id="clients-title"
            className="clients-title"
          >
            Trusted by
            <span>
              storytellers worldwide.
            </span>
          </h2>

          <p className="clients-description">
            We collaborate with leading studios
            and creative teams to deliver
            exceptional visual experiences.
          </p>
        </motion.div>
      </div>

      {/* CLIENT LOGOS */}

      <motion.div
        className="clients-marquee"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
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
        <div className="clients-marquee-track">
          <div className="clients-logo-group">
            {clients.map((client) => (
              <ClientLogo
                key={client.image}
                client={client}
              />
            ))}
          </div>

          <div
            className="clients-logo-group"
            aria-hidden="true"
          >
            {clients.map((client) => (
              <ClientLogo
                key={`duplicate-${client.image}`}
                client={client}
                duplicate
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* TPN CERTIFICATION */}

      <div className="site-container">
        <motion.div
          className="clients-certification"
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
            amount: 0.35,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="clients-certification-copy">
            <p className="clients-certification-label">
              Certified partner
            </p>

            <h3>
              Trusted Partner
              <span>Network</span>
            </h3>

            <p className="clients-certification-description">
              Recognized as a trusted production
              partner committed to industry
              security and professional standards.
            </p>
          </div>

          <div className="clients-certification-logo">
            <Image
              src="/images/clients/client10.png"
              alt="Trusted Partner Network certification"
              width={568}
              height={508}
              sizes="
                (max-width: 640px) 190px,
                300px
              "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}