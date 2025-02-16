<template>
  <div class="svg-renderer" ref="rendererRef">
    <svg
      :width="editor.canvas.width"
      :height="editor.canvas.height"
      shape-rendering="crispEdges"
    >
      <g :style="canvasStyles">
        <!-- layers renderer -->
        <rect width="100" height="100" fill="red" />
      </g>
      <!-- guide  -->
      <Guide />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCameraStore } from "../../stores/camera";
import { useEditorStore } from "../../stores/editor";
import Guide from "./guide.vue";

const rendererRef = ref<HTMLElement>();
const camera = useCameraStore();
const editor = useEditorStore();

const canvasStyles = computed(() => {
  return {
    transformOrigin: "0 0",
    transform: `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`,
  };
});

onMounted(() => {
  editor.updateCanvasSize(
    rendererRef.value!.clientWidth,
    rendererRef.value!.clientHeight
  );
});
</script>

<style scoped>
.svg-renderer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
