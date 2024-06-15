<template>
  <div class="flex">
    <!-- left -->
    <div class="flex rounded-lg justify-center items-center">
      <div :id="`block-l-${props.block.id}`" class="bg-orange-200 p-2 rounded-lg">
        <div></div>
        <div
          :id="`block-content-${props.block.id}`"
          contenteditable="true"
          class="min-w-12 min-h-4 text-center focus:outline-none"
          @blur="onblur"
          @keydown.tab.prevent="ontab"
          @keydown.up.prevent="e => ondirection(e, 'up')"
          @keydown.down.prevent="e => ondirection(e, 'down')"
          @keydown.right.prevent="e => ondirection(e, 'right')"
          @keydown.left.prevent="e => ondirection(e, 'left')"
        >
          {{ props.block.content }}
        </div>
        <div></div>
      </div>
    </div>
    <!-- center -->
    <div v-if="has_children" :id="`block-c-box-${props.block.id}`" class=" w-8">
      <svg width="100%" height="100%">
        <path v-for="child in paths" :key="child.child_id" :d="child.path" fill="none" stroke="black" stroke-width="2"></path>
      </svg>
    </div>
    <!-- right -->
    <div v-if="has_children" class="flex flex-col gap-2">
      <Block
        v-for="child in props.block.children" 
        :key="child.id" 
        :block="child"
        @block-content="onblockcontent"
        @block-addchild="onblockaddchild"
        @block-direction="onblockdirection"
      ></Block>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';


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
  () => props.block.children,
  children => {
    nextTick(() => {
      paths.value.length = 0
      children.forEach(c => {
        const left       = document.getElementById(`block-l-${props.block.id}`)?.getBoundingClientRect() || {}
        const center_box = document.getElementById(`block-c-box-${props.block.id}`)?.getBoundingClientRect() || {}
        const child      = document.getElementById(`block-l-${c.id}`)?.getBoundingClientRect() || {}
        
        const path = 
          `M 0 ${left.y - center_box.y + left.height / 2}
           H ${center_box.width / 2}
           V ${child.y - center_box.y + child.height / 2}
           H ${child.x - center_box.x}
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

const emits = defineEmits(['block-content', 'block-addchild', 'block-direction'])
const onblur       = e   => emits('block-content',   props.block.id, e.target.textContent)
const ontab        = ()  => emits('block-addchild',  props.block.id)
const ondirection  = (e, dir) => e.shiftKey && emits('block-direction', props.block.id, dir)

const onblockcontent   = (block_id, content)   => emits('block-content',   block_id, content)
const onblockaddchild  = block_id              => emits('block-addchild',  block_id)
const onblockdirection = (block_id, direction) => emits('block-direction', block_id, direction)
</script>

