"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import "./ribbon-test.css";

const services = [
  { id: "01", title: "Rotoscopy", image: "/images/services/rotoscopy.jpg" },
  { id: "02", title: "Paint & Prep", image: "/images/services/paint-prep.jpg" },
  { id: "03", title: "Match-move", image: "/images/services/matchmove.jpg" },
  { id: "04", title: "Compositing", image: "/images/services/compositing-cgi.jpg" },
  { id: "05", title: "Keying & Mattes", image: "/images/services/rotoscopy.jpg" },
  { id: "06", title: "Frame Cleanup", image: "/images/services/paint-prep.jpg" },
  { id: "07", title: "Camera Tracking", image: "/images/services/matchmove.jpg" },
  { id: "08", title: "CG Integration", image: "/images/services/compositing-cgi.jpg" },
  { id: "09", title: "Rotomation", image: "/images/services/matchmove.jpg" },
  { id: "10", title: "VFX Production", image: "/images/services/compositing-cgi.jpg" },
];

const CARD_SEGMENTS = 116;
const CARD_ASPECT = 568 / 812;
const TURN_COUNT = 2;
const TOTAL_ANGLE = Math.PI * 2 * TURN_COUNT;
const RADIUS = 12;
const RISE_PER_RADIAN = 28 / TOTAL_ANGLE;
const ARC_UNIT = Math.sqrt(
  RADIUS * RADIUS + RISE_PER_RADIAN * RISE_PER_RADIAN,
);
const CURVE_LENGTH = TOTAL_ANGLE * ARC_UNIT;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  uniform float uBrightness;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    if (gl_FrontFacing) {
      uv.x = 1.0 - uv.x;
    }

    vec4 colour = texture2D(map, uv);
    colour.rgb *= uBrightness;
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

/*
  This is the curve used by the inspected reference:
  right-bottom -> large centre loop -> top-centre exit.
*/
function getCurvePoint(angle) {
  const centreDistance = (angle - TOTAL_ANGLE) / 2;
  const centreDip = 2.5 * Math.exp(-(centreDistance * centreDistance));

  return new THREE.Vector3(
    RADIUS * Math.cos(angle),
    -16 + angle * RISE_PER_RADIAN - centreDip,
    RADIUS * Math.sin(angle),
  );
}

function getCurveTangent(angle) {
  const centreDistance = (angle - TOTAL_ANGLE) / 2;
  const centreDip = 2.5 * Math.exp(-(centreDistance * centreDistance));
  const dipDerivative = -centreDistance * centreDip;

  return new THREE.Vector3(
    -RADIUS * Math.sin(angle),
    RISE_PER_RADIAN - dipDerivative,
    RADIUS * Math.cos(angle),
  ).normalize();
}

function getCardSize(width) {
  if (width < 768) {
    return { width: 4.8, gap: 0.18 };
  }

  if (width < 1200) {
    return { width: 5.25, gap: 0.24 };
  }

  return { width: 5.8, gap: 0.3 };
}

function positionCard(mesh, startDistance, cardWidth, hoverScale = 1) {
  const position = mesh.geometry.attributes.position;
  const cardHeight = cardWidth * CARD_ASPECT * hoverScale;
  const effectiveWidth = cardWidth * hoverScale;
  const side = new THREE.Vector3();
  const radial = new THREE.Vector3();

  for (let segment = 0; segment <= CARD_SEGMENTS; segment += 1) {
    const segmentProgress = segment / CARD_SEGMENTS;
    const distance =
      startDistance +
      segmentProgress * effectiveWidth -
      (effectiveWidth - cardWidth) * 0.5;
    const angle = clamp(distance / ARC_UNIT, 0, TOTAL_ANGLE);
    const point = getCurvePoint(angle);
    const tangent = getCurveTangent(angle);

    radial.set(Math.cos(angle), 0, Math.sin(angle));
    side.crossVectors(tangent, radial).normalize();
    side.y += 0.6;
    side.normalize();

    for (let row = 0; row < 2; row += 1) {
      const vertexIndex = row * (CARD_SEGMENTS + 1) + segment;
      const sideOffset = (row === 0 ? 0.5 : -0.5) * cardHeight;

      position.setXYZ(
        vertexIndex,
        point.x + side.x * sideOffset,
        point.y + side.y * sideOffset,
        point.z + side.z * sideOffset,
      );
    }
  }

  position.needsUpdate = true;
  mesh.geometry.computeBoundingSphere();
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(0, 0, 0);
  mesh.scale.set(1, 1, 1);
}

