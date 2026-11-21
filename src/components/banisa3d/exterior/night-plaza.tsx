import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSurface } from "../core/canvas-utils";
import { hexToRgba } from "../core/canvas-utils";
import { PALETTE } from "../core/palette";

/** Vertical night gradient with a sodium-vapour glow sitting on the horizon. */
function makeSkyTexture(): THREE.CanvasTexture | null {
  const surface = createSurface(64, 512);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#070612");
  gradient.addColorStop(0.34, "#0d0a1c");
  gradient.addColorStop(0.58, "#241226");
  gradient.addColorStop(0.76, "#4a1f1c");
  gradient.addColorStop(0.9, "#8a4515");
  gradient.addColorStop(1, "#c2761f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function useStarField(count: number): THREE.BufferGeometry {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Upper hemisphere shell only — stars never appear under the tarmac.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.46;
      const radius = 105;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) + 6;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);
}

const SEARCHLIGHTS: { x: number; z: number; speed: number; phase: number }[] = [
  { x: -16, z: -2, speed: 0.22, phase: 0 },
  { x: -6, z: 4, speed: -0.17, phase: 1.2 },
  { x: 7, z: 3, speed: 0.19, phase: 2.4 },
  { x: 17, z: -1, speed: -0.24, phase: 0.7 },
];

/**
 * Everything outside the building: the night, the wet tarmac, the red carpet
 * running to the doors, and four searchlights sweeping the sky above the
 * marquee the way a release-night plaza actually looks.
 */
export function NightPlaza() {
  const sky = useMemo(makeSkyTexture, []);
  const stars = useStarField(420);
  const beams = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    beams.current.forEach((beam, index) => {
      if (!beam) return;
      const config = SEARCHLIGHTS[index];
      if (!config) return;
      beam.rotation.z = Math.sin(t * config.speed + config.phase) * 0.42;
      beam.rotation.x = Math.cos(t * config.speed * 0.7 + config.phase) * 0.2;
    });
  });

  return (
    <group>
      {/* Night dome */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[118, 32, 24]} />
        <meshBasicMaterial
          map={sky}
          color={sky ? "#ffffff" : "#150c1e"}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <points geometry={stars}>
        <pointsMaterial
          size={0.62}
          sizeAttenuation
          color="#ffeccd"
          transparent
          opacity={0.72}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Sweeping searchlights rising from behind the building */}
      {SEARCHLIGHTS.map((config, index) => (
        <mesh
          key={index}
          ref={(node) => {
            beams.current[index] = node;
          }}
          position={[config.x, 0, config.z]}
        >
          <coneGeometry args={[3.4, 92, 16, 1, true]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#ffd9a0" : "#ffb066"}
            transparent
            opacity={0.055}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Wet tarmac */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 6]} receiveShadow>
        <planeGeometry args={[240, 240]} />
        <meshStandardMaterial
          color="#0a0705"
          roughness={0.52}
          metalness={0.42}
        />
      </mesh>

      {/* Light spilling out of the entrance, pooled on the tarmac */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 4.5]}>
        <planeGeometry args={[34, 20]} />
        <meshBasicMaterial
          color={PALETTE.gold}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Red carpet running from the pavement to the doors */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 8]}>
        <planeGeometry args={[3.6, 17]} />
        <meshStandardMaterial
          color={PALETTE.crimson}
          roughness={0.86}
          metalness={0.05}
        />
      </mesh>
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.05, 8]}>
          <planeGeometry args={[0.22, 17]} />
          <meshStandardMaterial
            color={PALETTE.gold}
            roughness={0.4}
            metalness={0.7}
            emissive={PALETTE.goldDeep}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Distant city haze so the horizon is not a hard line */}
      <mesh position={[0, 8, -80]}>
        <planeGeometry args={[260, 30]} />
        <meshBasicMaterial
          color={hexToRgba(PALETTE.ember, 0.16)}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
