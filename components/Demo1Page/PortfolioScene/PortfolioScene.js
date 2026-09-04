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

const PROJECT_SPACING = 7.2;
const CARD_WIDTH = 3.15;
const CARD_HEIGHT = 4.55;
const ACTIVE_X = 1.45;

const PROJECT_COUNT = Math.max(
  demo1Projects.length - 1,
  1,
);

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

function projectPosition(index) {
  const xPattern = [
    -2.4,
    2.65,
    -2.1,
    2.45,
  ];

  const yPattern = [
    0.35,
    -0.25,
    0.15,
    -0.4,
  ];

  return [
    xPattern[index % 4],
    yPattern[index % 4],
    -index * PROJECT_SPACING,
  ];
}

/* ===================================
   GLASS PROJECT PANEL
=================================== */

function GlassProjectPanel({
  project,
  index,
  progressRef,
}) {
  const panelRef = useRef(null);

  const basePosition = useMemo(
    () => projectPosition(index),
    [index],
  );

  useFrame((state, delta) => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const projectProgress =
      (progressRef?.current ?? 0) *
      PROJECT_COUNT;

    const signedDistance =
      index - projectProgress;

    const distance =
      Math.abs(signedDistance);

    const active =
      1 - clamp(distance, 0, 1);

    const nearby =
      1 -
      clamp(
        distance / 2.5,
        0,
        1,
      );

    const targetX =
      THREE.MathUtils.lerp(
        basePosition[0],
        ACTIVE_X,
        active,
      );

    const targetY =
      basePosition[1] +
      Math.sin(
        state.clock.elapsedTime *
          0.35 +
          index,
      ) *
        0.055;

    const targetScale =
      THREE.MathUtils.lerp(
        0.72,
        0.93,
        active,
      );

    const baseRotation =
      basePosition[0] < 0
        ? 0.32
        : -0.32;

    const targetRotationY =
      THREE.MathUtils.lerp(
        baseRotation,
        -0.035,
        active,
      );

    panel.position.x =
      THREE.MathUtils.damp(
        panel.position.x,
        targetX,
        4.5,
        delta,
      );

    panel.position.y =
      THREE.MathUtils.damp(
        panel.position.y,
        targetY,
        4.5,
        delta,
      );

    panel.rotation.y =
      THREE.MathUtils.damp(
        panel.rotation.y,
        targetRotationY,
        4.5,
        delta,
      );

    panel.rotation.z =
      THREE.MathUtils.damp(
        panel.rotation.z,
        signedDistance * -0.008,
        4,
        delta,
      );

    const nextScale =
      THREE.MathUtils.damp(
        panel.scale.x,
        targetScale,
        4.5,
        delta,
      );

    panel.scale.setScalar(nextScale);

    panel.visible =
      distance < 3.2;

    panel.traverse((child) => {
      if (
        child.userData
          .posterMaterial &&
        child.material
      ) {
        child.material.opacity =
          THREE.MathUtils.lerp(
            0.22,
            1,
            Math.max(
              active,
              nearby * 0.45,
            ),
          );
      }
    });
  });

  return (
    <group
      ref={panelRef}
      position={basePosition}
    >
      {/* BACK GLOW */}

      <mesh
        position={[0, 0, -0.24]}
        scale={[1.13, 1.1, 1]}
      >
        <planeGeometry
          args={[
            CARD_WIDTH,
            CARD_HEIGHT,
          ]}
        />

        <meshBasicMaterial
          color="#f50087"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* GLASS CONTAINER */}

      <RoundedBox
        args={[
          CARD_WIDTH + 0.24,
          CARD_HEIGHT + 0.24,
          0.18,
        ]}
        radius={0.17}
        smoothness={8}
        position={[0, 0, -0.08]}
      >
        <meshPhysicalMaterial
          color="#130d2b"
          roughness={0.08}
          metalness={0.08}
          transmission={0.78}
          thickness={0.7}
          transparent
          opacity={0.52}
          clearcoat={1}
          clearcoatRoughness={0.06}
          side={THREE.DoubleSide}
        />

        <Edges
          threshold={8}
          color="#ff3bad"
          scale={1.004}
        />
      </RoundedBox>

      {/* POSTER */}

      <ThreeImage
        url={project.image}
        position={[0, 0, 0.055]}
        scale={[
          CARD_WIDTH,
          CARD_HEIGHT,
        ]}
        transparent
        toneMapped={false}
        userData={{
          posterMaterial: true,
        }}
      />

      {/* FRONT GLASS */}

      <RoundedBox
        args={[
          CARD_WIDTH + 0.08,
          CARD_HEIGHT + 0.08,
          0.025,
        ]}
        radius={0.13}
        smoothness={6}
        position={[0, 0, 0.105]}
      >
        <meshPhysicalMaterial
          color="#bfeaff"
          roughness={0}
          transmission={0.97}
          thickness={0.18}
          transparent
          opacity={0.085}
          clearcoat={1}
          depthWrite={false}
        />
      </RoundedBox>

      {/* SIDE REFLECTION */}

      <mesh
        position={[
          -1.38,
          0.05,
          0.14,
        ]}
        rotation={[
          0,
          0,
          -0.025,
        ]}
      >
        <planeGeometry
          args={[0.025, 3.8]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </group>
  );
}

