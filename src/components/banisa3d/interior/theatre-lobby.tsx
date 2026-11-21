/**
 * TheatreLobby — 3D interior lobby space.
 *
 * Sits inside the same Canvas as the exterior scene. Camera enters from the
 * entrance side (z ≈ +15) and looks toward the auditorium doors (z ≈ -30).
 *
 * Geometry coords:
 *   Width:  36 units  (x: -18 to +18)
 *   Height:  8 units  (y:   0 to  +8)
 *   Depth:  44 units  (z: +14 to -30)
 */

import { useMemo } from "react";
import { PALETTE, HERO_ACCENTS } from "../core/palette";
import { enterTheatre } from "../state/theatre-store";

const POSTER_Z_POSITIONS = [-4, -9, -14, -19];

/** Slim horizontal gold trim strip. */
function GoldTrimStrip({ y, z = -8, width = 36 }: { y: number; z?: number; width?: number }) {
  return (
    <mesh position={[0, y, z]}>
      <boxGeometry args={[width, 0.08, 0.06]} />
      <meshStandardMaterial
        color={PALETTE.gold}
        emissive={PALETTE.gold}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.9}
      />
    </mesh>
  );
}

/** Poster frame on the left wall. */
function PosterFrame({ z, accent }: { z: number; accent: string }) {
  return (
    <group>
      {/* Dark frame border */}
      <mesh position={[-17.5, 3.6, z]}>
        <boxGeometry args={[2.4, 3.6, 0.12]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Gold inner border */}
      <mesh position={[-17.45, 3.6, z]}>
        <boxGeometry args={[2.18, 3.38, 0.06]} />
        <meshStandardMaterial
          color={PALETTE.gold}
          emissive={PALETTE.goldDeep}
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      {/* Poster surface */}
      <mesh position={[-17.4, 3.6, z]}>
        <planeGeometry args={[2.0, 3.2]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.55}
          roughness={0.6}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

/** Ceiling bulb — small warm sphere. */
function CeilingBulb({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 7.78, z]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color={PALETTE.goldBright}
        emissive={PALETTE.goldBright}
        emissiveIntensity={2.2}
        roughness={0.1}
        metalness={0.0}
      />
    </mesh>
  );
}

export function TheatreLobby() {
  // Bulb positions: a strip running along the ceiling center, every 4 units
  const bulbs = useMemo(() => {
    const result: { x: number; z: number }[] = [];
    for (let z = 10; z >= -28; z -= 4) {
      result.push({ x: 0, z });
    }
    return result;
  }, []);

  const posterAccents = useMemo(
    () => Object.values(HERO_ACCENTS).slice(0, POSTER_Z_POSITIONS.length),
    [],
  );

  return (
    <group>
      {/* ── Floor — dark marble ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -8]} receiveShadow>
        <planeGeometry args={[36, 44]} />
        <meshStandardMaterial
          color="#0e0c09"
          roughness={0.62}
          metalness={0.28}
        />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, -8]}>
        <planeGeometry args={[36, 44]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh position={[-18, 4, -8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[44, 8]} />
        <meshStandardMaterial color={PALETTE.wallLit} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh position={[18, 4, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[44, 8]} />
        <meshStandardMaterial color={PALETTE.wallLit} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* ── Back wall (entrance side) ── */}
      <mesh position={[0, 4, 14]}>
        <planeGeometry args={[36, 8]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* ── Auditorium doors wall (far end) ── */}
      <mesh position={[0, 4, -30]}>
        <planeGeometry args={[36, 8]} />
        <meshStandardMaterial color={PALETTE.plaster} roughness={0.88} metalness={0.02} />
      </mesh>

      {/* ── Gold trim strips ── */}
      <GoldTrimStrip y={1} />
      <GoldTrimStrip y={7} />
      {/* Left wall trims */}
      <mesh position={[-17.94, 1, -8]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[44, 0.08, 0.06]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[-17.94, 7, -8]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[44, 0.08, 0.06]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Right wall trims */}
      <mesh position={[17.94, 1, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[44, 0.08, 0.06]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[17.94, 7, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[44, 0.08, 0.06]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>

      {/* ── Poster gallery — left wall ── */}
      {POSTER_Z_POSITIONS.map((z, i) => (
        <PosterFrame key={z} z={z} accent={posterAccents[i] ?? PALETTE.gold} />
      ))}

      {/* ── Fan wall panel — right wall ── */}
      <mesh position={[17.5, 4, -12]}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color={PALETTE.cream}
          emissive={PALETTE.gold}
          emissiveIntensity={0.35}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>
      {/* Fan wall border */}
      <mesh position={[17.45, 4, -12]}>
        <boxGeometry args={[14.4, 6.4, 0.12]} />
        <meshStandardMaterial color={PALETTE.goldDeep} emissive={PALETTE.goldDeep} emissiveIntensity={0.4} roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ── Auditorium door arch surround ── */}
      <mesh position={[0, 5.6, -29.85]}>
        <boxGeometry args={[8, 1.2, 0.28]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 5.6, -29.85]}>
        <boxGeometry args={[8.3, 1.25, 0.22]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.goldDeep} emissiveIntensity={0.5} roughness={0.35} metalness={0.85} />
      </mesh>

      {/* ── Left auditorium door ── */}
      <mesh position={[-1.8, 3.6, -29.6]}>
        <boxGeometry args={[3, 6.4, 0.2]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Left door handle */}
      <mesh position={[-0.5, 3.6, -29.45]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ── Right auditorium door ── */}
      <mesh position={[1.8, 3.6, -29.6]}>
        <boxGeometry args={[3, 6.4, 0.2]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Right door handle */}
      <mesh position={[0.5, 3.6, -29.45]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ── Clickable gold halo hotspot above doors ── */}
      <mesh
        position={[0, 7.2, -29.2]}
        onClick={() => enterTheatre()}
        onPointerEnter={(e) => { e.stopPropagation(); (e.object as THREE.Mesh).scale.setScalar(1.08); }}
        onPointerLeave={(e) => { (e.object as THREE.Mesh).scale.setScalar(1.0); }}
      >
        <torusGeometry args={[1.4, 0.12, 10, 32]} />
        <meshStandardMaterial
          color={PALETTE.gold}
          emissive={PALETTE.goldBright}
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Halo glow arrow */}
      <mesh position={[0, 7.2, -29.1]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial
          color={PALETTE.goldBright}
          emissive={PALETTE.goldBright}
          emissiveIntensity={2.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ── Ceiling bulb strip ── */}
      {bulbs.map((b) => (
        <CeilingBulb key={`${b.x}-${b.z}`} x={b.x} z={b.z} />
      ))}

      {/* ── Lobby warm point light ── */}
      <pointLight position={[0, 6, -6]} color="#ffd49a" intensity={18} distance={30} castShadow />
      <pointLight position={[-10, 5, -4]} color="#ffcc88" intensity={8} distance={20} />
      <pointLight position={[10, 5, -4]} color="#ffcc88" intensity={8} distance={20} />
      {/* Near-door glow */}
      <pointLight position={[0, 5.5, -26]} color="#ffd49a" intensity={12} distance={18} />
    </group>
  );
}
