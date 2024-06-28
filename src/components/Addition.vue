<template>
  <BackgroundMask @bgclick="emits('c_close')">
    <div class="bg-white w-1/2 absolute top-16 shadow left-1/2 border rounded py-2 px-4" style="transform: translateX(-50%); min-width: 600px;">
      <div class="h-10 flex gap-2 items-center overflow-x-auto">
        <div 
          v-for="item in additions" 
          :key="item.key" 
          :class="`shrink-0 cursor-pointer hover:text-blue-500 ${active === item.key ? 'text-blue-500' : ''}`"
          @click="onclick(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div>
        <input v-show="active_item.type === 'input'" type="text" class="w-full h-10 focus:outline-none" :placeholder="active_item.placeholder" v-model="active_item.value" />
        <div v-show="active_item.type === 'image'" class="flex flex-col gap-4">
          <div class="flex justify-between items-center h-10">
            <p>{{ active_item.value }}</p>
            <div class="flex gap-2 items-center">
              <input type="file" class="hidden" ref="upload_btn" accept="image/*" @change="onuploadchange"/>
              <svg v-show="active_item.value" @click="onuploaddelete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <button class="p-1 hover:text-blue-500" @click="onupload">上传图片</button>
            </div>
          </div>
          <div v-if="active_item.base64" class="flex justify-center">
            <img :src="active_item.base64" class="border shadow-md max-w-80 max-h-80 rounded" />
          </div>
        </div>
      </div>
    </div>
  </BackgroundMask>
</template>

<script setup>
import BackgroundMask from '@/components/BackgroundMask.vue'
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
  block: {
    type: Object,
    default() {
      return {
        addition: {
          link: ''
        }
      }
    }
  }
})

const emits = defineEmits(['c_close', 'c_update'])

const additions = reactive([
  { key : 'link',  label : '链接', type: 'input', value : props.block.addition.link, placeholder : '请输入一个网址，以http或https开头' },
  { key : 'image', label : '图片', type: 'image', value : '', base64: '' },
  { key : 'style', label : '样式', value : '', },
])
const active      = ref(additions[0].key)
const active_item = ref(additions[0])
const onclick = item => {
  active.value = item.key
  active_item.value = additions.find(a => a.key === active.value)
}

watch(
  () => additions,
  () => emits('c_update', additions),
  { deep: true }
)

const upload_btn = ref(null)
const onupload = e => {
  upload_btn.value.click()
}
const onuploadchange = e => {
  active_item.value.value = e.target.value
  const reader = new FileReader()
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
      const base64String = canvas.toDataURL('image/png', 0.7)
      active_item.value.base64 = base64String
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const onuploaddelete = () => {
  active_item.value.value  = ''
  active_item.value.base64 = ''
}
</script>