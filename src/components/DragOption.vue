<template>
  <div class="fixed w-full h-full left-0 top-0" style="z-index: 666667;" @mousemove="onmousemove" @mouseup="onmouseup">
    <svg class="w-full h-full pointer-events-none">
      <path :d="path" fill="none" stroke="red" stroke-width="4"></path>
    </svg>
    <span ref="target_box" class="fixed left-0 top-0 pointer-events-none">
      <div ref="target"></div>
    </span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import calc_distance from '@/utils/calc_distance';
import { BLOCK_H_SPACE, BLOCK_V_SPACE, DIRECTION, MOVE_VALID_DIS } from '@/utils/constant';
import calc_angle from '@/utils/calc_angle';
import get_block from '@/atom/get_block';
import paint_svg_path from '@/utils/paint_svg_path';
import move_block from '@/atom/move_block';
import block_is_chapter from '@/atom/block_is_chapter';

const emits = defineEmits(['c_mouseup'])
const direction_range = [
  [0,    90,  DIRECTION.RIGHT],
  [-90,  0,   DIRECTION.RIGHT],
  [-181, -90, DIRECTION.UP   ],
  [90,   181, DIRECTION.DOWN ]
]

const props = defineProps({
  target_id : { type: String, default: '' },
  candidates: { type: Array,  default: [] },
  mind      : { type: Object, default: () => { return {} } }
})
let candidate, dir
const path = ref('')

const target_box = ref(null)
const target     = ref(null)
onMounted(async () => {
  // 复制
  const el                  = document.getElementById(props.target_id)
  const rect                = el.getBoundingClientRect()
  target.value.innerHTML    = el.innerHTML
  target.value.classList    = el.classList
  target.value.style        = el.style

  // 初始化位置
  update_box_position(rect.x, rect.y)
})

const onmousemove = e => {
  // 更新副本位置
  update_box_position(e.x, e.y)
  
  // 获取有效范围内的候选名单
  candidate = props.candidates.find(el_id => {
    const c_rect = document.getElementById(el_id)?.getBoundingClientRect()
    if (!c_rect) return false
    
    if (
      e.x >= c_rect.x && e.y >= c_rect.y &&
      e.x <= c_rect.x + c_rect.width     &&
      e.y <= c_rect.y + c_rect.height
    ) {
      return true
    }
    
    return false
  })

  if (!candidate)
    return path.value = ''
  
  const candidate_rect = document.getElementById(candidate).getBoundingClientRect()
  const center_x       = candidate_rect.x + candidate_rect.width  / 2
  const center_y       = candidate_rect.y + candidate_rect.height / 2
  const angle          = calc_angle(center_x, center_y, e.x, e.y)
  const direction      = direction_range.find(r => (angle >= r[0] && angle < r[1]))

  if (direction[2]     === DIRECTION.RIGHT) {
    dir = DIRECTION.RIGHT
    let end_x, end_y
    const start_x      = candidate_rect.x + candidate_rect.width
    const start_y      = candidate_rect.y + candidate_rect.height / 2
    const block        = get_block(props.mind, candidate.split('-')[2])
    const child        = block.children[block.children.length - 1]
    if (!child) {
      end_x            = start_x          + BLOCK_H_SPACE
      end_y            = candidate_rect.y + candidate_rect.height / 2
    }
    else {
      const child_rect = document.getElementById(`block-l-${child.id}`).getBoundingClientRect()
      end_x            = child_rect.x
      end_y            = child_rect.y + child_rect.height + BLOCK_V_SPACE / 2
    }
    path.value         = paint_svg_path(start_x, start_y, end_x, end_y)
  }
  else if ([DIRECTION.DOWN, DIRECTION.UP].includes(direction[2])) {
    dir = direction[2]
    const block        = get_block(props.mind, candidate.split('-')[2])
    if (block_is_chapter(props.mind, block.id))
      return
    const parent       = get_block(props.mind, block.pid)
    const parent_rect  = document.getElementById(`block-l-${parent.id}`).getBoundingClientRect()
    const start_x      = parent_rect.x + parent_rect.width
    const start_y      = parent_rect.y + parent_rect.height / 2
    const end_x        = candidate_rect.x
    const end_y        = direction[2] === DIRECTION.DOWN ? 
                          candidate_rect.y + candidate_rect.height + BLOCK_V_SPACE / 2 :
                          candidate_rect.y - BLOCK_V_SPACE / 2
    path.value         = paint_svg_path(start_x, start_y, end_x, end_y)
  }
  else {
    path.value = ''
  }
}

const update_box_position = (x, y) => {
  target_box.value.style.left = `${x}px`
  target_box.value.style.top  = `${y}px`
}

const onmouseup = () => {
  if (!path.value) {
    emits('c_mouseup')
    return
  }
  if (dir === DIRECTION.RIGHT) {
    const [c, d, id]  = props.target_id.split('-')
    const [a, b, pid] = candidate.split('-')
    const p_block     = get_block(props.mind, pid)
    move_block(props.mind, pid, id, p_block.children.length)
  }
  else if ([DIRECTION.DOWN, DIRECTION.UP].includes(dir)) {
    const [c, d, id] = props.target_id.split('-')
    const block      = get_block(props.mind, candidate.split('-')[2])
    const p_block    = get_block(props.mind, block.pid)
    let   index      = p_block.children.findIndex(a => a.id === block.id)
    index            = dir === DIRECTION.DOWN ? ++index : Math.max(--index, 0)
    move_block(props.mind, p_block.id, id, index)
  }
  emits('c_mouseup')
}
</script>