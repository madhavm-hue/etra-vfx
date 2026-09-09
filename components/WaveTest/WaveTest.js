"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import "./wave-test.css";

const services = [
  {
    number: "01",
    title: "Rotoscopy",
    category: "Keying / Matte Extraction",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
  },
  {
    number: "02",
    title: "Paint & Prep",
    category: "Clean-up / Restoration",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
  },
  {
    number: "03",
    title: "Match-move",
    category: "Tracking / Rotomation",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
  },
  {
    number: "04",
    title: "Matte Extraction",
    category: "Precision VFX",
    href: "/services/rotoscopy-keying-matte-extraction",
    image: "/images/services/rotoscopy.jpg",
  },
  {
    number: "05",
    title: "Frame Clean-up",
    category: "Paint / Beauty Work",
    href: "/services/paint-prep",
    image: "/images/services/paint-prep.jpg",
  },
  {
    number: "06",
    title: "Camera Tracking",
    category: "Match-move",
    href: "/services/match-move-rotomation",
    image: "/images/services/matchmove.jpg",
  },
];

const COLUMNS = 3;
const ROWS = 2;
const SEGMENTS_X = 20;
const SEGMENTS_Y = 12;
const CARD_ASPECT = 0.69;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  uniform float uOpacity;
  uniform float uBrightness;
  varying vec2 vUv;

  void main() {
    vec2 centred = vUv - 0.5;
    vec2 size = vec2(0.5, 0.5);
    float radius = 0.035;
    vec2 distanceToEdge = abs(centred) - size + radius;
    float roundedDistance =
      length(max(distanceToEdge, 0.0)) +
      min(max(distanceToEdge.x, distanceToEdge.y), 0.0) -
      radius;

    float mask = 1.0 - smoothstep(-0.004, 0.006, roundedDistance);
    vec4 colour = texture2D(map, vUv);
    colour.rgb *= uBrightness;
    colour.a *= mask * uOpacity;

    gl_FragColor = colour;
  }
