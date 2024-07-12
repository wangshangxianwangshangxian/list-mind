<template>
  <div class="center-center flex-col w-screen h-screen">
    <p v-html="title" class="text-2xl"></p>
    <div class="flex items-center">
      <Button :icon="ICON.MOBILE" />
      <p>移动端于8月上线...</p>
    </div>
  </div>
</template>

<script setup>
import generate_color_text from '@/atom/generate_color_text';
import { ICON } from '@/utils/constant';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const title = ref('')
title.value = generate_color_text('List Mind')
let timer
onMounted(() => timer = setInterval(() => title.value = generate_color_text('List Mind'), 1000))
onBeforeUnmount(() => clearInterval(timer))
</script>