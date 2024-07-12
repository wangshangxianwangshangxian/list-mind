import Dialog from "@/components/base/Dialog.vue"
import { createApp } from "vue"

export default {
  install (app) {
    app.config.globalProperties.$confirm = async (data = {title, content, onClose, onsubmit}) => {
      const props = {
        visible: true,
        title: data.title,
        content: data.content,
        onClose: () => {
          component.unmount()
          document.body.removeChild(box)
          typeof data.onclose === 'function' && data.onclose()
        },
        onSubmit: () => {
          component.unmount()
          document.body.removeChild(box)
          typeof data.onsubmit === 'function' && data.onsubmit()
        }
      }
      
      const box = document.createElement('div')
      document.body.appendChild(box)

      const component = createApp(Dialog, props)
      component.mount(box)
    }
  }
}