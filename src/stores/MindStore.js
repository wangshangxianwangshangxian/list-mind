import { keccak256 } from "js-sha3";
import { defineStore } from "pinia";
import utils from '@/utils/utils'

const MindStore = defineStore('MindStore', {
  state () {
    return {
      list  : []
    }
  },

  actions: {
    create_mind() {
      const data = {
        id: keccak256(Date.now().toString()),
        title: '请在这里输入标题',
        create_time: utils.get_time(),
        children: [
          {
            id: keccak256(Date.now().toString()),
            content: '',
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
      this.list.push(data) 
      return data
    },

    new_block() {
      const data = {
        id      : keccak256(Date.now().toString()),
        content : '',
        children: []
      }
      return data
    },
    
    get_mind(id) {
      const target = this.list.find(t => id === t.id)
      return target
    },

    get_block(mind_id, block_id, return_parent = false) {
      const mind = this.get_mind(mind_id)
      let block, p_block
      function search(self, children = []) {
        children.some(c => {
          if (c.id === block_id) {
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
      search(null, mind.children)
      if (!return_parent)
        return block
      return [block, p_block]
    },

    set_block_content(mind_id, block_id, content) {
      const block = this.get_block(mind_id, block_id)
      block.content = content
    },
    
    add_block_child(mind_id, block_id) {
      const block = this.get_block(mind_id, block_id)
      const child = this.new_block()
      block.children.push(child)
      return child
    },

    add_chapter(mind_id) {
      const mind  = this.get_mind(mind_id)
      const child = this.new_block()
      mind.children.push(child)
      return child
    },

    get_direction_block(mind_id, block_id, direction) {
      if (direction === 'left') {
        const [block, p_block] = this.get_block(mind_id, block_id, true)
        return p_block
      }
      
      if (direction === 'right') {
        const block = this.get_block(mind_id, block_id)
        if (!block?.children?.length)
          return null
        const index = Math.floor(block.children.length / 2)
        return block.children[index]
      }

      if (direction === 'up') {
        // const [a, p_block] = this.get_block(mind_id, block_id, true)
        // const [b, g_block] = this.get_block(mind_id, p_block.id, true)
        // const p_block_index = g_block.children.findIndex(p_block)
        // const b_block_index = p_block_index - 1
        // const 
      }
    },

    save_mind(mind_id) {
      const mind = this.get_mind(mind_id)
      if (!mind) {
        throw new Error(`找不到 id 为 ${mind_id} 的思维导图`)
      }

      localStorage.setItem(`mind_${mind_id}`, JSON.stringify(mind))
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

    delete_mind(id) {
      const index = this.list.findIndex(t => t.id === id)
      this.list.splice(index, 1)
      localStorage.removeItem(`mind_${id}`)
    },

    init() {
      return new Promise(succ => {
        this.list = this.request_mind_list()
        succ(true)
      })
    }
  }
})

export default MindStore