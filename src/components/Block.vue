<template>
  <div class="flex">
    <!-- left -->
    <div class="flex rounded-lg justify-center items-center">
      <div :id="`block-l-${props.block.id}`" class="bg-orange-200 p-2 rounded-lg">
        <div></div>
        <div contenteditable="true" class="min-w-4 min-h-4 text-center focus:outline-none">{{ props.block.id }}</div>
        <div></div>
      </div>
    </div>
    <!-- center -->
    <div :id="`block-c-box-${props.block.id}`" class="w-8">
      <svg width="100%" height="100%">
        <path v-for="child in paths" :key="child.child_id" :d="child.path" fill="none" stroke="black" stroke-width="2" stroke-linejoin="round"></path>
      </svg>
    </div>
    <!-- right -->
    <div class="flex flex-col gap-2">
      <Block v-for="child in props.block.children" :key="child.id" :block="child"></Block>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onUnmounted, ref, watch } from 'vue';


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

const paths = ref([])
let delay_timer = null
watch(
  () => props.block.children,
  children => {
    nextTick(() => {
      paths.value.length = 0
      children.forEach(c => {
        const left       = document.getElementById(`block-l-${props.block.id}`)?.getBoundingClientRect()
        const center_box = document.getElementById(`block-c-box-${props.block.id}`)?.getBoundingClientRect()
        const child      = document.getElementById(`block-l-${c.id}`)?.getBoundingClientRect()
        
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
  { immediate: true }
)
onUnmounted(() => {
  clearTimeout(delay_timer)
})
</script>

