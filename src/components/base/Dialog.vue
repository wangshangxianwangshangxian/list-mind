<template>
  <Mask :visible="props.visible" @close="emits('close')" />
  <div 
    v-if="props.visible" 
    class="fixed top-1/2 left-1/2 rounded min-w-96 bg-white overflow-hidden shadow border"
    style="transform: translate(-50%, -50%); z-index: 666667;"
  >
    <div :class="`pl-4 pr-2 py-2 between-center ${get_bg_color()}`">
      <div class="text-lg">{{ props.title }}</div>
      <Button type="simple" @click="emits('close')">
        <Icon :name="ICON.CLOSE" />
      </Button>
    </div>
    <div class="px-4 my-4">
      {{ props.content }}
      <slot></slot>
    </div>
    <div class="end-center gap-2 px-4 pb-4">
      <Button @click="emits('close')">取消</Button>
      <Button @click="emits('submit')">确定</Button>
    </div>
  </div>
</template>

<script setup>
import Mask from './Mask.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import { ICON } from '@/utils/constant';
import get_bg_color from '@/utils/get_bg_color';

const props = defineProps({
  visible: { type: Boolean, default: false },
  title  : { type: String,  default: '弹窗标题' },
  content: { type: String,  default: '' }
})
const emits = defineEmits(['close', 'submit'])
</script>