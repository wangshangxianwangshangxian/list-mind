<template>
  <Card class="fixed top-1/2" :style="box_style" ref="chapter">
    <div class="flex flex-col gap-2 min-w-20 max-w-40" style="max-height: 400px;">
      <div class="flex flex-col gap-2 overflow-auto rounded">
        <div
          v-for="block in props.mind.mind.children" 
          :id    = "`mind-chapter-${block.id}`"
          :key   = "block.id"
          :class = "`border rounded ${ block.show ? block.style.backgroundColor : 'bg-white'} p-2 text-center cursor-pointer`"
          style  = "min-height: 42px;"
        >
          {{ block.content }}
        </div>
      </div>
      <div :class="`flex gap-2 items-center ${ props.editable ? 'justify-between' : 'justify-end' }`">
        <Button v-if="props.editable" class="w-full" :icon="ICON.ADD" @click="onadd" />
        <Button class="w-full" v-if="expand" :icon="ICON.LEFT2" @click="onexpand" />
                         <Icon v-else :name="ICON.RIGHT2" :hover="true" @click="onexpand" class="mr-2" />
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ICON } from '@/utils/constant';
import Card from './base/Card.vue';
import { computed, ref } from 'vue';
import block_add_child from '@/atom/block_add_child';
import Icon from './base/Icon.vue';

const emits = defineEmits('addchapter')

const props = defineProps({
  visible : { type: Boolean, default: true },
  editable: { type: Boolean, default: true },
  mind    : {
    type: Object,
    default() {
      return {
        mind: {
          id: '0',
          children: [
            // { id: '1', content: 'hello' },
            // { id: '2', content: 'hello2' },
            // { id: '3', content: 'hello3' },
            // { id: '4', content: 'hello4' },
          ]
        }
      }
    }
  }
})

const onadd = () => {
  const child = block_add_child(props.mind, props.mind.mind.id)
  emits('addchapter', child)
}

const expand = ref(true)
const onexpand = () => {
  expand.value = !expand.value
}

const chapter = ref(null)
const box_style = computed(() => {
  const style = {
    zIndex   : 55555,
    transform: 'translateY(-50%)'
  }
  if (expand.value) {
    style.left = '20px'
  }
  else {
    const rect = chapter.value.$el.getBoundingClientRect()
    style.left = `${-rect.width + 40}px`
  }
  return style
})
</script>