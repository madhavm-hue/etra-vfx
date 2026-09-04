"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Edges,
  Image as ThreeImage,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";

import * as THREE from "three";

import { demo1Projects } from "../data/demo1Data";

import "./portfolio-scene.css";

/* ===================================
   CONFIGURATION
=================================== */

const PROJECT_SPACING = 7;
const ACTIVE_POSTER_X = 2.15;

const clamp = (
  value,
  minimum,
  maximum,
) =>
  Math.min(
    Math.max(value, minimum),
    maximum,
  );

/* ===================================
   PROJECT POSITION
=================================== */

function getProjectPosition(index) {
  const positionPattern = [
    -2.7,
    3,
    -2.25,
    2.65,
  ];

  const verticalPattern = [
    0.25,
    -0.35,
    0.5,
    -0.15,
  ];

  return [
    positionPattern[
      index % positionPattern.length
    ],
    verticalPattern[
      index % verticalPattern.length
    ],
    index * -PROJECT_SPACING,
  ];
}

/* ===================================
   GLASS POSTER
=================================== */

function GlassProjectPanel({
  project,
  index,
  progressReference,
}) {
  const panelReference = useRef(null);

  const basePosition = useMemo(
    () => getProjectPosition(index),
    [index],
  );

  useFrame((state, delta) => {
    const panel =
      panelReference.current;

    if (!panel) {
      return;
    }

    const projectProgress =
      progressReference.current *
      Math.max(
        demo1Projects.length - 1,
        1,
      );

    const distance =
      Math.abs(
        projectProgress - index,
      );

    const activeInfluence =
      1 - clamp(distance, 0, 1);

    const desiredX =
      THREE.MathUtils.lerp(
        basePosition[0],
        ACTIVE_POSTER_X,
        activeInfluence,
      );

    const desiredY =
      basePosition[1] +
      activeInfluence * 0.1 +
      Math.sin(
        state.clock.elapsedTime * 0.45 +
          index * 0.8,
      ) *
        0.08;

    const desiredScale =
      THREE.MathUtils.lerp(
        0.76,
        1.08,
        activeInfluence,
      );

    const baseRotation =
      basePosition[0] < 0
        ? 0.22
        : -0.22;

    const desiredRotation =
      THREE.MathUtils.lerp(
        baseRotation,
        -0.08,
        activeInfluence,
      );

    panel.position.x =
      THREE.MathUtils.damp(
        panel.position.x,
        desiredX,
        4,
        delta,
      );

    panel.position.y =
      THREE.MathUtils.damp(
        panel.position.y,
        desiredY,
        4,
        delta,
      );

    panel.scale.x =
      THREE.MathUtils.damp(
        panel.scale.x,
        desiredScale,
        4,
        delta,
      );

    panel.scale.y =
      THREE.MathUtils.damp(
        panel.scale.y,
        desiredScale,
        4,
        delta,
      );

    panel.scale.z =
      THREE.MathUtils.damp(
        panel.scale.z,
        desiredScale,
        4,
        delta,
      );

    panel.rotation.y =
      THREE.MathUtils.damp(
        panel.rotation.y,
        desiredRotation,
        4,
        delta,
      );

    panel.rotation.z =
      THREE.MathUtils.damp(
        panel.rotation.z,
        activeInfluence * -0.015,
        4,
        delta,
      );
  });

  return (
    <group
      ref={panelReference}
      position={basePosition}
    >
      {/* BACK GLOW */}

      <mesh
        position={[0, 0, -0.3]}
        scale={[1.16, 1.1, 1]}
      >
        <planeGeometry
          args={[4.15, 5.95]}
        />

        <meshBasicMaterial
          color="#f50087"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* GLASS CONTAINER */}

      <RoundedBox
        args={[4.05, 5.85, 0.2]}
        radius={0.18}
        smoothness={6}
        position={[0, 0, -0.1]}
      >
        <meshPhysicalMaterial
          color="#17132d"
          roughness={0.08}
          metalness={0.08}
          transmission={0.58}
          thickness={1.1}
          transparent
          opacity={0.72}
          clearcoat={1}
          clearcoatRoughness={0.08}
          side={THREE.DoubleSide}
        />

        <Edges
          threshold={12}
          color="#f50087"
          scale={1.002}
        />
      </RoundedBox>

      {/* POSTER */}

      <ThreeImage
        url={project.image}
        position={[0, 0, 0.03]}
        scale={[3.66, 5.38]}
        transparent
        toneMapped={false}
      />

      {/* FRONT GLASS REFLECTION */}

      <RoundedBox
        args={[3.82, 5.54, 0.035]}
        radius={0.14}
        smoothness={5}
        position={[0, 0, 0.1]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0}
          metalness={0}
          transmission={0.96}
          thickness={0.08}
          transparent
          opacity={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          depthWrite={false}
        />
      </RoundedBox>

      {/* GLASS HIGHLIGHT */}

      <mesh
        position={[-1.55, 0.1, 0.14]}
        rotation={[0, 0, -0.08]}
      >
        <planeGeometry
          args={[0.035, 4.75]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <pointLight
        position={[0, -2.3, 1.6]}
        color="#f50087"
        intensity={2.4}
        distance={7}
      />
    </group>
  );
}

/* ===================================
   WATER RIBBON GEOMETRY
=================================== */

function createWaterRibbonGeometry() {
  const shape = new THREE.Shape();

  shape.moveTo(-0.52, -0.045);
  shape.lineTo(0.52, -0.045);
  shape.lineTo(0.52, 0.045);
  shape.lineTo(-0.52, 0.045);
  shape.closePath();

  const projectDepth =
    Math.max(
      demo1Projects.length - 1,
      1,
    ) * PROJECT_SPACING;

  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(
        -0.8,
        -2.6,
        5,
      ),
      new THREE.Vector3(
        2.8,
        2.2,
        -5,
      ),
      new THREE.Vector3(
        -2.5,
        -2,
        -18,
      ),
      new THREE.Vector3(
        2.7,
        2.35,
        -32,
      ),
      new THREE.Vector3(
        -2.8,
        -2.2,
        -48,
      ),
      new THREE.Vector3(
        2.6,
        2.1,
        -64,
      ),
      new THREE.Vector3(
        -2.2,
        -1.8,
        -80,
      ),
      new THREE.Vector3(
        2.4,
        1.8,
        -projectDepth - 6,
      ),
    ],
    false,
    "catmullrom",
    0.48,
  );

  const geometry =
    new THREE.ExtrudeGeometry(
      shape,
      {
        steps: 360,
        bevelEnabled: false,
        extrudePath: curve,
      },
    );

  geometry.computeVertexNormals();

  return geometry;
}

