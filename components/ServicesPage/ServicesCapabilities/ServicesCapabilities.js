"use client";

import { motion } from "framer-motion";

import "./services-capabilities.css";

const revealEase = [0.16, 1, 0.3, 1];

const deliverables = [
  {
    number: "01",
    title: "Feature Film & OTT Series VFX",
    description:
      "End-to-end visual effects support for feature films, streaming originals, episodic productions, and high-volume sequences.",
    points: [
      "Feature films",
      "Streaming originals",
      "Episodic productions",
      "High-volume delivery",
    ],
    icon: "film",
  },
  {
    number: "02",
    title: "Commercials & Brand Campaigns",
    description:
      "Polished visual effects and post-production support for advertising, branded films, product launches, and digital campaigns.",
    points: [
      "Television commercials",
      "Product films",
      "Brand campaigns",
      "Digital advertisements",
    ],
    icon: "campaign",
  },
  {
    number: "03",
    title:
      "Full-CG Environments & Set Extensions",
    description:
      "Digital worlds and photoreal set enhancements designed to expand physical production environments.",
    points: [
      "Digital environments",
      "Set extensions",
      "Sky replacement",
      "Architectural enhancement",
    ],
    icon: "environment",
  },
  {
    number: "04",
    title: "Digital Cosmetics & Beauty",
    description:
      "Invisible cosmetic cleanup and visual enhancement that preserves natural facial detail and performance.",
    points: [
      "Beauty cleanup",
      "Skin refinement",
      "Blemish removal",
      "Performance preservation",
    ],
    icon: "beauty",
  },
  {
    number: "05",
    title:
      "Stereo 3D Conversion & Depth",
    description:
      "Carefully crafted stereo conversion and depth treatments for immersive and comfortable viewing experiences.",
    points: [
      "Stereo conversion",
      "Depth mapping",
      "Layer separation",
      "Depth consistency",
    ],
    icon: "depth",
  },
  {
    number: "06",
    title: "Game Cinematics & Cutscenes",
    description:
      "Cinematic visual effects support for game trailers, story sequences, promotional films, and real-time content.",
    points: [
      "Game cinematics",
      "Cutscenes",
      "Game trailers",
      "Promotional content",
    ],
    icon: "game",
  },
];

const workflows = [
  {
    number: "01",
    title: "Create & Prepare",
    description:
      "Source footage is carefully isolated, cleaned, and prepared before advanced visual effects work begins.",
    purposes: [
      "Rotoscopy",
      "Keying",
      "Paint cleanup",
      "Plate preparation",
    ],
    tools:
      "Nuke · Silhouette · Mocha Pro · Photoshop",
  },
  {
    number: "02",
    title: "Build & Simulate",
    description:
      "Digital assets, environments, movement, and physical effects are created for integration into the production.",
    purposes: [
      "3D assets",
      "Matchmove",
      "Creature effects",
      "Simulation",
    ],
    tools:
      "Maya · Houdini · 3DEqualizer · ZBrush",
  },
  {
    number: "03",
    title: "Review & Deliver",
    description:
      "Every shot is tracked, reviewed, colour-managed, quality-checked, and prepared for secure final delivery.",
    purposes: [
      "Production tracking",
      "Quality review",
      "Colour consistency",
      "Secure delivery",
    ],
    tools:
      "ShotGrid · Ftrack · ACES/OCIO · Python",
  },
];

function DeliverableIcon({ type }) {
  if (type === "campaign") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4 14V10L16 5V19L4 14Z" />
        <path d="M8 15L9 20H5L4 14" />
        <path d="M19 9V15" />
      </svg>
    );
  }

  if (type === "environment") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M3 18L8 11L12 15L15 10L21 18" />
        <circle cx="17" cy="6" r="2" />
        <path d="M3 21H21" />
      </svg>
    );
  }

  if (type === "beauty") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 3C8 3 6 6 6 10C6 16 9 21 12 21C15 21 18 16 18 10C18 6 16 3 12 3Z" />
        <path d="M9 10H9.01" />
        <path d="M15 10H15.01" />
        <path d="M9 15C11 17 13 17 15 15" />
        <path d="M20 3V7" />
        <path d="M18 5H22" />
      </svg>
    );
  }

  if (type === "depth") {
    return (
      <svg viewBox="0 0 24 24">
        <rect
          x="3"
          y="7"
          width="18"
          height="10"
          rx="4"
        />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <path d="M10 12H14" />
      </svg>
    );
  }

  if (type === "game") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M7 8H17C20 8 22 11 21 15L20 18C19.5 20 17 20 16 18L14.5 16H9.5L8 18C7 20 4.5 20 4 18L3 15C2 11 4 8 7 8Z" />
        <path d="M8 11V15" />
        <path d="M6 13H10" />
        <path d="M16 12H16.01" />
        <path d="M18 14H18.01" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="M8 5V19" />
      <path d="M16 5V19" />
      <path d="M3 10H8" />
      <path d="M16 10H21" />
      <path d="M3 15H8" />
      <path d="M16 15H21" />
      <path d="M11 10L15 12L11 14V10Z" />
    </svg>
  );
}

export default function ServicesCapabilities() {
  return (
    <section className="services-capabilities">
      <div className="site-container">
        <motion.header
          className="services-capabilities-header"
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
          <p>What we deliver</p>

          <h2>
            Built for stories
            <span>across every screen.</span>
          </h2>
        </motion.header>

        <div className="services-deliverables-grid">
          {deliverables.map((item, index) => (
            <motion.article
              key={item.number}
              className="services-deliverable-card"
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
                amount: 0.18,
              }}
              transition={{
                duration: 0.75,
                delay: (index % 3) * 0.08,
                ease: revealEase,
              }}
            >
              <div className="services-deliverable-top">
                <span className="services-deliverable-icon">
                  <DeliverableIcon
                    type={item.icon}
                  />
                </span>

                <span className="services-deliverable-number">
                  {item.number}
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="services-workflow">
          <motion.header
            className="services-workflow-header"
            initial={{
              opacity: 0,
              y: 40,
            }}
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
              ease: revealEase,
            }}
          >
            <p>How technology supports the work</p>

            <h2>
              A connected workflow,
              <span>from plate to delivery.</span>
            </h2>
          </motion.header>

          <div className="services-workflow-grid">
            {workflows.map((workflow, index) => (
              <motion.article
                key={workflow.number}
                className="services-workflow-card"
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.09,
                  ease: revealEase,
                }}
              >
                <span>
                  {workflow.number}
                </span>

                <h3>{workflow.title}</h3>

                <p>{workflow.description}</p>

                <div className="services-workflow-purposes">
                  {workflow.purposes.map(
                    (purpose) => (
                      <small key={purpose}>
                        {purpose}
                      </small>
                    ),
                  )}
                </div>

                <div className="services-workflow-tools">
                  <small>Supporting tools</small>
                  <p>{workflow.tools}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}