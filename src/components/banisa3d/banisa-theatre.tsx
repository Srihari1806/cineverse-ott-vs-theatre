/**
 * BanisaTheatre — main orchestrator component for the 3D cinema experience.
 *
 * Mounts the WebGL <Canvas> (exterior + interior 3D scenes) and the DOM
 * overlays (HUD, cutout panel, celebration, kiosk) as siblings over it.
 */

import { useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// 3D scene components
import { CameraDirector } from "./three/camera-director";
import { NightPlaza } from "./exterior/night-plaza";
import { CinemaFacade } from "./exterior/cinema-facade";
import { MarqueeCanopy } from "./exterior/marquee-canopy";
import { CutoutRow } from "./exterior/cutout-row";
import { TheatreLobby } from "./interior/theatre-lobby";
import { TheatreAuditorium } from "./interior/theatre-auditorium";

// State
import { useTheatre, hydrateTheatre } from "./state/theatre-store";
import { waypointFor } from "./core/scene-config";

// DOM overlays
import { SceneHud } from "./ui/scene-hud";
import { CutoutPanel } from "./ui/cutout-panel";
import { CelebrationOverlay } from "./ui/celebration-overlay";
import { KioskPanel } from "./ui/kiosk-panel";

export function BanisaTheatre() {
  // Rehydrate persisted state once on first client paint
  useEffect(() => {
    hydrateTheatre();
  }, []);

  const scene = useTheatre((s) => s.scene);
  const viewpoint = useTheatre((s) => s.viewpoint);
  const openCutoutId = useTheatre((s) => s.openCutoutId);
  const kiosk = useTheatre((s) => s.kiosk);

  const waypoint = useMemo(
    () => waypointFor(scene, viewpoint),
    [scene, viewpoint],
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* ── 3D Canvas ── */}
      <Canvas
        shadows
        camera={{ fov: 52, near: 0.2, far: 380 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        className="h-full w-full"
      >
        {/* Atmospheric fog */}
        <fog attach="fog" args={["#0d0810", 55, 240]} />

        {/* ── Lighting rig ── */}
        <ambientLight intensity={0.18} color="#ffd49a" />
        <hemisphereLight args={["#ffdaa0", "#1a0d00", 0.6]} />
        {/* Entrance warm spill */}
        <pointLight
          position={[0, 3, 8]}
          color="#ffd49a"
          intensity={16}
          distance={22}
          castShadow
        />
        {/* Left / right ember fills */}
        <pointLight position={[-20, 8, 5]} color="#c2521f" intensity={6} distance={40} />
        <pointLight position={[20, 8, 5]} color="#c2521f" intensity={6} distance={40} />

        <Suspense fallback={null}>
          {/* Camera director owns all camera movement */}
          <CameraDirector waypoint={waypoint} focus={null} />

          {/* Exterior — always present */}
          <NightPlaza />
          <CinemaFacade />
          <MarqueeCanopy />
          <CutoutRow />

          {/* Interior — shown when inside the building */}
          {(scene === "lobby" || scene === "auditorium") && <TheatreLobby />}
          {scene === "auditorium" && <TheatreAuditorium />}
        </Suspense>
      </Canvas>

      {/* ── DOM overlays (render above canvas) ── */}
      <SceneHud />
      {openCutoutId && <CutoutPanel />}
      <CelebrationOverlay />
      {kiosk && <KioskPanel />}
    </div>
  );
}
