<template>
  <div class="absolute top-1/2 left-1/2 flex flex-col gap-2" style="transform: translate(-50%, -50%);">
    <div class="h-4" v-loading></div>
    <div class="flex flex-col gap-2 justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
      {{ proxy.$lang('移动端于8月上线') }}
    </div>
    <div class="h-4" v-loading></div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
</script>