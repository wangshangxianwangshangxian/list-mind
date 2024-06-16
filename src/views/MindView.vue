<template>
  <main class="h-screen flex flex-col scrollbar-hide">
    <header class="h-11 px-8 flex items-center bg-white gap-1">
      <span class="cursor-pointer hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded">三</span>
      <input type="text" placeholder="enter your title" class="w-6/12 focus:outline-none font-bold text-lg" v-model="mind.title" /> 
    </header>
    <div class="flex flex-1 overflow-y-hidden">
      <!-- 左侧容器 -->
      <div class="w-40 flex justify-center items-center flex-col p-4">
        <div class="flex flex-col gap-2 p-2 rounded-lg min-w-28 bg-red-100">
          <div v-if="mind.children.length" class="flex flex-col gap-2 overflow-y-auto rounded-lg" style="max-height: 60vh">
            <div
              v-for="(item, index) in mind.children" :key="index"
              class="p-2 rounded-lg bg-orange-50 text-center cursor-pointer min-h-10 text-sm"
            >
              {{ item.content }}
            </div>
          </div>
          <div 
            class="p-2 min-h-10 rounded-lg bg-white cursor-pointer text-center hover:scale-105 text-lg"
            @click="onaddchapter"
          >+</div>
        </div>
      </div>
      <!-- 中间容器 -->
      <div class="flex-1 overflow-x-auto overflow-y-auto flex justify-center items-center">
        <div class="flex flex-col justify-center gap-4 items-center">
          <Block 
            v-for="item in mind.children" 
            :key="item.id" 
            :block="item" 
            @block-content="onblockcontent"
            @block-addchild="onblockaddchild"
            @block-direction="onblockdirection"
            @block-delete="onblockdelete"
          ></Block>
        </div>
      </div>
      <!-- 右侧容器 -->
      <div class="w-40"></div>
    </div>
  </main>
</template>

<script setup>
import MindStore from '@/stores/MindStore';
import utils from '@/utils/utils';
import { getCurrentInstance, nextTick, onMounted, onUnmounted, reactive } from 'vue';
import Block from '@/components/Block.vue'

const { proxy } = getCurrentInstance()
const id = utils.get_url_end_node()
const info = MindStore().get_mind(id)
const mind = reactive(info)

const onblockcontent = (block_id, content) => {
  MindStore().set_block_content(mind.id, block_id, content)
}
const onblockaddchild = block_id => {
  const child = MindStore().add_block_child(mind.id, block_id)
  child && nextTick(() => document.getElementById(`block-content-${child.id}`)?.focus())
}

const onaddchapter = () => {
  const child = MindStore().add_chapter(mind.id)
  child && nextTick(() => document.getElementById(`block-content-${child.id}`)?.focus())
}

const onblockdirection = (block_id, direction) => {
  const target = MindStore().get_direction_block(mind.id, block_id, direction)
  target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
}

const onblockdelete = block_id => {
  MindStore().delete_block(mind.id, block_id)
}

const onsave = e => {
  if (e.shiftKey && e.key.toLocaleLowerCase() === 's') {
    MindStore().save_mind(mind.id)
    proxy.$message('保存成功', 'warn')
  }
}
onMounted(() => window.addEventListener('keydown', onsave))
onUnmounted(() => window.removeEventListener('keydown', onsave))
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
