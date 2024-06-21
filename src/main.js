import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import message from '@/plugins/message'
import MainData from './stores/MainData'
import VersionStore from './stores/VersionStore'
MainData().init_hots()
VersionStore().check()
app.use(message)

app.mount('#app')
