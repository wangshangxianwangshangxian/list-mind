<template>
  <Header title="设置" :icon="ICON.SETTING" />
  <div class="h-96 flex items-center justify-center flex-col">
    <p>当前公测版本 {{ VERSION }}</p>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ICON, VERSION } from '@/utils/constant';
</script>