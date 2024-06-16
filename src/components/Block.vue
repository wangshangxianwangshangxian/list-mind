<template>
  <div class="flex relative">
    <!-- left -->
    <div class="flex rounded-lg justify-center items-center z-50">
      <div :id="`block-l-${props.block.id}`" :class="['p-2', 'rounded-lg', props.block.style.backgroundColor]">
        <div></div>
        <div
          :id="`block-content-${props.block.id}`"
          contenteditable="true"
          class="min-w-12 min-h-4 text-center focus:outline-none"
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
        ></div>
        <div></div>
      </div>
    </div>
    <!-- center -->
    <div v-if="has_children" :id="`block-c-box-${props.block.id}`" class="w-8 z-20">
      <svg width="100%" height="100%" class="absolute top-0 left-0">
        <path v-for="child in paths" :key="child.child_id" :d="child.path" fill="none" stroke="black" stroke-width="2"></path>
      </svg>
    </div>
    <!-- right -->
    <div v-if="has_children" class="flex flex-col gap-2 justify-center z-50">
      <Block
        v-for="child in props.block.children" 
        :key="child.id" 
        :block="child"
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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';


const props = defineProps({
  block: {
    type: Object,
    default() {
      return {
        id: 'da',
        content: 'content',
        children: []
      }
    }
  }
})

const has_children = computed(() => props.block.children.length > 0)

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
const oninput      = e  => {MainData().resize()}

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
</script>