/* ===================================
   CUSTOM WATER RIBBON GEOMETRY
=================================== */

function createWaterRibbonGeometry() {
  const segments = 520;

  const depth =
    PROJECT_COUNT *
      PROJECT_SPACING +
    18;

  const positions = [];
  const normals = [];
  const textureCoordinates = [];
  const indices = [];

  const previousCenter =
    new THREE.Vector3();

  const nextCenter =
    new THREE.Vector3();

  const tangent =
    new THREE.Vector3();

  const side =
    new THREE.Vector3();

  const normal =
    new THREE.Vector3();

  const worldUp =
    new THREE.Vector3(
      0,
      1,
      0,
    );

  const rotation =
    new THREE.Quaternion();

  const centerAt = (
    progress,
  ) => {
    const turns = 7.2;

    const angle =
      progress *
      Math.PI *
      2 *
      turns;

    const horizontalRadius =
      2.65 +
      Math.sin(
        progress *
          Math.PI *
          8,
      ) *
        0.34;

    const verticalRadius =
      2.05 +
      Math.cos(
        progress *
          Math.PI *
          5,
      ) *
        0.22;

    return new THREE.Vector3(
      ACTIVE_X +
        Math.cos(angle) *
          horizontalRadius,

      Math.sin(angle) *
        verticalRadius,

      6 -
        progress * depth +
        Math.sin(
          angle * 1.35,
        ) *
          0.72,
    );
  };

  for (
    let index = 0;
    index <= segments;
    index += 1
  ) {
    const progress =
      index / segments;

    const beforeProgress =
      Math.max(
        progress -
          1 / segments,
        0,
      );

    const afterProgress =
      Math.min(
        progress +
          1 / segments,
        1,
      );

    previousCenter.copy(
      centerAt(
        beforeProgress,
      ),
    );

    nextCenter.copy(
      centerAt(
        afterProgress,
      ),
    );

    tangent
      .subVectors(
        nextCenter,
        previousCenter,
      )
      .normalize();

    side
      .crossVectors(
        tangent,
        worldUp,
      )
      .normalize();

    if (
      side.lengthSq() <
      0.0001
    ) {
      side.set(1, 0, 0);
    }

    normal
      .crossVectors(
        side,
        tangent,
      )
      .normalize();

    const twist =
      progress *
        Math.PI *
        2 *
        10.5 +
      Math.sin(
        progress *
          Math.PI *
          6,
      ) *
        0.85;

    rotation.setFromAxisAngle(
      tangent,
      twist,
    );

    side.applyQuaternion(
      rotation,
    );

    normal.applyQuaternion(
      rotation,
    );

    const width =
      0.72 +
      Math.sin(
        progress *
          Math.PI *
          7 +
          0.5,
      ) *
        0.2 +
      Math.sin(
        progress *
          Math.PI *
          19,
      ) *
        0.08;

    const center =
      centerAt(progress);

    const left =
      center
        .clone()
        .addScaledVector(
          side,
          -width,
        );

    const right =
      center
        .clone()
        .addScaledVector(
          side,
          width,
        );

    positions.push(
      left.x,
      left.y,
      left.z,

      right.x,
      right.y,
      right.z,
    );

    normals.push(
      normal.x,
      normal.y,
      normal.z,

      normal.x,
      normal.y,
      normal.z,
    );

    textureCoordinates.push(
      0,
      progress,

      1,
      progress,
    );

    if (index < segments) {
      const vertex =
        index * 2;

      indices.push(
        vertex,
        vertex + 2,
        vertex + 1,

        vertex + 2,
        vertex + 3,
        vertex + 1,
      );
    }
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      positions,
      3,
    ),
  );

  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(
      normals,
      3,
    ),
  );

  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(
      textureCoordinates,
      2,
    ),
  );

  geometry.setIndex(indices);

  geometry.computeBoundingSphere();

  return geometry;
}

