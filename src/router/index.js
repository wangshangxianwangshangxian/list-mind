import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MindView from '../views/MindView.vue'
import SettingView from '@/views/SettingView.vue'
import CustomerView from '@/views/CustomerView.vue'
import VersionView from '@/views/VersionView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mind/:id',
      name: 'mind',
      component: MindView
    },
    {
      path: '/setting',
      name: 'setting default',
      redirect: '/setting/base'
    },
    {
      path: '/setting/:tab',
      name: 'setting',
      component: SettingView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/version',
      name: 'version',
      component: VersionView
    }
  ]
})

export default router