function createRail(offset, material) {
  const points = [];
  const side = new THREE.Vector3();
  const radial = new THREE.Vector3();

  for (let index = 0; index <= 600; index += 1) {
    const angle = (index / 600) * TOTAL_ANGLE;
    const point = getCurvePoint(angle);
    const tangent = getCurveTangent(angle);

    radial.set(Math.cos(angle), 0, Math.sin(angle));
    side.crossVectors(tangent, radial).normalize();
    side.y += 0.6;
    side.normalize();

    points.push(
      point.clone().addScaledVector(side, offset),
    );
  }

  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    material,
  );
}

export default function RibbonTest() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const hoverNumberRef = useRef(null);
  const hoverTitleRef = useRef(null);
  const topWordRef = useRef(null);
  const bottomWordRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressNumberRef = useRef(null);

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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );

    camera.position.set(0, 0, 22);
    camera.lookAt(0, -1, 0);

    const textureLoader = new THREE.TextureLoader();
    const meshes = [];
    const geometries = [];
    const materials = [];
    const textures = [];

    services.forEach((service) => {
      const texture = textureLoader.load(service.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      textures.push(texture);

      const geometry = new THREE.PlaneGeometry(
        1,
        1,
        CARD_SEGMENTS,
        1,
      );

      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          uBrightness: { value: 0.76 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.frustumCulled = false;
      mesh.renderOrder = 2;
      mesh.userData.hoverScale = 1;
      mesh.userData.service = service;

      scene.add(mesh);
      meshes.push(mesh);
      geometries.push(geometry);
      materials.push(material);
    });

    const railMaterial = new THREE.LineBasicMaterial({
      color: 0xb8b8bd,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });

    const initialSize = getCardSize(window.innerWidth);
    const railTop = createRail(
      (initialSize.width * CARD_ASPECT) / 2 + 0.08,
      railMaterial,
    );
    const railBottom = createRail(
      -(initialSize.width * CARD_ASPECT) / 2 - 0.08,
      railMaterial,
    );

    railTop.renderOrder = 4;
    railBottom.renderOrder = 4;
    scene.add(railTop, railBottom);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(10, 10);
    const projected = new THREE.Vector3();
    let pointerActive = false;
    let hoveredMesh = null;
    let targetProgress = 0;
    let smoothProgress = 0;
    let previousTime = performance.now();
    let animationFrame = 0;

    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      pointerActive = true;
    };

    const clearPointer = () => {
      pointerActive = false;
      pointer.set(10, 10);
    };

    section.addEventListener("pointermove", updatePointer);
    section.addEventListener("pointerleave", clearPointer);

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
      ScrollTrigger.refresh();
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const smoothing = 1 - Math.pow(0.001, delta);
      smoothProgress += (targetProgress - smoothProgress) * smoothing;

      const { width: cardWidth, gap } = getCardSize(window.innerWidth);
      const spacing = cardWidth + gap;
      const stripLength = (services.length - 1) * spacing + cardWidth;
      const headDistance =
        smoothProgress * (CURVE_LENGTH + stripLength + cardWidth) -
        cardWidth;

      meshes.forEach((mesh, index) => {
        const startDistance = headDistance - index * spacing;
        const visible =
          startDistance + cardWidth > 0 &&
          startDistance < CURVE_LENGTH;

        mesh.visible = visible;

        if (visible) {
          positionCard(
            mesh,
            startDistance,
            cardWidth,
            mesh.userData.hoverScale,
          );
        }
      });

      let nextHovered = null;

      if (pointerActive) {
        raycaster.setFromCamera(pointer, camera);
        const intersections = raycaster.intersectObjects(
          meshes.filter((mesh) => mesh.visible),
          false,
        );
        nextHovered = intersections[0]?.object ?? null;
      }

      hoveredMesh = nextHovered;

      meshes.forEach((mesh) => {
        const targetScale = mesh === hoveredMesh ? 1.12 : 1;
        const currentScale = mesh.userData.hoverScale ?? 1;
        mesh.userData.hoverScale = lerp(
          currentScale,
          targetScale,
          smoothing,
        );

        mesh.material.uniforms.uBrightness.value = lerp(
          mesh.material.uniforms.uBrightness.value,
          mesh === hoveredMesh ? 1.08 : 0.76,
          smoothing,
        );

        mesh.renderOrder = mesh === hoveredMesh ? 8 : 2;
      });

      const hoverLabel = hoverLabelRef.current;

      if (hoverLabel && hoveredMesh) {
        const service = hoveredMesh.userData.service;
        hoveredMesh.geometry.computeBoundingSphere();
        projected.copy(hoveredMesh.geometry.boundingSphere.center);
        projected.project(camera);

        const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (-projected.y * 0.5 + 0.5) * window.innerHeight;

        hoverLabel.style.opacity = "1";
        hoverLabel.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;

        if (hoverNumberRef.current) {
          hoverNumberRef.current.textContent = service.id;
        }

        if (hoverTitleRef.current) {
          hoverTitleRef.current.textContent = service.title;
        }

        section.style.cursor = "pointer";
      } else if (hoverLabel) {
        hoverLabel.style.opacity = "0";
        section.style.cursor = "default";
      }

      const textEntrance = smoothStep(clamp((smoothProgress - 0.04) / 0.32));
      const textExit = smoothStep(clamp((smoothProgress - 0.78) / 0.18));
      const textOpacity = smoothStep(clamp(smoothProgress / 0.1)) * (1 - textExit);

      if (topWordRef.current) {
        topWordRef.current.style.opacity = String(textOpacity);
        topWordRef.current.style.transform = `translate3d(${lerp(-34, 9, textEntrance) - textExit * 18}vw, 0, 0)`;
      }

      if (bottomWordRef.current) {
        bottomWordRef.current.style.opacity = String(textOpacity);
        bottomWordRef.current.style.transform = `translate3d(${lerp(34, -9, textEntrance) + textExit * 18}vw, 0, 0)`;
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${smoothProgress})`;
      }

      if (progressNumberRef.current) {
        progressNumberRef.current.textContent = String(
          Math.min(10, Math.max(1, Math.ceil(smoothProgress * 10))),
        ).padStart(2, "0");
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", updatePointer);
      section.removeEventListener("pointerleave", clearPointer);
      scrollTrigger.kill();

      scene.remove(railTop, railBottom);
      railTop.geometry.dispose();
      railBottom.geometry.dispose();
      railMaterial.dispose();

      meshes.forEach((mesh) => scene.remove(mesh));
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <main ref={sectionRef} className="ribbon-test-webgl">
      <section className="ribbon-test-webgl__sticky">
        <div className="ribbon-test-webgl__glow" aria-hidden="true" />

        <header className="ribbon-test-webgl__intro">
          <span>Services</span>
          <p>
            Visual effects shaped through precision, technology and imagination.
          </p>
        </header>

        <div
          ref={topWordRef}
          className="ribbon-test-webgl__word ribbon-test-webgl__word--top"
          aria-hidden="true"
        >
          Precision
        </div>

        <div
          ref={bottomWordRef}
          className="ribbon-test-webgl__word ribbon-test-webgl__word--bottom"
          aria-hidden="true"
        >
          In Motion
        </div>

        <canvas
          ref={canvasRef}
          className="ribbon-test-webgl__canvas"
          aria-label="ETRA Dreams services film ribbon"
        />

        <div ref={hoverLabelRef} className="ribbon-test-webgl__hover-card">
          <span ref={hoverNumberRef} />
          <strong ref={hoverTitleRef} />
          <small>Explore service</small>
        </div>

        <div className="ribbon-test-webgl__progress">
          <span ref={progressNumberRef}>01</span>
          <div><i ref={progressFillRef} /></div>
          <span>10</span>
        </div>

        <span className="ribbon-test-webgl__scroll-label">
          Scroll to explore
        </span>
      </section>
    </main>
  );
}
