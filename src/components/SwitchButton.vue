<template>
  <div class="flex p-1 bg-gray-100 rounded">
    <div 
      v-for="(item, index) in props.labels" 
      :key="index" 
      :class="`px-2 cursor-pointer ${active === index ? 'bg-white' : ''}`"
      @click="onclick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  labels: {
    type: Array,
    default() {
      return ['周', '月', '年']
    }
  }
})

const emits = defineEmits(['c_swicth'])
const active = ref(0)
const onclick = index => {
  active.value = index
  emits('c_swicth', index)
}
</script>