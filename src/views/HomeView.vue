<template>
  <main class="px-8 w-scree pb-8">
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
import { ref } from 'vue';

const arrs = ref([])
arrs.value = new Array(100).fill(0).map((t, index) => {
  if (index === 0) {
    return {
     id: null,
     title: '' 
    }
  }
  return {
    id         : index,
    title      : '学习以太坊知识，信息管理与信息系统',
    create_time: '2024-06-15 14:04:23'
  }
})

const is_add_carr = id => id === null

const oncardclick = info => {
  router.push({
    name: 'mind',
    params: {
      id: info.id
    }
  })
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

