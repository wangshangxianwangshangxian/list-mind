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
            pid: null,
            id: keccak256(Date.now().toString()),
            content: '章节名称',
            children: [
              // {
              //   id: '2',
              //   content: 'nihao',
              //   children: [
              //     {
              //       id: '3',
              //       content: 'haha',
              //       children: []
              //     },
              //     {
              //       id: '4',
              //       content: 'haha 2',
              //       children: []
              //     }
              //   ]
              // }
            ]
          }
        ]
      }
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

    get_block(id, return_parent = false) {
      let block, p_block
      function search(self, children = []) {
        children.some(c => {
          if (c.id === id) {
            block = c
            p_block = self
            return true
          }
          if (c.children?.length) {
            search(c, c.children)
            return false
          }
          return false
        })
      }
      search(null, this.mind.children)
      if (!return_parent)
        return block
      return [block, p_block]
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
        const [block, p_block] = this.get_block(id, true)
        return p_block
      }
      
      if (direction === 'right') {
        const block = this.get_block(id)
        if (!block?.children?.length)
          return null
        const index = Math.floor(block.children.length / 2)
        return block.children[index]
      }

      if (direction === 'up') {
        let block   = this.get_block(id),
            p_block = this.get_block(block.pid),
            index   = p_block.children.indexOf(block)
        
        while(index === 0) {
          block   = p_block
          p_block = this.get_block(p_block.pid)
          index   =  p_block.children.indexOf(block)
        }

        const target  = p_block.children[index - 1]
        return target
      }

      if (direction === 'down') {
        let block   = this.get_block(id),
            p_block = this.get_block(block.pid),
            index   = p_block.children.indexOf(block)
        
        while(index === p_block.length - 1) {
          block   = p_block
          p_block = this.get_block(p_block.pid)
          index   =  p_block.children.indexOf(block)
        }

        const target  = p_block.children[index + 1]
        return target
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
      const [block, p_block] = this.get_block(id, true)
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
    }
  }
})

export default MindStore