"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import "./intro.css";

const INTRO_DURATION = 4.8;
const INTRO_HOLD_DELAY = 700;

export default function Intro() {
  const [videoReady, setVideoReady] =
    useState(false);

  const [animationStarted, setAnimationStarted] =
    useState(false);

  const [videoRevealed, setVideoRevealed] =
    useState(false);

  const [hasExplored, setHasExplored] =
    useState(false);

  /* LOCK SCROLL UNTIL INTRO COMPLETES */

  useEffect(() => {
    document.body.style.overflow = videoRevealed
      ? ""
      : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [videoRevealed]);

  /* START ONLY AFTER VIDEO IS READY */

  useEffect(() => {
    if (!videoReady) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAnimationStarted(true);
    }, INTRO_HOLD_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [videoReady]);

  /* HIDE SCROLL HINT AFTER USER SCROLLS */

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

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const handleRevealComplete = () => {
    if (!animationStarted) {
      return;
    }

    setVideoRevealed(true);

    window.dispatchEvent(
      new CustomEvent("etra:intro-ready"),
    );
  };

  const maskAnimation = animationStarted
    ? {
        scale: [1, 1, 55],
      }
    : {
        scale: 1,
      };

  const maskTransition = {
    duration: animationStarted
      ? INTRO_DURATION
      : 0,
    times: [0, 0.18, 1],
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
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
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
            animate={
              animationStarted
                ? {
                    opacity: [1, 1, 0],
                  }
                : {
                    opacity: 1,
                  }
            }
            transition={{
              duration: animationStarted
                ? INTRO_DURATION
                : 0,
              times: [0, 0.92, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={
              handleRevealComplete
            }
          >
            {/* STATIC ETRA UNTIL VIDEO LOADS */}

            <motion.div
              className="intro-loading-word"
              initial={{ opacity: 1 }}
              animate={{
                opacity: videoReady ? 0 : 1,
              }}
              transition={{
                duration: 0.25,
              }}
              aria-hidden="true"
            >
              ETRA
            </motion.div>

            {/* DESKTOP MASK */}

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
                    animate={maskAnimation}
                    transition={maskTransition}
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
                    animate={maskAnimation}
                    transition={maskTransition}
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