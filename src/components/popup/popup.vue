<script lang="ts" setup>

const props = withDefaults(defineProps<{
  x?: number
  y?: number
}>(), {x: 0, y: 0})

</script>

<template>

<div class="popup" :style="{left: props.x, top: props.y}">
  <slot></slot>
</div>

</template>

<style scoped>
.popup {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  transform: translate(-50%, 0);
}
</style>