/* ===================================
   WATER RIBBON SHADERS
=================================== */

const ribbonVertexShader = `
  uniform float uTime;
  uniform float uVelocity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vWave;

  void main() {
    vUv = uv;

    vec3 transformed =
      position;

    float longWave =
      sin(
        uv.y * 48.0 -
        uTime * 2.4
      );

    float detailWave =
      sin(
        uv.y * 125.0 +
        uv.x * 8.0 +
        uTime * 3.2
      );

    float edgeWave =
      sin(
        uv.y * 72.0 -
        uTime * 1.6
      ) *
      (abs(uv.x - 0.5) * 2.0);

    float movementBoost =
      min(
        abs(uVelocity) *
        0.05,
        0.16
      );

    float displacement =
      longWave * 0.055 +
      detailWave * 0.018 +
      edgeWave * 0.025;

    displacement +=
      movementBoost *
      sin(
        uv.y * 90.0 -
        uTime * 4.0
      );

    transformed +=
      normal *
      displacement;

    vec4 viewPosition =
      modelViewMatrix *
      vec4(
        transformed,
        1.0
      );

    vNormal =
      normalize(
        normalMatrix *
        normal
      );

    vViewPosition =
      -viewPosition.xyz;

    vWave =
      longWave * 0.5 +
      detailWave * 0.25;

    gl_Position =
      projectionMatrix *
      viewPosition;
  }
`;

