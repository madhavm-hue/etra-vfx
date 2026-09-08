"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useState,
} from "react";

import "./service-wave-grid.css";

/*
  Temporary content:
  Official service images/content வந்ததும்
  இந்த array மட்டும் update செய்தால் போதும்.
*/

const waveServices = [
  {
    id: "wave-service-01",
    number: "01",
    title: "Rotoscopy",
    category: "Keying / Matte Extraction",
    description:
      "Precision mattes created for complex visual effects shots.",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    id: "wave-service-02",
    number: "02",
    title: "Paint & Prep",
    category: "Clean-up / Restoration",
    description:
      "Invisible clean-up and frame restoration for seamless results.",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    id: "wave-service-03",
    number: "03",
    title: "Match-move",
    category: "Tracking / Rotomation",
    description:
      "Accurate camera and object tracking for CGI integration.",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
  {
    id: "wave-service-04",
    number: "04",
    title: "Matte Extraction",
    category: "Precision VFX",
    description:
      "Detailed subject isolation for demanding production workflows.",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
    gif: "/images/services/rotoscopy.gif",
  },
  {
    id: "wave-service-05",
    number: "05",
    title: "Frame Clean-up",
    category: "Paint / Beauty Work",
    description:
      "Refined preparation work designed to remain completely invisible.",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
    gif: "/images/services/paint-prep.gif",
  },
  {
    id: "wave-service-06",
    number: "06",
    title: "Camera Tracking",
    category: "Match-move",
    description:
      "Production-ready tracking data with dependable technical accuracy.",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
    gif: "/images/services/matchmove.gif",
  },
];

/*
  Entry position
  → middle wave position
  → reverse-wave position
  → final grid position
*/

const motionPaths = [
  {
    entryX: "-120vw",
    entryY: "-24vh",
    waveX: "22vw",
    waveY: "-13vh",
    reverseX: "-7vw",
    reverseY: "5vh",
    rotation: -18,
  },
  {
    entryX: "10vw",
    entryY: "-105vh",
    waveX: "-12vw",
    waveY: "12vh",
    reverseX: "6vw",
    reverseY: "-5vh",
    rotation: 15,
  },
  {
    entryX: "120vw",
    entryY: "-18vh",
    waveX: "17vw",
    waveY: "-9vh",
    reverseX: "-6vw",
    reverseY: "6vh",
    rotation: -16,
  },
  {
    entryX: "-120vw",
    entryY: "28vh",
    waveX: "-18vw",
    waveY: "12vh",
    reverseX: "7vw",
    reverseY: "-5vh",
    rotation: 17,
  },
  {
    entryX: "-8vw",
    entryY: "105vh",
    waveX: "13vw",
    waveY: "-11vh",
    reverseX: "-6vw",
    reverseY: "5vh",
    rotation: -14,
  },
  {
    entryX: "120vw",
    entryY: "25vh",
    waveX: "-21vw",
    waveY: "10vh",
    reverseX: "7vw",
    reverseY: "-5vh",
    rotation: 18,
  },
];

function WaveCard({
  service,
  index,
  progress,
  reducedMotion,
}) {
  const [hovered, setHovered] =
    useState(false);

  const path = motionPaths[index];

  const revealStart =
    0.04 + index * 0.04;

  const revealEnd =
    revealStart + 0.12;

  const timeline = [
    0,
    revealStart,
    revealEnd,
    0.48,
    0.69,
    0.88,
    1,
  ];

  const x = useTransform(
    progress,
    timeline,
    reducedMotion
      ? [
          "0vw",
          "0vw",
          "0vw",
          "0vw",
          "0vw",
          "0vw",
          "0vw",
        ]
      : [
          path.entryX,
          path.entryX,
          path.waveX,
          path.waveX,
          path.reverseX,
          "0vw",
          "0vw",
        ],
  );

  const y = useTransform(
    progress,
    timeline,
    reducedMotion
      ? [
          "0vh",
          "0vh",
          "0vh",
          "0vh",
          "0vh",
          "0vh",
          "0vh",
        ]
      : [
          path.entryY,
          path.entryY,
          path.waveY,
          path.waveY,
          path.reverseY,
          "0vh",
          "0vh",
        ],
  );

  const rotateZ = useTransform(
    progress,
    timeline,
    reducedMotion
      ? [0, 0, 0, 0, 0, 0, 0]
      : [
          path.rotation,
          path.rotation,
          path.rotation * -0.65,
          path.rotation * -0.65,
          path.rotation * 0.22,
          0,
          0,
        ],
  );

  const rotateY = useTransform(
    progress,
    timeline,
    reducedMotion
      ? [0, 0, 0, 0, 0, 0, 0]
      : index % 2 === 0
        ? [
            -42,
            -42,
            24,
            24,
            -8,
            0,
            0,
          ]
        : [
            42,
            42,
            -24,
            -24,
            8,
            0,
            0,
          ],
  );

  const scale = useTransform(
    progress,
    timeline,
    reducedMotion
      ? [1, 1, 1, 1, 1, 1, 1]
      : [
          0.58,
          0.58,
          0.77,
          0.83,
          0.93,
          1,
          1,
        ],
  );

  const opacity = useTransform(
    progress,
    [
      revealStart,
      revealEnd,
      0.9,
      1,
    ],
    [0, 1, 1, 1],
  );

  const clipPath = useTransform(
    progress,
    [
      revealStart,
      revealEnd,
    ],
    index % 2 === 0
      ? [
          "inset(0 100% 0 0)",
          "inset(0 0% 0 0)",
        ]
      : [
          "inset(0 0 0 100%)",
          "inset(0 0 0 0%)",
        ],
  );

  return (
    <motion.article
      className="service-wave-grid-card"
      style={{
        x,
        y,
        rotateZ,
        rotateY,
        scale,
        opacity,
        clipPath,
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
        className="service-wave-grid-link"
        aria-label={`Explore ${service.title}`}
      >
        <div className="service-wave-grid-media">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="
              (max-width: 760px) 100vw,
              (max-width: 1100px) 50vw,
              33vw
            "
            className="service-wave-grid-image"
          />

          {hovered && (
            <Image
              src={service.gif}
              alt=""
              fill
              unoptimized
              aria-hidden="true"
              sizes="
                (max-width: 760px) 100vw,
                (max-width: 1100px) 50vw,
                33vw
              "
              className="service-wave-grid-gif"
            />
          )}
        </div>

        <div className="service-wave-grid-overlay" />

        <div className="service-wave-grid-shine" />

        <div className="service-wave-grid-top">
          <span>{service.number}</span>

          <span
            className="service-wave-grid-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        <div className="service-wave-grid-content">
          <p>{service.category}</p>

          <h3>{service.title}</h3>

          <div className="service-wave-grid-action">
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

export default function ServiceWaveGrid() {
  const sectionRef = useRef(null);

  const reducedMotion =
    useReducedMotion();

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
      stiffness: 68,
      damping: 22,
      mass: 0.52,
    },
  );

  const headingY = useTransform(
    smoothProgress,
    [0, 0.15, 0.8, 1],
    reducedMotion
      ? [0, 0, 0, 0]
      : [70, 0, 0, -20],
  );

  const headingOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.86, 1],
    [0, 1, 1, 0.72],
  );

  const progressScale = useTransform(
    smoothProgress,
    [0, 1],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      className="service-wave-grid-section"
      aria-labelledby="service-wave-grid-title"
    >
      <div className="service-wave-grid-sticky">
        <div className="service-wave-grid-background">
          <span className="service-wave-grid-glow service-wave-grid-glow-one" />
          <span className="service-wave-grid-glow service-wave-grid-glow-two" />
        </div>

        <motion.header
          className="site-container service-wave-grid-header"
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
        >
          <div className="service-wave-grid-eyebrow">
            <span>02</span>

            <span className="service-wave-grid-eyebrow-line" />

            <span>
              Selected capabilities
            </span>
          </div>

          <div className="service-wave-grid-heading-row">
            <h2
              id="service-wave-grid-title"
              className="service-wave-grid-title"
            >
              Precision in
              <span>every movement.</span>
            </h2>

            <p className="service-wave-grid-intro">
              Six production capabilities
              shaped through artistry,
              technology and technical
              precision.
            </p>
          </div>
        </motion.header>

        <div className="site-container service-wave-grid-stage">
          <div className="service-wave-grid">
            {waveServices.map(
              (service, index) => (
                <WaveCard
                  key={service.id}
                  service={service}
                  index={index}
                  progress={
                    smoothProgress
                  }
                  reducedMotion={
                    reducedMotion
                  }
                />
              ),
            )}
          </div>
        </div>

        <div className="site-container service-wave-grid-footer">
          <div className="service-wave-grid-counter">
            <span>01</span>

            <span className="service-wave-grid-counter-line" />

            <span>06</span>
          </div>

          <Link
            href="/services"
            className="service-wave-grid-view-all"
          >
            <span>
              View all services
            </span>
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div className="service-wave-grid-progress">
          <motion.span
            style={{
              scaleX: progressScale,
            }}
          />
        </div>
      </div>
    </section>
  );
}