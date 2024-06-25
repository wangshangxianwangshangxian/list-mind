import { defineStore } from "pinia";
import utils from '@/utils/utils'
import { DIRECTION, MODE } from "./constant";
import { get, post } from "@/utils/network";
import { ERROR_CODE } from "./errorcode";

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
        id         : utils.generate_key(),
        address    : '',
        title      : '请在这里输入标题',
        create_time: utils.get_time(),
        update_time: utils.get_time(),
        upload_time: null,
        expand     : true,
        editable   : true,
        visible    : true,
        children   : [],
        ip         : ''
      }
      data.address = utils.generate_public_key(data.id)
      this.mind    = data
      this.blocks.push(data)
      this.new_block(data.id, { content: '章节' })
      this.save(data.id)
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
          link  : ''
        },
        style: {
          backgroundColor: utils.get_bg_color()
        }
      }, o)
      const block = this.get_block(pid)
      block.children.push(data)
      this.blocks.push(data)
      return data
    },
    
    get_mind(id) {
      this.mind
    },

    load_mind(id) {
      let target
      if (utils.is_public_key(id)) {
        target = utils.get_mind_by_public_key_local(id)
      }
      else if (utils.is_private_key(id)) {
        target = utils.get_mind_by_private_key_local(id)
      }

      if (!target) return null
      return target
    },

    async request_mind(id, address) {
      const resp = await get('3001/get-mind', { id, address })
      if (resp.code === ERROR_CODE.SUCCESS) {
        return resp.data
      }

      return null
    },

    init_mind(target) {
      this.mind = target
      const handler = (children = []) => {
        children.forEach(c => {
          this.blocks.push(c)
          this.blocks.push(...c.children)
          c.children.forEach(tmp => handler(tmp.children))
        })
      }

      this.blocks.push(this.mind)
      handler(this.mind.children)
    },

    async is_mind_in_remote() {
      const data = {
        id     : this.mind.id,
        address: this.mind.address
      }

      if ('upload_time' in this.mind && this.mind.upload_time) {
        return true
      }
      // const resp = await get('get-mind', data)
      // if (resp.code === ERROR_CODE.SUCCESS) {
      //   return true
      // }

      return false
    },

    get_block(id) {
      // if (this.mind.id === id) {
      //   return this.mind
      // }
      // const block = this.blocks.find(t => t.id === id)
      // return block

      if (this.mind.id === id) {
        return this.mind
      }

      let block
      function search(children = []) {
        children.some(c => {
          if (c.id === id) {
            block = c
            return true
          }
          if (c.children?.length) {
            search(c.children)
            return false
          }
          return false
        })
      }
      search(this.mind.children)
      return block
    },

    set_block_content(id, content) {
      const block = this.get_block(id)
      if (!block)
        return
      block.content = content
    },

    get_direction_block(id, direction) {
      if (direction === DIRECTION.LEFT) {
        const block = this.get_block(id)
        const p_block = this.get_block(block.pid)
        return p_block ? p_block : block
      }
      
      if (direction === DIRECTION.RIGHT) {
        const block = this.get_block(id)
        if (!block?.children?.length)
          return null
        const index = Math.floor(block.children.length / 2)
        return block.children[index]
      }

      if (direction === DIRECTION.UP) {
        let block   = this.get_block(id)
        let p_block, index

        while(1) {
          p_block = this.get_block(block.pid)
          index   = p_block.children.indexOf(block)
          if (this.is_root(p_block.id) && index === 0) {
            return block
          }

          if (index !== 0) {
            return p_block.children[index - 1]
          }

          block = p_block
        }
      }

      if (direction === DIRECTION.DOWN) {
        let block   = this.get_block(id)
        let p_block, index

        while(1) {
          p_block = this.get_block(block.pid)
          index   = p_block.children.indexOf(block)
          if (this.is_root(p_block.id) && index === p_block.children.length - 1) {
            return block
          }

          if (index !== p_block.children.length - 1) {
            return p_block.children[index + 1]
          }

          block = p_block
        }
      }
    },

    save() {
      const mind = this.mind
      mind.update_time = utils.get_time()
      localStorage.setItem(`mind_${mind.address}`, JSON.stringify(mind))
    },

    async save_remote() {
      const resp = await post('3000/upload-mind', this.mind)
      if (resp.code === ERROR_CODE.SUCCESS) {
        this.mind = resp.data
        this.save()
        return true
      }
      
      return false
    },

    load_mind_list() {
      const list = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.startsWith('mind_'))
          continue
        try {
          const mind = JSON.parse(localStorage.getItem(key))
          list.push(mind)
        }
        catch(e) {
          continue
        }
      }
      return list
    },

    delete_block(id) {
      const block = this.get_block(id)
      const p_block = this.get_block(block.pid)
      if (!p_block) {
        const mind  = this.mind
        let index = mind.children.findIndex(c => c.id === id)
        mind.children.splice(index, 1)
        index = this.blocks.indexOf(block)
        this.blocks.splice(index, 1)
        return block
      }

      let index = p_block.children.findIndex(c => c.id === id)
      p_block.children.splice(index, 1)
      index = this.blocks.indexOf(block)
      this.blocks.splice(index, 1)
      return block
    },

    delete_mind(id) {
      this.mind = null
      this.blocks.length = 0
      localStorage.removeItem(`mind_${id}`)
    },

    is_root(id) {
      return this.mind.id === id
    },

    toggle_expand(id) {
      const block = this.get_block(id)
      block.expand = !block.expand
    },

    set_expand(id, value) {
      const block = this.get_block(id)
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
      const block = this.get_block(id)
      block.visible = !block.visible
    },

    get_block_index(id) {
      const block   = this.get_block(id)
      const p_block = this.get_block(block.pid)
      return p_block.children.indexOf(block)
    },

    is_last_block(id) {
      const block   = this.get_block(id)
      const p_block = this.get_block(block.pid)
      const index   = p_block.children.indexOf(block)
      return index === p_block.children.length - 1
    },

    move(id, new_pid, new_index) {
      const block   = this.get_block(id)
      const p_block = this.get_block(block.pid)
      const index   = this.get_block_index(id)
      p_block.children.splice(index, 1)
      
      const n_p_block = this.get_block(new_pid)
      block.pid      = new_pid
      if (p_block === n_p_block && index < new_index) {
        new_index--
      }
      n_p_block.children.splice(new_index, 0, block)
    },

    get_children_ids(id, deep = false) {
      const block = this.get_block(id)
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
    }
  }
})

export default MindStore