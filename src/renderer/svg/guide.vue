<template>
  <g>
    <rect
      x="0"
      y="0"
      :width="editor.canvas.width"
      :height="editor.ui.ruler.width"
      fill="white"
    ></rect>
    <rect
      x="0"
      y="0"
      :width="editor.ui.ruler.width"
      :height="editor.canvas.height"
      fill="white"
    ></rect>
    <path :d="horizontalPath" stroke="var(--ruler-color)"></path>
    <line
      :x1="0"
      :y1="editor.ui.ruler.width"
      :x2="editor.canvas.width"
      :y2="editor.ui.ruler.width"
      stroke="var(--ruler-color)"
      stroke-width="0.5"
    ></line>
    <text
      v-for="tick in horizontalTicks"
      :x="tick.offset * camera.z"
      :y="editor.ui.ruler.width - 9"
      font-family="Arial"
      text-anchor="middle"
      font-weight="normal"
      font-size="10"
      fill="var(--ruler-color)"
    >
      {{ tick.label }}
    </text>
    <path :d="verticalPath" stroke="var(--ruler-color)"></path>
    <line
      :x1="editor.ui.ruler.width"
      :y1="0"
      :x2="editor.ui.ruler.width"
      :y2="editor.canvas.height"
      stroke="var(--ruler-color)"
      stroke-width="0.5"
    ></line>
    <text
      v-for="tick in verticalTicks"
      :x="editor.ui.ruler.width - 9"
      :y="tick.offset * camera.z"
      text-anchor="middle"
      :transform="`rotate(-90, ${editor.ui.ruler.width - 9}, ${
        tick.offset * camera.z
      })`"
      font-size="10"
      font-family="Arial"
      font-weight="normal"
      fill="var(--ruler-color)"
    >
      {{ tick.label }}
    </text>
    <rect
      fill="white"
      :width="editor.ui.ruler.width - 1"
      :height="editor.ui.ruler.width - 1"
    ></rect>
  </g>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCameraStore } from "../../stores/camera";
import { useEditorStore } from "../../stores/editor";
import useTicks from "./hooks/useTicks";

const TICK_LENGTH = 4;

const camera = useCameraStore();
const editor = useEditorStore();

const x = computed(() => editor.viewport.x);
const y = computed(() => editor.viewport.y);
const width = computed(() => editor.viewport.width);
const height = computed(() => editor.viewport.height);
const precision = computed(() => camera.precision);

const horizontalTicks = useTicks(x, width, precision);
const verticalTicks = useTicks(y, height, precision);

const horizontalPath = computed(() => {
  const paths: string[] = [];
  const rulerWidth = editor.ui.ruler.width;

  horizontalTicks.value.forEach((tick) => {
    paths.push(
      `M ${tick.offset * camera.z} ${rulerWidth}  L ${tick.offset * camera.z} ${
        rulerWidth - TICK_LENGTH
      }`
    );
  });

  return paths.join(" ");
});

const verticalPath = computed(() => {
  const paths: string[] = [];
  const rulerWidth = editor.ui.ruler.width;

  verticalTicks.value.forEach((tick) => {
    paths.push(
      `M ${rulerWidth} ${tick.offset * camera.z}  L ${
        rulerWidth - TICK_LENGTH
      } ${tick.offset * camera.z}`
    );
  });

  return paths.join(" ");
});
</script>

<style scoped>
.guide {
  position: absolute;
  width: 100%;
  height: 100%;

  .cross-block {
    border-width: 0 1px 1px 0;
    border-color: var(--ruler-color);
    border-style: solid;
    width: var(--ruler-width);
    height: var(--ruler-width);
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
