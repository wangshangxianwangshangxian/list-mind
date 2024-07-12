<template>
  <header class="between-center px-8 pt-10 pb-6 bg-white sticky top-0">
    <div>
      <a href="/" :class="`border-b-2 ${get_border_color()} text-4xl`" v-html="generate_color_text('List Mind')"></a>
      <span class="text-sm text-gray-500 ml-2">
        思路有条理
      </span>
    </div>
    <div class="flex gap-1 items-center">
      「公测中」
      <Button v-if="show_search" :icon="ICON.SEARCH" @click="onsearchiconclick" />
      <Input v-else ref="search_box" style="width: 400px;" placeholder="请输入「公钥」或「私钥」添加导图" v-model="search_value">
        <template v-slot:prepend>
          <Button :icon="ICON.SEARCH" @click.stop="onsearch" />
        </template>
      </Input>
      <Button :icon="ICON.SETTING" @click="router.push({ name: 'setting', params: { tab: 'about' } })"></Button>
    </div>
  </header>
  <div class="flex flex-wrap gap-6 p-8">
    <div
      :id="is_add_card(item.id) ? null : 'box'"
      v-for="item in list" 
      :key="item.id"
      class="border border-solid border-inherit cursor-pointer rounded-lg hover:shadow w-52 h-32 flex flex-col overflow-hidden"
      @click.stop="oncardclick(item)"
    >
      <p class="flex-1 flex justify-center items-center m-2 overflow-y-scroll text-center">
        <Icon v-if="is_add_card(item.id)" :name="ICON.ADD"/>
        <span v-else>{{ item.mind.content }}</span>
      </p>
      <div
        id="box-option"
        :class="set_box_class(item)"
      >
        <Button @click.stop="ondelete(item)" :icon="ICON.DELETE"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import create_mind from '@/atom/create_mind';
import key_set from '@/atom/key_set';
import router from '@/router';
import { ICON, MESSAGE } from '@/utils/constant';
import { getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import save_mind from '@/atom/save_mind';
import get_keys from '@/atom/get_keys';
import generate_address from '@/utils/generate_address';
import get_mind from '@/atom/get_mind';
import delete_mind from '@/atom/delete_mind';
import delete_key from '@/atom/delete_key';
import get_key from '@/atom/get_key';
import get_border_color from '@/utils/get_border_color';
import get_text_color from '@/utils/get_text_color';
import Input from '@/components/base/Input.vue';
import Icon from '@/components/base/Icon.vue';
import get from '@/utils/get';
import generate_color_text from '@/atom/generate_color_text';

const { proxy } = getCurrentInstance()

const list = reactive([{ id: 'na' }])
const get_list = () => {
  list.length = 1
  try {
    for (let key in localStorage) {
      if (!key.startsWith('mind_'))
        continue
      const mind = JSON.parse(localStorage.getItem(key))
      list.push(mind)
    }
  }
  catch(e) {}
  // 通过私钥获取的导图
  get_keys().forEach(key => {
    const address = generate_address(key)
    const mind    = get_mind(address)
    if (!mind)
      return
    if (list.find(a => a.mind?.address === mind.mind.address))
      return
    list.push(mind)
  })
  list.sort((a, b) => new Date(b.update_time) - new Date(a.update_time))
}
get_list()
const is_add_card = id => id === 'na'

const set_box_class = item => {
  const arrs = ['flex justify-end px-4 items-center text-xs h-0 opacity-0 text-gray-800 gap-2']
  arrs.push(item?.mind?.style?.backgroundColor)
  return arrs
}

const ondelete = item => {
  proxy.$confirm({
    title: '确认删除',
    content: `是否要删除「${item.mind.content}」`,
    onsubmit() {
      const key = get_key(item.address)
      if (key) {
        delete_mind(key)
        delete_key(key)
      }
      else {
        delete_mind(item.address)
      }
      get_list()
    }
  })
}

const oncardclick = info => {
  if (info.id === 'na') {
    const [mind, key] = create_mind()
    key_set(key)
    save_mind(mind)
    router.push({
      name: 'mind',
      params: {
        address: mind.address
      }
    })
  }
  else {
    router.push({
      name: 'mind',
      params: {
        address: info.address
      }
    })
  }
}

const show_search = ref(true)
const search_box  = ref(null)
const onsearchiconclick = () => {
  show_search.value = false
  nextTick(() => {
    search_box.value.focus()
  })
}

const search_value = ref('')
const onsearch = async () => {
  const resp = await get('search', { address: search_value.value })
  if (resp.code === 'success') {
    save_mind(resp.data)
    return window.open(`/mind/${resp.data.address}`)
  }

  proxy.$message('搜索内容不存在', MESSAGE.WARN, { timeout: 2000 })
}
</script>

<style scoped>
#box-option {
  transition: all 0.1s ease;
}

#box:hover #box-option {
  height: 40px;
  opacity: 1;
  transition: all 0.1s ease;
}
</style>
