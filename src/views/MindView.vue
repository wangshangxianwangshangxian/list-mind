<template>
  <div class="flex flex-col min-h-screen relative">
    <header class="bg-white between-center p-4 sticky top-0" style="z-index: 55555;">
      <div class="start-center">
        <Button @click="onmenu" id="menu_home" :icon="ICON.MENU"></Button>
        <Input :disabled="mode !== MODE.COMMON" style="width: 30vw;" class="text-md font-bold min-w-96 border-white" v-model="mind.mind.content" id="mind-title" placeholder="请在这里输入标题"/>
      </div>
      <div class="mr-2">
        <div v-if="mode === MODE.EXAM" class="flex gap-4 items-center">
          <p>考试中...... 已用时 {{ exam_time }}</p>
          <Button>「退出」</Button>
        </div>
      </div>
    </header>
    <div :class="`flex-1 flex justify-center items-center overflow-auto`">
      <div class="pb-96 pt-56 flex flex-col gap-4 items-center">
        <Block v-for="block in mind.mind.children" :key="block.id" :block="block" :refresh="refresh"></Block>
      </div>
    </div>
  </div>
  <Addition id="block-addition" :visible="show_addition" />
  <Chapter :mind="mind" @addchapter="onaddchapter" :editable="mode === MODE.COMMON" />
  <DragOption :mind="mind" v-if="show_drag" :target_id="target_id" :candidates="candidates" @c_mouseup="onmouseup" />
</template>

<script setup>
import block_add_child from '@/atom/block_add_child';
import get_block from '@/atom/get_block';
import get_mind from '@/atom/get_mind';
import save_mind from '@/atom/save_mind';
import save_mind_remote from '@/atom/save_mind_remote';
import update_block_attr from '@/atom/update_block_attr';
import Block from '@/components/Block.vue';
import router from '@/router';
import { BLOCK_OPTION, HOT, ICON, MESSAGE, MIND_MENU, MODE, POSITION } from '@/utils/constant';
import get_url_end_node from '@/utils/get_url_end_node';
import use_event from '@/utils/use_event';
import { computed, getCurrentInstance, nextTick, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, reactive, ref } from 'vue';
import get from '@/utils/get';
import get_element_by_parent_chain from '@/utils/get_element_by_parent_chain';
import delete_block from '@/atom/delete_block';
import block_is_root from '@/atom/block_is_root';
import get_direction_block from '@/atom/get_direction_block';
import Addition from '@/components/Addition.vue';
import Chapter from '@/components/Chapter.vue';
import DragOption from '@/components/DragOption.vue';
import local_has_key from '@/atom/local_has_key';
import init_mind_by_mode from '@/atom/init_mind_by_mode';
import get_block_and_children_and_grachild from '@/atom/get_block_and_children_and_grachild';
import Button from '@/components/base/Button.vue';
import get_left_time from '@/utils/get_left_time';

const { proxy } = getCurrentInstance()
const address   = get_url_end_node()
const mind      = ref({ mind: { children: [] } })
const flag      = local_has_key(address)
const mode      = ref(flag ? MODE.COMMON : MODE.READER)
const refresh   = ref(0)
const update_refresh = () => nextTick(() => refresh.value = Date.now())

onBeforeMount(async () => {
  proxy.$loading(true)
  const resp = await get('get-mind-data', { address })
  proxy.$loading(false)
  const local_mind  = get_mind(address)
  if (local_mind) {
    mind.value = local_mind
  }

  const remote_mind = resp.code === 'success' ? resp.data : null
  if (local_mind && !remote_mind) {
    mind.value = local_mind
  }
  else if (!local_mind && remote_mind) {
    mind.value = remote_mind
  }
  else if (!local_mind && !remote_mind) {
    return router.push({ name: '404' })
  }
  else {
    mind.value = local_mind.nonce > remote_mind.nonce ? local_mind : remote_mind
  }

  init_mind_by_mode(mind.value, mode.value)
})

const focus_el = ref(null)
use_event(document.body, 'focus', e => focus_el.value = e.target)
use_event(document.body, 'blur',  e => {
  focus_el.value = null
  if (e.target.id.startsWith('block-content-')) {
    const [a, b, id] = e.target.id.split('-')
    const block      = get_block(mind.value, id)
    update_block_attr(block, { content: e.target.innerHTML })
    update_refresh()
  }
})

