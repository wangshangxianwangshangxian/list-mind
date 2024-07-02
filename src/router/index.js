import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MindView from '../views/MindView.vue'
import SettingView from '@/views/SettingView.vue'
import CustomerView from '@/views/CustomerView.vue'
import VersionView from '@/views/VersionView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MobileView from '@/views/MobileView.vue'
import is_pc from '@/utils/is_pc'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mind/:address',
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
    },
    {
      path: '/dashboard/:address',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/404',
      name: 'not found',
      component: NotFoundView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'any',
      redirect: '/404'
    },
    {
      path      : '/sorry',
      name      : 'sorry',
      component : MobileView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!is_pc() && to.name !== 'sorry') {
    return router.push({ name: 'sorry' })
  }
  next()
})

export default router
