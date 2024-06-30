import Loading from '@/components/Loading.vue'
import { createApp } from 'vue'

const loading = (el, { value }) => {
  if (value || value == undefined) {
    const amount       = Math.min(Math.max(Math.floor(el.clientWidth / 30), 0), 7)
    const props        = { amount }
    const box          = document.createElement('div')
    box.style.position = 'absolute'
    box.style.left     = '0px'
    box.style.top      = '0px'
    box.style.width    = '100%'
    box.style.height   = '100%'
    const component    = createApp(Loading, props)
    el.__data          = { position: el.style.position, box, component }
    el.style.position  = el.style.position || 'relative'
    component.mount(box)
    el.appendChild(box)
  }
  else {
    const { position, box, component } = el.__data
    el.style.position  = position
    component.unmount()
    el.removeChild(box)
  }
}

export default loading