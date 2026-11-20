import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRAND = "#1f4fd1";
const RAIL = "#3965e3";
const BRAND_DARK = "#142c6b";
const RUNGS = 7;
const RUNG_GAP = 0.62;
const LADDER_H = RUNGS * RUNG_GAP;
const STEPS = 5;

type Kid = { shirt: string; skin: string; hair: string; offset: number; speed: number };

const KIDS: Kid[] = [
  { shirt: "#f59e0b", skin: "#f1c27d", hair: "#2b1b12", offset: 0.0, speed: 0.045 },
  { shirt: "#10b981", skin: "#8d5524", hair: "#120a06", offset: 0.5, speed: 0.045 },
];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Ladder() {
  const rails = [-0.55, 0.55];
  return (
    <group>
      {rails.map((x) => (
        <group key={x}>
          <mesh position={[x, LADDER_H / 2 + 0.1, 0]} castShadow>
            <boxGeometry args={[0.09, LADDER_H + 0.5, 0.12]} />
            <meshStandardMaterial color={RAIL} roughness={0.4} metalness={0.1} />
          </mesh>
          <mesh position={[x, 0.03, 0]} castShadow>
            <boxGeometry args={[0.15, 0.06, 0.2]} />
            <meshStandardMaterial color={BRAND_DARK} roughness={0.8} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: RUNGS }, (_, i) => (
        <mesh key={i} position={[0, 0.35 + i * RUNG_GAP, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.1, 14]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Student faces the ladder (back to camera) and climbs one rung at a time. */
function Student({ kid, animate }: { kid: Kid; animate: boolean }) {
  const root = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!root.current) return;
    const c = animate ? clock.getElapsedTime() : 0;
    const t = animate ? (c * kid.speed + kid.offset) % 1 : 0.3 + kid.offset * 0.4;
    const u = t * STEPS;
    const k = Math.floor(u);
    const ease = smooth(0.15, 0.85, u - k);
    const even = k % 2 === 0;

    root.current.position.y = 0.05 + (k + ease) * RUNG_GAP;
    const s = smooth(0, 0.05, t) * (1 - smooth(0.95, 1, t));
    root.current.scale.setScalar(Math.max(0.0001, s));

    const hi = -2.45;
    const lo = -1.75;
    const a = even ? ease : 1 - ease;
    if (armL.current) armL.current.rotation.x = lo + (hi - lo) * a;
    if (armR.current) armR.current.rotation.x = lo + (hi - lo) * (1 - a);
    if (legL.current) legL.current.rotation.x = -0.15 - 0.85 * (1 - a);
    if (legR.current) legR.current.rotation.x = -0.15 - 0.85 * a;
  });

  return (
    <group ref={root} position={[0, 0, 0.3]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.34, 6, 14]} />
        <meshStandardMaterial color={kid.shirt} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.74, -0.25]} castShadow>
        <boxGeometry args={[0.34, 0.44, 0.16]} />
        <meshStandardMaterial color={BRAND_DARK} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshStandardMaterial color={kid.skin} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.22, -0.03]} castShadow>
        <sphereGeometry args={[0.205, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial color={kid.hair} roughness={0.9} />
      </mesh>
      {[
        { ref: armL, x: -0.27 },
        { ref: armR, x: 0.27 },
      ].map(({ ref, x }) => (
        <group key={x} ref={ref} position={[x, 0.9, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.3, 4, 10]} />
            <meshStandardMaterial color={kid.shirt} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.43, 0]} castShadow>
            <sphereGeometry args={[0.075, 14, 14]} />
            <meshStandardMaterial color={kid.skin} roughness={0.7} />
          </mesh>
        </group>
      ))}
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
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outer = 0.4;
    const inner = 0.18;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / (spikes * 2)) * Math.PI * 2 + Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 });
    g.center();
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const c = animate ? clock.getElapsedTime() : 0;
    ref.current.rotation.y = Math.sin(c * 1.1) * 0.7;
    ref.current.position.y = LADDER_H + 0.85 + Math.sin(c * 2) * 0.07;
  });

  return (
    <mesh ref={ref} geometry={geo} position={[0, LADDER_H + 0.85, 0]} castShadow>
      <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.45} roughness={0.3} metalness={0.3} />
    </mesh>
  );
}

const CUBES = [
  { c: "#3965e3", x: -1.45, y: 1.2, z: 0.3, s: 0.26, p: 0 },
  { c: "#10b981", x: 1.5, y: 1.6, z: 0.2, s: 0.22, p: 2 },
  { c: "#ec4899", x: -1.3, y: 3.9, z: 0.1, s: 0.22, p: 4 },
];

function FloatingCubes({ animate }: { animate: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const c = animate ? clock.getElapsedTime() : 0;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const d = CUBES[i];
      m.position.y = d.y + Math.sin(c * 1.2 + d.p) * 0.12;
      m.rotation.x = c * 0.5 + d.p;
      m.rotation.y = c * 0.7 + d.p;
    });
  });
  return (
    <>
      {CUBES.map((d, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }} position={[d.x, d.y, d.z]} castShadow>
          <boxGeometry args={[d.s, d.s, d.s]} />
          <meshStandardMaterial color={d.c} roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
    </>
  );
}

function Books() {
  const stack = [
    { c: "#3965e3", w: 0.9, y: 0.07 },
    { c: "#f59e0b", w: 0.78, y: 0.21 },
    { c: "#10b981", w: 0.82, y: 0.35 },
  ];
  return (
    <group position={[1.15, 0, 0.8]} rotation={[0, -0.5, 0]}>
      {stack.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} rotation={[0, i * 0.18, 0]} castShadow>
          <boxGeometry args={[b.w, 0.13, 0.58]} />
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
    const idle = animate ? Math.sin(clock.getElapsedTime() * 0.4) * 0.1 : 0;
    const ty = -0.3 + pointer.x * 0.3 + idle;
    const tx = pointer.y * -0.06;
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
      <group ref={group} position={[0, -2.3, 0]}>
        <group rotation={[-0.06, 0, 0]}>
          <Ladder />
          {KIDS.map((k) => (
            <Student key={k.shirt} kid={k} animate={animate} />
          ))}
          <Star animate={animate} />
        </group>
        <Books />
        <FloatingCubes animate={animate} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[2.1, 64]} />
          <meshBasicMaterial color="#dbe6ff" toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <circleGeometry args={[2.1, 64]} />
          <shadowMaterial opacity={0.18} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
          <ringGeometry args={[2.1, 2.16, 64]} />
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
