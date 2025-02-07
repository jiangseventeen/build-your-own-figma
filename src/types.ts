import type { Vec2 } from "./utils/vector";

export interface Camera {
  x: number;
  y: number;
  z: number;
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type VecLike = Vec2 | { x: number; y: number };
