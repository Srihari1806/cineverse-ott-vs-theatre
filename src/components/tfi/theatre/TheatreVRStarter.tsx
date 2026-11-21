import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Text,
  RoundedBox,
  Sparkles,
  Billboard,
  ContactShadows,
} from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";
import "./TheatreVRStarter.css";

const xrStore = createXRStore({
  controller: true,
  hand: true,
  gaze: true,
  domOverlay: true,
  frameRate: "high",
  foveation: 0.35,
});

type TabId = "movies" | "events" | "merch" | "fans" | "gallery" | "offers";

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "movies", label: "MOVIES", icon: "◉" },
  { id: "events", label: "EVENTS", icon: "☆" },
  { id: "merch", label: "MERCHANDISE", icon: "♜" },
  { id: "fans", label: "FAN WALL", icon: "♧" },
  { id: "gallery", label: "GALLERY", icon: "▧" },
  { id: "offers", label: "OFFERS", icon: "◇" },
];

const stats: Record<TabId, { title: string; subtitle: string; value: string; detail: string }> = {
  movies: {
    title: "MOVIES",
    subtitle: "Theatre intelligence",
    value: "2,431",
    detail: "Movies indexed",
  },
  events: {
    title: "EVENTS",
    subtitle: "Fan calendar",
    value: "84",
    detail: "Live events",
  },
  merch: {
    title: "MERCHANDISE",
    subtitle: "Fan economy",
    value: "₹18.4L",
    detail: "Tracked demand",
  },
  fans: {
    title: "FAN WALL",
    subtitle: "Community pulse",
    value: "1.28M",
    detail: "Fan interactions",
  },
  gallery: {
    title: "GALLERY",
    subtitle: "Saved memories",
    value: "42.8K",
    detail: "Moments archived",
  },
  offers: {
    title: "OFFERS",
    subtitle: "Fan benefits",
    value: "126",
    detail: "Active drops",
  },
};

function makeBannerTexture(text: string, accent = "#d79a28") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = "#100b06";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.fillStyle = accent;
  ctx.font = "700 58px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function StageScreen() {
  const screenRef = useRef<THREE.Mesh>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((v) => v + 1), 1800);
    return () => clearInterval(id);
  }, []);

  useFrame(() => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.8 + Math.sin(pulse * 0.5) * 0.12;
      }
    }
  });

  return (
    <group position={[0, 5.1, -9]}>
      <mesh position={[0, 0, -0.22]}>
        <boxGeometry args={[15.2, 7.5, 0.4]} />
        <meshStandardMaterial color="#050505" metalness={0.85} roughness={0.22} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0]}>
        <planeGeometry args={[14.5, 6.8]} />
        <meshStandardMaterial
          color="#2a1209"
          emissive="#d04a16"
          emissiveIntensity={1.8}
          roughness={0.35}
        />
      </mesh>
      <Text
        position={[0, 1.2, 0.05]}
        fontSize={0.82}
        maxWidth={10}
        textAlign="center"
        color="#f4c46c"
        anchorX="center"
        anchorY="middle"
      >
        SUPERSTAR ARENA
      </Text>
      <Text
        position={[0, 0.15, 0.05]}
        fontSize={0.34}
        maxWidth={10}
        textAlign="center"
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        THE BIG SCREEN • THE BIGGEST FANS
      </Text>
      <Text
        position={[0, -1.2, 0.05]}
        fontSize={0.25}
        maxWidth={10}
        textAlign="center"
        color="#ffb34b"
        anchorX="center"
        anchorY="middle"
      >
        LIVE FAN ENERGY  •  92%
      </Text>

      {/* proscenium lights */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = -6.8 + i * 0.65;
        return (
          <mesh key={i} position={[x, -3.45, 0.1]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#ffbd57" />
          </mesh>
        );
      })}
    </group>
  );
}

function Seat({
  position,
  rotation = [0, 0, 0],
  accent = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  accent?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered ? 1.04 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <RoundedBox args={[0.9, 0.55, 0.9]} radius={0.12} smoothness={4} position={[0, 0.35, 0]}>
        <meshStandardMaterial
          color={hovered || accent ? "#8b151b" : "#3b0c10"}
          roughness={0.48}
          metalness={0.08}
        />
      </RoundedBox>
      <RoundedBox args={[0.9, 1.45, 0.28]} radius={0.1} smoothness={4} position={[0, 1.1, 0.28]}>
        <meshStandardMaterial
          color={hovered || accent ? "#a21d24" : "#4b0d12"}
          roughness={0.52}
          metalness={0.05}
        />
      </RoundedBox>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.82, 0.1, 0.86]} />
        <meshStandardMaterial color="#15100c" roughness={0.7} />
      </mesh>
      <mesh position={[0.55, 0.55, 0]}>
        <boxGeometry args={[0.06, 0.65, 0.65]} />
        <meshStandardMaterial color="#17110c" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

