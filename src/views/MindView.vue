<template>
  <main class="h-screen flex flex-col scrollbar-hide">
    <header class="h-11 px-8 flex items-center bg-white" style="z-index: 55555;">
      <div class="h-full flex gap-1 flex-1 items-center">
        <span id="mind-option" class="cursor-pointer hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded" @click="onmenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
        </span>
        <input type="text" :placeholder="proxy.$lang('请输入标题')" class="w-6/12 min-w-80 focus:outline-none disabled:bg-white font-bold text-lg" v-model="mind.title" :disabled="!mind.editable"/> 
      </div>
      <div class="flex-1 text-right">
        <p v-if="MindStore().is_exam_mode()">
          <span class="cursor-pointer hover:text-red-600" @click="onquizexam">「 退出 」</span>
          |&nbsp;&nbsp;{{ MindStore().exam_info.message }}
        </p>
        <p v-if="show_guest_exit">
          <span class="cursor-pointer hover:text-red-600" @click="onquizguest">「 退出 」</span>
        </p>
      </div>
    </header>
    <div class="flex flex-1 overflow-y-hidden" ref="mind_content_box">
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
            @block-keydown   = "onblockkeydown"
            @block-dragstart = "onblockdragstart"
          ></Block>
        </div>
      </div>
    </div>
    <!-- 章节 -->
    <div class="fixed left-4 h-screen top-0 flex justify-center items-center flex-col p-2" style="z-index: 4444;">
      <div class="flex flex-col gap-2 p-1 rounded-lg bg-white max-w-40">
        <div v-if="mind.children.length" class="overflow-y-auto rounded-lg" style="max-height: 60vh">
          <div
            v-for="(item, index) in mind.children" :key="index"
            v-html="item.content"
            :class="['chapter', 'p-2', 'rounded-lg', 'text-center', 'cursor-pointer', 'min-h-10', 'text-sm', 'mb-2', item.style.backgroundColor]"
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
    <Addition v-if="addition_info.show" :block="addition_info.block" @c_close="onadditionclose" @c_update="onadditionupdate"></Addition>
    <ShareDialog v-if="show_share" @c_close="onshareclose" :address="mind.address"></ShareDialog>
  </main>
</template>

<script setup>
import MindStore from '@/stores/MindStore';
import MainData from '@/stores/MainData';
import utils, { html2image } from '@/utils/utils';
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import Block from '@/components/Block.vue'
import Options from '@/components/Options.vue'
import ShareDialog from '@/components/ShareDialog.vue'
import MoveOption from '@/components/MoveOption.vue'
import Addition from '@/components/Addition.vue'
import router from '@/router';
import { DIRECTION, MESSAGE_TYPE, MODE, OPTIONS, HOT_OPTION } from '@/stores/constant';

const { proxy } = getCurrentInstance()
const id        = utils.get_url_end_node()
const info      = MindStore().load_mind(id) || { children: [] }
const mind      = reactive(info)

onBeforeMount(async () => {
  if (!info.id && !info.address) {
    const key       = utils.is_private_key(id) ? id : ''
    const address   = utils.is_public_key(id) ? id : ''
    const temp_mind = await MindStore().request_mind(key, address)
    if (temp_mind) {
      MindStore().init_mind(temp_mind)
      for (let key in temp_mind) {
        mind[key] = temp_mind[key]
      }
    }
    else {
      router.push({ name: 'not found' })
    }
  }
  else {
    MindStore().init_mind(info)
  }
  if (MindStore().had_remoted())
    MainData().analyze(mind.address)
  if (utils.is_private_key(id))
    return MindStore().switch_mode(MODE.COMMON)
  MindStore().switch_mode(MODE.GUEST)
})

const refresh   = ref(0)
const update_refresh = () => refresh.value = Date.now()

const onaddchapter = () => {
  const child = MindStore().new_block(id)
  child && nextTick(() => document.getElementById(`block-content-${child.id}`)?.focus())
}

