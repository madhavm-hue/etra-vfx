"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./vortex-test.css";

const layers = [
  {
    id: "01",
    rotation: -37,
    phrase: "ROTOSCOPY",
  },
  {
    id: "02",
    rotation: 42,
    phrase: "PAINT AND PREP",
  },
  {
    id: "03",
    rotation: 111,
    phrase: "MATCHMOVE",
  },
  {
    id: "04",
    rotation: -45,
    phrase: "COMPOSITING",
  },
  {
    id: "05",
    rotation: 67,
    phrase: "CG INTEGRATION",
  },
  {
    id: "06",
    rotation: -114,
    phrase: "VFX PRODUCTION",
  },
  {
    id: "07",
    rotation: 50,
    phrase: "BEYOND IMAGINATION",
  },
];

const radii = [
  128,
  151,
  174,
  197,
  220,
  243,
  266,
];

function getCirclePath(radius) {
  return `
    M 282 ${282 - radius}
    A ${radius} ${radius} 0 1 1 281.9 ${282 - radius}
  `;
}

function CircleLayer({
  layer,
  index,
}) {
  return (
    <div
      className="vortex-reference__circle"
      data-vortex-circle
    >
      <svg
        viewBox="0 0 564 564"
        aria-hidden="true"
      >
        <defs>
          {radii.map((radius, pathIndex) => (
            <path
              key={`${layer.id}-${pathIndex}`}
              id={`vortex-${layer.id}-${pathIndex}`}
              d={getCirclePath(radius)}
              fill="none"
            />
          ))}

          <clipPath
            id={`vortex-clip-${layer.id}`}
          >
            <circle
              cx="282"
              cy="282"
              r={radii[index]}
            />
          </clipPath>
        </defs>

        <circle
          className="vortex-reference__outline"
          cx="282"
          cy="282"
          r={radii[index]}
        />

        <g
          clipPath={`url(#vortex-clip-${layer.id})`}
        >
          <text
            className="vortex-reference__main-text"
            x="282"
            y="205"
            textAnchor="middle"
          >
            YOUR VISION
          </text>

          <text
            className="vortex-reference__main-text"
            x="282"
            y="251"
            textAnchor="middle"
          >
            OUR CRAFT
          </text>
        </g>

        {radii
          .slice(0, index + 1)
          .map((radius, pathIndex) => (
            <g
              key={`${layer.id}-ring-${pathIndex}`}
            >
              <circle
                className="vortex-reference__guide"
                cx="282"
                cy="282"
                r={radius}
              />

              <text className="vortex-reference__ring-text">
                <textPath
                  href={`#vortex-${layer.id}-${pathIndex}`}
                  startOffset="19%"
                >
                  {String(
                    pathIndex + 1,
                  ).padStart(2, "0")}
                  {"  •  "}
                  {layers[pathIndex].phrase}
                  {"  •  PRECISION IN EVERY FRAME  •  "}
                </textPath>
              </text>
            </g>
          ))}
      </svg>
    </div>
  );
}

export default function VortexTest() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const circleWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wrapper =
      circleWrapperRef.current;

    if (!section || !wrapper) {
      return undefined;
    }

    const circleElements =
      wrapper.querySelectorAll(
        "[data-vortex-circle]",
      );

    const context = gsap.context(() => {
      gsap.set(circleElements, {
        transformOrigin: "50% 50%",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      circleElements.forEach(
        (circle, index) => {
          timeline.from(
            circle,
            {
              rotation:
                layers[index].rotation,
            },
            0,
          );
        },
      );

      timeline.from(
        titleRef.current,
        {
          opacity: 0,
          y: 45,
        },
        0,
      );

      timeline.from(
        wrapper,
        {
          opacity: 0,
          scale: 0.82,
          y: 90,
        },
        0,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main
      ref={sectionRef}
      className="vortex-reference"
    >
      <div className="vortex-reference__wrapper">
        <header
          ref={titleRef}
          className="vortex-reference__title"
        >
          <span>Ready to create</span>

          <h1>
            THE IMPOSSIBLE?
          </h1>
        </header>

        <div
          ref={circleWrapperRef}
          className="vortex-reference__circles"
        >
          {layers.map(
            (layer, index) => (
              <CircleLayer
                key={layer.id}
                layer={layer}
                index={index}
              />
            ),
          )}
        </div>
      </div>
    </main>
  );
}