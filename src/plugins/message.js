import { createApp } from "vue"
import Message from '@/components/Message.vue'

export default {
  install: (app, options) => {
    let   timer    = null
    const messages = []

    app.config.globalProperties.$message = function (message = '', type = 'success', options = {}) {
      const props = { message, type, options }
      const component = createApp(Message, props)
      const container = document.createElement('div')
      document.body.appendChild(container)
      component.mount(container)

      clearTimeout(timer)
      timer = setTimeout(function () {
        document.body.removeChild(container)
      }, 2000)
    }
  }
}