function AuditoriumSeats() {
  const seats = useMemo(() => {
    const out = [];
    const rows = 9;
    const cols = 16;
    for (let r = 0; r < rows; r++) {
      const z = -1.2 + r * 1.28;
      const spread = 0.98 + r * 0.02;
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * spread;
        const y = 0.12 + r * 0.08;
        out.push(
          <Seat
            key={`${r}-${c}`}
            position={[x, y, z]}
            rotation={[0, 0, 0]}
            accent={r === 0 && c > 6 && c < 10}
          />
        );
      }
    }
    return out;
  }, []);

  return <group>{seats}</group>;
}

function Cutout({
  x,
  y,
  z,
  scale,
  title,
  textureColor,
}: {
  x: number;
  y: number;
  z: number;
  scale: number;
  title: string;
  textureColor: string;
}) {
  const tex = useMemo(() => makeBannerTexture(title, textureColor), [title, textureColor]);
  return (
    <group position={[x, y, z]} scale={scale}>
      <Billboard>
        <mesh>
          <planeGeometry args={[1.7, 2.8]} />
          <meshStandardMaterial
            map={tex}
            transparent
            side={THREE.DoubleSide}
            roughness={0.7}
            emissive={textureColor}
            emissiveIntensity={0.15}
          />
        </mesh>
      </Billboard>
      <pointLight color={textureColor} intensity={1.4} distance={4} position={[0, 0, 0.3]} />
    </group>
  );
}

function Banners() {
  const banners: [number, number, number, string, string][] = [
    [-8, 5.2, -5.5, "FANS LOVE MASS", "#e2a53a"],
    [8, 5.2, -5.5, "ONE MAN MILLIONS", "#d8912b"],
    [-7.5, 3.2, -7.5, "FIRST DAY", "#bd2a28"],
    [7.5, 3.2, -7.5, "BLOCKBUSTER", "#dba13b"],
  ];
  return (
    <group>
      {banners.map((b, i) => (
        <Cutout key={i} x={b[0]} y={b[1]} z={b[2]} scale={1.1} title={b[3]} textureColor={b[4]} />
      ))}
    </group>
  );
}

function AmbientParticles() {
  return (
    <Sparkles
      count={500}
      scale={[22, 10, 15]}
      size={2.2}
      speed={0.18}
      opacity={0.7}
      color="#e2a13b"
    />
  );
}

function Theatre() {
  return (
    <>
      <color attach="background" args={["#030202"]} />
      <fog attach="fog" args={["#030202", 14, 38]} />

      <ambientLight intensity={0.28} />
      <hemisphereLight intensity={0.28} color="#ffdb9b" groundColor="#080504" />

      <spotLight
        position={[0, 12, -4]}
        angle={0.48}
        penumbra={0.8}
        intensity={80}
        distance={30}
        color="#ffd58a"
        castShadow
      />
      <spotLight
        position={[-8, 7, 0]}
        angle={0.42}
        penumbra={0.8}
        intensity={50}
        distance={24}
        color="#b73c22"
      />
      <spotLight
        position={[8, 7, 0]}
        angle={0.42}
        penumbra={0.8}
        intensity={50}
        distance={24}
        color="#c34c20"
      />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[26, 32]} />
        <meshStandardMaterial color="#090706" roughness={0.84} metalness={0.05} />
      </mesh>

      {/* aisle carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 4]}>
        <planeGeometry args={[2.3, 19]} />
        <meshStandardMaterial color="#641017" roughness={0.72} />
      </mesh>

      {/* side walls */}
      <mesh position={[-11, 5.2, 0]}>
        <boxGeometry args={[0.5, 10.5, 28]} />
        <meshStandardMaterial color="#100b08" roughness={0.85} />
      </mesh>
      <mesh position={[11, 5.2, 0]}>
        <boxGeometry args={[0.5, 10.5, 28]} />
        <meshStandardMaterial color="#100b08" roughness={0.85} />
      </mesh>

      <AuditoriumSeats />
      <StageScreen />
      <Banners />
      <AmbientParticles />

      {/* side architectural lights */}
      {[-9.8, 9.8].map((x) =>
        Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`${x}-${i}`} position={[x, 1.2 + i * 1.15, -7 + i * 1.4]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#ffb83d" />
          </mesh>
        ))
      )}

      <ContactShadows
        position={[0, -0.19, 0]}
        opacity={0.6}
        scale={26}
        blur={2.8}
        far={10}
      />
      <Environment preset="night" />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 3.2, 11.5);
    camera.lookAt(0, 3.8, -6);
  }, [camera]);
  return null;
}

function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ fov: 58, near: 0.1, far: 60, position: [0, 3.2, 11.5] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <XR store={xrStore}>
        <Suspense fallback={null}>
          <CameraRig />
          <Theatre />
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={6}
            maxDistance={17}
            minPolarAngle={Math.PI / 3.1}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 3.7, -5]}
          />
        </Suspense>
      </XR>
    </Canvas>
  );
}

