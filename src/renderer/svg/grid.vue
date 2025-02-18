<template>
  <defs>
    <pattern
      id="pixelGrid"
      :width="zoom"
      :height="zoom"
      patternUnits="userSpaceOnUse"
    >
      <line
        :x1="offsetXInPixel * zoom"
        :y1="0"
        :x2="offsetXInPixel * zoom"
        :y2="zoom"
        stroke="rgb(0,0,0,0.05)"
      />
      <line
        :x1="0"
        :y1="offsetYInPixel * zoom"
        :x2="zoom"
        :y2="offsetYInPixel * zoom"
        stroke="rgb(0,0,0,0.05)"
      />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#pixelGrid)" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCameraStore } from "../../stores/camera";

const camera = useCameraStore();

const offsetXInPixel = computed(() =>
  camera.x % 1 < 0 ? 1 + (camera.x % 1) : camera.x % 1
);
const offsetYInPixel = computed(() =>
  camera.y % 1 < 0 ? 1 + (camera.y % 1) : camera.y % 1
);

const zoom = computed(() => camera.z);
</script>
