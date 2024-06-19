<template>
  <main class="h-screen flex flex-col scrollbar-hide">
    <header class="h-11 px-8 flex items-center bg-white">
      <div class="h-full flex gap-1 flex-1">
        <span id="mind-option" class="cursor-pointer hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded" @click="onmenu">三</span>
        <input type="text" placeholder="enter your title" class="w-6/12 focus:outline-none font-bold text-lg" v-model="mind.title" /> 
      </div>
      <div class="flex-1 text-right">
        <p v-if="MindStore().is_exam_mode()">
          <span class="cursor-pointer hover:text-red-600" @click="onquizexam">「 退出 」</span>
          |&nbsp;&nbsp;{{ exam_info.message }}
        </p>
      </div>
    </header>
    <div class="flex flex-1 overflow-y-hidden">
      <!-- 左侧容器 -->
      <div class="w-40 flex justify-center items-center flex-col p-4">
        <div class="flex flex-col gap-2 p-2 rounded-lg min-w-28">
          <div v-if="mind.children.length" class="flex flex-col gap-2 overflow-y-auto rounded-lg" style="max-height: 60vh">
            <div
              v-for="(item, index) in mind.children" :key="index"
              v-html="item.content"
              :class="['p-2', 'rounded-lg', 'bg-orange-50', 'text-center', 'cursor-pointer', 'min-h-10', 'text-sm', item.style.backgroundColor]"
            ></div>
          </div>
          <div
            class="p-2 min-h-10 rounded-lg cursor-pointer text-center hover:scale-105 text-lg bg-gray-100"
            @click="onaddchapter"
          >+</div>
        </div>
      </div>
      <!-- 中间容器 -->
      <div class="flex-1 overflow-x-auto overflow-y-auto p-8 shrink-0">
        <div class="flex flex-col gap-8 items-center justify-center min-h-full shrink-0">
          <Block
            v-for="item in mind.children" 
            :key             = "item.id" 
            :block           = "item"
            :refresh         = "refresh"
            @block-blur      = "onblockblur"
            @block-expand    = "onblockexpand"
            @block-click     = "onblockclick"
            @block-dbclick   = "onblockdbclick"
            @block-keydown   = "onblockkeydown"
            @block-dragstart = "onblockdragstart"
          ></Block>
        </div>
      </div>
      <!-- 右侧容器 -->
      <div class="w-40"></div>
    </div>
    <Options 
      v-if="show_option" 
      :options = "options"
      selector = "#mind-option"
      @cancel  = "onoptioncancel"
      @select  = "onoptionselect"
    ></Options>
    <MoveOption
      v-if="move_info.show"
      :block     = "move_info.move_el" 
      @c_mouseup ="onmouseup"
    ></MoveOption>
    <Addition v-if="addition_info.show" :id="addition_info.id" @c_close="onadditionclose"></Addition>
  </main>
</template>

