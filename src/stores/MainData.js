import { defineStore } from "pinia";

const MainData = defineStore('MainData', {
  state () {
    return {
      hots: []
    }
  },

  actions: {
    init_hots() {
      const hots = localStorage.getItem('hots')
      if (hots) {
        this.hots = JSON.parse(hots)
      }
      else {
        this.hots = [
          { key: 'save',  label: '保存',               keys: ['Ctrl', 's'] },
          { key: 'left',    label: '光标向左移动一个块', keys: ['Ctrl', 'ArrowLeft'] },
          { key: 'right', label: '向右一个块移动',       keys: ['Ctrl', 'ArrowRight'] },
          { key: 'up',    label: '然后向上',            keys: ['Ctrl', 'ArrowUp'] },
          { key: 'down',  label: '最后是向下',          keys: ['Ctrl', 'ArrowDown'] }
        ]
      }
    },

    set_hot_key(key, keys) {
      const target = this.hots.find(t => t.key === key)
      console.log(target)
      target.keys = keys
      localStorage.setItem('hots', JSON.stringify(this.hots))
    }
  }
})

export default MainData