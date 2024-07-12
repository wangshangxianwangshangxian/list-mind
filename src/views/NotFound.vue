<template>
  <div class="flex flex-col items-center justify-center gap-20 h-screen">
    <div class="text-8xl" v-html="title"></div>
    <Button @click="router.push('/')">
      <Icon :name="ICON.HOME" />
      List Mind
    </Button>
  </div>
</template>
<script setup>
import generate_color_text from '@/atom/generate_color_text';
import router from '@/router';
import { ICON } from '@/utils/constant';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const title   = ref('')
let   timer   = null

const handler = () => title.value = generate_color_text('「404」')
handler()

onMounted      (() => timer = setInterval(handler, 500))
onBeforeUnmount(() => clearInterval(timer))
</script>