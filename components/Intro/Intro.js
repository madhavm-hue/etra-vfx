"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import "./intro.css";

const INTRO_DURATION = 4.8;
const INTRO_HOLD_DELAY = 700;

/*
  Browser refresh panna indha value false-ah reset aagum.

  Same browser load-la Services/Portfolio poi Home return
  pannina true-ah retain aagum. Adhanala intro repeat aagadhu.
*/
let introHasPlayedDuringThisLoad = false;

export default function Intro() {
  const skipIntro = introHasPlayedDuringThisLoad;

  const [videoReady, setVideoReady] = useState(skipIntro);

  const [animationStarted, setAnimationStarted] =
    useState(skipIntro);

  const [videoRevealed, setVideoRevealed] =
    useState(skipIntro);

  const [hasExplored, setHasExplored] =
    useState(skipIntro);

  /* HOME RETURN — INTRO SKIP */

  useEffect(() => {
    if (!skipIntro) {
      return;
    }

    document.body.style.overflow = "";

    document.documentElement.setAttribute(
      "data-etra-intro-complete",
      "true",
    );

    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(
        new CustomEvent("etra:intro-ready", {
          detail: {
            skipped: true,
          },
        }),
      );
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [skipIntro]);

  /* LOCK SCROLL UNTIL FIRST INTRO COMPLETES */

  useEffect(() => {
    if (skipIntro) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = videoRevealed
      ? ""
      : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [skipIntro, videoRevealed]);

  /* START INTRO AFTER VIDEO IS READY */

  useEffect(() => {
    if (skipIntro || !videoReady) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAnimationStarted(true);
    }, INTRO_HOLD_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [skipIntro, videoReady]);

  /* HIDE SCROLL HINT AFTER USER SCROLLS */

  useEffect(() => {
    if (skipIntro || !videoRevealed) {
      return;
    }

    const handleExploreScroll = () => {
      if (window.scrollY > 8) {
        setHasExplored(true);
      }
    };

    handleExploreScroll();

    window.addEventListener(
      "scroll",
      handleExploreScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleExploreScroll,
      );
    };
  }, [skipIntro, videoRevealed]);

  const handleVideoReady = () => {
    if (!videoReady) {
      setVideoReady(true);
    }
  };

  const handleRevealComplete = () => {
    if (!animationStarted || skipIntro) {
      return;
    }

    introHasPlayedDuringThisLoad = true;

    document.documentElement.setAttribute(
      "data-etra-intro-complete",
      "true",
    );

    setVideoRevealed(true);

    window.dispatchEvent(
      new CustomEvent("etra:intro-ready", {
        detail: {
          skipped: false,
        },
      }),
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
    <section
      className={`intro-section ${
        skipIntro ? "intro-section-skipped" : ""
      }`}
    >
      <div className="intro-stage">
        <video
          className="intro-video"
          autoPlay
          muted
          loop
          playsInline
          preload={skipIntro ? "metadata" : "auto"}
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

        {!skipIntro && !videoRevealed && (
          <motion.div
            className="intro-opening"
            initial={{
              opacity: 1,
            }}
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
            <motion.div
              className="intro-loading-word"
              initial={{
                opacity: 1,
              }}
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
                    initial={{
                      scale: 1,
                    }}
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

            {/* MOBILE MASK */}

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
                    initial={{
                      scale: 1,
                    }}
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

        {!skipIntro &&
          videoRevealed &&
          !hasExplored && (
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