"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
} from "react";

import { studioStoryData } from "../data/aboutData";
import "./studio-story.css";

function AnimatedStatValue({
  value,
  delay,
  shouldReduceMotion,
}) {
  const valueRef = useRef(null);

  const isInView = useInView(
    valueRef,
    {
      once: true,
      amount: 0.6,
    },
  );

  const hasSlash = value.includes("/");
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  const valueParts = value.split("/");

  const firstTarget =
    Number.parseInt(valueParts[0], 10) || 0;

  const secondTarget = hasSlash
    ? Number.parseInt(valueParts[1], 10) || 0
    : 0;

  const firstValue = useMotionValue(
    shouldReduceMotion
      ? firstTarget
      : 0,
  );

  const secondValue = useMotionValue(
    shouldReduceMotion
      ? secondTarget
      : 0,
  );

  const displayedFirstValue =
    useTransform(
      firstValue,
      (latestValue) =>
        Math.round(latestValue),
    );

  const displayedSecondValue =
    useTransform(
      secondValue,
      (latestValue) =>
        Math.round(latestValue),
    );

  useEffect(() => {
    if (
      !isInView ||
      shouldReduceMotion
    ) {
      return undefined;
    }

    const firstAnimation = animate(
      firstValue,
      firstTarget,
      {
        duration: 1.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    );

    let secondAnimation;

    if (hasSlash) {
      secondAnimation = animate(
        secondValue,
        secondTarget,
        {
          duration: 1.1,
          delay: delay + 0.18,
          ease: [0.16, 1, 0.3, 1],
        },
      );
    }

    return () => {
      firstAnimation.stop();
      secondAnimation?.stop();
    };
  }, [
    delay,
    firstTarget,
    firstValue,
    hasSlash,
    isInView,
    secondTarget,
    secondValue,
    shouldReduceMotion,
  ]);

  return (
    <span
      ref={valueRef}
      className="studio-story__animated-value"
      aria-label={value}
    >
      <span
        className="studio-story__number-window"
        aria-hidden="true"
      >
        <motion.span className="studio-story__number">
          {displayedFirstValue}
        </motion.span>
      </span>

      {hasSlash && (
        <>
          <motion.span
            className="studio-story__symbol studio-story__slash"
            aria-hidden="true"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scaleY: 0,
                  }
            }
            animate={
              isInView
                ? {
                    opacity: 1,
                    scaleY: 1,
                  }
                : undefined
            }
            transition={{
              duration: 0.5,
              delay: delay + 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            /
          </motion.span>

          <span
            className="studio-story__number-window"
            aria-hidden="true"
          >
            <motion.span className="studio-story__number">
              {displayedSecondValue}
            </motion.span>
          </span>
        </>
      )}

      {hasPlus && (
        <motion.span
          className="studio-story__symbol studio-story__suffix"
          aria-hidden="true"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.35,
                  rotate: -35,
                }
          }
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.65,
            delay: delay + 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          +
        </motion.span>
      )}

      {hasPercent && (
        <motion.span
          className="studio-story__symbol studio-story__suffix"
          aria-hidden="true"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                  scale: 0.7,
                }
          }
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : undefined
          }
          transition={{
            duration: 0.65,
            delay: delay + 0.95,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          %
        </motion.span>
      )}
    </span>
  );
}

export default function StudioStory() {
  const shouldReduceMotion =
    useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion
      ? {
          opacity: 1,
        }
      : {
          opacity: 0,
          y: 36,
        },
    whileInView: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      className="studio-story"
      aria-labelledby="studio-story-title"
    >
      <div className="studio-story__container">
        <motion.div
          className="studio-story__heading"
          initial={reveal.initial}
          whileInView={
            reveal.whileInView
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="studio-story__section-label">
            <span className="studio-story__label-line" />

            <span>
              {studioStoryData.eyebrow}
            </span>
          </div>

          <h2 id="studio-story-title">
            Welcome to Our
            <span>
              High-End VFX Studio
            </span>
          </h2>
        </motion.div>

        <div className="studio-story__body">
          <div className="studio-story__statement">
            <motion.p
              initial={reveal.initial}
              whileInView={
                reveal.whileInView
              }
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.08,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              We transform ambitious
              ideas into
              <span>
                {" "}
                unforgettable visual
                experiences.
              </span>
            </motion.p>
          </div>

          <div className="studio-story__copy">
            {studioStoryData.paragraphs.map(
              (paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={
                    reveal.initial
                  }
                  whileInView={
                    reveal.whileInView
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : index * 0.08,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  {paragraph}
                </motion.p>
              ),
            )}
          </div>
        </div>

        <div className="studio-story__stats">
          {studioStoryData.stats.map(
            (stat, index) => (
              <motion.article
                className="studio-story__stat"
                key={stat.label}
                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        y: 38,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.75,
                  delay:
                    shouldReduceMotion
                      ? 0
                      : index * 0.12,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                <span className="studio-story__stat-index">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <strong>
                  <AnimatedStatValue
                    value={stat.value}
                    delay={
                      shouldReduceMotion
                        ? 0
                        : index * 0.14
                    }
                    shouldReduceMotion={
                      shouldReduceMotion
                    }
                  />
                </strong>

                <span className="studio-story__stat-label">
                  {stat.label}
                </span>

                <motion.span
                  className="studio-story__stat-progress"
                  aria-hidden="true"
                  initial={{
                    scaleX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.6,
                  }}
                  transition={{
                    duration: 1.1,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : 0.35 +
                          index * 0.14,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                />
              </motion.article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}