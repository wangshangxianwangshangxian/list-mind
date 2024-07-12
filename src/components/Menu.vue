<template>
  <Mask :visible="props.visible" @close="emits('close')" />
  <div
    id    = "menu-box"
    class = "fixed p-1 bg-white rounded top-2 left-2 border shadow"
    :style= "box_style"
  >
    <div  v-for="item in props.menus" :key="item.key" class="flex hover:bg-gray-100 rounded p-2 cursor-pointer justify-between items-center gap-10" @click="emits('submit', item)">
      <p>{{ item.label }}</p>
      <p class=" text-gray-400 text-xs">{{ item.tips }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Mask from './base/Mask.vue'
import { POSITION } from '@/utils/constant';
const props = defineProps({
  visible : { type: Boolean, default: false },
  el_id   : { type: String,  default: '' },
  pointer : { type: Array,   default: () => null },
  position: { type: String,  default: POSITION.LEFT_BOTTOM },
  offset  : { type: Array,   default: () => { return [0, 10] } },
  menus   : {
    type: Array,
    default() {
      return []
    }
  },
})
const emits = defineEmits(['close', 'submit'])
const box_style = ref({ zIndex: 666666 })

onMounted(() => {
  const max_left = 9999999 // document.body.clientWidth - box_rect.width - 16
  const max_top  = 9999999 // document.body.clientHeight - box_rect.height - 16
  const el   = document.getElementById(props.el_id)
  if (!el)
  return
  const rect = el.getBoundingClientRect()
  if (props.position === POSITION.LEFT_BOTTOM) {
    box_style.value.left  = `${Math.min(rect.x + props.offset[0], max_left)}px`
    box_style.value.top   = `${Math.min(rect.y + rect.height + props.offset[1], max_top)}px`
  }
  else if (props.position === POSITION.RIGHT_TOP) {
    box_style.value.left  = `${Math.min(rect.x + rect.width  + props.offset[0], max_top)}px`
    box_style.value.top   = `${Math.min(rect.y + props.offset[1], max_top)}px`
  }
})
</script>