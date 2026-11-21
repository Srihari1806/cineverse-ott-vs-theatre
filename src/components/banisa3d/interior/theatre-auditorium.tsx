/**
 * TheatreAuditorium — 3D cinema auditorium interior.
 *
 * Camera enters from the back (z ≈ +20) looking toward the screen (z = -28).
 * Seat rows from z = -20 (front) to z = -6 (back).
 * 8 rows × 14 seats per row.
 */

import { useMemo } from "react";
import { PALETTE } from "../core/palette";
import { useTheatre } from "../state/theatre-store";
import type { ScreenMode } from "../core/types";

const ROWS = 8;
const COLS = 14;
const ROW_DEPTH = 1.8;
const SEAT_WIDTH = 1.6;
const SEAT_HEIGHT = 1.0;
const SEAT_DEPTH = 0.6;
const FIRST_ROW_Z = -20;
const SEAT_ROW_OFFSET = 0.4; // rake: each row slightly higher

function screenEmissive(mode: ScreenMode): string {
  switch (mode) {
    case "polls":   return "#38c8c0";
    case "fanwall": return "#ffd49a";
    case "banner":  return "#e0671e";
    default:        return "#e8f0ff";
  }
}

/** Single cinema seat (box geometry). */
function Seat({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat back */}
      <mesh position={[0, SEAT_HEIGHT * 0.55, -SEAT_DEPTH * 0.3]} castShadow>
        <boxGeometry args={[SEAT_WIDTH * 0.88, SEAT_HEIGHT * 0.7, SEAT_DEPTH * 0.2]} />
        <meshStandardMaterial color={PALETTE.crimson} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Seat cushion */}
      <mesh position={[0, SEAT_HEIGHT * 0.18, 0]} castShadow>
        <boxGeometry args={[SEAT_WIDTH * 0.82, SEAT_HEIGHT * 0.22, SEAT_DEPTH * 0.72]} />
        <meshStandardMaterial color={PALETTE.crimsonBright} roughness={0.85} metalness={0.0} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-SEAT_WIDTH * 0.46, SEAT_HEIGHT * 0.3, 0]}>
        <boxGeometry args={[0.08, 0.12, SEAT_DEPTH * 0.8]} />
        <meshStandardMaterial color={PALETTE.goldDeep} emissive={PALETTE.goldDim} emissiveIntensity={0.2} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[SEAT_WIDTH * 0.46, SEAT_HEIGHT * 0.3, 0]}>
        <boxGeometry args={[0.08, 0.12, SEAT_DEPTH * 0.8]} />
        <meshStandardMaterial color={PALETTE.goldDeep} emissive={PALETTE.goldDim} emissiveIntensity={0.2} roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

export function TheatreAuditorium() {
  const screenMode = useTheatre((s) => s.screenMode);

  const seatPositions = useMemo(() => {
    const seats: [number, number, number][] = [];
    const totalW = (COLS - 1) * SEAT_WIDTH;
    for (let row = 0; row < ROWS; row++) {
      const z = FIRST_ROW_Z + row * ROW_DEPTH;
      const y = row * SEAT_ROW_OFFSET * 0.12; // slight rake
      for (let col = 0; col < COLS; col++) {
        const x = -totalW / 2 + col * SEAT_WIDTH;
        seats.push([x, y, z]);
      }
    }
    return seats;
  }, []);

  const screenGlowColor = screenEmissive(screenMode);

  return (
    <group>
      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -4]} receiveShadow>
        <planeGeometry args={[28, 48]} />
        <meshStandardMaterial color="#1a0d12" roughness={0.78} metalness={0.1} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 16, -4]}>
        <planeGeometry args={[28, 48]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh position={[-14, 8, -4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[48, 16]} />
        <meshStandardMaterial color={PALETTE.velvet} roughness={0.88} metalness={0.04} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh position={[14, 8, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[48, 16]} />
        <meshStandardMaterial color={PALETTE.velvet} roughness={0.88} metalness={0.04} />
      </mesh>

      {/* ── Back wall (entrance) ── */}
      <mesh position={[0, 8, 24]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[28, 16]} />
        <meshStandardMaterial color={PALETTE.plaster} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* ── Gold trim strips ── */}
      {/* Left wall */}
      <mesh position={[-13.92, 1, -4]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[48, 0.1, 0.07]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[-13.92, 12, -4]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[48, 0.1, 0.07]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Right wall */}
      <mesh position={[13.92, 1, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[48, 0.1, 0.07]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[13.92, 12, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[48, 0.1, 0.07]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} roughness={0.3} metalness={0.9} />
      </mesh>

      {/* ── Screen wall backing ── */}
      <mesh position={[0, 7, -28]}>
        <planeGeometry args={[28, 16]} />
        <meshStandardMaterial color="#0a0a12" roughness={0.95} metalness={0.0} />
      </mesh>

      {/* ── Main screen ── */}
      <mesh position={[0, 7.5, -27.6]}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial
          color="#d8eeff"
          emissive={screenGlowColor}
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.0}
        />
      </mesh>

      {/* ── Screen glow overlay ── */}
      <mesh position={[0, 7.5, -27.3]}>
        <planeGeometry args={[23.5, 13.6]} />
        <meshBasicMaterial
          color="#e8f4ff"
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>

      {/* ── Screen border frame ── */}
      <mesh position={[0, 7.5, -27.8]}>
        <boxGeometry args={[25, 14.8, 0.18]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.7} metalness={0.2} />
      </mesh>

      {/* ── Balcony ledge above back rows ── */}
      <mesh position={[0, 7.5, 18]}>
        <boxGeometry args={[28, 0.4, 3.5]} />
        <meshStandardMaterial color={PALETTE.plaster} roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0, 7.7, 18]}>
        <boxGeometry args={[28, 0.15, 0.12]} />
        <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.goldDeep} emissiveIntensity={0.4} roughness={0.35} metalness={0.85} />
      </mesh>

      {/* ── Aisle light strips — floor level ── */}
      <mesh position={[-12.5, -0.44, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 22]} />
        <meshBasicMaterial color={PALETTE.goldDim} toneMapped={false} />
      </mesh>
      <mesh position={[12.5, -0.44, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 22]} />
        <meshBasicMaterial color={PALETTE.goldDim} toneMapped={false} />
      </mesh>

      {/* ── Seat rows ── */}
      {seatPositions.map(([x, y, z], i) => (
        <Seat key={i} position={[x, y, z]} />
      ))}

      {/* ── Screen point light ── */}
      <pointLight position={[0, 8, -26]} color="#c8e8ff" intensity={12} distance={40} />
      {/* ── House warmth ── */}
      <pointLight position={[0, 12, 0]} color="#ffd09a" intensity={8} distance={44} />
      {/* ── Fill lights ── */}
      <pointLight position={[-12, 6, -10]} color="#aa3318" intensity={4} distance={24} />
      <pointLight position={[12, 6, -10]} color="#aa3318" intensity={4} distance={24} />
    </group>
  );
}
