<template>
  <div
    v-if="props.visible"
    @click="emits('close')"
    :class="`fixed left-0 top-0 right-0 bottom-0 ${props.bg}`"
    style="z-index: 666666;"
  />
</template>

<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false },
  bg     : { type: String,  default: '' }
})
const emits = defineEmits(['close'])
</script>