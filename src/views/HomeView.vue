<template>
  <main class="px-8 pb-8">
    <header class="text-4xl py-8 flex gap-2 items-baseline justify-between sticky top-0 left-0 bg-white">
      <div>
        <a href="/" :class="`border-b-2 ${utils.get_border_color()}`">
          <span :class="utils.get_text_color()">L</span>
          <span :class="utils.get_text_color()">i</span>
          <span :class="utils.get_text_color()">s</span>
          <span :class="utils.get_text_color()">t</span>
          <span :class="`${utils.get_text_color()} ml-2`">M</span>
          <span :class="utils.get_text_color()">i</span>
          <span :class="utils.get_text_color()">n</span>
          <span :class="utils.get_text_color()">d</span>
        </a>
        <span class="text-sm text-gray-500 ml-2">
          思路有条理
        </span>
      </div>
      <div class="flex gap-2">
        <svg @click="onsetting" class="size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
        </svg>
        <!-- <svg @click="router.push({ name: 'customer' })" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
        </svg> -->
        <svg @click="router.push({ name: 'version' })" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
    </header>
    <div class="flex flex-wrap gap-6">
      <div 
        id="box"
        v-for="item in arrs" 
        :key="item.id" 
        class="
          border border-solid border-inherit cursor-pointer rounded-lg hover:shadow w-52 h-32
          flex flex-col overflow-hidden"
        @click="oncardclick(item)"
      >
        <p class="flex-1 flex justify-center items-center m-2 overflow-y-scroll text-center">
          <svg v-if="is_add_carr(item.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <template v-else>{{ item.title }}</template>
        </p>
        <div v-if="!is_add_carr(item.id)" class="text-right pr-2 pb-2 text-gray-400 text-xs">{{ item.update_time }}</div>
        <div
          v-if="!is_add_carr(item.id)"
          id="box-option" 
          :class="set_box_class(item)"
        >
          <svg @click.stop="onshare(item)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 hover:text-white">
            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
          </svg>
          <svg @click.stop="ondashboard(item)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 hover:text-white">
            <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clip-rule="evenodd" />
          </svg>
          <svg @click.stop="ondelete(item)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 hover:text-white">
            <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
            <path fill-rule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5Zm5.22 1.72a.75.75 0 0 1 1.06 0L10 10.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L11.06 12l1.72 1.72a.75.75 0 1 1-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 0 1-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import router from '@/router';
import MindStore from '@/stores/MindStore';
import utils from '@/utils/utils';
import { getCurrentInstance, ref } from 'vue';

const { proxy } = getCurrentInstance()
const arrs = ref([{ id: 'na' }])
const list = MindStore().load_mind_list()
list.sort((a, b) => new Date(b.update_time) - new Date(a.update_time)).forEach(t => arrs.value.push(t))

const is_add_carr = id => id === 'na'

const oncardclick = info => {
  if (info.id === 'na') {
    const data = MindStore().create_mind()
    router.push({
      name: 'mind',
      params: {
        id: data.id
      }
    })
    return
  }

  router.push({
    name: 'mind',
    params: {
      id: info.id || info.address
    }
  })
}

const ondelete = item => {
  const flag = confirm(proxy.$lang('确认删除?'))
  if (!flag)
   return
  MindStore().delete_mind(item.address)
  arrs.value.length = 1
  const list = MindStore().load_mind_list()
  list.forEach(t => arrs.value.push(t))
}

const ondashboard = item => {
  router.push({
    name: 'dashboard',
    params: {
      address: item.id || item.address
    }
  })
}

const set_box_class = item => {
  const arrs = ['flex', 'justify-end', 'px-4', 'items-center', 'text-xs', 'h-0', 'opacity-0', 'text-gray-800', 'gap-2']
  arrs.push(item.children[0]?.style.backgroundColor || utils.get_color())
  return arrs
}

const onsetting = () => {
  router.push({ name: 'setting default' })
}
const onshare = item => proxy.$share(item.address)

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

