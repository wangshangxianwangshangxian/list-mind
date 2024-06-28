import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

import message from '@/plugins/message'
import share from '@/plugins/share'
import MainData from './stores/MainData'
import VersionStore from './stores/VersionStore'
import language from './plugins/language'
VersionStore().check()
app.use(message)
app.use(share)
app.use(language)
MainData().init_hots(app)

import loading from './directives/loading'
app.directive('loading', loading)

app.mount('#app')