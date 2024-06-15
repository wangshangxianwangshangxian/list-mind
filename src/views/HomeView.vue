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
        <div
          v-if="!is_add_carr(item.id)"
          id="box-option" 
          class="bg-red-400 flex justify-end px-4 items-center text-xs h-0 opacity-0">
          <p class="hover:text-white">
            删除
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import router from '@/router';
import MainData from '@/stores/MainData';
import MindStore from '@/stores/MindStore';
import { ref } from 'vue';

const arrs = ref([{ id: 'na' }])
new Array(0).fill(0).forEach((t, index) => {
  arrs.value.push({
    id         : index + 1,
    title      : '学习以太坊知识，信息管理与信息系统',
    create_time: '2024-06-15 14:04:23'
  })
})

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
  }
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

