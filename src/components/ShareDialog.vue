<template>
  <Dialog title="分享" bg="bg-black-30" @c_close="onclose">
    <div class="text-sm" style="width: 600px;">
      <h1 :class="`${utils.get_text_color()}`">公钥地址</h1>
      <div class="flex gap-1 items-center mt-2 mb-4">
        <svg @click="oncopy(PASTE.ADDRESS)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
        <a>{{ props.address }}</a>
      </div>
      <h1 :class="`${utils.get_text_color()}`">读者模式</h1>
      <div class="flex gap-1 items-center mt-2 mb-4">
        <svg @click="oncopy(PASTE.GUEST)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
        <a :href="`#/mind/${props.address}`" target="_blank" class="border-b">{{ link }}</a>
      </div>
      <h1 :class="`${utils.get_text_color()}`">数据分析</h1>
      <div class="flex gap-1 items-center mt-2 mb-4">
        <svg @click="oncopy(PASTE.ANALYZE)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
        <a :href="`#/dashboard/${props.address}`" target="_blank" class="border-b">{{ analyze }}</a>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '@/components/Dialog.vue'
import { MESSAGE_TYPE } from '@/stores/constant';
import utils from '@/utils/utils';
import { computed, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()
const PASTE = {
  ADDRESS : 'address',
  GUEST   : 'guest',
  ANALYZE : 'analyze'
}

const props = defineProps({
  address: {
    type: String,
    default: ''
  }
})

const link    = computed(() => location.origin + '/#/mind/' + props.address)
const analyze = computed(() => location.origin + '/#/dashboard/' + props.address)

const oncopy = type => {
  let text = ''
  if (type === PASTE.ADDRESS) {
    text = props.address
  }
  else if (type === PASTE.GUEST) {
    text = link.value
  }
  else if (type === PASTE.ANALYZE) {
    text = analyze.value
  }

  navigator.clipboard.writeText(text)
  .then(() => proxy.$message('粘贴成功', MESSAGE_TYPE.SUCCESS))
  .catch(() => proxy.$message('粘贴失败', MESSAGE_TYPE.ERROR))
}

const emits = defineEmits(['c_close'])
const onclose = () => emits('c_close')
</script>