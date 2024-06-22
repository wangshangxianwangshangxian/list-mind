<template>
  <Header title="历程">
    <template v-slot:icon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    </template>
  </Header>
  <div class="bg-red mx-auto pt-10" style="width: 680px;">
    <ul>
      <li v-for="(item, index) in VersionStore().footsteps" :key="index" class="flex gap-10">
        <div class="relative">
          <div class="border-l h-full"></div>
          <svg 
            xmlns        = "http://www.w3.org/2000/svg" 
            fill         = "none" 
            viewBox      = "0 0 24 24" 
            stroke-width = "1.5" 
            stroke       = "currentColor"
            class        = "size-6 absolute bg-white top-10"
            style        = "left: -11.5px"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div class="pt-10 flex-1 shrink-0">
          <p v-html="item.title"></p>  
          <div class="mt-2 text-gray-700" v-html="item.desc"></div>
        </div>
      </li>
    </ul>
    <div class="h-40 flex justify-center items-center text-gray-400 text-sm gap-2">
      <span><b :class="utils.get_text_color()">L</b>isten</span>|
      <span><b :class="utils.get_text_color()">I</b>magine</span>|
      <span><b :class="utils.get_text_color()">S</b>trive</span>|
      <span><b :class="utils.get_text_color()">T</b>riumph</span>|
      <span><b :class="utils.get_text_color()">M</b>otivate</span>|
      <span><b :class="utils.get_text_color()">I</b>nspire</span>|
      <span><b :class="utils.get_text_color()">N</b>urture</span>|
      <span><b :class="utils.get_text_color()">D</b>ream</span>
    </div>
  </div>
</template>

<script setup>
import VersionStore from '@/stores/VersionStore'
import utils from '@/utils/utils'
import Header from '@/components/Header.vue'
</script>