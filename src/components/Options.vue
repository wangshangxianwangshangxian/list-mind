<template>
  <BackgroundMask @bgclick="oncancel">
    <Transition name="ani" @after-leave="onafterleave">
      <div class="inline-block bg-white border rounded-lg absolute top-0 left-0" :style="option_style" v-if="show">
        <ul class="p-1">
          <li 
            v-for="(item, index) in props.options" 
            :key="index"
            class="hover:bg-gray-100 p-2 rounded cursor-pointer flex gap-10 items-center justify-between"
            @click.stop="onclick(item)"
          >
            <p>{{ item.label }}</p>
            <p class="text-gray-400 text-xs">{{ item.tips }}</p>
          </li>
        </ul>
      </div>
    </Transition>
  </BackgroundMask>
</template>

<script setup>
import BackgroundMask from '@/components/BackgroundMask.vue'
import { POSITION } from '@/stores/constant';
import { onBeforeUnmount, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default() {
      return [
        {
          key  : '1',
          label: '返回主页',
          tips : ''
        },
        {
          key  : '2',
          label: '保存',
          tips : ''
        }
      ]
    }
  },

  selector: {
    type: String,
    default: 'body'
  },

  position: {
    type: String,
    default: POSITION.LEFT_BOTTOM
  }
})

const emits = defineEmits(['select', 'cancel'])
const onclick = item => emits('select', item)

const option_style = reactive({})

watch(
  () => props.selector,
  selector => {
    if (props.selector === 'body') {
      return
    }

    const el_rect = document.querySelector(selector)?.getBoundingClientRect() || {}
    if (props.position === POSITION.LEFT_BOTTOM) {
      option_style.left = `${el_rect.x}px`
      option_style.top  = `${el_rect.y + el_rect.height + 8}px`
    }
  },
  { immediate: true }
)

const show = ref(false)
onMounted(() => show.value = true)
const oncancel      = () => show.value = false
const onafterleave  = () => emits('cancel', null)
</script>