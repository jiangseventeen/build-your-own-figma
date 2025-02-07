import type { Camera, VecLike } from "@/types";

export function screenToCanvas(camera: Camera, point: VecLike): VecLike {
  return {
    x: point.x / camera.z + camera.x,
    y: point.y / camera.z + camera.y,
  };
}

export function canvasToScreen(camera: Camera, point: VecLike): VecLike {
  return {
    x: (point.x - camera.x) * camera.z,
    y: (point.y - camera.y) * camera.z,
  };
}
