import { defineStore } from "pinia";
import { screenToCanvas } from "../utils";
import type { VecLike } from "../types";
import { PRECISION_THRESHOLDS } from "../constants";

export const useCameraStore = defineStore("camera", {
  state: () => ({
    x: 0,
    y: 0,
    z: 1,
  }),

  getters: {
    precision(state) {
      for (let i = 0; i < PRECISION_THRESHOLDS.length; i++) {
        if (state.z <= PRECISION_THRESHOLDS[i][0]) {
          return PRECISION_THRESHOLDS[i][1];
        }
      }

      return PRECISION_THRESHOLDS[PRECISION_THRESHOLDS.length - 1][1];
    },
  },

  actions: {
    pan(deltaX: number, deltaY: number) {
      this.x -= deltaX / this.z;
      this.y -= deltaY / this.z;
    },

    zoom(point: VecLike, deltaZ: number) {
      const zoom = this.z - deltaZ * this.z;

      const p1 = screenToCanvas(this, point);
      const p2 = screenToCanvas({ ...this, z: zoom }, point);

      this.x = this.x + p2.x - p1.x;
      this.y = this.y + p2.y - p1.y;
      this.z = zoom;
    },
  },
});