/* ===================================
   WATER RIBBON SHADERS
=================================== */

const waterRibbonVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float uPhase;

  void main() {
    vUv = uv;
    vNormal = normalize(
      normalMatrix * normal
    );

    vec3 transformed = position;

    float waveOne = sin(
      transformed.z * 0.13 +
      uPhase
    );

    float waveTwo = cos(
      transformed.z * 0.07 -
      uPhase * 0.7
    );

    transformed.x +=
      waveOne * 0.14;

    transformed.y +=
      waveTwo * 0.11;

    vec4 viewPosition =
      modelViewMatrix *
      vec4(transformed, 1.0);

    vViewPosition =
      -viewPosition.xyz;

    gl_Position =
      projectionMatrix *
      viewPosition;
  }
`;

const waterRibbonFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float uPhase;

  void main() {
    vec3 viewDirection =
      normalize(vViewPosition);

    float fresnel =
      pow(
        1.0 -
        abs(
          dot(
            viewDirection,
            normalize(vNormal)
          )
        ),
        2.2
      );

    float movingWave =
      sin(
        vUv.x * 14.0 -
        uPhase * 1.8
      ) *
      0.5 +
      0.5;

    float secondaryWave =
      cos(
        vUv.y * 22.0 +
        uPhase
      ) *
      0.5 +
      0.5;

    vec3 pink =
      vec3(0.96, 0.0, 0.53);

    vec3 violet =
      vec3(0.45, 0.12, 1.0);

    vec3 cyan =
      vec3(0.1, 0.72, 1.0);

    vec3 ribbonColor =
      mix(
        violet,
        pink,
        movingWave
      );

    ribbonColor =
      mix(
        ribbonColor,
        cyan,
        secondaryWave * 0.42
      );

    float alpha =
      0.13 +
      fresnel * 0.48 +
      movingWave * 0.1;

    gl_FragColor =
      vec4(
        ribbonColor,
        alpha
      );
  }
`;

/* ===================================
   SCROLL-CONTROLLED WATER RIBBON
=================================== */