const ribbonFragmentShader = `
  uniform float uTime;
  uniform float uVelocity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vWave;

  void main() {
    vec3 viewDirection =
      normalize(
        vViewPosition
      );

    vec3 surfaceNormal =
      normalize(
        vNormal
      );

    float fresnel =
      pow(
        1.0 -
        abs(
          dot(
            viewDirection,
            surfaceNormal
          )
        ),
        2.15
      );

    float leftEdge =
      smoothstep(
        0.2,
        0.0,
        vUv.x
      );

    float rightEdge =
      smoothstep(
        0.8,
        1.0,
        vUv.x
      );

    float edgeGlow =
      leftEdge +
      rightEdge;

    float flowingLineOne =
      sin(
        vUv.y * 94.0 -
        uTime * 3.1 +
        vUv.x * 11.0
      ) *
      0.5 +
      0.5;

    float flowingLineTwo =
      sin(
        vUv.y * 37.0 +
        uTime * 1.7 -
        vUv.x * 7.0
      ) *
      0.5 +
      0.5;

    float thinStreak =
      smoothstep(
        0.86,
        1.0,
        flowingLineOne
      );

    float broadStreak =
      smoothstep(
        0.58,
        1.0,
        flowingLineTwo
      );

    vec3 deepViolet =
      vec3(
        0.18,
        0.03,
        0.42
      );

    vec3 electricPink =
      vec3(
        1.0,
        0.015,
        0.58
      );

    vec3 glassCyan =
      vec3(
        0.08,
        0.72,
        1.0
      );

    float colourFlow =
      sin(
        vUv.y * 25.0 -
        uTime * 0.8
      ) *
      0.5 +
      0.5;

    vec3 colour =
      mix(
        deepViolet,
        electricPink,
        colourFlow
      );

    colour =
      mix(
        colour,
        glassCyan,
        broadStreak * 0.48
      );

    colour +=
      glassCyan *
      thinStreak *
      0.65;

    colour +=
      electricPink *
      edgeGlow *
      0.52;

    colour +=
      vec3(1.0) *
      fresnel *
      0.26;

    float velocityGlow =
      min(
        abs(uVelocity) *
        0.035,
        0.22
      );

    float alpha =
      0.08 +
      fresnel * 0.46 +
      edgeGlow * 0.18 +
      thinStreak * 0.2 +
      velocityGlow;

    alpha *=
      0.88 +
      vWave * 0.1;

    gl_FragColor =
      vec4(
        colour,
        clamp(
          alpha,
          0.05,
          0.78
        )
      );
  }
`;
/* ===================================
   RIBBON PARTICLE POSITIONS
=================================== */

function createRibbonParticlePositions({
  count,
  spread,
}) {
  const positions =
    new Float32Array(
      count * 3,
    );

  const depth =
    PROJECT_COUNT *
      PROJECT_SPACING +
    18;

  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const progress =
      Math.random();

    const angle =
      progress *
        Math.PI *
        2 *
        7.2 +
      (Math.random() - 0.5) *
        0.7;

    const radius =
      2.65 +
      Math.sin(
        progress *
          Math.PI *
          8,
      ) *
        0.34;

    const randomRadius =
      (Math.random() - 0.5) *
      spread;

    const finalRadius =
      radius + randomRadius;

    const arrayIndex =
      index * 3;

    positions[arrayIndex] =
      ACTIVE_X +
      Math.cos(angle) *
        finalRadius;

    positions[
      arrayIndex + 1
    ] =
      Math.sin(angle) *
        2.05 +
      (Math.random() - 0.5) *
        spread;

    positions[
      arrayIndex + 2
    ] =
      6 -
      progress * depth +
      Math.sin(
        angle * 1.35,
      ) *
        0.72 +
      (Math.random() - 0.5) *
        1.2;
  }

  return positions;
}

/* ===================================
   RIBBON PARTICLE ATMOSPHERE
=================================== */

function RibbonAtmosphere({
  progressRef,
}) {
  const fineParticlesRef =
    useRef(null);

  const mistParticlesRef =
    useRef(null);

  const motionRef =
    useRef(0);

  const finePositions =
    useMemo(
      () =>
        createRibbonParticlePositions({
          count: 1100,
          spread: 1.15,
        }),
      [],
    );

  const mistPositions =
    useMemo(
      () =>
        createRibbonParticlePositions({
          count: 260,
          spread: 2.4,
        }),
      [],
    );

  useFrame((_, delta) => {
    const fineParticles =
      fineParticlesRef.current;

    const mistParticles =
      mistParticlesRef.current;

    const progress =
      progressRef?.current ?? 0;

    motionRef.current +=
      delta * 0.12;

    if (fineParticles) {
      fineParticles.rotation.z =
        Math.sin(
          motionRef.current,
        ) * 0.06;

      fineParticles.position.z =
        progress * -0.7;
    }

    if (mistParticles) {
      mistParticles.rotation.z =
        -motionRef.current *
        0.08;

      mistParticles.rotation.y =
        Math.sin(
          motionRef.current *
            0.55,
        ) * 0.04;

      mistParticles.position.z =
        progress * -0.45;
    }
  });

  return (
    <group>
      {/* FINE SPARK PARTICLES */}

      <points
        ref={fineParticlesRef}
        renderOrder={1}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              finePositions,
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#ff49bc"
          size={0.042}
          sizeAttenuation
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      {/* SOFT CYAN MIST PARTICLES */}

      <points
        ref={mistParticlesRef}
        renderOrder={0}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              mistPositions,
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#52c9ff"
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>
    </group>
  );
}

