<template>
  <div class="center-center fixed top-0 bottom-0 left-0 right-0" style="background-color: rgba(0, 0, 0, 0.1); z-index: 7777777;">
    <div v-html="title" class="font-bold"></div>
  </div>
  <!-- <div class="center-center relative" :style="box_style">
    <div v-html="title" class="font-bold"></div>
  </div> -->
</template>

<script setup>
import get_text_color from '@/utils/get_text_color';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  width     : { type: Number,  default: 20 },
  height    : { type: Number,  default: 20 },
  fullscreen: { type: Boolean, default: false }
})

const box_style = computed(() => {
  const style = {
    width          : `${props.width}px`,
    height         : `${props.height}px`,
    top            : `${-props.height}px`,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    zIndex         : 7777777
  }

  if (props.fullscreen) {
    
    style.fixed  = true
    style.top    = 0
    style.bottom = 0
    style.left   = 0
    style.right  = 0
  }

  return style
})

const title   = ref('')
let   timer   = null

const handler = () => {
  const arrs  = ['L', 'i', 's', 't', '&nbsp;', 'M', 'i', 'n', 'd']
  title.value = ''
  arrs.forEach(a => {
    title.value += `<span class="${get_text_color()}">${a} </span>`
  })
}
handler()

onMounted      (() => timer = setInterval(handler, 500))
onBeforeUnmount(() => clearInterval(timer))
</script>