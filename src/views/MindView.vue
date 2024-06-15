<template>
  <main class="h-screen flex flex-col">
    <header class="h-11 px-8 flex items-center bg-whit gap-1">
      <span class="cursor-pointer hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded">三</span>
      <input type="text" placeholder="enter your title" class="w-6/12 focus:outline-none font-bold text-lg" v-model="mind.title" /> 
    </header>
    <div class="flex flex-wrap gap-6 h-scree flex-1">
      <!-- 左侧容器 -->
      <div class="w-40 flex justify-center items-center flex-col p-4">
        <div class="flex flex-col gap-2 bg-red-100 p-2 rounded-lg min-w-28">
          <div 
            v-for="(item, index) in mind.minds" :key="index"
            class="p-2 rounded-lg bg-orange-50 text-center cursor-pointer hover:scale-105 min-h-10"
          >
            {{ item.content }}
          </div>
          <div class="p-2 min-h-10 rounded-lg bg-white cursor-pointer text-center hover:scale-105">+</div>
        </div>
      </div>
      <div class="flex-1 bg-orange-50 overflow-scroll">
        <div class="flex flex-col items-center">
          <Block v-for="item in mind.minds" :key="item.id" :block="item"></Block>
        </div>
      </div>
      <div class="w-40">right</div>
    </div>
  </main>
</template>

<script setup>
import MindStore from '@/stores/MindStore';
import utils from '@/utils/utils';
import { reactive } from 'vue';
import Block from '@/components/Block.vue'

const id = utils.get_url_end_node()
const info = MindStore().get_mind(id)
const mind = reactive(info)
</script>

