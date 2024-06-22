<template>
  <div class="flex flex-col items-center justify-center gap-20 h-screen">
    <div class="text-8xl" v-html="title"></div>
    <div class="flex gap-4 hover:text-green-400 cursor-pointer" @click="router.push('/')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
      </svg>
      List Mind
    </div>
  </div>
</template>
<script setup>
import router from '@/router';
import utils from '@/utils/utils';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const title   = ref('')
let   timer   = null

const handler = () => {
  const arrs  = ['「 ', '4', '0', '4', ' 」']
  title.value = ''
  arrs.forEach(a => {
    title.value += `<span class="${utils.get_text_color()}">${a} </span>`
  })
}
handler()

onMounted      (() => timer = setInterval(handler, 500))
onBeforeUnmount(() => clearInterval(timer))
</script>