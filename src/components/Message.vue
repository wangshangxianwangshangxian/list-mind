<template>
  <div :class="box_classes">
    {{ props.message }}
  </div>
</template>

<script setup>
import { MESSAGE_TYPE } from '@/stores/constant';
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'success'
  },

  options: {
    type: Object,
    default() {
      return {

      }
    }
  }
})

const box_classes = computed(() => {
  const arrs = ['fixed', 'top-10', 'left-1/2', 'p-2', 'rounded', 'min-w-60', 'text-center', '-translate-x-1/2', 'z-50']
  if (props.type === MESSAGE_TYPE.SUCCESS) {
    arrs.push('bg-green-300')
  }
  else if (props.type === MESSAGE_TYPE.WARN) {
    arrs.push('bg-yellow-300')
  }
  else if (props.type === MESSAGE_TYPE.INFO) {
    arrs.push('bg-gray-100')
  }
  else if (props.type === MESSAGE_TYPE.ERROR) {
    arrs.push('bg-red-300')
  }
  return arrs
})
</script>