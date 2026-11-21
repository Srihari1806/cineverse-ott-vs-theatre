import { useMemo } from "react";
import * as THREE from "three";
import { makeTextTexture } from "../core/textures/text-texture";
import { useFontsReady } from "../core/use-fonts-ready";
import { PALETTE } from "../core/palette";

const WING_X = 21.5;
const PLASTER = "#22160f";
const STONE = "#2e2016";

/**
 * The building: a 1970s single screen. Wide main block, two ticket wings, and a
 * stepped art-deco tower carrying the name plate. Everything here is lit from
 * the plaza, so the mesh colours stay deliberately dark.
 */
export function CinemaFacade() {
  const fontsReady = useFontsReady();

  const namePlate = useMemo(() => {
    void fontsReady;
    return makeTextTexture({
      text: "SUDARSHAN",
      fontSize: 190,
      subtext: "70MM · EST. 1976 · AIR COOLED",
      subFontSize: 46,
      backgroundGradient: ["#150d07", "#0a0605"],
      gold: true,
      glow: 26,
      glowColor: PALETTE.goldDeep,
      borderColor: PALETTE.goldDeep,
      borderWidth: 8,
      letterSpacing: 14,
      paddingY: 46,
    });
  }, [fontsReady]);

  const pilasterX = [-15.5, -10.5, -5.5, 5.5, 10.5, 15.5];

  return (
    <group>
      {/* ── Main block ── */}
      <mesh position={[0, 7.5, -6]} castShadow receiveShadow>
        <boxGeometry args={[34, 15, 12]} />
        <meshStandardMaterial color={PLASTER} roughness={0.92} metalness={0.04} />
      </mesh>

      {/* Stepped cornice */}
      {[
        { y: 15.2, w: 35.4, h: 0.5, d: 12.6 },
        { y: 15.9, w: 33, h: 0.6, d: 11.6 },
        { y: 16.7, w: 30, h: 0.6, d: 10.8 },
      ].map((band) => (
        <mesh key={band.y} position={[0, band.y, -6]}>
          <boxGeometry args={[band.w, band.h, band.d]} />
          <meshStandardMaterial color={STONE} roughness={0.85} metalness={0.08} />
        </mesh>
      ))}

      {/* Gold trim running along the cornice */}
      <mesh position={[0, 15.05, 0.02]}>
        <boxGeometry args={[34.2, 0.14, 0.14]} />
        <meshStandardMaterial
          color={PALETTE.gold}
          emissive={PALETTE.goldDeep}
          emissiveIntensity={1.1}
          roughness={0.35}
          metalness={0.8}
        />
      </mesh>

      {/* ── Fluted pilasters ── */}
      {pilasterX.map((x) => (
        <mesh key={x} position={[x, 7.6, 0.16]}>
          <boxGeometry args={[1.1, 14.4, 0.5]} />
          <meshStandardMaterial color={STONE} roughness={0.8} metalness={0.12} />
        </mesh>
      ))}

      {/* ── Ticket wings ── */}
      {[-WING_X, WING_X].map((x) => (
        <group key={x}>
          <mesh position={[x, 5.4, -5]}>
            <boxGeometry args={[9, 10.8, 10]} />
            <meshStandardMaterial color={PLASTER} roughness={0.92} metalness={0.04} />
          </mesh>
          <mesh position={[x, 10.95, -5]}>
            <boxGeometry args={[9.6, 0.5, 10.6]} />
            <meshStandardMaterial color={STONE} roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Ticket grille */}
          <mesh position={[x, 3.4, 0.06]}>
            <boxGeometry args={[3.4, 2, 0.2]} />
            <meshStandardMaterial
              color="#0d0806"
              emissive={PALETTE.emberDeep}
              emissiveIntensity={0.45}
              roughness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* ── Stepped tower ── */}
      <mesh position={[0, 11.4, -3.6]}>
        <boxGeometry args={[7, 22.8, 7]} />
        <meshStandardMaterial color={STONE} roughness={0.86} metalness={0.12} />
      </mesh>
      <mesh position={[0, 22.9, -3.6]}>
        <boxGeometry args={[8.2, 0.8, 8.2]} />
        <meshStandardMaterial color={PLASTER} roughness={0.82} metalness={0.14} />
      </mesh>
      {/* Finial mast */}
      <mesh position={[0, 24.6, -3.6]}>
        <cylinderGeometry args={[0.16, 0.16, 2.6, 8]} />
        <meshStandardMaterial
          color={PALETTE.goldDeep}
          emissive={PALETTE.gold}
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* ── Name plate on the tower face ── */}
      {namePlate ? (
        <mesh position={[0, 19.4, -0.02]}>
          <planeGeometry args={[6.2, 2.1]} />
          <meshBasicMaterial map={namePlate} transparent toneMapped={false} />
        </mesh>
      ) : null}

      {/* ── Entrance: recessed, with warm light coming out of it ── */}
      <mesh position={[0, 3.4, -1.4]}>
        <boxGeometry args={[7.4, 6.8, 3]} />
        <meshStandardMaterial color="#0b0705" roughness={0.95} />
      </mesh>
      <mesh position={[0, 3.4, -2.6]}>
        <planeGeometry args={[6.6, 6.2]} />
        <meshBasicMaterial
          color={PALETTE.goldBright}
          transparent
          opacity={0.82}
          toneMapped={false}
        />
      </mesh>
      {/* Door mullions silhouetted against the lobby light */}
      {[-2.2, 0, 2.2].map((x) => (
        <mesh key={x} position={[x, 3.4, -2.5]}>
          <boxGeometry args={[0.28, 6.2, 0.16]} />
          <meshStandardMaterial color="#0d0906" roughness={0.9} />
        </mesh>
      ))}
      {/* Entrance surround */}
      <mesh position={[0, 7, -1.35]}>
        <boxGeometry args={[8.4, 0.7, 3.2]} />
        <meshStandardMaterial color={STONE} roughness={0.8} metalness={0.14} />
      </mesh>

      {/* ── Poster frames flanking the entrance ── */}
      {[-8.6, 8.6].map((x) => (
        <mesh key={x} position={[x, 4.2, 0.06]}>
          <boxGeometry args={[3, 4.4, 0.22]} />
          <meshStandardMaterial
            color="#120c07"
            emissive={PALETTE.goldDeep}
            emissiveIntensity={0.18}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Doorway hotspot marker — a soft gold halo the visitor can aim at */}
      <mesh position={[0, 3.4, 0.4]} rotation={[0, 0, 0]}>
        <circleGeometry args={[3.6, 32]} />
        <meshBasicMaterial
          color={PALETTE.gold}
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
