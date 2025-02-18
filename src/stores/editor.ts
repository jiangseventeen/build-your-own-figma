import { defineStore } from "pinia";
import { useCameraStore } from "./camera";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    ui: {
      grid: {
        enabled: true,
      },
      ruler: {
        enabled: true,
        width: 20,
      },
    },
    layout: {},
    canvas: {
      width: 0,
      height: 0,
      backgroundColor: "#C2C2C2",
    },
  }),

  getters: {
    viewport(state) {
      const camera = useCameraStore();
      return {
        x: camera.x,
        y: camera.y,
        width: state.canvas.width / camera.z,
        height: state.canvas.height / camera.z,
      };
    },
  },

  actions: {
    updateCanvasSize(width: number, height: number) {
      this.$patch({
        canvas: {
          width,
          height,
        },
      });
    },
  },
});