function WaterGlassRibbon({
  progressReference,
}) {
  const ribbonRef = useRef(null);
  const materialRef = useRef(null);

  const phaseRef = useRef(0);

  const previousProgressRef =
    useRef(0);

  const smoothedVelocityRef =
    useRef(0);

  const geometry = useMemo(
    () => createWaterRibbonGeometry(),
    [],
  );

  const uniforms = useMemo(
    () => ({
      uPhase: {
        value: 0,
      },
    }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry],
  );

  useFrame((state, delta) => {
    const ribbon =
      ribbonRef.current;

    const material =
      materialRef.current;

    if (!ribbon || !material) {
      return;
    }

    const currentProgress =
    progressReference?.current ?? 0;

    const progressDifference =
      currentProgress -
      previousProgressRef.current;

    previousProgressRef.current =
      currentProgress;

    const rawVelocity =
      delta > 0
        ? progressDifference / delta
        : 0;

    smoothedVelocityRef.current =
      THREE.MathUtils.damp(
        smoothedVelocityRef.current,
        rawVelocity,
        5,
        delta,
      );

    const scrollVelocity =
      smoothedVelocityRef.current;

    const hasScrollMovement =
      Math.abs(scrollVelocity) > 0.001;

    const movementDirection =
      hasScrollMovement
        ? Math.sign(scrollVelocity)
        : 1;

    const motionSpeed =
      hasScrollMovement
        ? 0.18 +
          Math.min(
            Math.abs(
              scrollVelocity,
            ) * 0.8,
            2.5,
          )
        : 0.08;

    phaseRef.current +=
      delta *
      motionSpeed *
      movementDirection;

    material.uniforms.uPhase.value =
      phaseRef.current;

    ribbon.rotation.z =
      Math.sin(
        phaseRef.current * 0.28,
      ) * 0.12;

    ribbon.rotation.y =
      Math.sin(
        phaseRef.current * 0.18,
      ) * 0.05;

    ribbon.position.y =
      Math.sin(
        state.clock.elapsedTime *
          0.28,
      ) * 0.12;

    ribbon.position.z =
      currentProgress * -1.5;
  });

  return (
    <mesh
      ref={ribbonRef}
      geometry={geometry}
      renderOrder={1}
    >
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={
          waterRibbonVertexShader
        }
        fragmentShader={
          waterRibbonFragmentShader
        }
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={
          THREE.AdditiveBlending
        }
      />
    </mesh>
  );
}

/* ===================================
   CAMERA MOVEMENT
=================================== */

