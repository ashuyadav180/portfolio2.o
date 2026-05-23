"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, MeshDistortMaterial, Float, Html, Torus } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Deterministic seedable PRNG — prevents hydration mismatches
function seededRng(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// ─── Neural Network Data Nodes ────────────────────────────────────────────────
function NeuralNodes() {
  const ref = useRef<THREE.Points>(null!);
  const rng = useMemo(() => seededRng(7), []);

  const { positions, colors } = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + rng() * 2.2;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Cycle between cyan / purple / white
      const c = rng();
      if (c < 0.5) { col[i*3]=0.21; col[i*3+1]=0.74; col[i*3+2]=0.98; }       // cyan
      else if (c < 0.85) { col[i*3]=0.54; col[i*3+1]=0.36; col[i*3+2]=0.97; } // purple
      else { col[i*3]=0.5; col[i*3+1]=0.8; col[i*3+2]=1.0; }                  // ice blue
    }
    return { positions: pos, colors: col };
  }, [rng]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
      ref.current.rotation.x = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled>
      <PointMaterial
        vertexColors
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ─── Animated Neural Connection Lines ─────────────────────────────────────────
function NeuralLines() {
  const groupRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const rng = seededRng(42);
    const nodeCount = 22;
    const nodes: THREE.Vector3[] = Array.from({ length: nodeCount }, () => {
      const r = 1.4 + rng() * 1.8;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    });

    const linePairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.0 && rng() > 0.45) {
          linePairs.push([nodes[i], nodes[j]]);
        }
      }
    }
    return linePairs;
  }, []);

  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    lines.forEach(([a, b]) => {
      points.push(a, b);
    });
    return points;
  }, [lines]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// ─── Holographic Torus Rings ──────────────────────────────────────────────────
function HoloRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) { ring1.current.rotation.x = t * 0.28; ring1.current.rotation.z = t * 0.14; }
    if (ring2.current) { ring2.current.rotation.y = t * 0.22; ring2.current.rotation.z = t * -0.1; }
    if (ring3.current) { ring3.current.rotation.x = t * -0.18; ring3.current.rotation.y = t * 0.32; }
  });

  return (
    <>
      {/* Inner ring — cyan */}
      <Torus ref={ring1} args={[1.05, 0.008, 3, 120]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </Torus>
      {/* Mid ring — purple */}
      <Torus ref={ring2} args={[1.42, 0.006, 3, 140]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </Torus>
      {/* Outer ring — ice white */}
      <Torus ref={ring3} args={[1.82, 0.005, 3, 160]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#c7d2fe" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </Torus>
    </>
  );
}

// ─── Flowing Energy Pulse Ring ────────────────────────────────────────────────
function EnergyPulseRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + 0.18 * Math.sin(state.clock.elapsedTime * 2.4);
      ref.current.scale.set(scale, scale, scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + 0.07 * Math.sin(state.clock.elapsedTime * 2.4 + Math.PI);
    }
  });
  return (
    <Torus ref={ref} args={[1.25, 0.04, 3, 80]}>
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
    </Torus>
  );
}

// ─── Central AI Core ──────────────────────────────────────────────────────────
function AICore() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const wireRef  = useRef<THREE.Mesh>(null!);
  const icosaRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) { outerRef.current.rotation.y = t * 0.1; outerRef.current.rotation.z = t * 0.05; }
    if (innerRef.current) { innerRef.current.rotation.y = -t * 0.15; innerRef.current.rotation.x = t * 0.08; }
    if (wireRef.current)  { wireRef.current.rotation.y = t * 0.07; wireRef.current.rotation.x = -t * 0.04; }
    if (icosaRef.current) { icosaRef.current.rotation.x = t * 0.2; icosaRef.current.rotation.y = t * 0.16; }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
      {/* Outer glass shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.78, 64, 64]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={0.5}
          roughness={0.04}
          metalness={0.02}
          transmission={0.96}
          thickness={1.2}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.01}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner distorted AI brain */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <MeshDistortMaterial
          color="#818cf8"
          emissive="#4c1d95"
          emissiveIntensity={2.2}
          distort={0.38}
          speed={4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[0.82, 18, 18]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Rotating icosahedron accent */}
      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>
  );
}

// ─── Floating HTML Data Badges ─────────────────────────────────────────────────
interface DataBadgeProps { label: string; radius: number; speed: number; angle0: number; yOff: number; }
function DataBadge({ label, radius, speed, angle0, yOff }: DataBadgeProps) {
  const gRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (gRef.current) {
      const t = state.clock.elapsedTime * speed + angle0;
      gRef.current.position.set(Math.cos(t) * radius, yOff + Math.sin(state.clock.elapsedTime * 1.2 + angle0) * 0.07, Math.sin(t) * radius);
      gRef.current.quaternion.copy(state.camera.quaternion);
    }
  });
  return (
    <group ref={gRef}>
      <Html distanceFactor={2.2} transform className="pointer-events-auto">
        <motion.div
          whileHover={{ scale: 1.12, borderColor: "rgba(56,189,248,0.9)", boxShadow: "0 0 20px rgba(56,189,248,0.4)" }}
          className="px-3 py-1.5 text-[0.52rem] font-bold tracking-[0.18em] font-mono-custom whitespace-nowrap rounded-full select-none cursor-pointer transition-all duration-300"
          style={{ background: "rgba(5,8,22,0.92)", border: "1px solid rgba(56,189,248,0.25)", color: "#38bdf8", backdropFilter: "blur(12px)" }}
        >
          ✦ {label}
        </motion.div>
      </Html>
    </group>
  );
}

// ─── Full Scene with Mouse-Reactive Camera ────────────────────────────────────
function AIScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.35 - state.pointer.y * 0.22, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.22, 0.04);
    }
    // Move key light with pointer for dynamic reflections
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 6, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 4 + 3, 0.05);
    }
  });

  const badges = [
    { label: "React",     radius: 1.32, speed:  0.22, angle0: 0,               yOff: -0.1  },
    { label: "Next.js",   radius: 1.58, speed: -0.16, angle0: Math.PI / 3,     yOff:  0.22 },
    { label: "Node.js",   radius: 1.82, speed:  0.14, angle0: 2*Math.PI/3,     yOff: -0.28 },
    { label: "AI / ML",   radius: 1.22, speed: -0.28, angle0: Math.PI,         yOff:  0.32 },
    { label: "MongoDB",   radius: 2.05, speed:  0.11, angle0: 4*Math.PI/3,     yOff: -0.14 },
    { label: "Three.js",  radius: 2.28, speed: -0.09, angle0: 5*Math.PI/3,     yOff:  0.06 },
  ];

  // Offset the 3D core slightly to the right on desktop, keep centered on mobile
  const xOffset = viewport.width > 5.5 ? viewport.width * 0.16 : 0;

  return (
    <group ref={groupRef} position={[xOffset, 0, 0]}>
      {/* Lighting rig */}
      <ambientLight intensity={0.25} />
      <pointLight ref={lightRef} position={[4, 4, 5]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[-5, -4, -3]} intensity={1.6} color="#8b5cf6" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#e0f2fe" />

      {/* Core elements */}
      <AICore />
      <HoloRings />
      <EnergyPulseRing />
      <NeuralNodes />
      <NeuralLines />

      {/* Floating data badges */}
      {badges.map(b => <DataBadge key={b.label} {...b} />)}
    </group>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="w-full h-full relative cursor-default select-none">
      <Canvas camera={{ position: [0, 0, 3.6], fov: 58 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <AIScene />
      </Canvas>
    </div>
  );
}
