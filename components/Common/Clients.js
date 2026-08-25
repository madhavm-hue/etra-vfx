"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import "./clients.css";

const clients = [
  {
    name: "Client 01",
    image: "/images/clients/client1.png",
  },
  {
    name: "Client 02",
    image: "/images/clients/client2.jpg",
  },
  {
    name: "Client 04",
    image: "/images/clients/client4.png",
  },
  {
    name: "Client 06",
    image: "/images/clients/client6.png",
  },
  {
    name: "Client 07",
    image: "/images/clients/client7.png",
  },
  {
    name: "Client 08",
    image: "/images/clients/client8.png",
  },
  {
    name: "Client 10",
    image: "/images/clients/client10.png",
  },
  {
    name: "Client 12",
    image: "/images/clients/client12.png",
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

function ClientLogo({ client, duplicate = false }) {
  return (
    <div
      className="client-logo-item"
      aria-hidden={duplicate ? "true" : undefined}
    >
      <div className="client-logo-canvas">
        <Image
          src={client.image}
          alt={duplicate ? "" : client.name}
          width={320}
          height={180}
          sizes="(max-width: 640px) 180px, 280px"
          className="client-logo-image"
        />
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="clients-section" aria-labelledby="clients-title">
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
          <span className="clients-section-number">04</span>
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
          <h2 id="clients-title" className="clients-title">
            Trusted by
            <span>storytellers worldwide.</span>
          </h2>

          <p className="clients-description">
            We collaborate with leading studios and creative teams to deliver
            exceptional visual experiences.
          </p>
        </motion.div>
      </div>

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
              <ClientLogo key={client.image} client={client} />
            ))}
          </div>

          <div className="clients-logo-group" aria-hidden="true">
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
    </section>
  );
}