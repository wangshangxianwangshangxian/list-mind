<template>
  <div class="loading flex gap-1 w-full h-full items-center justify-center bg-white" style="z-index: 9999999999;">
    <div v-for="(c, index) in color" :key="index" :class="`w-2 h-2 rounded-full ${c}`"></div>
  </div>
</template>

<script setup>
import utils from '@/utils/utils';
import { onBeforeUnmount, ref } from 'vue';

const props = defineProps({
  amount: {
    type: Number,
    default: 5
  }
})

const color   = ref([])
const update_color = () => {
  color.value.length = 0
  new Array(props.amount).fill(0).forEach(a => {
    const c = utils.get_bg_color()
    color.value.push(c)
  })
}
update_color()
let timer = setInterval(update_color, 200)
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.loading {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)
}
</style>