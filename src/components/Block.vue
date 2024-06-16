<template>
  <div class="flex relative">
    <!-- left -->
    <div class="flex rounded-lg justify-center items-center z-50">
      <div :id="`block-l-${props.block.id}`" :class="['p-2', 'rounded-lg', props.block.style.backgroundColor]">
        <div></div>
        <div
          :id="`block-content-${props.block.id}`"
          :contenteditable="props.edit"
          :class="content_class"
          v-html="props.block.content"
          @blur="onblur"
          @input="oninput"
          @keydown.tab.prevent="ontab"
          @keydown.enter="onenter"
          @keydown.up="e => ondirection(e, 'up')"
          @keydown.down="e => ondirection(e, 'down')"
          @keydown.right="e => ondirection(e, 'right')"
          @keydown.left="e => ondirection(e, 'left')"
          @keydown.delete="ondelete"
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
        :key="child.id" 
        :block="child"
        :edit="props.edit"
        @block-content="onblockcontent"
        @block-addchild="onblockaddchild"
        @block-direction="onblockdirection"
        @block-delete="onblockdelete"
      ></Block>
    </div>
  </div>
</template>

<script setup>
import MainData from '@/stores/MainData';
import MindStore from '@/stores/MindStore';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';


const props = defineProps({
  block: {
    type: Object,
    default() {
      return {
        id: 'da',
        content: 'content',
        expand: false,
        children: []
      }
    }
  },

  edit: {
    type: Boolean,
    default: true
  }
})

const show_children = computed(() => props.block.expand && props.block.children.length > 0)

const paths = ref([])
watch(
  () => MainData().reszing,
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

const emits = defineEmits(['block-content', 'block-addchild', 'block-direction', 'block-delete'])
const oninput      = e  => {
  MainData().resize()
}

const onblur       = e   => emits('block-content',   props.block.id, e.target.innerHTML)
const ontab        = ()  => { 
  MainData().resize()
  emits('block-addchild',  props.block.id)
}
const ondirection  = (e, dir) => {
  if (!e.metaKey)
    return
  emits('block-direction', props.block.id, dir)
}
const ondelete     = e   => e.metaKey && emits('block-delete', props.block.id)
const onenter      = e   => e.metaKey && onblur(e)

const onblockcontent   = (id, content)   => emits('block-content',   id, content)
const onblockaddchild  = id => {
  emits('block-addchild',  id)
  MainData().resize()
}
const onblockdirection = (id, direction) => emits('block-direction', id, direction)
const onblockdelete    = id => {
  emits('block-delete',  id)
  MainData().resize()
}

onMounted(() => {
  window.addEventListener('resize', MainData().resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', MainData().resize)
})

const onexpand = () => {
  MindStore().toggle_expand(props.block.id)
  MainData().resize()
}

const mouse_in_path_box = ref(false)
const onpathenter = () => mouse_in_path_box.value = true
const onpathleave = () => mouse_in_path_box.value = false

const expand_class = computed(() => {
  const cls = ['w-5', 'h-5', 'border', 'rounded-full', 'bg-white', 'z-50', 'text-xs', 'flex', 'justify-center', 'items-center', 'cursor-pointer']
  if (props.block.expand) {
    cls.push(mouse_in_path_box.value ? 'opacity-100' : 'opacity-0')
  }
  return cls
})

const content_class = computed(() => {
  const arrs = ['min-w-12', 'min-h-6', 'text-center', 'focus:outline-none']
  if (MindStore().is_exam_mode() && !MindStore().is_open_in_exam(props.block.id)) {
    arrs.push('opacity-0')
    arrs.push('cursor-pointer')
  }
  return arrs
})
const onclick = () => {
  if (!MindStore().is_exam_mode()) {
    return
  }
  MindStore().toggle_in_exam(props.block.id)
}
</script>

