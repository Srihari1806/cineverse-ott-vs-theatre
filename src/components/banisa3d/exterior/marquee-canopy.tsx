import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createMarqueePainter } from "../core/textures/marquee-texture";
import { createSurface, drawStar } from "../core/canvas-utils";
import { MARQUEE_LINES } from "../core/scene-config";
import { PALETTE } from "../core/palette";
import { useTheatre } from "../state/theatre-store";

const BULB_COUNT = 40;

/** The art-deco light column: a dark panel studded with glowing diamonds. */
function makeColumnTexture(): THREE.CanvasTexture | null {
  const surface = createSurface(256, 1024);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  const plate = ctx.createLinearGradient(0, 0, canvas.width, 0);
  plate.addColorStop(0, "#0c0705");
  plate.addColorStop(0.5, "#1a1109");
  plate.addColorStop(1, "#0c0705");
  ctx.fillStyle = plate;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PALETTE.goldDeep;
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  for (let i = 0; i < 12; i++) {
    const cy = 70 + i * 80;
    ctx.save();
    ctx.shadowColor = PALETTE.goldBright;
    ctx.shadowBlur = 22;
    drawStar(ctx, canvas.width / 2, cy, 34, 16, 4);
    ctx.fillStyle = PALETTE.goldBright;
    ctx.fill();
    ctx.restore();

    // Small rubies between the diamonds.
    ctx.beginPath();
    ctx.arc(canvas.width / 2, cy + 40, 7, 0, Math.PI * 2);
    ctx.fillStyle = PALETTE.crimsonBright;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * The canopy over the entrance, the big scrolling marquee on its fascia, the
 * bulbs along the underside and the lit column climbing the tower — the four
 * things that make this building shout across the street.
 */
export function MarqueeCanopy() {
  const frenzy = useTheatre((snapshot) => snapshot.frenzy);

  const painter = useMemo(
    () =>
      createMarqueePainter({
        lines: MARQUEE_LINES,
        accent: PALETTE.ember,
        width: 2048,
        height: 256,
        speed: 165,
        mode: "scroll",
      }),
    [],
  );

  useEffect(() => () => painter?.dispose(), [painter]);

  useFrame((state) => {
    if (!painter) return;
    // Frenzy whips the lettering along; calm keeps it stately.
    painter.paint(state.clock.elapsedTime * (frenzy ? 1.6 : 1));
  });

  const column = useMemo(makeColumnTexture, []);
  const bulbs = useRef<THREE.InstancedMesh | null>(null);

  useEffect(() => {
    const mesh = bulbs.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < BULB_COUNT; i++) {
      const x = -15.4 + (i * 30.8) / (BULB_COUNT - 1);
      matrix.makeTranslation(x, 7.5, 5.85);
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* ── Canopy slab over the entrance ── */}
      <mesh position={[0, 8, 3]}>
        <boxGeometry args={[32, 0.9, 6]} />
        <meshStandardMaterial color="#1b120c" roughness={0.86} metalness={0.12} />
      </mesh>

      {/* Bulbs along the canopy underside */}
      <instancedMesh ref={bulbs} args={[undefined, undefined, BULB_COUNT]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshBasicMaterial color="#ffe6a8" toneMapped={false} />
      </instancedMesh>

      {/* ── Signage fascia standing on the canopy roof ── */}
      <mesh position={[0, 9.9, 5.4]}>
        <boxGeometry args={[30, 3, 0.5]} />
        <meshStandardMaterial color="#140d08" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* The scrolling marquee itself */}
      {painter ? (
        <mesh position={[0, 9.9, 5.68]}>
          <planeGeometry args={[29.4, 2.62]} />
          <meshBasicMaterial map={painter.texture} toneMapped={false} />
        </mesh>
      ) : null}

      {/* Gold fillet capping the fascia */}
      <mesh position={[0, 11.45, 5.4]}>
        <boxGeometry args={[30.2, 0.18, 0.62]} />
        <meshStandardMaterial
          color={PALETTE.gold}
          emissive={PALETTE.goldDeep}
          emissiveIntensity={0.9}
          metalness={0.8}
          roughness={0.32}
        />
      </mesh>

      {/* ── Lit column climbing the tower ── */}
      {column ? (
        <mesh position={[0, 13.6, -0.04]}>
          <planeGeometry args={[2.4, 9.6]} />
          <meshBasicMaterial map={column} toneMapped={false} />
        </mesh>
      ) : null}

      {/* ── Star roundel between the column and the name plate ── */}
      <mesh position={[0, 15.6, -0.02]}>
        <circleGeometry args={[1.05, 40]} />
        <meshBasicMaterial
          color={PALETTE.crimsonBright}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 15.6, 0.02]}>
        <circleGeometry args={[0.78, 32]} />
        <meshBasicMaterial
          color={PALETTE.goldBright}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 15.6, 0.05]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#160c07" toneMapped={false} />
      </mesh>
    </group>
  );
}
