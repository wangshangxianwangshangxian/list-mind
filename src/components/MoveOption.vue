<template>
  <BackgroundMask @mousemove="onmousemove" @mouseup="onmouseup" bg="bg-black-30">
    <svg width="100%" height="100%">
      <path :d="path" fill="none" stroke="red" stroke-width="2"></path>
    </svg>
    <div id="target" style="position: absolute;" class="pointer-events-none"></div>
  </BackgroundMask>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BackgroundMask from './BackgroundMask.vue'
import MindStore from '@/stores/MindStore';
import utils from '@/utils/utils';
import { DIRECTION, MOVE_MAX_DSITANCE } from '@/stores/constant';


const props = defineProps({
  move_el: {
    typeo: Object,
    default() {
      return {
        el      : document.body,
        offset_x: 0,
        offset_y: 0
      }
    }
  }
})

onMounted(() => {
  const el            = props.move_el.el
  const rect          = el.getBoundingClientRect()
  const target        = document.getElementById('target')
  target.innerHTML    = el.innerHTML
  target.classList    = el.classList
  target.style.width  = `${rect.width}px`
  target.style.height = `${rect.height}px`

  target.style.left   = `${rect.left + window.scrollX}px`
  target.style.top    = `${rect.top  + window.scrollY}px`
})

const emits = defineEmits(['c_mouseup'])
const onmouseup = () => {
  emits('c_mouseup', move_parent_id.value, move_index.value)
}

const onmousemove = e => {
  const target      = document.getElementById('target')
  target.style.left = `${e.clientX}px`
  target.style.top  = `${e.clientY}px`
  const rect   = target.getBoundingClientRect()

  // 找到离 target 最近的 block
  const blocks      = MindStore().blocks
  const valid_block = { distance: 0, target: null, rect: null }
  for (let i = 0; i < blocks.length; i++) {
    const block    = blocks[i]
    const el       = document.getElementById(`block-l-${block.id}`)
    if (!el) continue
    const el_rect  = el.getBoundingClientRect()
    const distance = utils.calc_distance(rect.x, rect.y, el_rect.x, el_rect.y)
    if (distance > MOVE_MAX_DSITANCE) continue
    
    if (!valid_block.target) {
      valid_block.target   = block
      valid_block.distance = distance
      valid_block.rect     = el_rect
      continue
    }
    
    if (distance < valid_block.distance) {
      valid_block.target   = block
      valid_block.distance = distance
      valid_block.rect     = el_rect
    }
  }

  if (!valid_block.target) return
  const angle = utils.calc_angle(valid_block.rect.x, valid_block.rect.y, rect.x, rect.y)
  const ranges = [
    [0   ,   45, DIRECTION.RIGHT],
    [45  ,  135, DIRECTION.DOWN ],
    [135 ,  180, DIRECTION.LEFT ],
    [-45  ,   0, DIRECTION.RIGHT],
    [-135 , -45, DIRECTION.UP   ],
    [-181, -135, DIRECTION.LEFT ]
  ]
  const range = ranges.find(r => (angle >= r[0] && angle < r[1]))
  if (!range) return
  show_path(valid_block.target, range[2])
}

const path           = ref('')
const move_parent_id = ref()
const move_index     = ref(0)
const show_path = (block, dir) => {
  const p_block    = MindStore().get_block(block.pid)
  
  const block_el   = document.getElementById(`block-l-${block.id}`)
  const p_block_el = document.getElementById(`block-l-${p_block.id}`)

  if (!block_el || !p_block_el) return

  const block_rect   = block_el.getBoundingClientRect()
  const p_block_rect = p_block_el.getBoundingClientRect()
  
  if (dir === DIRECTION.DOWN) {
    const index = MindStore().get_block_index(block.id)
    const p_block = MindStore().get_block(block.pid)
    const next_block = p_block.children[index + 1]
    let offset_y = 0
    if (next_block) {
      const tmp_rect = document.getElementById(`block-l-${next_block.id}`).getBoundingClientRect()
      offset_y = (tmp_rect.y - block_rect.y) / 2
    }
    else {
      offset_y = block_rect.height
    }

    const start_x = p_block_rect.x + p_block_rect.width
    const start_y = p_block_rect.y + p_block_rect.height / 2
    const end_x   = block_rect.x
    const end_y   = block_rect.y + block_rect.height / 2 + offset_y
    const turn_x  = (start_x + end_x) / 2
    path.value = 
      `M ${start_x} ${start_y}
       H ${turn_x}
       V ${end_y}
       H ${end_x} 
      `
    
    move_parent_id.value = p_block.id
    move_index.value     = Math.min(p_block.children.length, index + 1)
  }
}
</script>