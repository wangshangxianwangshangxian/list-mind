import { defineStore } from "pinia";
import utils from '@/utils/utils'
import { MODE } from "./constant";
import get_time from "@/utils/get_time";
import generate_address from "@/utils/generate_address";
import get_block from "@/atom/get_block";
import save_local from "@/atom/save_local";
import key_set from "@/atom/key_set";
import generate_key from "@/utils/generate_key";

const MindStore = defineStore('MindStore', {
  state () {
    return {
      mind  : null,
      blocks: [],
      mode: MODE.COMMON,
      exam_info: {
        timer     : null,
        start_time: null,
        end_time  : null,
        message   : ''
      }
    }
  },

  actions: {
    create_mind() {
      const data = {
        pid        : null,
        id         : generate_key(10),
        address    : '',
        title      : '请在这里输入标题',
        create_time: get_time(),
        update_time: get_time(),
        upload_time: null,
        expand     : true,
        editable   : true,
        visible    : true,
        children   : [],
        ip         : ''
      }
      const key    = generate_key()
      data.address = generate_address(key)
      this.mind    = data
      this.blocks.push(data)
      this.new_block(data.id, { content: '章节' })
      save_local(this.mind)
      key_set(key)
      return data
    },

    // 创建块，并添加到父节点上
    new_block(pid, o = {}) {
      const data = Object.assign({
        pid,
        id      : utils.generate_key(10),
        expand  : true,
        visible : true,
        editable: true,
        content : '',
        children: [],
        addition: {
          link  : '',
          img64 : ''
        },
        style: {
          backgroundColor: utils.get_bg_color()
        }
      }, o)
      const block = get_block(pid)
      block.children.push(data)
      this.blocks.push(data)
      return data
    },

    delete_block(id) {
      const block = get_block(id)
      const p_block = get_block(block.pid)
      this.collect_block_ids(id).forEach(a => {
        const index = this.blocks.findIndex(s => s.id === a.id)
        this.blocks.splice(index, 1)
      })
      if (!p_block) {
        const mind  = this.mind
        let index = mind.children.findIndex(c => c.id === id)
        mind.children.splice(index, 1)
        return block
      }

      let index = p_block.children.findIndex(c => c.id === id)
      p_block.children.splice(index, 1)
      return block
    },

    is_root(id) {
      return this.mind.id === id
    },

    toggle_expand(id) {
      const block = get_block(id)
      block.expand = !block.expand
    },

    set_expand(id, value) {
      const block = get_block(id)
      block.expand = value
    },

    is_exam_mode() {
      return this.mode === MODE.EXAM
    },

    is_guest_mode() {
      return this.mode === MODE.GUEST
    },

    is_common_mode() {
      return this.mode === MODE.COMMON
    },

    toggle_in_exam(id) {
      const block = get_block(id)
      block.visible = !block.visible
    },

    get_block_index(id) {
      const block   = get_block(id)
      const p_block = get_block(block.pid)
      return p_block.children.indexOf(block)
    },

    is_last_block(id) {
      const block   = get_block(id)
      const p_block = get_block(block.pid)
      const index   = p_block.children.indexOf(block)
      return index === p_block.children.length - 1
    },

    move(id, new_pid, new_index) {
      const block   = get_block(id)
      const p_block = get_block(block.pid)
      const index   = this.get_block_index(id)
      p_block.children.splice(index, 1)
      
      const n_p_block = get_block(new_pid)
      block.pid      = new_pid
      if (p_block === n_p_block && index < new_index) {
        new_index--
      }
      n_p_block.children.splice(new_index, 0, block)
    },

    get_children_ids(id, deep = false) {
      const block = get_block(id)
      const arrs  = block.children.map(c => c.id)

      function handler(children) {
        children.forEach(c => {
          arrs.push(c.id)
          deep && c.children.forEach(t => handler(t.children))
        })
      }
      handler(block.children)

      return arrs
    },

    switch_mode(mode) {
      // 旧 mode，cleanup处理
      if (this.mode === MODE.EXAM) {
        clearInterval(this.exam_info.timer)
      }

      // 新mode，初始化处理
      if (mode === MODE.GUEST) {
        this.mode = MODE.GUEST
        this.blocks.forEach(b => {
          b.visible  = true
          b.editable = false
          b.expand   = true
        })
      }
      else if (mode === MODE.COMMON) {
        this.mode = MODE.COMMON
        this.blocks.forEach(b => {
          b.visible  = true
          b.editable = true
          b.expand   = true
        })
      }
      else if (mode === MODE.EXAM) {
        this.mode = MODE.EXAM
        this.blocks.forEach(b => {
          b.visible  = false
          b.editable = false
          b.expand   = true
        })
        this.exam_info.start_time = Date.now()
        this.exam_info.end_time   = this.exam_info.start_time
        const handler             = () => {
          this.exam_info.end_time = Date.now()
          this.exam_info.message = `考试中, 用时 ${utils.get_left_time(this.exam_info.start_time, this.exam_info.end_time)}`
        }
        handler()
        this.exam_info.timer      = setInterval(handler, 100)
      }
    },

    set_link(id, link) {
      const block         = get_block(id)
      block.addition.link = link
    },

    set_image(id, base64) {
      const block          = get_block(id)
      block.addition.img64 = base64
    },

    collect_block_ids(id) {
      const arrs = [id]
      const handler = children => {
        children.forEach(a => {
          arrs.push(a.id)
          handler(a.children)
        })
      }
      const block = get_block(id)
      handler(block.children)
      return arrs
    }
  }
})

export default MindStore