/* ===================================
   WIDE WATER GLASS RIBBON
=================================== */

function WaterGlassRibbon({
  progressRef,
}) {
  const ribbonRef =
    useRef(null);

  const glowRef =
    useRef(null);

  const materialRef =
    useRef(null);

  const previousProgressRef =
    useRef(0);

  const velocityRef =
    useRef(0);

  const timeRef =
    useRef(0);

  const geometry = useMemo(
    () =>
      createWaterRibbonGeometry(),
    [],
  );

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },

      uVelocity: {
        value: 0,
      },
    }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((_, delta) => {
    const ribbon =
      ribbonRef.current;

    const glow =
      glowRef.current;

    const material =
      materialRef.current;

    if (
      !ribbon ||
      !material
    ) {
      return;
    }

    const progress =
      progressRef?.current ?? 0;

    const progressDifference =
      progress -
      previousProgressRef.current;

    previousProgressRef.current =
      progress;

    const rawVelocity =
      delta > 0
        ? progressDifference /
          delta
        : 0;

    velocityRef.current =
      THREE.MathUtils.damp(
        velocityRef.current,
        rawVelocity,
        6,
        delta,
      );

    const scrollVelocity =
      velocityRef.current;

    const isScrolling =
      Math.abs(scrollVelocity) >
      0.0005;

    const direction =
      isScrolling
        ? Math.sign(
            scrollVelocity,
          )
        : 1;

    const animationSpeed =
      0.22 +
      Math.min(
        Math.abs(
          scrollVelocity,
        ) * 0.8,
        3,
      );

    timeRef.current +=
      delta *
      animationSpeed *
      direction;

    material.uniforms.uTime.value =
      timeRef.current;

    material.uniforms
      .uVelocity.value =
      scrollVelocity;

    ribbon.rotation.z =
      Math.sin(
        timeRef.current *
          0.16,
      ) * 0.055;

    ribbon.rotation.y =
      Math.sin(
        timeRef.current *
          0.11,
      ) * 0.028;

    ribbon.position.z =
      progress * -0.8;

    if (glow) {
      glow.rotation.copy(
        ribbon.rotation,
      );

      glow.position.copy(
        ribbon.position,
      );
    }
  });

  return (
    <group>
      {/* SOFT OUTER RIBBON GLOW */}

      <mesh
        ref={glowRef}
        geometry={geometry}
        scale={[
          1.035,
          1.035,
          1.035,
        ]}
        renderOrder={1}
      >
        <meshBasicMaterial
          color="#f50087"
          transparent
          opacity={0.07}
          side={
            THREE.DoubleSide
          }
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* MAIN TRANSPARENT RIBBON */}

      <mesh
        ref={ribbonRef}
        geometry={geometry}
        renderOrder={3}
      >
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={
            ribbonVertexShader
          }
          fragmentShader={
            ribbonFragmentShader
          }
          transparent
          side={
            THREE.DoubleSide
          }
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* SURROUNDING EFFECT */}

      <RibbonAtmosphere
        progressRef={
          progressRef
        }
      />
    </group>
  );
}

/* ===================================
   CAMERA MOVEMENT
=================================== */