`;

function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(Math.max(value, minimum), maximum);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function smoothStep(value) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

function getVisibleArea(camera) {
  const height =
    2 *
    Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) *
    camera.position.z;

  return {
    height,
    width: height * camera.aspect,
  };
}

function getGridMetrics(camera, viewportWidth) {
  const visible = getVisibleArea(camera);
  const horizontalCoverage = viewportWidth < 768 ? 0.9 : 0.88;
  const verticalCoverage = viewportWidth < 768 ? 0.76 : 0.72;
  const columnGap = viewportWidth < 768 ? 0.18 : 0.34;
  const rowGap = viewportWidth < 768 ? 0.22 : 0.38;
  const columns = viewportWidth < 768 ? 1 : COLUMNS;
  const rows = viewportWidth < 768 ? 6 : ROWS;

  const widthFromColumns =
    (visible.width * horizontalCoverage -
      (columns - 1) * columnGap) /
    columns;

  const widthFromRows =
    (visible.height * verticalCoverage -
      (rows - 1) * rowGap) /
    rows /
    CARD_ASPECT;

  const cardWidth = Math.min(widthFromColumns, widthFromRows);
  const cardHeight = cardWidth * CARD_ASPECT;

  return {
    columns,
    rows,
    columnGap,
    rowGap,
    cardWidth,
    cardHeight,
    visible,
  };
}

function getGridPosition(index, metrics) {
  const column = index % metrics.columns;
  const row = Math.floor(index / metrics.columns);
  const gridWidth =
    metrics.columns * metrics.cardWidth +
    (metrics.columns - 1) * metrics.columnGap;
  const gridHeight =
    metrics.rows * metrics.cardHeight +
    (metrics.rows - 1) * metrics.rowGap;

  return new THREE.Vector3(
    -gridWidth / 2 +
      metrics.cardWidth / 2 +
      column * (metrics.cardWidth + metrics.columnGap),
    gridHeight / 2 -
      metrics.cardHeight / 2 -
      row * (metrics.cardHeight + metrics.rowGap) -
      0.35,
    0,
  );
}

function getEntrancePosition(index, target, metrics) {
  const column = index % metrics.columns;
  const row = Math.floor(index / metrics.columns);
  let x = target.x;

  if (metrics.columns === 1) {
    x = index % 2 === 0
      ? -metrics.visible.width * 0.74
      : metrics.visible.width * 0.74;
  } else if (column === 0) {
    x = -metrics.visible.width * 0.72;
  } else if (column === metrics.columns - 1) {
    x = metrics.visible.width * 0.72;
  }

  const y = row === 0
    ? metrics.visible.height * 0.63
    : -metrics.visible.height * 0.63;

  return new THREE.Vector3(x, y, -1.8);
}

function deformGeometry(mesh, strength, time, index) {
  const position = mesh.geometry.attributes.position;
  const { restX, restY, cardWidth } = mesh.userData;

  for (let vertex = 0; vertex < position.count; vertex += 1) {
    const x = restX[vertex];
    const y = restY[vertex];
    const u = x / cardWidth + 0.5;
    const v = y / (cardWidth * CARD_ASPECT) + 0.5;
    const diagonal = (u + v) * 0.5;
    const phase =
      diagonal * Math.PI * 1.35 -
      time * 2.1 +
      index * 0.42;
    const edgeWeight = Math.sin(clamp(u) * Math.PI);
    const z =
      strength *
      Math.sin(phase) *
      cardWidth *
      0.14 *
      (0.55 + edgeWeight * 0.45);

    position.setXYZ(vertex, x, y, z);
  }

  position.needsUpdate = true;
}

export default function WaveTest() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const gridOverlayRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 22);
    camera.lookAt(0, -0.35, 0);

    const loader = new THREE.TextureLoader();
    const meshes = [];
    const textures = [];
    const geometries = [];
    const materials = [];
    let metrics = getGridMetrics(camera, window.innerWidth);
    let targetProgress = 0;
    let currentProgress = 0;
    let previousTime = performance.now();
    let animationFrame = 0;
    let hoveredIndex = -1;

    services.forEach((service, index) => {
      const texture = loader.load(service.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      textures.push(texture);

      const geometry = new THREE.PlaneGeometry(
        metrics.cardWidth,
        metrics.cardHeight,
        SEGMENTS_X,
        SEGMENTS_Y,
      );

      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          uOpacity: { value: 0 },
          uBrightness: { value: 0.82 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const source = geometry.attributes.position.array;
      const vertexCount = source.length / 3;
      const restX = new Float32Array(vertexCount);
      const restY = new Float32Array(vertexCount);

      for (let vertex = 0; vertex < vertexCount; vertex += 1) {
        restX[vertex] = source[vertex * 3];
        restY[vertex] = source[vertex * 3 + 1];
      }

      mesh.userData = {
        index,
        restX,
        restY,
        cardWidth: metrics.cardWidth,
      };
      mesh.frustumCulled = false;
      mesh.renderOrder = index + 1;

      scene.add(mesh);
      meshes.push(mesh);
      geometries.push(geometry);
      materials.push(material);
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      metrics = getGridMetrics(camera, window.innerWidth);
      ScrollTrigger.refresh();
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const smoothing = 1 - Math.pow(0.002, delta);
      currentProgress += (targetProgress - currentProgress) * smoothing;

      meshes.forEach((mesh, index) => {
        const revealStart = 0.04 + index * 0.055;
        const reveal = smoothStep(
          (currentProgress - revealStart) / 0.34,
        );
        const settle = smoothStep(
          (currentProgress - (0.56 + index * 0.018)) / 0.27,
        );
        const target = getGridPosition(index, metrics);
        const entrance = getEntrancePosition(index, target, metrics);
        const overshoot = Math.sin(reveal * Math.PI) * (index % 2 === 0 ? 0.28 : -0.28);
        const waveStrength = reveal * (1 - settle);

        mesh.position.set(
          lerp(entrance.x, target.x, reveal),
          lerp(entrance.y, target.y, reveal) + overshoot,
          lerp(entrance.z, 0, reveal),
        );
        mesh.rotation.x = lerp(index < 3 ? -0.22 : 0.22, 0, settle);
        mesh.rotation.y = lerp(index % 2 === 0 ? 0.42 : -0.42, 0, reveal);
        mesh.rotation.z = lerp(index % 2 === 0 ? -0.12 : 0.12, 0, settle);

        const hoverTarget = hoveredIndex === index ? 1.045 : 1;
        mesh.scale.x = lerp(mesh.scale.x, hoverTarget, smoothing);
        mesh.scale.y = lerp(mesh.scale.y, hoverTarget, smoothing);

        materialFor(mesh).uniforms.uOpacity.value = reveal;
        materialFor(mesh).uniforms.uBrightness.value = lerp(
          materialFor(mesh).uniforms.uBrightness.value,
          hoveredIndex === index ? 1.08 : 0.82,
          smoothing,
        );

        deformGeometry(mesh, waveStrength, time / 1000, index);
      });

      if (gridOverlayRef.current) {
        const overlayProgress = smoothStep((currentProgress - 0.72) / 0.18);
        gridOverlayRef.current.style.opacity = String(overlayProgress);
        gridOverlayRef.current.style.pointerEvents =
          overlayProgress > 0.9 ? "auto" : "none";
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    function materialFor(mesh) {
      return mesh.material;
    }

    animationFrame = requestAnimationFrame(render);

    const cards = gridOverlayRef.current?.querySelectorAll("[data-wave-card]") ?? [];

    cards.forEach((card, index) => {
      card.addEventListener("pointerenter", () => {
        hoveredIndex = index;
      });
      card.addEventListener("pointerleave", () => {
        hoveredIndex = -1;
      });
      card.addEventListener("focus", () => {
        hoveredIndex = index;
      });
      card.addEventListener("blur", () => {
        hoveredIndex = -1;
      });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      scrollTrigger.kill();
      meshes.forEach((mesh) => scene.remove(mesh));
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <main ref={sectionRef} className="wave-test">
      <section className="wave-test__sticky">
        <div className="wave-test__background" aria-hidden="true" />

        <header className="wave-test__header">
          <span>Selected capabilities</span>
          <h1>
            Precision in
            <strong>every movement.</strong>
          </h1>
          <p>
            Six production capabilities shaped through artistry,
            technology and technical precision.
          </p>
        </header>

        <canvas
          ref={canvasRef}
          className="wave-test__canvas"
          aria-label="Six ETRA Dreams service capabilities"
        />

        <div ref={gridOverlayRef} className="wave-test__grid-overlay">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="wave-test__card-content"
              data-wave-card
              aria-label={`Explore ${service.title}`}
            >
              <span>{service.number}</span>
              <div>
                <small>{service.category}</small>
                <h2>{service.title}</h2>
              </div>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>

        <div className="wave-test__footer">
          <span>01</span>
          <div><i ref={progressRef} /></div>
          <span>06</span>
        </div>
      </section>
    </main>
  );
}
