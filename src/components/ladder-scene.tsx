import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRAND = "#1f4fd1";
const BRAND_DARK = "#142c6b";
const RUNGS = 8;
const RUNG_GAP = 0.62;
const LADDER_H = RUNGS * RUNG_GAP;

type Kid = { shirt: string; skin: string; hair: string; offset: number; speed: number };

const KIDS: Kid[] = [
  { shirt: "#f59e0b", skin: "#f1c27d", hair: "#2b1b12", offset: 0.0, speed: 0.055 },
  { shirt: "#10b981", skin: "#8d5524", hair: "#120a06", offset: 0.34, speed: 0.055 },
  { shirt: "#ec4899", skin: "#e0ac69", hair: "#4a2c17", offset: 0.67, speed: 0.055 },
];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Ladder() {
  const rails = [-0.6, 0.6];
  return (
    <group>
      {rails.map((x) => (
        <mesh key={x} position={[x, LADDER_H / 2, 0]} castShadow>
          <boxGeometry args={[0.12, LADDER_H + 0.5, 0.16]} />
          <meshStandardMaterial color={BRAND} roughness={0.45} metalness={0.15} />
        </mesh>
      ))}
      {Array.from({ length: RUNGS }, (_, i) => (
        <mesh key={i} position={[0, 0.35 + i * RUNG_GAP, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 1.2, 14]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Student({ kid, animate }: { kid: Kid; animate: boolean }) {
  const root = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);

  const pose = (t: number, clock: number) => {
    if (!root.current) return;
    const y = 0.15 + t * (LADDER_H - 0.7);
    root.current.position.y = y;
    const s = smooth(0, 0.08, t) * (1 - smooth(0.92, 1, t));
    root.current.scale.setScalar(Math.max(0.0001, s));
    const swing = Math.sin(clock * 5 + kid.offset * 9) * 0.9;
    if (armL.current) armL.current.rotation.x = -1.9 + swing * 0.5;
    if (armR.current) armR.current.rotation.x = -1.9 - swing * 0.5;
    if (legL.current) legL.current.rotation.x = -0.4 - swing * 0.45;
    if (legR.current) legR.current.rotation.x = -0.4 + swing * 0.45;
    root.current.rotation.z = Math.sin(clock * 2.5 + kid.offset * 7) * 0.03;
  };

  useFrame(({ clock }) => {
    const c = clock.getElapsedTime();
    pose(animate ? (c * kid.speed + kid.offset) % 1 : 0.2 + kid.offset * 0.6, animate ? c : 0);
  });

  return (
    <group ref={root} position={[0, 0, 0.2]}>
      {/* torso */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.34, 6, 14]} />
        <meshStandardMaterial color={kid.shirt} roughness={0.6} />
      </mesh>
      {/* backpack */}
      <mesh position={[0, 0.74, -0.24]} castShadow>
        <boxGeometry args={[0.34, 0.42, 0.16]} />
        <meshStandardMaterial color={BRAND_DARK} roughness={0.7} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshStandardMaterial color={kid.skin} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.24, -0.03]} castShadow>
        <sphereGeometry args={[0.2, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={kid.hair} roughness={0.9} />
      </mesh>
      {/* arms */}
      {[
        { ref: armL, x: -0.27 },
        { ref: armR, x: 0.27 },
      ].map(({ ref, x }) => (
        <group key={x} ref={ref} position={[x, 0.9, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.3, 4, 10]} />
            <meshStandardMaterial color={kid.skin} roughness={0.7} />
          </mesh>
        </group>
      ))}
      {/* legs */}
      {[
        { ref: legL, x: -0.1 },
        { ref: legR, x: 0.1 },
      ].map(({ ref, x }) => (
        <group key={x} ref={ref} position={[x, 0.42, 0]}>
          <mesh position={[0, -0.24, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.34, 4, 10]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Star({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const c = animate ? clock.getElapsedTime() : 0;
    ref.current.rotation.y = c * 1.2;
    ref.current.position.y = LADDER_H + 0.75 + Math.sin(c * 2) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, LADDER_H + 0.75, 0]}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.7} roughness={0.25} metalness={0.4} />
    </mesh>
  );
}

function Books() {
  const stack = [
    { c: "#3965e3", w: 1.1, y: 0.09 },
    { c: "#f59e0b", w: 0.95, y: 0.27 },
    { c: "#10b981", w: 1.0, y: 0.45 },
  ];
  return (
    <group position={[1.7, 0, 0.5]} rotation={[0, -0.5, 0]}>
      {stack.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} rotation={[0, i * 0.18, 0]} castShadow>
          <boxGeometry args={[b.w, 0.16, 0.72]} />
          <meshStandardMaterial color={b.c} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const idle = animate ? Math.sin(clock.getElapsedTime() * 0.4) * 0.12 : 0;
    const ty = -0.55 + pointer.x * 0.35 + idle;
    const tx = pointer.y * -0.08;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
  });

  return (
    <>
      <hemisphereLight args={["#ffffff", "#dbe6ff", 1.4]} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-far={40}
      />
      <group ref={group} position={[0, -2.8, 0]}>
        {/* lean the ladder back a touch */}
        <group rotation={[-0.08, 0, 0]}>
          <Ladder />
          {KIDS.map((k) => (
            <Student key={k.shirt} kid={k} animate={animate} />
          ))}
          <Star animate={animate} />
        </group>
        <Books />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[2.9, 64]} />
          <meshBasicMaterial color="#dbe6ff" toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <circleGeometry args={[2.9, 64]} />
          <shadowMaterial opacity={0.18} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
          <ringGeometry args={[2.9, 2.97, 64]} />
          <meshBasicMaterial color={BRAND} transparent opacity={0.35} />
        </mesh>
      </group>
    </>
  );
}

export default function LadderScene({ animate }: { animate: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 10.5], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      aria-hidden
    >
      <Scene animate={animate} />
    </Canvas>
  );
}
