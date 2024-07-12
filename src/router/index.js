import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import is_pc from '@/utils/is_pc'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mind/:address',
      name: 'mind',
      component: () => import('../views/MindView.vue')
    },
    {
      path: '/setting/:tab',
      name: 'setting',
      component: () => import('../views/SettingView.vue')
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import('../views/MobileView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'any',
      redirect: '/404'
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!is_pc() && to.name !== 'mobile') {
    return router.push({ name: 'mobile' })
  }
  next()
})

export default router
