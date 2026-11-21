import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { CameraWaypoint } from "../core/scene-config";
import type { Vec3 } from "../core/types";

interface Orbit {
  target: THREE.Vector3;
  distance: number;
  /** Azimuth around Y, radians. */
  azimuth: number;
  /** Polar from straight up, radians. */
  polar: number;
}

function toOrbit(position: Vec3, target: Vec3): Orbit {
  const offset = new THREE.Vector3(
    position[0] - target[0],
    position[1] - target[1],
    position[2] - target[2],
  );
  const distance = Math.max(0.001, offset.length());
  return {
    target: new THREE.Vector3(target[0], target[1], target[2]),
    distance,
    azimuth: Math.atan2(offset.x, offset.z),
    polar: Math.acos(THREE.MathUtils.clamp(offset.y / distance, -1, 1)),
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Shortest angular path between two azimuths, so the dolly never spins. */
function shortestAngle(from: number, to: number): number {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}

export interface CameraFocus {
  /** Identifies the focus so the director only re-travels when it changes. */
  key: string;
  position: Vec3;
  target: Vec3;
  minDistance?: number;
  maxDistance?: number;
  travel?: number;
}

/**
 * Owns the camera for the whole building. `waypoint` is the scene's standing
 * stop; `focus` temporarily overrides it (looking at a cutout, sitting in a
 * chosen seat). Input is a hand-rolled orbit rig rather than drei's controls so
 * a dolly can be interrupted, clamped and eased exactly like a camera move.
 */
export function CameraDirector({
  waypoint,
  focus,
}: {
  waypoint: CameraWaypoint;
  focus: CameraFocus | null;
}) {
  const { camera, gl } = useThree();
  const current = useRef<Orbit | null>(null);
  const from = useRef<Orbit | null>(null);
  const to = useRef<Orbit | null>(null);
  const travel = useRef({ elapsed: 0, duration: 1 });
  const drag = useRef<{ active: boolean; x: number; y: number; id: number }>({
    active: false,
    x: 0,
    y: 0,
    id: -1,
  });
  const pinch = useRef<{ distance: number } | null>(null);

  const clamps = useMemo(
    () => ({
      minDistance: focus?.minDistance ?? waypoint.minDistance,
      maxDistance: focus?.maxDistance ?? waypoint.maxDistance,
      minPolar: waypoint.minPolarAngle,
      maxPolar: waypoint.maxPolarAngle,
    }),
    [focus, waypoint],
  );

  const destination = useMemo(() => {
    if (focus) return toOrbit(focus.position, focus.target);
    return toOrbit(waypoint.position, waypoint.target);
  }, [focus, waypoint]);

  const travelKey = focus ? `focus:${focus.key}` : `waypoint:${waypoint.position.join(",")}`;

  // ── Start a dolly whenever the destination changes ──
  useEffect(() => {
    const start = current.current ?? destination;
    from.current = { ...start, target: start.target.clone() };
    to.current = { ...destination, target: destination.target.clone() };
    current.current = current.current ?? { ...start, target: start.target.clone() };
    travel.current.elapsed = 0;
    travel.current.duration = Math.max(
      0.35,
      focus?.travel ?? waypoint.travel ?? 1.2,
    );
  }, [destination, focus, travelKey, waypoint.travel]);

  // ── Pointer + wheel input ──
  useEffect(() => {
    const element = gl.domElement;

    const onPointerDown = (event: PointerEvent) => {
      drag.current = { active: true, x: event.clientX, y: event.clientY, id: event.pointerId };
      element.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const orbit = current.current;
      if (!orbit || !drag.current.active) return;

      const dx = event.clientX - drag.current.x;
      const dy = event.clientY - drag.current.y;
      drag.current.x = event.clientX;
      drag.current.y = event.clientY;

      // Dragging cancels any in-flight dolly, so input always wins.
      from.current = null;
      to.current = null;

      orbit.azimuth -= dx * 0.005;
      orbit.polar = THREE.MathUtils.clamp(
        orbit.polar - dy * 0.004,
        clamps.minPolar,
        clamps.maxPolar,
      );
    };

    const endDrag = (event: PointerEvent) => {
      if (drag.current.id === event.pointerId) drag.current.active = false;
    };

    const onWheel = (event: WheelEvent) => {
      const orbit = current.current;
      if (!orbit) return;
      event.preventDefault();
      from.current = null;
      to.current = null;
      orbit.distance = THREE.MathUtils.clamp(
        orbit.distance * (1 + event.deltaY * 0.0012),
        clamps.minDistance,
        clamps.maxDistance,
      );
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);
    element.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
      element.removeEventListener("wheel", onWheel);
    };
  }, [clamps, gl]);

  // ── Pinch zoom for touch ──
  useEffect(() => {
    const element = gl.domElement;
    const onTouchMove = (event: TouchEvent) => {
      const orbit = current.current;
      if (!orbit || event.touches.length !== 2) return;
      const first = event.touches[0];
      const second = event.touches[1];
      if (!first || !second) return;
      const spread = Math.hypot(
        first.clientX - second.clientX,
        first.clientY - second.clientY,
      );
      if (pinch.current) {
        const ratio = pinch.current.distance / Math.max(1, spread);
        orbit.distance = THREE.MathUtils.clamp(
          orbit.distance * ratio,
          clamps.minDistance,
          clamps.maxDistance,
        );
      }
      pinch.current = { distance: spread };
      from.current = null;
      to.current = null;
    };
    const clearPinch = () => {
      pinch.current = null;
    };
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchend", clearPinch);
    return () => {
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", clearPinch);
    };
  }, [clamps, gl]);

  useFrame((_, delta) => {
    const start = from.current;
    const end = to.current;

    if (start && end) {
      travel.current.elapsed += delta;
      const t = Math.min(1, travel.current.elapsed / travel.current.duration);
      const eased = easeInOutCubic(t);

      const base = current.current ?? start;
      base.target.lerpVectors(start.target, end.target, eased);
      base.distance = THREE.MathUtils.lerp(start.distance, end.distance, eased);
      base.polar = THREE.MathUtils.lerp(start.polar, end.polar, eased);
      base.azimuth = start.azimuth + shortestAngle(start.azimuth, end.azimuth) * eased;
      current.current = base;

      if (t >= 1) {
        from.current = null;
        to.current = null;
      }
    }

    const orbit = current.current;
    if (!orbit) return;

    orbit.target.clampLength(0, 400);
    const polar = THREE.MathUtils.clamp(orbit.polar, clamps.minPolar, clamps.maxPolar);
    const distance = THREE.MathUtils.clamp(
      orbit.distance,
      clamps.minDistance,
      clamps.maxDistance,
    );
    orbit.polar = polar;
    orbit.distance = distance;

    const sinPolar = Math.sin(polar);
    camera.position.set(
      orbit.target.x + distance * sinPolar * Math.sin(orbit.azimuth),
      orbit.target.y + distance * Math.cos(polar),
      orbit.target.z + distance * sinPolar * Math.cos(orbit.azimuth),
    );
    camera.lookAt(orbit.target);
  });

  return null;
}
