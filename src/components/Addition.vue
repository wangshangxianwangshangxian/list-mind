<template>
  <Card v-if="props.visible" class="fixed top-10 left-1/2 p-2 w-96 bg-white" style="transform: translateX(-50%); z-index: 666666;">
    <div class="flex flex-col gap-2">
      <div class="flex justify-between items-center">
        <div class="flex gap-2 overflow-x-auto">
          <Button v-for="item in list" :type="`${ active === item.key ? 'success' : 'simple'}`" class="shrink-0" @click="active = item.key">
            {{ item.label }}
          </Button>
        </div>
        <!-- <Button :icon="ICON.HOME"></Button> -->
      </div>
      <div class="">
        <Input v-if="active === ADDITION.LINK" placeholder="请输入链接" v-model="link" />
        <!-- 图片 -->
        <div v-if="active === ADDITION.IMAGE" class="flex flex-col gap-2">
          <div class="flex gap-2 items-center justify-between">
            <Button class="shrink-0" @click="onupload">上传图片</Button>
            <p class="flex-1" style="word-break: break-all; word-wrap: break-word;">{{ image_file }}</p>
            <input type="file" class="hidden" ref="upload_btn" accept="image/*" @change="onuploadchange"/>
            <Button v-show="image_file" :icon="ICON.CLOSE" @click="ondeleteimage" />
          </div>
          <div class="flex justify-center">
            <img :src="image_base64" class="bg-red-50 border shadow-md max-w-80 max-h-80 min-w-40 min-h-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ADDITION, ICON } from '@/utils/constant';
import Card from './base/Card.vue';
import Input from './base/Input.vue';
import { ref } from 'vue';
import Button from './base/Button.vue';

const props = defineProps({
  visible: { type: Boolean, default: false },
  
  block: {
    type: Object,
    default() {
      return {
        addition: {
          base64: ''
        }
      }
    }
  }
})

const active = ref(ADDITION.LINK)
const list = [
  { key: 1, label: '画布' },
  { key: 2, label: '行为' },
  { key: 3, label: '样式' },
  { key: ADDITION.LINK, label: '链接' },
  { key: ADDITION.IMAGE, label: '图片' },
]

// 链接
const link         = ref('')

// 上传图片
const image_base64 = ref('') 
const image_file   = ref('')
const upload_btn   = ref(null)
const onupload     = e => {
  upload_btn.value.click()
}
const onuploadchange = e => {
  image_file.value = e.target.value
  const reader     = new FileReader()
  reader.onload = function(e) {
    const img = new Image()
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const max_width = 800
      const max_height = 600
      let width = img.width
      let height = img.height
      if (width > max_width) {
        height *= max_width / width;
        width = max_width;
      }
      if (height > max_height) {
        width *= max_height / height;
        height = max_height;
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      const base64String = canvas.toDataURL('image/png', 1)
      image_base64.value = base64String
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}
const ondeleteimage = () => {
  image_base64.value     = ''
  image_file.value       = ''
  upload_btn.value.value = ''
}
</script>