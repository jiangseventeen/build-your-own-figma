import { defineStore } from "pinia";
import { useCameraStore } from "./camera";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    ruler: {
      width: 20,
      enabled: true,
      color: "#C2C2C2",
    },
    canvas: {
      width: 0,
      height: 0,
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
