<template>
  <div class="overlays" ref="overlaysRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCameraStore } from "../stores/camera";

const overlaysRef = ref<HTMLElement>();
const camera = useCameraStore();

onMounted(() => {
  overlaysRef.value?.addEventListener("wheel", (event: WheelEvent) => {
    event.preventDefault();

    if (event.ctrlKey) {
      camera.zoom({ x: event.offsetX, y: event.offsetY }, event.deltaY / 100);
    } else {
      camera.pan(event.deltaX, event.deltaY);
    }
  });
});
</script>

<style scoped>
.overlays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
