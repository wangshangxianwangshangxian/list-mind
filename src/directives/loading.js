import Loading from '@/components/Loading.vue'
import { createApp } from 'vue'

const loading = (el, { value }) => {
  if (value || value == undefined) {
    const amount       = Math.min(Math.max(Math.floor(el.clientWidth / 30), 0), 7)
    const props        = { amount }

    const zhanwei      = document.createElement('div')
    zhanwei.style.position = 'relative'
    zhanwei.style.width = '0'
    zhanwei.style.height = '0'

    el.appendChild(zhanwei)
    const rect         = el.getBoundingClientRect()
    const zhanwei_rect = zhanwei.getBoundingClientRect()

    const box          = document.createElement('div')
    box.style.position = 'absolute'
    box.style.width    = `${rect.width}px`
    box.style.height   = `${rect.height}px`
    box.style.left     = `-${zhanwei_rect.left - rect.left}px`
    box.style.top      = `-${zhanwei_rect.top + rect.top}px`
    const component    = createApp(Loading, props)
    el.__data          = { box, component }
    component.mount(box)
    zhanwei.appendChild(box)
  }
  else {
    if (!('__data' in el))
      return
    const { box, component } = el.__data
    component.unmount()
    el.removeChild(box)
    delete el.__data
  }
}

export default loading