<template>
  <div class="border px-2 py-1 rounded flex items-center justify-between box-border gap-2">
    <slot name="prepend"></slot>
    <input
      ref          = "input_ref"
      :type        = "props.type" 
      :value       = "props.modelValue"
      @input       = "oninput"
      :class       = "cls"
      :placeholder = "props.placeholder"
      @blur        = "onblur"
      :disabled    = "props.disabled"
    />
    <slot name="append"></slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  type       : { type: String,  default: 'text' },
  modelValue : { type: String,  default: '' },
  show_close : { type: Boolean, default: true },
  disabled   : { type: Boolean, default: false },
  placeholder: { type: String,  default: 'text' }
})

const cls = computed(() => {
  const cls = ['focus:outline-none flex-1 disabled:bg-white']
  return cls
})

const emit = defineEmits(['update:modelValue', 'blur'])
const oninput = e => {
  emit('update:modelValue', e.target.value)
}

const input_ref = ref(null)
const focus     = () => input_ref.value.focus()
defineExpose({ focus })

const onblur   = e => {
  emit('blur', e)
}
</script>