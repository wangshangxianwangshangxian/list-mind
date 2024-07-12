import Loading from "@/components/base/Loading.vue"
import { createApp } from "vue"

export default {
  install: app => {
    let box, component
    app.config.globalProperties.$loading = async (show = false) => {
      if (show) {
        if (box) return
        const props = {
          fullscreen: true
        }
  
        box       = document.createElement('div')
        component = createApp(Loading, props)
        component.mount(box)
        document.body.appendChild(box)
      }
      else {
        if (!box) return
        component.unmount()
        document.body.removeChild(box)
        box       = null
        component = null
      }
    }
  }
}