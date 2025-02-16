<template>
  <div class="editor-container">
    <div class="viewport">
      <SVGRenderer />
      <Overlays />
    </div>
  </div>
</template>

<script setup lang="ts">
import SVGRenderer from "./renderer/svg/renderer.vue";
import Overlays from "./ui/overlays.vue";
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.editor-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.viewport {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
