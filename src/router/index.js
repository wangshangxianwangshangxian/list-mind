import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MindView from '../views/MindView.vue'

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
      name: 'setting',
      component: MindView
    }
  ]
})

export default router