const onsave = e => {
  const target = MainData().search_hot_key(e)
  if (target?.key === HOT_OPTION.SAVE) {
    e.preventDefault()
    nextTick(() => {
      MindStore().save()
      proxy.$message(proxy.$lang("保存成功"))
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
  const a    = { key: OPTIONS.HOME,        label: proxy.$lang('回到主页'),   tips: '' }
  const b    = { key: OPTIONS.SAVE,        label: proxy.$lang('保存'),      tips: `${proxy.$lang('本地保存')} ${MainData().get_hot_info(HOT_OPTION.SAVE)?.keys.join(' + ') || ''}` }
  const c    = { key: OPTIONS.SAVE_REMOTE, label: proxy.$lang('保存到云端'), tips: proxy.$lang('可在不同设备查看') }
  const d    = { key: OPTIONS.EXAM,        label: proxy.$lang('考试模式'),   tips: proxy.$lang('学生党利器') }
  const e    = { key: OPTIONS.GUEST,       label: proxy.$lang('读者模式'),   tips: proxy.$lang('别人看到的状态') }
  const f    = { key: OPTIONS.SHARE,       label: proxy.$lang('分享'),      tips: proxy.$lang('输出观点 !') }
  const g    = { key: OPTIONS.ANALYZE,     label: proxy.$lang('数据'),      tips: proxy.$lang('导图商业数据') }
  const h    = { key: OPTIONS.SPEECH,      label: proxy.$lang('演讲模式'),   tips: proxy.$lang('开会大法宝') }
  const i    = { key: OPTIONS.HTML2IMAGE,  label: proxy.$lang('导出为图片'), tips: '' }
  
  if (MindStore().is_guest_mode()) {
    arrs.push(...[a, b, d, g, h, i])
  }
  else if (MindStore().is_exam_mode()) {
    arrs.push(...[a])
  }
  else {
    arrs.push(...[a, b, c, d, e, f, g, h, i])
  }
  return arrs
})

const show_option = ref(false)
const onmenu = () => show_option.value = true
const onoptioncancel = () => show_option.value = false
const onoptionselect = async item => {
  show_option.value = false
  if (item.key === OPTIONS.HOME) {
    router.push({ name: 'home' })
  }
  else if (item.key === OPTIONS.SAVE) {
    MindStore().save()
    proxy.$message(proxy.$lang('保存成功'))
  }
  else if (item.key === OPTIONS.EXAM) {
    if (MindStore().is_exam_mode()) {
      return
    }
    MindStore().switch_mode(MODE.EXAM)
    proxy.$message(proxy.$lang('「 考试模式 」，点击「 块 」显示答案'), MESSAGE_TYPE.INFO, { timeout: 5000 })
  }
  else if (item.key === OPTIONS.GUEST) {
    if (MindStore().is_guest_mode()) {
      return
    }
    MindStore().switch_mode(MODE.GUEST)
  }

  switch (item.key) {
    case OPTIONS.SAVE_REMOTE : save_remote(); break
    case OPTIONS.SHARE       : share();       break
    case OPTIONS.ANALYZE     : analyze();     break
    case OPTIONS.SPEECH      : speech();      break
    case OPTIONS.HTML2IMAGE  : save_image();  break
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
  const target = MainData().search_hot_key(e)
  if (target?.key === HOT_OPTION.DELETE) {
    MindStore().delete_block(id)
  }
  
  else if (target?.key === HOT_OPTION.CREATE) {
    e.preventDefault()
    const child = MindStore().new_block(id)
    child && nextTick(() => {
      document.getElementById(`block-content-${child.id}`)?.focus()
      update_refresh()
    })
  }

  else if (target?.key === HOT_OPTION.SAVE) {
    e.preventDefault()
    const block = MindStore().get_block(id)
    const el    = document.getElementById(`block-content-${block.id}`)
    el.blur()
  }
  
  else if(target?.key === HOT_OPTION.UP) {
    const target = MindStore().get_direction_block(id, DIRECTION.UP)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }

  else if(target?.key === HOT_OPTION.DOWN) {
    const target = MindStore().get_direction_block(id, DIRECTION.DOWN)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }

  else if(target?.key === HOT_OPTION.LEFT) {
    const target = MindStore().get_direction_block(id, DIRECTION.LEFT)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }

  else if(target?.key === HOT_OPTION.RIGHT) {
    const target = MindStore().get_direction_block(id, DIRECTION.RIGHT)
    target && nextTick(() => document.getElementById(`block-content-${target.id}`)?.focus())
    nextTick(update_refresh)
  }

  else if (target?.key === HOT_OPTION.MENU) {
    if (MindStore().is_common_mode()) {
      e.preventDefault()
      e.target.blur()
      addition_info.block = MindStore().get_block(id)
      addition_info.show  = true
    }
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

const onadditionclose = () => {
  addition_info.show = false
}

const onadditionupdate = additions => {
  additions.forEach(a => {
    if (a.key === 'link') {
      MindStore().set_link(addition_info.block.id, a.value)
    }
    else if (a.key === 'image') {
      MindStore().set_image(addition_info.block.id, a.base64)
    }
  })
  update_refresh()
}

const show_guest_exit = computed(() => {
  if (!MindStore().is_guest_mode()) {
    return false
  }

  if (utils.is_public_key(id))
    return false

  // 创作者通过私钥打开的导图，其读者模式肯定从读者入口来的，所以肯定显示
  if (utils.is_private_key(id)) {
    return true
  }

  return false
})
const onquizguest = () => {
  if (utils.is_private_key(id))
    return MindStore().switch_mode(MODE.COMMON)
  MindStore().switch_mode(MODE.GUEST)
}

const show_share = ref(false)
const share = async () => {
  const flag = MindStore().had_remoted()
  if (flag) {
    show_share.value = true
    return
  }
  proxy.$message(proxy.$lang('请先保存到云端'), MESSAGE_TYPE.WARN)
}
const onshareclose = () => {
  show_share.value = false
}

const analyze = () => {
  const address = MindStore().mind?.address || null
  if (!address)
    return proxy.$message(proxy.$lang('找不到 address'), MESSAGE_TYPE.ERROR)
  router.push({
    name: 'dashboard',
    params: { address: id }
  })
}

const speech = () => {
  proxy.$message(proxy.$lang('暂未开放，敬请期待，这个模式很棒，灵感来自「 xMind 」💗'), MESSAGE_TYPE.INFO)
  proxy.$message(proxy.$lang('它可以像 PPT 一样播放你的导图，开会前再也不担心麻烦的 PPT 了！'), MESSAGE_TYPE.INFO, { timeout: 10000 })
}

const mind_content_box = ref(null)
const save_image = () => {
  html2image(mind_content_box.value, true, mind.title)
  .then(img_base64 => {
    if (!img_base64)
      return proxy.$message(proxy.$lang('保存失败'), MESSAGE_TYPE.ERROR)
      proxy.$message(proxy.$lang('保存成功，已下载到本地'))
  })
}

const save_remote = async () => {
  const flag = MindStore().had_remoted()
  if (0) {
  // if (!flag) {
    MindStore().save()
    router.push({
      name: 'dashboard',
      params: { address: id }
    })
  }
  else {
    const flag = await MindStore().save_remote()
    if (flag) {
      const message = `${proxy.$lang('成功保存到云端，')}<a href="#/dashboard/${id}" class="border-b border-black hover:border-white hover:text-white">${proxy.$lang('点我查看商业数据')}</a>`
      return proxy.$message(message, MESSAGE_TYPE.SUCCESS, { use_html: true })
    }
    proxy.$message(proxy.$lang('保存失败'), MESSAGE_TYPE.ERROR)
  }
}
</script>

<style scoped>
.chapter:last-child {
  margin-bottom: 0;
}
</style>