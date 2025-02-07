<template>
  <div class="canvas">
    <div class="canvas-renderer" :style="canvasStyles">
      <!-- layers renderer -->

      <div
        class="layer"
        style="background-color: red; width: 100px; height: 100px"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCameraStore } from "../stores/camera";
import { computed } from "vue";

const camera = useCameraStore();

const canvasStyles = computed(() => {
  return {
    transform: `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`,
  };
});
</script>

<style scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.canvas-renderer {
  transform-origin: 0 0;
}
</style>
