import Menu from "@/components/Menu.vue"
import { createApp } from "vue"

export default {
  install (app) {
    app.config.globalProperties.$menu = async (data = {}) => {
      const props = {
        visible : true,
        pointer : data.pointer,
        el_id   : data.el_id,
        menus   : data.menus,
        position: data.position,
        offset  : data.offset,
        onClose: () => {
          component.unmount()
          document.body.removeChild(box)
          typeof data.onclose === 'function' && data.onclose()
        },
        onSubmit: item => {
          component.unmount()
          document.body.removeChild(box)
          typeof data.onsubmit === 'function' && data.onsubmit(item)
        }
      }
      
      const box = document.createElement('div')
      document.body.appendChild(box)

      const component = createApp(Menu, props)
      component.mount(box)
    }
  }
}