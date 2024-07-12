<template>
  <header class="sticky top-0 left-0 w-full h-11 flex items-center px-8 mb-4 bg-white" style="z-index: 55555;">
    <div class="flex-1 shrink-0 flex gap-4">
      <div class="flex">
        <Button :icon="ICON.BACK" v-if="show_back" @click="router.back()"/>
        <Button :icon="ICON.HOME" v-if="show_home" @click="router.push({ name: 'home' })" />
        <Button v-if="props.icon" :icon="props.icon" />
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
import { ICON } from '@/utils/constant';
const props = defineProps({
  show_home: { type: Boolean, default: true },
  show_back: { type: Boolean, default: true },
  title    : { type: String,  default: '' },
  icon     : { type: String,  default: '' }
})

const onhome = () => router.push('/')
const onback = () => router.back()
</script>