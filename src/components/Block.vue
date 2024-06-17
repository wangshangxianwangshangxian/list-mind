<template>
  <div class="flex relative">
    <!-- left -->
    <div class="flex rounded-lg justify-center items-center z-50">
      <div :id="`block-l-${props.block.id}`" :class="['p-2', 'rounded-lg', 'flex', 'items-center', 'gap-2', props.block.style.backgroundColor]">
        <div></div>
        <div
          :id                  = "`block-content-${props.block.id}`"
          :class               = "content_class"
          v-html               = "props.block.id"
          :contenteditable     = "props.block.editable"
          @keydown.tab.prevent = "ontab"
          @blur                = "onblur"
          @input               = "oninput"
          @keydown.enter       = "onenter"
          @keydown.delete      = "ondelete"
          @keydown.up          = "e => ondirection(e, 'up')"
          @keydown.down        = "e => ondirection(e, 'down')"
          @keydown.right       = "e => ondirection(e, 'right')"
          @keydown.left        = "e => ondirection(e, 'left')"
          @click="onclick"
        ></div>
        <div></div>
      </div>
    </div>
    <!-- center -->
    <div :id="`block-c-box-${props.block.id}`" class="w-8 z-20 flex justify-center items-center" @mouseenter="onpathenter" @mouseleave="onpathleave">
      <svg v-if="show_children" width="100%" height="100%" class="absolute top-0 left-0">
        <path v-for="child in paths" :key="child.child_id" :d="child.path" fill="none" stroke="black" stroke-width="2"></path>
      </svg>
      <div 
        v-if="props.block.children.length > 0" 
        :class="expand_class"
        @click="onexpand"
      >
        {{  props.block.expand ? '-' : props.block.children.length }}
      </div>
    </div>
    <!-- right -->
    <div v-if="show_children" class="flex flex-col gap-2 justify-center z-50">
      <Block
        v-for="child in props.block.children" 
        :key             = "child.id" 
        :block           = "child"
        :refresh         = "props.refresh"
        @block-content   = "onblockcontent"
        @block-addchild  = "onblockaddchild"
        @block-direction = "onblockdirection"
        @block-delete    = "onblockdelete"
        @block-expand    = "onblockexpand"
        @block-click     = "onblockclick"
      ></Block>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    default() {
      return {
        id: 'da',
        content: 'content',
        expand: true,
        children: []
      }
    }
  },

  refresh: {
    type: Number,
    default: 0
  },
})

const show_children = computed(() => {
  if (!props.block.expand)
    return false
  return props.block.children.length > 0
})

const _refresh = ref(0)
const paths    = ref([])
const update_refresh = () => _refresh.value = Date.now()
watch(
  () => [props.refresh, _refresh],
  () => {
    nextTick(() => {
      const children = props.block.children
      paths.value.length = 0
      const left         = document.getElementById(`block-l-${props.block.id}`)?.getBoundingClientRect() || {}
      const center_box   = document.getElementById(`block-c-box-${props.block.id}`)?.getBoundingClientRect() || {}

      children.forEach(c => {
        const child      = document.getElementById(`block-l-${c.id}`)?.getBoundingClientRect() || {}
        
        const path = 
          `M ${left.width} ${left.y - center_box.y + left.height / 2}
           H ${left.width + center_box.width / 2}
           V ${child.y - center_box.y + child.height / 2}
           H ${left.width + child.x - center_box.x}
           `
        const data = {
          id: c.id,
          path
        }
        paths.value.push(data)
      })
    })
  },
  { immediate: true, deep: true }
)

// 一堆转发事件
const emits       = defineEmits(['block-content', 'block-addchild', 'block-direction', 'block-delete', 'block-expand', 'block-click'])
const onblur      = e => emits('block-content', props.block.id, e.target.innerHTML)
const ondelete    = e => e.metaKey && emits('block-delete', props.block.id)
const onenter     = e => e.metaKey && onblur(e)
const oninput     = () => update_refresh()
const ontab       = () => update_refresh() && emits('block-addchild',  props.block.id)
const onexpand    = () => emits('block-expand', props.block.id)
const onclick     = () => emits('block-click', props.block.id)
const ondirection = (e, dir) => e.metaKey && emits('block-direction', props.block.id, dir)

const onblockclick     = id => emits('block-click', id)
const onblockdelete    = id => emits('block-delete', id) && update_refresh()
const onblockexpand    = id => emits('block-expand', id)
const onblockaddchild  = id => emits('block-addchild', id) && update_refresh()
const onblockcontent   = (id, content) => emits('block-content', id, content)
const onblockdirection = (id, direction) => emits('block-direction', id, direction)

// 修改页面尺寸
onMounted(() => window.addEventListener('resize', update_refresh))
onUnmounted(() => window.removeEventListener('resize', update_refresh))

// 显示展开收缩按钮
const mouse_in_path_box = ref(false)
const onpathenter = () => mouse_in_path_box.value = true
const onpathleave = () => mouse_in_path_box.value = false
// 展开按钮样式
const expand_class = computed(() => {
  const cls = ['w-5', 'h-5', 'border', 'rounded-full', 'bg-white', 'z-50', 'text-xs', 'flex', 'justify-center', 'items-center', 'cursor-pointer']
  if (props.block.expand) {
    cls.push(mouse_in_path_box.value ? 'opacity-100' : 'opacity-0')
  }
  return cls
})

// 编辑box样式
const content_class = computed(() => {
  const arrs = ['min-w-12', 'min-h-6', 'text-center', 'focus:outline-none']
  props.block.visible  ? arrs.push('opacity-100') : arrs.push(...['opacity-0', 'cursor-pointer'])
  return arrs
})
</script>

