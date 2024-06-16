import { keccak256 } from "js-sha3";
import { defineStore } from "pinia";
import utils from '@/utils/utils'

const MindStore = defineStore('MindStore', {
  state () {
    return {
      mind: null
    }
  },

  actions: {
    create_mind() {
      const data = {
        pid        : null,
        id: keccak256(Date.now().toString()),
        title: '请在这里输入标题',
        create_time: utils.get_time(),
        children: [
          {
            pid: '',
            id: keccak256(Date.now().toString()),
            content: '章节名称',
            children: []
          }
        ]
      }
      data.children[0].pid = data.id
      this.mind = data
      this.save_mind(data.id)
      return data
    },

    new_block(pid) {
      const data = {
        pid,
        id      : keccak256(Date.now().toString()),
        content : '',
        children: []
      }
      return data
    },
    
    get_mind(id) {
      this.mind
    },

    request_mind(id) {
      const key    = `mind_${id}`
      const target = localStorage.getItem(key)
      this.mind    = JSON.parse(target)
      return this.mind
    },

    get_block(id) {
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
    
    add_block_child(id) {
      const block = this.get_block(id)
      const child = this.new_block(id)
      block.children.push(child)
      return child
    },

    get_direction_block(id, direction) {
      if (direction === 'left') {
        const block = this.get_block(id)
        const p_block = this.get_block(block.pid)
        return p_block ? p_block : block
      }
      
      if (direction === 'right') {
        const block = this.get_block(id)
        if (!block?.children?.length)
          return null
        const index = Math.floor(block.children.length / 2)
        return block.children[index]
      }

      if (direction === 'up') {
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

      if (direction === 'down') {
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

    save_mind() {
      const mind = this.mind
      localStorage.setItem(`mind_${mind.id}`, JSON.stringify(mind))
    },

    request_mind_list() {
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
      const p_block = this.get_block(block.pid, true)
      if (!p_block) {
        const mind  = this.mind
        const index = mind.children.findIndex(c => c.id === id)
        mind.children.splice(index, 1)
        return 
      }

      const index            = p_block.children.findIndex(c => c.id === id)
      p_block.children.splice(index, 1)
    },

    delete_mind(id) {
      this.mind = null
      localStorage.removeItem(`mind_${id}`)
    },

    is_root(id) {
      return this.mind.id === id
    }
  }
})

export default MindStore