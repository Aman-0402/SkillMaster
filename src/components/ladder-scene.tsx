import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRAND = "#1f4fd1";
const RAIL = "#3965e3";
const BRAND_DARK = "#142c6b";
const RUNGS = 7;
const RUNG_GAP = 0.62;
const LADDER_H = RUNGS * RUNG_GAP;
const STEPS = 6;
const TAU = Math.PI * 2;

type Kid = { offset: number; speed: number };
type Win = { amount: number; stamp: number; burst: number };
type WinRef = MutableRefObject<Win>;

const KIDS: Kid[] = [
  { offset: 0.0, speed: 0.04 },
  { offset: 0.5, speed: 0.04 },
];

const SHIRTS = ["#f59e0b", "#10b981", "#ec4899", "#8b5cf6", "#ef4444", "#06b6d4", "#f97316", "#84cc16"];
const SKINS = ["#f1c27d", "#8d5524", "#c68642", "#e0ac69", "#ffdbac"];
const HAIRS = ["#2b1b12", "#120a06", "#5a3825", "#d9a441", "#7a2e1b"];
const CONFETTI = ["#fbbf24", "#ef4444", "#10b981", "#3b82f6", "#ec4899", "#a855f7", "#ffffff"];

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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

/** Student faces the ladder, climbs rung by rung, then celebrates at the top. Colours re-roll every lap. */
function Student({ kid, animate, win }: { kid: Kid; animate: boolean; win: WinRef }) {
  const root = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const cycle = useRef(NaN);
  const wasWin = useRef(false);

  const mats = useMemo(() => {
    const m = {
      shirt: new THREE.MeshStandardMaterial({ roughness: 0.6 }),
      skin: new THREE.MeshStandardMaterial({ roughness: 0.7 }),
      hair: new THREE.MeshStandardMaterial({ roughness: 0.9 }),
    };
    m.shirt.color.set(pick(SHIRTS));
    m.skin.color.set(pick(SKINS));
    m.hair.color.set(pick(HAIRS));
    return m;
  }, []);

  useFrame(({ clock }) => {
    if (!root.current) return;
    const c = animate ? clock.getElapsedTime() : 0;
    const raw = animate ? c * kid.speed + kid.offset : 0.3 + kid.offset * 0.4;
    const cyc = Math.floor(raw);
    if (cyc !== cycle.current) {
      if (!Number.isNaN(cycle.current)) {
        mats.shirt.color.set(pick(SHIRTS));
        mats.skin.color.set(pick(SKINS));
        mats.hair.color.set(pick(HAIRS));
      }
      cycle.current = cyc;
    }
    const t = raw - cyc;

    const climbT = Math.min(1, t / 0.78);
    const u = climbT * STEPS;
    const k = Math.floor(u);
    const ease = smooth(0.15, 0.85, u - k);
    const even = k % 2 === 0;
    const w = animate ? smooth(0.78, 0.8, t) * (1 - smooth(0.92, 0.95, t)) : 0;

    if (w > 0.3 && !wasWin.current) {
      wasWin.current = true;
      win.current.burst = c;
    }
    if (w < 0.05) wasWin.current = false;
    if (w > 0) {
      win.current.amount = w;
      win.current.stamp = c;
    }

    const hop = Math.abs(Math.sin(c * 7)) * 0.14 * w;
    root.current.position.y = 0.05 + (k + ease) * RUNG_GAP + hop;
    root.current.rotation.y = Math.PI * (1 - w) + Math.sin(c * 8) * 0.15 * w;
    const s = smooth(0, 0.05, t) * (1 - smooth(0.95, 1, t));
    root.current.scale.setScalar(Math.max(0.0001, s));

    const hi = -2.45;
    const lo = -1.75;
    const a = even ? ease : 1 - ease;
    const cheer = -2.85;
    if (armL.current) {
      armL.current.rotation.x = lerp(lo + (hi - lo) * a, cheer + Math.sin(c * 12) * 0.25, w);
      armL.current.rotation.z = 0.4 * w;
    }
    if (armR.current) {
      armR.current.rotation.x = lerp(lo + (hi - lo) * (1 - a), cheer + Math.sin(c * 12 + 1.5) * 0.25, w);
      armR.current.rotation.z = -0.4 * w;
    }
    if (legL.current) legL.current.rotation.x = lerp(-0.15 - 0.85 * (1 - a), -0.15 + Math.sin(c * 14) * 0.25, w);
    if (legR.current) legR.current.rotation.x = lerp(-0.15 - 0.85 * a, -0.15 - Math.sin(c * 14) * 0.25, w);
  });

  return (
    <group ref={root} position={[0, 0, 0.3]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.72, 0]} castShadow material={mats.shirt}>
        <capsuleGeometry args={[0.2, 0.34, 6, 14]} />
      </mesh>
      <mesh position={[0, 0.74, -0.25]} castShadow>
        <boxGeometry args={[0.34, 0.44, 0.16]} />
        <meshStandardMaterial color={BRAND_DARK} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow material={mats.skin}>
        <sphereGeometry args={[0.19, 24, 24]} />
      </mesh>
      <mesh position={[0, 1.22, -0.03]} castShadow material={mats.hair}>
        <sphereGeometry args={[0.205, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      </mesh>
      <Face y={1.18} z={0.17} r={0.19} />
      {[
        { ref: armL, x: -0.27 },
        { ref: armR, x: 0.27 },
      ].map(({ ref, x }) => (
        <group key={x} ref={ref} position={[x, 0.9, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow material={mats.shirt}>
            <capsuleGeometry args={[0.065, 0.3, 4, 10]} />
          </mesh>
          <mesh position={[0, -0.43, 0]} castShadow material={mats.skin}>
            <sphereGeometry args={[0.075, 14, 14]} />
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

/** Tiny eyes and smile on the +z side of a head. */
function Face({ y, z, r }: { y: number; z: number; r: number }) {
  return (
    <group position={[0, y, z]}>
      {[-1, 1].map((d) => (
        <mesh key={d} position={[d * r * 0.38, r * 0.12, -r * 0.1]}>
          <sphereGeometry args={[0.022, 10, 10]} />
          <meshBasicMaterial color="#111827" />
        </mesh>
      ))}
      <mesh position={[0, -r * 0.3, -r * 0.1]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.045, 0.01, 6, 14, Math.PI]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
    </group>
  );
}

/** Trainer spots the climbers from the ground, then cheers when someone reaches the top. */
function Trainer({ animate, win }: { animate: boolean; win: WinRef }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armSpot = useRef<THREE.Group>(null);
  const armClip = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const c = animate ? clock.getElapsedTime() : 0;
    const w = animate && c - win.current.stamp < 0.12 ? win.current.amount : 0;
    if (root.current) {
      root.current.position.y = Math.abs(Math.sin(c * 8)) * 0.1 * w + Math.sin(c * 2) * 0.01;
      root.current.rotation.z = Math.sin(c * 8) * 0.06 * w;
    }
    if (head.current) head.current.rotation.x = lerp(-0.3 + Math.sin(c * 0.8) * 0.06, -0.45, w);
    if (armSpot.current) {
      armSpot.current.rotation.x = lerp(-1.75 + Math.sin(c * 1.1) * 0.2, -2.85 + Math.sin(c * 14) * 0.25, w);
      armSpot.current.rotation.z = -0.35 * w;
    }
    if (armClip.current) {
      armClip.current.rotation.x = lerp(-1.1 + Math.sin(c * 0.9) * 0.05, -2.85 + Math.sin(c * 14 + 1.2) * 0.25, w);
      armClip.current.rotation.z = 0.35 * w;
    }
  });

  return (
    <group position={[-1.3, 0, 0.45]} rotation={[0, Math.PI / 2 - 0.3, 0]} scale={1.2}>
      <group ref={root}>
        <mesh position={[0, 0.72, 0]} castShadow>
          <capsuleGeometry args={[0.21, 0.36, 6, 14]} />
          <meshStandardMaterial color="#ef4444" roughness={0.55} />
        </mesh>
        <group ref={head} position={[0, 1.1, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color="#c68642" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.14, -0.02]} castShadow>
            <sphereGeometry args={[0.215, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.15, 0.2]} castShadow>
            <boxGeometry args={[0.28, 0.03, 0.2]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
          <Face y={0.08} z={0.18} r={0.2} />
        </group>
        <group ref={armSpot} position={[0.27, 0.92, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.3, 4, 10]} />
            <meshStandardMaterial color="#ef4444" roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.44, 0]} castShadow>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color="#c68642" roughness={0.7} />
          </mesh>
        </group>
        <group ref={armClip} position={[-0.27, 0.92, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.3, 4, 10]} />
            <meshStandardMaterial color="#ef4444" roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.44, 0]} castShadow>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color="#c68642" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.52, 0.1]} rotation={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.24, 0.32, 0.02]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.42, 0.115]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.16, 0.04, 0.01]} />
            <meshStandardMaterial color={BRAND} />
          </mesh>
        </group>
        {[-0.1, 0.1].map((x) => (
          <mesh key={x} position={[x, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.4, 4, 10]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Confetti burst from the star every time a climber reaches the top. */
function Confetti({ animate, win }: { animate: boolean; win: WinRef }) {
  const N = 90;
  const ref = useRef<THREE.InstancedMesh>(null);
  const last = useRef(-1);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const data = useMemo(
    () => Array.from({ length: N }, () => ({ vx: 0, vy: 0, vz: 0, sx: 0, sy: 0, sz: 0 })),
    [],
  );

  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    dummy.scale.setScalar(0);
    dummy.updateMatrix();
    for (let i = 0; i < N; i++) {
      m.setMatrixAt(i, dummy.matrix);
      m.setColorAt(i, col.set(CONFETTI[i % CONFETTI.length]));
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [dummy, col]);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m || !animate) return;
    const c = clock.getElapsedTime();
    const b = win.current.burst;
    if (b !== last.current) {
      last.current = b;
      data.forEach((d) => {
        const th = Math.random() * TAU;
        const sp = 1.2 + Math.random() * 1.8;
        d.vx = Math.cos(th) * sp;
        d.vz = Math.sin(th) * sp * 0.6;
        d.vy = 2.4 + Math.random() * 2.2;
        d.sx = (Math.random() - 0.5) * 12;
        d.sy = (Math.random() - 0.5) * 12;
        d.sz = (Math.random() - 0.5) * 12;
      });
      for (let i = 0; i < N; i++) m.setColorAt(i, col.set(pick(CONFETTI)));
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
    const tau = c - b;
    for (let i = 0; i < N; i++) {
      const d = data[i];
      if (b < 0 || tau > 3.4) {
        dummy.scale.setScalar(0);
      } else {
        dummy.position.set(d.vx * tau, LADDER_H + 0.85 + d.vy * tau - 2.4 * tau * tau, 0.2 + d.vz * tau);
        dummy.rotation.set(tau * d.sx, tau * d.sy, tau * d.sz);
        dummy.scale.setScalar(Math.min(1, tau * 8) * (1 - smooth(2.4, 3.4, tau)));
      }
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]} frustumCulled={false}>
      <boxGeometry args={[0.1, 0.16, 0.02]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Star({ animate, win }: { animate: boolean; win: WinRef }) {
  const ref = useRef<THREE.Mesh>(null);
  const spin = useRef(0);
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

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const c = animate ? clock.getElapsedTime() : 0;
    const w = animate && c - win.current.stamp < 0.12 ? win.current.amount : 0;
    spin.current += delta * 9 * w;
    spin.current -= (spin.current - Math.round(spin.current / TAU) * TAU) * 0.06 * (1 - w);
    ref.current.rotation.y = Math.sin(c * 1.1) * 0.7 + spin.current;
    ref.current.position.y = LADDER_H + 0.85 + Math.sin(c * 2) * 0.07 + w * 0.25;
    ref.current.scale.setScalar(1 + w * 0.35 * (0.6 + 0.4 * Math.sin(c * 12)));
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.45 + w * 1.1;
  });

  return (
    <mesh ref={ref} geometry={geo} position={[0, LADDER_H + 0.85, 0]} castShadow>
      <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.45} roughness={0.3} metalness={0.3} />
    </mesh>
  );
}

const CUBES = [
  { c: "#3965e3", x: -1.9, y: 3.1, z: 0.3, s: 0.26, p: 0 },
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
  const win = useRef<Win>({ amount: 0, stamp: -10, burst: -1 });
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
            <Student key={k.offset} kid={k} animate={animate} win={win} />
          ))}
          <Star animate={animate} win={win} />
          <Confetti animate={animate} win={win} />
        </group>
        <Trainer animate={animate} win={win} />
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
