import Message from "@/components/Message.vue"
import { MESSAGE } from "@/utils/constant"
import { createApp } from "vue"

export default {
  install (app) {
    let container = null
    app.config.globalProperties.$message = async (message = '', type = MESSAGE.INFO, options = { timeout: 5000 }) => {
      if (!container) {
        container = document.createElement('div')
        container.style.position = 'fixed'
        container.style.left = '50%'
        container.style.top = '40px'
        container.style.transform = 'translateX(-50%)'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.gap = '12px'
        container.style.zIndex = 7777777
        document.body.appendChild(container)
      }

      const props = {
        message,
        options,
        type
      }

      const box = document.createElement('div')
      const component = createApp(Message, props)
      component.mount(box)
      container.appendChild(box)

      await new Promise(succ => setTimeout(succ, options?.timeout || 5000))
      container.removeChild(box)

      if (!container.children.length) {
        document.body.removeChild(container)
        container = null
      }
    }
  }
}