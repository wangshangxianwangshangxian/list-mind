<template>
  <div :class="box_class" :style="box_style">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  width: {
    type: Number || String,
    default: 100
  }
})

const box_class = computed(() => {
  const arrs = ['shadow', 'rounded', 'flex', 'flex-col', 'min-w-10', 'p-4', 'border']
  return arrs
})

const box_style = computed(() => {
  const style = {
    width: `${props.width}px`
  }
  return style
})
</script>