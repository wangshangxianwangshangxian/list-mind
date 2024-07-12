export default {
  /**
   * 热键插件
   * 传入一个热键配置
   * @param {object} app - vue实例
   * @param {Array.<key: string, keys: string[], label: string>} hots_configs - 初始化配置，如配置一条「Meta + s」的热键 [{ key: 'save', keys: ['Meta', 's'], label: '保存', }]
   * @param {string} key_name - 存储到localStroage中的key名称
   */
  install: (app, hots_configs = [], key_name = 'hots') => {
    // 获取配置
    const temp = localStorage.getItem(key_name)
    if (!temp) {
      localStorage.setItem(key_name, JSON.stringify(hots_configs))
    }
    else {
      hots_configs = JSON.parse(temp)
    }

    // 匹配
    const handle = e => {
      const target = hots_configs.find(({ keys }) => {
        return keys.every(key => {
          switch (key.toLowerCase()) {
            case 'meta' : return e.metaKey
            case 'alt'  : return e.altKey
            case 'shift': return e.shiftKey
            case 'ctrl' : return e.ctrlKey
            default: return e.key.toLowerCase() === key.toLowerCase()
          }
        })
      })
      if (target) {
        e.preventDefault()
        queue.forEach(fn => fn(target, e))
      }
    }
    window.addEventListener('keydown', handle)

    // 注册 & 注销
    const queue = []
    app.config.globalProperties.$add_hots_event = callback => {
      queue.push(callback)
    }
    app.config.globalProperties.$remove_hots_event = callback => {
      const index = queue.indexOf(callback)
      queue.splice(index, 1)
    }
  }
}