function CameraRig({
  progressReference,
}) {
  const cameraReference =
    useRef(null);

  useFrame((_, delta) => {
    const camera =
      cameraReference.current;

    if (!camera) {
      return;
    }

    const projectJourney =
      Math.max(
        demo1Projects.length - 1,
        1,
      );

    const projectProgress =
      progressReference.current *
      projectJourney;

    const cameraZ =
      7 -
      projectProgress *
        PROJECT_SPACING;

    const curveX =
      Math.sin(
        projectProgress * 0.72,
      ) * 0.72;

    const curveY =
      Math.cos(
        projectProgress * 0.5,
      ) * 0.24;

    const nextX =
      THREE.MathUtils.damp(
        camera.position.x,
        curveX,
        3.4,
        delta,
      );

    const nextY =
      THREE.MathUtils.damp(
        camera.position.y,
        curveY,
        3.4,
        delta,
      );

    const nextZ =
      THREE.MathUtils.damp(
        camera.position.z,
        cameraZ,
        3.4,
        delta,
      );

    camera.position.set(
      nextX,
      nextY,
      nextZ,
    );

    camera.lookAt(
      ACTIVE_POSTER_X,
      0,
      cameraZ - PROJECT_SPACING,
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraReference}
      makeDefault
      position={[0, 0, 7]}
      fov={46}
      near={0.1}
      far={160}
    />
  );
}

/* ===================================
   3D WORLD
=================================== */

function PortfolioWorld({
  progressReference,
}) {
  return (
    <>
      <color
        attach="background"
        args={["#07071b"]}
      />

      <fog
        attach="fog"
        args={[
          "#07071b",
          12,
          38,
        ]}
      />

      <ambientLight
        intensity={0.55}
      />

      <directionalLight
        position={[4, 7, 5]}
        color="#ffffff"
        intensity={1.4}
      />

      <pointLight
        position={[-5, 3, 2]}
        color="#8a38ff"
        intensity={3.2}
        distance={22}
      />

      <pointLight
        position={[5, -2, -12]}
        color="#f50087"
        intensity={3}
        distance={24}
      />

      <pointLight
        position={[0, 3, -30]}
        color="#27b8ff"
        intensity={2.2}
        distance={30}
      />

      <CameraRig
        progressReference={
          progressReference
        }
      />

     <WaterGlassRibbon
     progressReference={
    progressReference
    }
     />

      {demo1Projects.map(
        (project, index) => (
          <GlassProjectPanel
            key={project.id}
            project={project}
            index={index}
            progressReference={
              progressReference
            }
          />
        ),
      )}

      <Sparkles
        count={320}
        scale={[17, 11, 112]}
        position={[0, 0, -50]}
        size={1.25}
        speed={0.18}
        opacity={0.58}
        color="#f50087"
      />
    </>
  );
}

/* ===================================
   LOADER
=================================== */

function SceneLoader() {
  return (
    <div className="portfolio-scene-loader">
      <span />

      <p>
        Loading cinematic world
      </p>
    </div>
  );
}

/* ===================================
   PORTFOLIO SCENE
=================================== */

export default function PortfolioScene() {
  const sectionReference =
    useRef(null);

  const progressReference =
    useRef(0);

  const [
    activeProject,
    setActiveProject,
  ] = useState(0);

  const [
    sceneReady,
    setSceneReady,
  ] = useState(false);

  useEffect(() => {
    const section =
      sectionReference.current;

    if (!section) {
      return undefined;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      const sectionTop =
        section.offsetTop;

      const availableScroll =
        section.offsetHeight -
        window.innerHeight;

      const rawProgress =
        (window.scrollY -
          sectionTop) /
        Math.max(
          availableScroll,
          1,
        );

      const nextProgress =
        clamp(
          rawProgress,
          0,
          1,
        );

      progressReference.current =
        nextProgress;

      const nextProject =
        Math.round(
          nextProgress *
            Math.max(
              demo1Projects.length -
                1,
              0,
            ),
        );

      setActiveProject(
        (currentProject) =>
          currentProject ===
          nextProject
            ? currentProject
            : nextProject,
      );
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      animationFrame =
        window.requestAnimationFrame(
          updateProgress,
        );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );
    };
  }, []);

  const currentProject =
    demo1Projects[
      activeProject
    ];

  const projectCount =
    demo1Projects.length;

  const progressScale =
    projectCount > 0
      ? (activeProject + 1) /
        projectCount
      : 0;

  return (
    <section
      ref={sectionReference}
      id="demo1-projects"
      className="portfolio-scene"
      aria-labelledby="portfolio-scene-title"
    >
      <div className="portfolio-scene-sticky">
        <div
          className={`portfolio-scene-canvas ${
            sceneReady
              ? "scene-ready"
              : ""
          }`}
        >
          {!sceneReady && (
            <SceneLoader />
          )}

          <Canvas
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference:
                "high-performance",
            }}
            onCreated={() => {
              setSceneReady(true);
            }}
          >
            <Suspense
              fallback={null}
            >
              <PortfolioWorld
                progressReference={
                  progressReference
                }
              />
            </Suspense>
          </Canvas>
        </div>

        {currentProject && (
          <div className="portfolio-scene-interface">
            <div className="site-container portfolio-scene-interface-inner">
              <div className="portfolio-scene-copy">
                <p className="portfolio-scene-label">
                  
                </p>

                <h2
                  id="portfolio-scene-title"
                  key={currentProject.id}
                  className="portfolio-scene-title"
                >
                  {
                    currentProject.title
                  }
                </h2>

                <p
                  key={`${currentProject.id}-category`}
                  className="portfolio-scene-category"
                >
                  {
                    currentProject.category
                  }
                </p>
              </div>

              <div className="portfolio-scene-progress">
                <span className="portfolio-scene-current">
                  {
                    currentProject.number
                  }
                </span>

                <span className="portfolio-scene-progress-line">
                  <span
                    style={{
                      transform: `scaleX(${progressScale})`,
                    }}
                  />
                </span>

                <span>
                  {String(
                    projectCount,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        <p className="portfolio-scene-scroll">
          Scroll to travel
        </p>
      </div>
    </section>
  );
}