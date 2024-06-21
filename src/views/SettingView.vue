<template>
  <header class="h-11 px-8 flex items-center bg-white text-2xl gap-4">
    <svg @click="onhome" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
    </svg>
    <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
    设置
  </header>
  <div class="flex">
    <div class="w-60 bg-white pt-4">
      <ul>
        <li 
          v-for="item in tabs" 
          :key="item.key" 
          :class="`h-10 flex items-center px-8 rounded-r-full ${active === item.key ? utils.get_bg_color() : 'hover:bg-gray-100'}`" 
          @click="ontabclick(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
    <div class="flex-1 py-10">
      <!-- 基础 -->
      <div v-if="active === 'base'"></div>
      <!-- 快捷键 -->
      <div v-else-if="active === 'hot'" style="width: 680px" class="border shadow rounded mx-auto">
        <ul>
          <li v-for="item in MainData().hots" :key="item.label" :class="`p-4 h-10 flex items-center justify-between hover:bg-gray-50`">
            <p>{{ item.label }}</p>
            <div
              contenteditable
              :id              = "`hot-${item.key}`"
              class            = "w-60 text-right text-gray-600 focus:outline-none" 
              @keyup           = "onhotkeyup(item)"
              @keydown.prevent.stop = "onhotkeydown($event, item)"
            >
              {{ item.keys.join(' + ') }}
            </div>
          </li>
        </ul>
      </div>
      <!-- 语言 -->
      <div v-if="active === 'language'">
        <p>简体中文</p>
        <p>英语</p>
        <p>粤语</p>
        <p>脏脏话</p>
        <p>难道真的可以做成用户可配置？</p>
      </div>
      <!-- 关于 -->
      <div v-if="active === 'about'"></div>
    </div>
    <div class="w-60"></div>
  </div>
</template>

<script setup>
import router from '@/router';
import MainData from '@/stores/MainData';
import { BOARD_KEY } from '@/stores/constant';
import utils from '@/utils/utils';
import { reactive, ref } from 'vue';

const tabs = ref([
  {
    key: 'base',
    value: '基础'
  },
  {
    key: 'hot',
    value: '快捷键'
  },
  {
    key: 'language',
    value: '语言'
  },
  {
    key: 'about',
    value: '关于List Mind'
  }
])
const key = utils.get_url_end_node()
const active = ref(key || tabs.value[0].key)

const ontabclick = item => {
  active.value = item.key
  router.push({ path: `${item.key}` })
}

const onhome = () => router.push('/')

const link_tag = ' + '
const onhotkeydown = (e, item) => {
  const temp_keys = []
  e.metaKey  && temp_keys.push(BOARD_KEY.META)
  e.ctrlKey  && temp_keys.push(BOARD_KEY.CTRL)
  e.shiftKey && temp_keys.push(BOARD_KEY.SHIFT)
  e.altKey   && temp_keys.push(BOARD_KEY.ALT)
  !temp_keys.includes(e.key) && temp_keys.push(e.key)
  // console.log(temp_keys)
  const el     = document.getElementById(`hot-${item.key}`)
  el.innerHTML = temp_keys.join(link_tag)
}

const onhotkeyup = (item) => {
  const el     = document.getElementById(`hot-${item.key}`)
  const arrs   = el.textContent.split(link_tag)
  MainData().set_hot_key(item.key, arrs)
  el.blur()
}
</script>