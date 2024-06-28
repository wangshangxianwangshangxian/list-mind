import { defineStore } from "pinia";
import { ANALYZE, BOARD_KEY, HOT_OPTION } from "./constant";
import { get, post } from "@/utils/network";

const MainData = defineStore('MainData', {
  state () {
    return {
      hots: []
    }
  },

  actions: {
    init_hots(app) {
      const $lang = app.config.globalProperties.$lang
      const config = [
        { key: HOT_OPTION.SAVE,   label: $lang('保存'),             keys: [BOARD_KEY.SHIFT, 's'] },
        { key: HOT_OPTION.LEFT,   label: $lang('光标向左移动一个块'), keys: [BOARD_KEY.SHIFT, 'ArrowLeft'] },
        { key: HOT_OPTION.RIGHT,  label: $lang('向右一个块移动'),     keys: [BOARD_KEY.SHIFT, 'ArrowRight'] },
        { key: HOT_OPTION.UP,     label: $lang('然后向上'),          keys: [BOARD_KEY.SHIFT, 'ArrowUp'] },
        { key: HOT_OPTION.DOWN,   label: $lang('最后是向下'),        keys: [BOARD_KEY.SHIFT, 'ArrowDown'] },
        { key: HOT_OPTION.CREATE, label: $lang('创建「子块」'),      keys: [BOARD_KEY.TAB] },
        { key: HOT_OPTION.DELETE, label: $lang('删除「块」'),        keys: [BOARD_KEY.SHIFT, BOARD_KEY.BACKSPACE] },
        { key: HOT_OPTION.MENU,   label: $lang('打开操作菜单'),      keys: [BOARD_KEY.SHIFT, BOARD_KEY.SLASH] }
      ]
      const hots = localStorage.getItem('hots')
      if (hots) {
        this.hots = JSON.parse(hots)
        this.hots.forEach(a => {
          const target = config.find(b => a.key === b.key)
          a.label = target.label
        })
      }
      else {
        this.hots = config
      }
    },

    set_hot_key(key, keys) {
      const target = this.hots.find(t => t.key === key)
      console.log(target)
      target.keys = keys
      localStorage.setItem('hots', JSON.stringify(this.hots))
    },

    search_hot_key(e) {
      const target = this.hots.find(a => {
        return a.keys.every(key => {
          if (key === BOARD_KEY.META)  return e.metaKey
          if (key === BOARD_KEY.CTRL ) return e.ctrlKey
          if (key === BOARD_KEY.ALT  ) return e.altKey
          if (key === BOARD_KEY.SHIFT) return e.shiftKey
          return key === e.key
        })
      })
      return target
    },

    get_hot_info(key) {
      return this.hots.find(a => a.key === key)
    },

    analyze(address) {
      const data = {
        type    : ANALYZE.VIEWS,
        address : address
      }
      post('set-analyze', data)
    },

    get_analyze(address) {
      const data = { address }
      return get('get-analyze', data)
    },

    switch_language(type) {
      localStorage.setItem('lang', type)
    },

    check_language() {
      localStorage.getItem('lang')
    }
  }
})

export default MainData