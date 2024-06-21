<script setup>
import { RouterView } from 'vue-router'
import MainData from './stores/MainData';
MainData().init_hots()
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