// 修改标题
use_event(window, 'keyup', e => {
  if (e.target.id === 'mind-title') {
    const block = get_block(mind.value, mind.value.mind.id)
    update_block_attr(block, { content: e.target.value })
  }
})

// 输入时要更新block连接线，否则只靠keydown的话，会一卡一的
use_event(window, 'input', update_refresh)

// 右键操作
const contextmenus = [
  { key: BLOCK_OPTION.ADD_CHILD,   label: '添加子「block」', tips: '在后面添加'},
  { key: BLOCK_OPTION.DELETE_SELF, label: '删除「block」', tips: '会把自身和其子孙块都删除掉'},
]
use_event(window, 'contextmenu', e => {
  const target = get_element_by_parent_chain(e.target, 'block-content-')
  if (!target)
    return
  e.preventDefault()
  proxy.$menu({
    el_id   : target.id,
    menus   : contextmenus,
    offset  : [12, -8],
    position: POSITION.RIGHT_TOP,
    onsubmit: item => {
      if (item.key === BLOCK_OPTION.ADD_CHILD) {
        const [a, b, id] = target.id.split('-')
        add_child(id)
      }
      else if (item.key === BLOCK_OPTION.DELETE_SELF) {
        const [a, b, id] = target.id.split('-')
        const block      = delete_block(mind.value, id)
        nextTick(() => {
          const p_block = get_block(mind.value, block.pid)
          if (!p_block || block_is_root(mind.value, p_block.id)) {
            focus_el.value = null
            return
          }
          focus_el.value = document.getElementById(`block-content-${p_block.id}`)
          focus_el.value.focus()
          update_refresh()
        })
      }
    }
  })
})

// 左上角菜单栏
const a = { key: MIND_MENU.HOME,        label: '回到主页',   tips: ''}
const b = { key: MIND_MENU.SAVE,        label: '保存',      tips: '保存到本地'}
const c = { key: MIND_MENU.SAVE_REMOTE, label: '保存到云端', tips: '单个导图最大保存「1M」'}
const d = { key: MIND_MENU.COMMON_MODE, label: '编辑模式',   tips: '拥有私钥的用户'}
const e = { key: MIND_MENU.READER_MODE, label: '读者模式',   tips: '只读状态'}
const f = { key: MIND_MENU.EXAM_MODE  , label: '考试模式',   tips: '学生党利器'}
const menus = computed(() => {
  const config = []
  if (mode.value === MODE.COMMON) {
    config.push(a, b, c, e, f)
  }
  else if (mode.value === MODE.READER) {
    config.push(a, b, d, f)
  }
  else if (mode.value === MODE.EXAM) {
    config.push(a, d)
  }
  return config
})
const onmenu = () => {
  proxy.$menu({ 
    el_id: 'menu_home',
    menus: menus.value,
    onsubmit: async item => {
      if (item.key === MIND_MENU.HOME) {
        return router.push({ name: 'home' })
      }
      else if (item.key === MIND_MENU.SAVE) {
        proxy.$loading(true)
        save_mind(mind.value)
        proxy.$loading(false)
        proxy.$message('保存成功', MESSAGE.SUCCESS)
        return
      }
      else if (item.key === MIND_MENU.SAVE_REMOTE) {
        proxy.$loading(true)
        await save_mind_remote(mind.value)
        proxy.$loading(false)
        proxy.$message('保存成功', MESSAGE.SUCCESS)
      }
      else if (item.key === MIND_MENU.COMMON_MODE) {
        mode.value = MODE.COMMON
        init_mind_by_mode(mind.value, mode.value)
        update_refresh()
      }
      else if (item.key === MIND_MENU.READER_MODE) {
        mode.value = MODE.READER
        init_mind_by_mode(mind.value, mode.value)
        update_refresh()
      }
      else if (item.key === MIND_MENU.EXAM_MODE) {
        mode.value = MODE.EXAM
        init_mind_by_mode(mind.value, mode.value)
        update_refresh()
        start_exam()
      }
    }
  })
}

// 操作面板
const show_addition = ref(false)
use_event(window, 'click', e => {
  const el = get_element_by_parent_chain(e.target, 'block-addition')
  if (el) {
    return
  }

  if (!e.target.id.startsWith('block-content-')) {
    show_addition.value = false
    return
  }
  const [a, b, id] = e.target.id.split('-')
  show_addition.value = false // true
})

