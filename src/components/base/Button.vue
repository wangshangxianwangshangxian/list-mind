<template>
  <button :class="box_class" :disabled="props.disabled">
    <Icon v-if="props.icon" :name="props.icon"></Icon>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'default'
  },
  icon: {
    type: String,
    default: ''
  }
})

const box_class = computed(() => {
  const cls = ['py-1 px-2 rounded box-border flex gap-1 items-center justify-center']

  if (props.icon) {
    cls.push('text-black hover:text-blue-400 px-1')
    return cls
  }
  
  switch (props.type) {
    case 'default':
      cls.push(`bg-white text-black border hover:border-blue-400 hover:text-blue-400`)
      break
    case 'success':
      cls.push(`bg-green-50 border-green-400 text-green-400 border hover:bg-green-400 hover:border-green-400 hover:text-white`)
      break
    case 'danger':
      cls.push(`bg-red-50 border-red-400 text-red-400 border hover:bg-red-400 hover:border-red-400 hover:text-white`)
      break
    case 'simple':
      cls.push(`text-black hover:text-blue-400 px-1`)
      break
  }

  return cls
})
</script>