<script setup>
import MindStore from '@/stores/MindStore';
import utils from '@/utils/utils';
import { getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import Block from '@/components/Block.vue'
import Options from '@/components/Options.vue'
import MoveOption from '@/components/MoveOption.vue'
import Addition from '@/components/Addition.vue'
import router from '@/router';
import { DIRECTION, MESSAGE_TYPE } from '@/stores/constant';

const { proxy } = getCurrentInstance()
const id        = utils.get_url_end_node()
const info      = MindStore().request_mind(id)
const mind      = reactive(info)
const refresh   = ref(0)
const update_refresh = () => refresh.value = Date.now()

const onaddchapter = () => {
  const child = MindStore().new_block(id)
  child && nextTick(() => document.getElementById(`block-content-${child.id}`)?.focus())
}

const onsave = e => {
  if (e.metaKey && e.key.toLocaleLowerCase() === 's') {
    e.preventDefault()
    nextTick(() => {
      MindStore().save_mind()
      proxy.$message('保存成功')
    })
  }
}
onMounted(() => window.addEventListener('keydown', onsave))
onUnmounted(() => window.removeEventListener('keydown', onsave))

const onblockexpand = id => {
  MindStore().toggle_expand(id)
  update_refresh()
}

const onblockclick = id => {
  // 考试模式
  if (MindStore().is_exam_mode()) {
    MindStore().toggle_in_exam(id)
  }
}

const options = [
  {
    key  : '1',
    label: '回到主页',
    tips : ''
  },
  {
    key  : '2',
    label: '保存',
    tips : 'command + s'
  },
  {
    key  : '3',
    label: '常规模式',
    tips : ''
  },
  {
    key  : '4',
    label: '考试模式',
    tips : '学生党利器'
  }
]
const show_option = ref(false)
const onmenu = () => show_option.value = true
const onoptioncancel = () => show_option.value = false
const onoptionselect = item => {
  if (item.key === '1') {
    MindStore().save_mind()
    show_option.value = false
    proxy.$message('保存成功')
    router.push({ name: 'home' })
  }
  else if (item.key === '2') {
    MindStore().save_mind()
    show_option.value = false
    proxy.$message('保存成功')
  }
  else if (item.key === '3') {
    onquizexam()
    show_option.value = false
  }
  else if (item.key === '4') {
    if (MindStore().is_exam_mode()) {
      return
    }
    MindStore().init_exam_mode()
    proxy.$message('「 考试模式 」，点击「 块 」显示答案', MESSAGE_TYPE.INFO)
    show_option.value = false
    start_exam()
  }
}

const exam_info = reactive({
  timer     : null,
  start_time: null,
  end_time  : null,
  message   : ''
})
const exam_tip = () => {
  exam_info.end_time = Date.now()
  exam_info.message = `考试中, 用时 ${utils.get_left_time(exam_info.start_time, exam_info.end_time)}`
}
const start_exam = () => {
  exam_info.start_time = Date.now()
  exam_tip()
  exam_info.timer = setInterval(exam_tip, 100)
}
const onquizexam = () => {
  clearInterval(exam_info.timer)
  exam_info.start_time = null
  exam_info.end_time   = null
  exam_info.message    = ''
  MindStore().exit_exam_mode()
}
onUnmounted(() => clearInterval(exam_info.timer))

const onblockkeydown = (e, id) => {
  if (e.metaKey && e.key.toLocaleLowerCase() === 'backspace') {
    MindStore().delete_block(id)
  }
  else if (e.key.toLocaleLowerCase() === 'tab') {
    e.preventDefault()
    const child = MindStore().new_block(id)
    child && nextTick(() => {
      document.getElementById(`block-content-${child.id}`)?.focus()
      update_refresh()
    })
  }
  else if (e.metaKey && e.key.toLocaleLowerCase() === 's') {
    e.preventDefault()
    const block = MindStore().get_block(id)
    const el    = document.getElementById(`block-content-${block.id}`)
    el.blur()
  }
  else if(e.metaKey && e.shiftKey && e.key.toLocaleLowerCase() === 'arrowup') {
  }
  else if(e.metaKey && e.key.toLocaleLowerCase() === 'arrowup') {
    const target = MindStore().get_direction_block(id, DIRECTION.UP)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }
  else if(e.metaKey && e.key.toLocaleLowerCase() === 'arrowdown') {
    const target = MindStore().get_direction_block(id, DIRECTION.DOWN)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }
  else if(e.metaKey && e.key.toLocaleLowerCase() === 'arrowleft') {
    const target = MindStore().get_direction_block(id, DIRECTION.LEFT)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }
  else if(e.metaKey && e.key.toLocaleLowerCase() === 'arrowright') {
    const target = MindStore().get_direction_block(id, DIRECTION.RIGHT)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }
}

const onblockblur = (id, content) => {
  update_refresh()
  MindStore().set_block_content(id, content)
}

const move_info = reactive({
  show    : false,
  move_el : {
    id      : null,
    offset_x: 0,
    offset_y: 0
  }
})
const onblockdragstart = (id, offset_x, offset_y) => {
  document.getElementById(`block-content-${id}`).blur()
  move_info.move_el  = { id, offset_x, offset_y }
  move_info.show     = true
}
const onmouseup = (move_parent_id, move_index) => {
  move_info.show    = false
  if (move_index > -1) {
    MindStore().move(move_info.move_el.id, move_parent_id, move_index)
    update_refresh()
  }
}

const addition_info = reactive({
  show: false,
  id  : null
})
const onblockdbclick = id => {
  addition_info.id   = id
  addition_info.show = true
}
const onadditionclose = () => {
  addition_info.show = false
}

</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