// 章节
use_event(window, 'click', e => {
  const target = get_element_by_parent_chain(e.target, 'mind-chapter-')
  if (!target)
    return
  const [a, b, id] = target.id.split('-')
  const block      = get_block(mind.value, id)
  update_block_attr(block, { show: !block.show })
  update_refresh()
})
const onaddchapter = block => {
  nextTick(() => {
    const el         = document.getElementById(`block-content-${block.id}`)
    focus_el.value   = el
    el.focus()
    update_refresh()
  })
}

// 热键-创建子块
onMounted  (() => proxy.$add_hots_event(create_child))
onUnmounted(() => proxy.$remove_hots_event(create_child))
const create_child = (target, e) => {
  if (target.key === HOT.CREATE && e.target.id.startsWith('block-content-')) {
    const [a, b, id] = e.target.id.split('-')
    const block      = get_block(mind.value, id)
    if (!block.expand)
      return
    add_child(id)
  }
}

// 热键-删除子块
onMounted  (() => proxy.$add_hots_event(remove_block))
onUnmounted(() => proxy.$remove_hots_event(remove_block))
const remove_block = (target, e) => {
  if (target.key === HOT.DELETE && e.target.id.startsWith('block-content-')) {
    const [a, b, id] = e.target.id.split('-')
    const block      = delete_block(mind.value, id)
    nextTick(() => {
      const p_block = get_block(mind.value, block.pid)
      if (!p_block || block_is_root(mind.value, p_block.id)) {
        focus_el.value = null
        return
      }
      focus_el.value = document.getElementById(`block-content-${p_block.id}`)
      focus_el.value.focus()
      update_refresh()
    })
  }
}

// 热键-在block之间移动光标
onMounted  (() => proxy.$add_hots_event(move))
onUnmounted(() => proxy.$remove_hots_event(move))
const move = (target, e) => {
  if (!e.target.id.startsWith('block-content-'))
    return

  if (![HOT.LEFT, HOT.RIGHT, HOT.UP, HOT.DOWN].includes(target.key))
    return

  try {
    const [a, b, id] = e.target.id.split('-')
    const block      = get_direction_block(mind.value, id, target.key)
    const el         = document.getElementById(`block-content-${block.id}`)
    focus_el.value   = el
    el.focus()
  }
  catch (e) {
    return
  }
}

// 热键-保存
onMounted  (() => proxy.$add_hots_event(save_local))
onUnmounted(() => proxy.$remove_hots_event(save_local))
const save_local = (target, e) => {
  if (target.key !== HOT.SAVE)
    return
  if (focus_el.value) {
    focus_el.value.blur()
    focus_el.value = null
  }
  proxy.$loading(true)
  save_mind(mind.value)
  proxy.$loading(false)
  proxy.$message('保存成功', MESSAGE.SUCCESS)
}

// 考试模式
use_event(window, 'click', e => {
  if (mode.value !== MODE.EXAM)
    return

  const target = get_element_by_parent_chain(e.target, 'block-l-')
  if (!target)
    return
  const [a, b, id] = e.target.id.split('-')
  const block      = get_block(mind.value, id)
  update_block_attr(block, { visible: !block.visible })
})

// 移动「block」
const show_drag  = ref(false)
const target_id  = ref('')
const candidates = ref([])
use_event(window, 'mousedown', e => {
  if (!e.target.id.startsWith('block-l-'))
    return
  target_id.value       = e.target.id
  const [a, b, id]      = e.target.id.split('-')
  const blocks          = get_block_and_children_and_grachild(mind.value, id).map(a => a.id)
  candidates.value      = get_block_and_children_and_grachild(mind.value, mind.value.mind.id, false)
                            .filter(a => a.show && !blocks.includes(a.id)) // 过滤掉 不显示的 & 自身 & 其子块
                            .map(a => `block-l-${a.id}`)
  show_drag.value       = true
})

const onmouseup = () => {
  show_drag.value       = false
  update_refresh()
}

// 考试模式
const exam_time   = ref('00:00:00')
let   timer, start_timestamp
const start_exam  = () => {
  start_timestamp = Date.now()
  timer = setInterval(() => exam_time.value = get_left_time(start_timestamp, 'hh:mm:ss'), 10)
}
const end_exam    = () => {
  clearInterval(timer)
}
onBeforeUnmount(end_exam)
///////////////////////////////////////////////////////////////////////////////////////////////
const add_child = id => {
  const child      = block_add_child(mind.value, id)
  nextTick(() => {
    focus_el.value = document.getElementById(`block-content-${child.id}`)
    focus_el.value.focus()
    update_refresh()
  })
}
</script>