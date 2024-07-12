<template>
  <div class="flex relative" v-show="props.block.show">
    <!-- left -->
    <div
      class="center-center z-50 shrink-0"
    >
      <div :class="left_box_class" :id="`block-l-${props.block.id}`">
        <div></div>
        <div
          :contenteditable="props.block.editable"
          :class="content_class"
          :id    = "`block-content-${props.block.id}`"
          v-html = "props.block.content"
        />
        <div></div>
      </div>
    </div>
    <!-- center -->
    <div class="block-c-box w-8 shrink-0 center-center" :id="`block-c-box-${props.block.id}`" @mouseover="onmouseover" @mouseleave="onmouseleave">
      <svg v-if="show_children" width="100%" height="100%" class="absolute top-0 left-0">
        <path v-for="child in paths" :key="child.child_id" :d="child.path" fill="none" stroke="black" stroke-width="2"></path>
      </svg>
      <div v-if="show_expand" @click="onexpand" class="block-c-box-expand cursor-pointer w-5 h-5 border rounded-full bg-white text-xs center-center" style="z-index: 55555;">
        {{ props.block.expand ? '-' : props.block.children.length }}
      </div>
    </div>
    <!-- right -->
    <div v-if="show_children" class="flex flex-col gap-2 shrink-0">
      <Block v-for="child in props.block.children" :key="child.id" :block="child" :refresh="props.refresh" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';

const props = defineProps({
  drag : { type: Boolean, default: true },
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
  refresh: { type: Number, default: 0 },
})

const refresh        = ref(0)
const update_refresh = () => refresh.value = Date.now()
const paths = ref([])
watch(
  () => [props.refresh, refresh],
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

const left_box_class = computed(() => {
  const cls = ['rounded-lg p-2']
  cls.push(props.block.style.backgroundColor)
  return cls
})

const onexpand = () => {
  props.block.expand = !props.block.expand
  update_refresh()
}

const show_children = computed(() => {
  update_refresh()
  return props.block.children.length && props.block.expand
})

const show_expand = ref(!props.block.expand && props.block.children.length > 0)
const onmouseover = () => {
  if (!props.block.expand)
    return
  show_expand.value = props.block.children.length > 0
}
const onmouseleave = () => {
  if (!props.block.expand)
  return
  show_expand.value = false
}

const content_class = computed(() => {
  const cls = ['focus:outline-none min-w-6 min-h-6']
  props.block.visible  ? cls.push('opacity-100') : cls.push(...['opacity-0', 'cursor-pointer'])
  return cls
})
</script>

<style scoped>
</style>
