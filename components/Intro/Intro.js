"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import "./intro.css";

export default function Intro() {
  const [videoRevealed, setVideoRevealed] =
    useState(false);

  const [hasExplored, setHasExplored] =
    useState(false);

  const reduceMotion = useReducedMotion();

  const duration = reduceMotion ? 0.2 : 4.5;

  /* LOCK SCROLL UNTIL AUTOMATIC ZOOM FINISHES */

  useEffect(() => {
    document.body.style.overflow = videoRevealed
      ? ""
      : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [videoRevealed]);

  /* HIDE SCROLL INDICATOR AFTER FIRST SCROLL */

  useEffect(() => {
    if (!videoRevealed) {
      return;
    }

    const handleExploreScroll = () => {
      if (window.scrollY > 8) {
        setHasExplored(true);
      }
    };

    window.addEventListener(
      "scroll",
      handleExploreScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleExploreScroll,
      );
    };
  }, [videoRevealed]);

  /* NOTIFY NAVBAR WHEN VIDEO IS FULLY REVEALED */

  const handleRevealComplete = () => {
    setVideoRevealed(true);

    window.dispatchEvent(
      new CustomEvent("etra:intro-ready"),
    );
  };

  const textAnimation = {
    scale: reduceMotion ? 24 : [1, 1, 24],
  };

  const textTransition = {
    duration,
    times: [0, 0.2, 1],
    ease: [0.76, 0, 0.24, 1],
  };

  return (
    <section className="intro-section">
      <div className="intro-stage">
        <video
          className="intro-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="ETRA Dreams visual effects showreel"
        >
          <source
            src="/videos/etra-intro.mp4"
            type="video/mp4"
          />
        </video>

        <div className="intro-video-overlay" />

        {!videoRevealed && (
          <motion.div
            className="intro-opening"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{
              duration,
              times: [0, 0.9, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={
              handleRevealComplete
            }
          >
            {/* DESKTOP / TABLET MASK */}

            <svg
              className="intro-mask intro-mask-desktop"
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <mask
                  id="etra-desktop-mask"
                  x="0"
                  y="0"
                  width="1600"
                  height="900"
                  maskUnits="userSpaceOnUse"
                >
                  <rect
                    width="1600"
                    height="900"
                    fill="white"
                  />

                  <motion.text
                    x="800"
                    y="450"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="intro-mask-text intro-mask-text-desktop"
                    fill="black"
                    initial={{ scale: 1 }}
                    animate={textAnimation}
                    transition={textTransition}
                  >
                    ETRA
                  </motion.text>
                </mask>
              </defs>

              <rect
                width="1600"
                height="900"
                className="intro-mask-background"
                mask="url(#etra-desktop-mask)"
              />
            </svg>

            {/* MOBILE PORTRAIT MASK */}

            <svg
              className="intro-mask intro-mask-mobile"
              viewBox="0 0 800 1600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <mask
                  id="etra-mobile-mask"
                  x="0"
                  y="0"
                  width="800"
                  height="1600"
                  maskUnits="userSpaceOnUse"
                >
                  <rect
                    width="800"
                    height="1600"
                    fill="white"
                  />

                  <motion.text
                    x="400"
                    y="800"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="intro-mask-text intro-mask-text-mobile"
                    fill="black"
                    initial={{ scale: 1 }}
                    animate={textAnimation}
                    transition={textTransition}
                  >
                    ETRA
                  </motion.text>
                </mask>
              </defs>

              <rect
                width="800"
                height="1600"
                className="intro-mask-background"
                mask="url(#etra-mobile-mask)"
              />
            </svg>
          </motion.div>
        )}

        {videoRevealed && !hasExplored && (
          <motion.div
            className="intro-scroll-hint"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden="true"
          >
            <span>Scroll to Explore</span>
            <span className="intro-scroll-line" />
          </motion.div>
        )}
      </div>
    </section>
  );
}