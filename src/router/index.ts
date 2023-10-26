import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'user-profile',
          component: () => import('../views/User.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/UsersIndex.vue')
        },
        {
          path: 'cards',
          name: 'cards',
          component: () => import('../views/CardsIndex.vue')
        },
        {
          path: 'exercises',
          name: 'exercises',
          component: () => import('../views/ExercisesIndex.vue')
        }
      ]
    },

  ]
})

export default router
