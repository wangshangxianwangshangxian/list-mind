import { createApp } from "vue"
import ShareDialog from '@/components/ShareDialog.vue'

export default {
  install: app => {
    let container       = null
    app.config.globalProperties.$share = async address => {
      if (container)
        return
      container = document.createElement('div')
      container.style.zIndex = 999999
      document.body.appendChild(container)

      const props = { 
        address,
        onC_close: () => {
          component.unmount()
          document.body.removeChild(container)
          container = null
        }
      }
      const component = createApp(ShareDialog, props)
      component.config.globalProperties.$message = app.config.globalProperties.$message
      component.mount(container)
    }
  }
}