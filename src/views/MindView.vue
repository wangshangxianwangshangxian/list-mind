<template>
  <main class="h-screen flex flex-col scrollbar-hide">
    <header class="h-11 px-8 flex items-center bg-white">
      <div class="h-full flex gap-1 flex-1 items-center">
        <span id="mind-option" class="cursor-pointer hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded" @click="onmenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
        </span>
        <input type="text" placeholder="enter your title" class="w-6/12 focus:outline-none disabled:bg-white font-bold text-lg" v-model="mind.title" disabled="!mind.editable"/> 
      </div>
      <div class="flex-1 text-right">
        <p v-if="MindStore().is_exam_mode()">
          <span class="cursor-pointer hover:text-red-600" @click="onquizexam">「 退出 」</span>
          |&nbsp;&nbsp;{{ MindStore().exam_info.message }}
        </p>
      </div>
    </header>
    <div class="flex flex-1 overflow-y-hidden">
      <!-- 左侧容器 -->
      <div class="w-40 flex justify-center items-center flex-col p-4">
        <div class="flex flex-col gap-2 p-1 rounded-lg min-w-28">
          <div v-if="mind.children.length" class="flex flex-col gap-2 overflow-y-auto rounded-lg" style="max-height: 60vh">
            <div
              v-for="(item, index) in mind.children" :key="index"
              v-html="item.content"
              :class="['p-2', 'rounded-lg', 'bg-orange-50', 'text-center', 'cursor-pointer', 'min-h-10', 'text-sm', item.style.backgroundColor]"
            ></div>
          </div>
          <div
            v-if="MindStore().is_common_mode()"
            class="p-2 min-h-10 rounded-lg cursor-pointer hover:bg-gray-200 bg-gray-100 flex justify-center items-center"
            @click="onaddchapter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
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
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import Block from '@/components/Block.vue'
import Options from '@/components/Options.vue'
import MoveOption from '@/components/MoveOption.vue'
import Addition from '@/components/Addition.vue'
import router from '@/router';
import { DIRECTION, MESSAGE_TYPE, MODE, OPTIONS } from '@/stores/constant';

const { proxy } = getCurrentInstance()
const id        = utils.get_url_end_node()
const info      = MindStore().request_mind(id)
const mind      = reactive(info)
const refresh   = ref(0)
const update_refresh = () => refresh.value = Date.now()
if (utils.is_public_key(id)) {
  MindStore().switch_mode(MODE.GUEST)
}
else MindStore().switch_mode(MODE.COMMON)

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

const options = computed(() => {
  const arrs = []
  const a    = { key: OPTIONS.HOME,  label: '回到主页', tips: '' }
  const b    = { key: OPTIONS.SAVE,  label: '保存',    tips: '' }
  const c    = { key: OPTIONS.EXAM,  label: '考试模式', tips: '学生党利器'}
  const d    = { key: OPTIONS.GUEST, label: '读者模式', tips: '别人看到的状态'}
  
  if (MindStore().is_guest_mode()) {
    arrs.push(...[a, c])
  }
  else if (MindStore().is_exam_mode()) {
    arrs.push(...[a])
  }
  else {
    arrs.push(...[a, b, c, d])
  }
  return arrs
})

const show_option = ref(false)
const onmenu = () => show_option.value = true
const onoptioncancel = () => show_option.value = false
const onoptionselect = item => {
  show_option.value = false
  if (item.key === OPTIONS.HOME) {
    router.push({ name: 'home' })
  }
  else if (item.key === OPTIONS.SAVE) {
    MindStore().save_mind()
    proxy.$message('保存成功')
  }
  else if (item.key === OPTIONS.EXAM) {
    if (MindStore().is_exam_mode()) {
      return
    }
    MindStore().switch_mode(MODE.EXAM)
    proxy.$message('「 考试模式 」，点击「 块 」显示答案', MESSAGE_TYPE.INFO, { timeout: 5000 })
  }
  else if (item.key === OPTIONS.GUEST) {
    if (MindStore().is_guest_mode()) {
      return
    }
    MindStore().switch_mode(MODE.GUEST)
  }
}
const onquizexam = () => {
  if (utils.is_public_key(id)) {
    MindStore().switch_mode(MODE.GUEST)
  }
  else {
    MindStore().switch_mode(MODE.COMMON)
  }
}
// 如果当前处于exam模式退出，则清除定时器
onUnmounted(() => MindStore().switch_mode(null))

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
  if (MindStore().is_common_mode()) {
    addition_info.id   = id
    addition_info.show = true
  }
}
const onadditionclose = () => {
  addition_info.show = false
}

</script>