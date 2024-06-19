<template>
  <div :class="box_class" style="z-index: 999;">
    <div class="w-full h-full absolute z-0" @click="onbgclick"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  bg: {
    type: String,
    default: 'bg-transparent'
  }
})
const emits = defineEmits(['bgclick'])
const onbgclick = () => emits('bgclick')

const box_class = computed(() => {
  const arrs = ['w-screen', 'h-screen', 'fixed', 'top-0', 'left-0']
  arrs.push(props.bg)
  return arrs
})
</script>