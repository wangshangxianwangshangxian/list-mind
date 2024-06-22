import { createApp } from "vue"
import Message from '@/components/Message.vue'

export default {
  install: app => {
    let container       = null
    let completed_count = 0

    app.config.globalProperties.$message = async function (message = '', type = 'success', options = { }) {

      const o = Object.assign({
        timeout: 5000
      }, options)

      if (!container) {
        container = document.createElement('div')
        container.style.position        = 'fixed'
        container.style.left            = '50%'
        container.style.top             = '2rem'
        container.style.display         = 'flex'
        container.style.flexDirection   = 'column'
        container.style.gap             = '20px'
        container.style.transform       = 'translateX(-50%)'
        container.style.zIndex          = 999999
        document.body.appendChild(container)
      }

      const props = { message, type, options }
      const component = createApp(Message, props, o)
      const box = document.createElement('div')
      component.mount(box)
      box.style.animation = 'in_1 .2s'
      container.appendChild(box)
      
      await new Promise(succ => setTimeout(succ, o.timeout - 500))
      box.style.animation = 'out_1 .3s'
      box.addEventListener('animationend', () => {
        completed_count++
        box.style.opacity = 0
        if (container.children.length === completed_count) {
          document.body.removeChild(container)
          container = null
          completed_count = 0
        }
      })

    }
  }
}