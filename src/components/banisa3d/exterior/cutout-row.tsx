import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useCutoutTexture, useCutoutAspect } from "../core/textures/cutout-texture";
import { useTheatre, focusCutout, openCutout } from "../state/theatre-store";
import { CUTOUTS } from "../data/cutouts";
import { PALETTE } from "../core/palette";

/**
 * The six standees standing in the plaza. Each is a billboard plane on a slim
 * scaffold pole, so it always faces the camera. Hovering a cutout raises it and
 * opens a gold halo; clicking opens its profile panel.
 */
export function CutoutRow() {
  const focusedId = useTheatre((s) => s.focusedCutoutId);
  const openId = useTheatre((s) => s.openCutoutId);

  return (
    <group>
      {CUTOUTS.map((cutout) => (
        <CutoutStandee
          key={cutout.id}
          cutout={cutout}
          focused={focusedId === cutout.id}
          isOpen={openId === cutout.id}
        />
      ))}
    </group>
  );
}

function CutoutStandee({
  cutout,
  focused,
}: {
  cutout: (typeof CUTOUTS)[number];
  focused: boolean;
}) {
  const texture = useCutoutTexture(cutout.image);
  const aspect = useCutoutAspect(cutout.image);

  // Board dimensions: width = height * aspect, height = cutout.height
  const boardHeight = cutout.height;
  const boardWidth = boardHeight * (aspect > 0.1 ? aspect : 0.44);

  // Slight sway so the boards read as standing in the wind
  const sway = useRef({ rot: 0, phase: Math.random() * Math.PI * 2 });

  const handleEnter = () => focusCutout(cutout.id);
  const handleLeave = () => focusCutout(null);
  const handleClick = () => openCutout(cutout.id);

  useFrame((state) => {
    sway.current.rot = Math.sin(state.clock.elapsedTime * 1.4 + sway.current.phase) * 0.008;
  });

  return (
    <group position={[cutout.x, 0, cutout.z]} rotation={[0, 0, sway.current.rot]}>
      {/* Scaffold pole */}
      <mesh position={[0, boardHeight * 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, boardHeight, 8]} />
        <meshStandardMaterial
          color="#2a1a10"
          roughness={0.85}
          metalness={0.3}
        />
      </mesh>

      {/* Base block */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.4, 0.36, 1.4]} />
        <meshStandardMaterial
          color="#1a1109"
          roughness={0.9}
          metalness={0.2}
        />
      </mesh>

      {/* Association board under the cutout */}
      <group position={[0, 0.55, 0.28]}>
        <mesh>
          <boxGeometry args={[2.2, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#0d0806"
            emissive={cutout.accent}
            emissiveIntensity={0.25}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.16, 0.06]}>
          <planeGeometry args={[1.9, 0.18]} />
          <meshBasicMaterial
            color={cutout.accent}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* The cutout billboard itself */}
      <mesh
        position={[0, boardHeight * 0.55 + 0.6, 0.06]}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        onClick={handleClick}
      >
        <planeGeometry args={[boardWidth, boardHeight]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          toneMapped={false}
          transparent
        />
      </mesh>

      {/* Spotlight cone when focused */}
      <mesh position={[0, boardHeight + 2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[boardWidth * 0.8, 6, 16, 1, true]} />
        <meshBasicMaterial
          color={cutout.accent}
          transparent
          opacity={focused ? 0.18 : 0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Gold halo ring at the base when focused */}
      {focused && (
        <mesh position={[0, 0.6, 0.06]}>
          <ringGeometry args={[boardWidth * 0.52, boardWidth * 0.58, 48]} />
          <meshBasicMaterial
            color={PALETTE.gold}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}