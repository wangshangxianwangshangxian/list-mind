<template>
  <main class="px-8 pb-8">
    <header class="text-4xl py-8">List Mind</header>
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
          {{ is_add_carr(item.id) ? '+' : item.title  }}
        </p>
        <div v-if="!is_add_carr(item.id)" class="text-right pr-2 pb-2 text-gray-400 text-xs">更新时间：{{ item.update_time }}</div>
        <div
          v-if="!is_add_carr(item.id)"
          id="box-option" 
          class="bg-red-400 flex justify-end px-4 items-center text-xs h-0 opacity-0 text-gray-800">
          <p class="hover:text-white" @click.stop="ondelete(item)">
            删除
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import router from '@/router';
import MindStore from '@/stores/MindStore';
import { ref, watch } from 'vue';

const arrs = ref([{ id: 'na' }])
const list = MindStore().request_mind_list()
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
  const flag = confirm(`确认删除?`)
  if (!flag)
   return
  MindStore().delete_mind(item.address)
  arrs.value.length = 1
  const list = MindStore().request_mind_list()
  list.forEach(t => arrs.value.push(t))
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

