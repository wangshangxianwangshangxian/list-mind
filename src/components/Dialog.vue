<template>
  <BackgroundMask @bgclick="emits('c_close')" :bg="props.bg">
    <div :class="box_class" :style="box_style">
      <div class="pb-4 flex justify-between">
        <h1 class="font-bold text-lg">{{ props.title }}</h1>
        <button @click="emits('c_close')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <slot></slot>
      </div>
      <div class="flex justify-end gap-2 pt-4" v-if="show_footer">
        <button class="border py-2 px-4 rounded bg-red-400 hover:bg-red-500">cancel</button>
        <button class="border py-2 px-4 rounded hover:bg-blue-300">sure</button>
      </div>
    </div>
  </BackgroundMask>
</template>

<script setup>
import BackgroundMask from '@/components/BackgroundMask.vue'
import { computed } from 'vue'
const emits = defineEmits(['c_close'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: Number || String,
    default: 'auto'
  },
  bg: {
    type: String,
    default: 'bg-transparent'
  },
  show_footer: {
    type: Boolean,
    default: false
  }
})

const box_class = computed(() => {
  const arrs = ['shadow', 'rounded', 'flex', 'flex-col', 'p-4', 'border', 'dialog-box', 'bg-white']
  return arrs
})

const box_style = computed(() => {
  const style = {
    zIndex: 9999999999,
    width: `${props.width}px`,
  }
  return style
})

const onclose = () => {
  
}
</script>

<style scoped>
.dialog-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>