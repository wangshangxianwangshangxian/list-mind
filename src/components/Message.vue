<template>
  <div :class="box_classes" style="z-index: 7777777;">
    <!-- <Icon :name="ICON.HOME" /> -->

    <p v-if="props.options.use_html" v-html="props.message"></p>
    <p v-else>{{ props.message }}</p>
  </div>
</template>

<script setup>
import { BG_COLOR, BORDER_COLOR, ICON, MESSAGE } from '@/utils/constant';
import Icon from './base/Icon.vue'
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: MESSAGE.INFO
  },

  options: {
    type: Object,
    default() {
      return {
        use_html: false
      }
    }
  }
})

const box_classes = computed(() => {
  const arrs = ['flex gap-2 p-2 items-center rounded w-80']
  if (props.type === MESSAGE.INFO) {
    arrs.push(`${BG_COLOR.GRAY} border ${BORDER_COLOR.GRAY}`)
  }
  else if (props.type === MESSAGE.SUCCESS) {
    arrs.push(`${BG_COLOR.GREEN} border ${BORDER_COLOR.GREEN}`)
  }
  else if (props.type === MESSAGE.WARN) {
    arrs.push(`${BG_COLOR.YELLOW} border ${BORDER_COLOR.YELLOW}`)
  }
  else if (props.type === MESSAGE.ERROR) {
    arrs.push(`${BG_COLOR.RED} border ${BORDER_COLOR.RED}`)
  }
  return arrs
})
</script>