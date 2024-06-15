import { keccak256 } from "js-sha3";
import { defineStore } from "pinia";
import utils from '@/utils/utils'

const MindStore = defineStore('MindStore', {
  state () {
    return {
      list: []
    }
  },

  actions: {
    create_mind() {
      const data = {
        id: keccak256(Date.now().toString()),
        title: '请在这里输入标题',
        create_time: utils.get_time(),
        minds: [
          {
            id: '1',
            content: 'block',
            children: [
              {
                id: '2',
                content: 'nihao',
                children: [
                  {
                    id: '3',
                    content: 'haha',
                    children: []
                  },
                  {
                    id: '4',
                    content: 'haha 2',
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
      this.list.push(data) 
      return data
    },
    
    get_mind(id) {
      const target = this.list.find(t => id === t.id)
      return target
    }
  }
})

export default MindStore