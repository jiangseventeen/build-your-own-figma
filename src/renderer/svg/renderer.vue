<template>
  <div class="svg-renderer" ref="rendererRef">
    <svg
      :width="editor.canvas.width"
      :height="editor.canvas.height"
      shape-rendering="crispEdges"
      :style="{ backgroundColor: editor.canvas.backgroundColor }"
    >
      <Grid v-if="camera.z > 4" />

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
import Grid from "./grid.vue";

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

  const resizeObserver = new ResizeObserver((entries) => {
    editor.updateCanvasSize(
      entries[0].contentRect.width,
      entries[0].contentRect.height
    );
  });

  if (rendererRef.value) {
    resizeObserver.observe(rendererRef.value);
  }
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
