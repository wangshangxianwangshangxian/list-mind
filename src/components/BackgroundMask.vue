<template>
  <div class="w-screen h-screen fixed top-0 left-0" style="z-index: 999;">
    <div class="w-full h-full absolute z-0" @click="onbgclick"></div>
    <slot></slot>
  </div>
</template>

<script setup>
const emits = defineEmits(['bgclick'])
const onbgclick = () => emits('bgclick')
</script>