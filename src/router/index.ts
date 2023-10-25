import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersIndex.vue')
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/CardsIndex.vue')
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: () => import('../views/ExercisesIndex.vue')
    }
  ]
})

export default router
