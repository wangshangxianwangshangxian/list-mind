import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import init_token from './atom/init_token'
import key_init from './atom/key_init'
import init_config from './atom/init_config'
import Button from './components/base/Button.vue'
import Dialog from './components/base/Dialog.vue'
import Icon from './components/base/Icon.vue'
import Input from './components/base/Input.vue'
import confirm from '@/plugins/confirm'
import menu from '@/plugins/menu'
import message from './plugins/message'
import loading from './plugins/loading'
import hots from './plugins/hots'
import { HOT, KEYBOARD } from './utils/constant'

init_config()
key_init()
init_token()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Icon', Icon)
app.component('Input', Input)

app.use(confirm)
app.use(menu)
app.use(message)
app.use(loading)

// 快捷键插件
const config = [
  { key: HOT.SAVE,   keys: [KEYBOARD.META, 's'],                label: '保存', },
  { key: HOT.LEFT,   keys: [KEYBOARD.META, KEYBOARD.LEFT],      label: '光标向左移动一个块' },
  { key: HOT.RIGHT,  keys: [KEYBOARD.META, KEYBOARD.RIGHT],     label: '向右一个块移动' },
  { key: HOT.UP,     keys: [KEYBOARD.META, KEYBOARD.UP],        label: '然后向上' },
  { key: HOT.DOWN,   keys: [KEYBOARD.META, KEYBOARD.DONW],      label: '最后是向下' },
  { key: HOT.CREATE, keys: [KEYBOARD.TAB],                      label: '创建「子块」' },
  { key: HOT.DELETE, keys: [KEYBOARD.META, KEYBOARD.BACKSPACE], label: '删除「块」' }
]
app.use(hots, config, 'hots')

app.mount('#app')