function TopBar({ onVR }: { onVR: () => void }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-main">CINE</span><span className="brand-accent">VERSE</span>
      </div>
      <nav>
        <button className="nav-active">Home</button>
        <button>Movies</button>
        <button>Theatres</button>
        <button>Fans</button>
        <button>Gallery</button>
        <button>Reports</button>
      </nav>
      <div className="top-actions">
        <button className="vr-button" onClick={onVR}>ENTER VR</button>
        <button className="icon-button">⌕</button>
        <button className="avatar">S</button>
      </div>
    </header>
  );
}

function SideRail({ active, setActive }: { active: TabId; setActive: (id: TabId) => void }) {
  return (
    <aside className="side-rail">
      <div className="rail-label">SUPERSTAR ARENA</div>
      <div className="rail-stack">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`rail-item ${active === tab.id ? "active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            <span className="rail-icon">{tab.icon}</span>
            <span>{tab.label}</span>
            <span className="chevron">›</span>
          </button>
        ))}
      </div>
      <div className="rail-hint">DRAG TO ROTATE<br />SCROLL TO EXPLORE</div>
    </aside>
  );
}

function RightPanel({ active }: { active: TabId }) {
  const s = stats[active];
  return (
    <aside className="right-panel">
      <div className="panel-title">LIVE INTELLIGENCE <span className="live">LIVE</span></div>
      <div className="big-value">{s.value}</div>
      <div className="muted">{s.detail}</div>
      <div className="mini-chart">
        {[28, 42, 34, 62, 48, 72, 66, 86, 78].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="trend-row">
        <span>Fan energy</span><b>+18.6%</b>
      </div>
      <div className="trend-row">
        <span>Engagement</span><b>+12.4%</b>
      </div>
    </aside>
  );
}

function BottomTabs({ active, setActive }: { active: TabId; setActive: (id: TabId) => void }) {
  return (
    <div className="bottom-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`bottom-card ${active === tab.id ? "selected" : ""}`}
          onClick={() => setActive(tab.id)}
        >
          <span className="card-icon">{tab.icon}</span>
          <span className="card-label">{tab.label}</span>
          <span className="card-sub">{stats[tab.id].subtitle}</span>
        </button>
      ))}
    </div>
  );
}

function DetailSheet({ active, onClose }: { active: TabId; onClose: () => void }) {
  const s = stats[active];
  return (
    <div className="detail-sheet">
      <div className="sheet-head">
        <div>
          <span className="eyebrow">THEATRE INTELLIGENCE</span>
          <h2>{s.title}</h2>
          <p>{s.subtitle}</p>
        </div>
        <button className="close" onClick={onClose}>×</button>
      </div>
      <div className="sheet-grid">
        <div className="metric">
          <span>Total</span>
          <strong>{s.value}</strong>
          <small>{s.detail}</small>
        </div>
        <div className="metric">
          <span>Weekly growth</span>
          <strong>+18.6%</strong>
          <small>vs last week</small>
        </div>
        <div className="metric">
          <span>Fan sentiment</span>
          <strong>92%</strong>
          <small>positive</small>
        </div>
        <div className="metric">
          <span>Momentum</span>
          <strong>8.7/10</strong>
          <small>current score</small>
        </div>
      </div>
      <div className="sheet-bars">
        {[54, 78, 62, 86, 72, 94, 80, 98, 88, 100].map((v, i) => (
          <div key={i} className="bar-col">
            <div className="bar" style={{ height: `${v}%` }} />
            <small>D{i + 1}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TheatreVRStarter() {
  const [active, setActive] = useState<TabId>("movies");
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectTab = (id: TabId) => {
    setActive(id);
    setSheetOpen(true);
  };

  return (
    <main className="vr-starter-shell">
      <div className="scene-layer">
        <Scene />
      </div>

      <div className="ui-layer">
        <TopBar onVR={() => xrStore.enterVR()} />
        <SideRail active={active} setActive={selectTab} />
        <RightPanel active={active} />

        <section className="hero-copy">
          <span className="kicker">WELCOME TO THE EPIC BLOCKBUSTER EXPERIENCE</span>
          <h1>SUPERSTAR <em>ARENA</em></h1>
          <p>Theatre. Fans. Memories. Intelligence.</p>
          <button className="enter-button" onClick={() => setSheetOpen(true)}>
            ENTER THE ARENA <span>»</span>
          </button>
        </section>

        <BottomTabs active={active} setActive={selectTab} />

        <div className="rotate-hint">↻ DRAG TO ROTATE</div>
        <div className="scroll-hint">SCROLL TO EXPLORE ↓</div>

        {sheetOpen && (
          <DetailSheet active={active} onClose={() => setSheetOpen(false)} />
        )}
      </div>
    </main>
  );
}
