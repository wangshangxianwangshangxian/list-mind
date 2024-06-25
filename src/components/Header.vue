<template>
  <header class="sticky top-0 left-0 w-full h-11 flex items-center px-8 mb-4 bg-white" style="z-index: 999999999;">
    <div class="flex-1 shrink-0 flex gap-4">
      <div class="flex gap-4">
        <svg v-if="show_home" @click="onhome" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
        <slot name="icon"></slot>
      </div>
      <div class="font-bold text-xl">{{ title }}</div>
    </div>
    <div class="flex-1"></div>
    <div class="flex-1 shrink-0">
      <slot name="right-box"></slot>
    </div>
  </header>
</template>

<script setup>
import router from '@/router'
const props = defineProps({
  show_home: {
    type: Boolean,
    default: true
  },

  title: {
    type: String,
    default: ''
  }
})

const onhome = () => router.push('/')
</script>