function CameraRig({
  progressRef,
}) {
  const cameraRef =
    useRef(null);

  useFrame((_, delta) => {
    const camera =
      cameraRef.current;

    if (!camera) {
      return;
    }

    const projectProgress =
      (progressRef?.current ??
        0) * PROJECT_COUNT;

    const targetZ =
      8.7 -
      projectProgress *
        PROJECT_SPACING;

    const targetX =
      Math.sin(
        projectProgress *
          0.55,
      ) * 0.18;

    const targetY =
      Math.cos(
        projectProgress *
          0.4,
      ) * 0.1;

    const nextX =
      THREE.MathUtils.damp(
        camera.position.x,
        targetX,
        4,
        delta,
      );

    const nextY =
      THREE.MathUtils.damp(
        camera.position.y,
        targetY,
        4,
        delta,
      );

    const nextZ =
      THREE.MathUtils.damp(
        camera.position.z,
        targetZ,
        4,
        delta,
      );

    camera.position.set(
      nextX,
      nextY,
      nextZ,
    );

    camera.lookAt(
      ACTIVE_X,
      0,
      targetZ - 8.7,
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[
        0,
        0,
        8.7,
      ]}
      fov={50}
      near={0.1}
      far={170}
    />
  );
}

/* ===================================
   PORTFOLIO 3D WORLD
=================================== */

function PortfolioWorld({
  progressRef,
}) {
  return (
    <>
      <color
        attach="background"
        args={["#050515"]}
      />

      <fog
        attach="fog"
        args={[
          "#050515",
          14,
          33,
        ]}
      />

      <ambientLight
        intensity={0.7}
      />

      <directionalLight
        position={[4, 7, 6]}
        color="#ffffff"
        intensity={1.7}
      />

      <pointLight
        position={[-4, 2, 2]}
        color="#9b3dff"
        intensity={5}
        distance={24}
      />

      <pointLight
        position={[4, -2, 1]}
        color="#f50087"
        intensity={5}
        distance={24}
      />

      <pointLight
        position={[
          1,
          3,
          -18,
        ]}
        color="#24c7ff"
        intensity={4}
        distance={30}
      />

      <CameraRig
        progressRef={
          progressRef
        }
      />

      <WaterGlassRibbon
        progressRef={
          progressRef
        }
      />

      {demo1Projects.map(
        (project, index) => (
          <GlassProjectPanel
            key={project.id}
            project={project}
            index={index}
            progressRef={
              progressRef
            }
          />
        ),
      )}

      <Sparkles
        count={430}
        scale={[
          15,
          10,
          118,
        ]}
        position={[
          0,
          0,
          -50,
        ]}
        size={1.15}
        speed={0.16}
        opacity={0.68}
        color="#f56bca"
      />
    </>
  );
}

/* ===================================
   SCENE LOADER
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
  const sectionRef =
    useRef(null);

  const progressRef =
    useRef(0);

  const [
    activeProject,
    setActiveProject,
  ] = useState(0);

  const [
    sceneReady,
    setSceneReady,
  ] = useState(false);

  /* ===================================
     SCROLL PROGRESS
  =================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return undefined;
    }

    let animationFrame = 0;

    const updateProgress =
      () => {
        const availableScroll =
          section.offsetHeight -
          window.innerHeight;

        const rawProgress =
          (window.scrollY -
            section.offsetTop) /
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

        progressRef.current =
          nextProgress;

        const nextProject =
          Math.round(
            nextProgress *
              PROJECT_COUNT,
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
      ref={sectionRef}
      id="demo1-projects"
      className="portfolio-scene"
      aria-labelledby="portfolio-scene-title"
    >
      <div className="portfolio-scene-sticky">
        {/* THREE.JS CANVAS */}

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
                progressRef={
                  progressRef
                }
              />
            </Suspense>
          </Canvas>
        </div>

        {/* PROJECT INFORMATION */}

        {currentProject && (
          <div className="portfolio-scene-interface">
            <div className="site-container portfolio-scene-interface-inner">
              <div className="portfolio-scene-copy">
                <p className="portfolio-scene-label">
                  Demo 1
                </p>

                <h2
                  id="portfolio-scene-title"
                  key={
                    currentProject.id
                  }
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
          </div>
        )}

        {/* SCROLL INDICATOR */}

        <p className="portfolio-scene-scroll">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}