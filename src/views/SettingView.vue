<template>
  <Header :title="proxy.$lang('设置')">
    <template v-slot:icon>
      <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    </template>
  </Header>
  <div class="flex">
    <div class="w-60 bg-white">
      <ul>
        <li 
          v-for="item in tabs" 
          :key="item.key" 
          :class="`cursor-pointer h-10 flex items-center px-8 rounded-r-full ${active === item.key ? utils.get_bg_color() : 'hover:bg-gray-100'}`" 
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
      <div v-if="active === 'language'" style="width: 680px" class="mx-auto">
        <Card width="100%">
          <ul>
            <li v-for="item in languages" :key="item.key" class="flex justify-between items-center hover:bg-gray-50 h-11 p-2 rounded-lg" @click="onlangchange(item)">
              <p>{{ item.label }}</p>
              <div class="w-4 h-4 border rounded-full p-1">
                <div v-show="item.key === curr_lang" class="bg-blue-400 w-full h-full rounded-full"></div>
              </div>
            </li>
          </ul>
        </Card>
        <ul class="mt-8 flex flex-col">
          <li v-for="item in lang_configs" :key="item.key" class="flex justify-between hover:bg-gray-100 p-2 rounded">
            <p class="flex-1">{{ item.key }}</p>
            <p class="text-gray-500 flex-1 text-right">{{ item[curr_lang] }}</p>
          </li>
        </ul>
      </div>
      <!-- 关于 -->
      <div v-if="active === 'about'" class="flex flex-col items-center justify-center text-gray-700 gap-4">
        <img src="@/assets/favicon.png" class="max-w-52 max-h-52" />
        <p>version {{ VersionStore().version }}</p>
      </div>
    </div>
    <div class="w-60"></div>
  </div>
</template>

<script setup>
import router from '@/router';
import MainData from '@/stores/MainData';
import { BOARD_KEY, LANGUAGE, LOCALSTORAGE } from '@/stores/constant';
import utils from '@/utils/utils';
import { getCurrentInstance, ref, watch } from 'vue';
import Header from '@/components/Header.vue'
import Card from '@/components/Card.vue'
import LANGUAGE_CONFIG from '@/plugins/language_config.json';
import VersionStore from '@/stores/VersionStore';
import get_url_end_node from '@/utils/get_url_end_node';

const { proxy } = getCurrentInstance()
const tabs = ref([])
const key = get_url_end_node()
const active = ref(key || tabs.value[0].key)

const ontabclick = item => {
  active.value = item.key
  router.push({ path: `${item.key}` })
}

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
  e.preventDefault()
}

const onhotkeyup = (item) => {
  const el     = document.getElementById(`hot-${item.key}`)
  const arrs   = el.textContent.split(link_tag)
  MainData().set_hot_key(item.key, arrs)
  el.blur()
}

const languages = [
  { key : LANGUAGE.CHINESE,  label : '简体中文', },
  { key : LANGUAGE.ENGLISH,  label : 'English', },
  { key : LANGUAGE.CANTONSE, label : '粤语',     }
]
const lang_configs = []
for (let key in LANGUAGE_CONFIG) {
  const data = Object.assign({ key }, LANGUAGE_CONFIG[key])
  lang_configs.push(data)
}
const curr_lang = ref(localStorage.getItem(LOCALSTORAGE.LANG) || LANGUAGE.CHINESE)
const onlangchange = item => {
  curr_lang.value = item.key
  MainData().switch_language(item.key)
}

watch(
  () => curr_lang.value,
  () => {
    tabs.value = [
      { key: 'base',     value: proxy.$lang('基础') },
      { key: 'hot',      value: proxy.$lang('快捷键') },
      { key: 'language', value: proxy.$lang('语言') },
      { key: 'about',    value: proxy.$lang('关于List Mind')}
    ]
  },
  { immediate: true }
)
</script>