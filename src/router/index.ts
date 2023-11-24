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
          component: () => import('../views/users/UserProfile.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/users/UsersIndex.vue'),
          meta: {
            keepAlive: false,
          }
        },
        {
          path: 'users/add',
          name: 'users-add',
          component: () => import('../views/users/UsersAdd.vue'),
          meta: {
            keepAlive: false,
          },
          
        },
        {
          path: 'users/edit/:id',
          name: 'users-edit',
          component: () => import('../views/users/UsersEdit.vue'),
          props: true,
          meta: {
            keepAlive: false,
          },
          
        },
        {
          path: 'cards',
          name: 'cards',
          component: () => import('../views/CardsIndex.vue')
        },
        {
          path: 'exercises',
          name: 'exercises',
          component: () => import('../views/exercises/ExercisesIndex.vue')
        },
        {
          path: 'exercises/add',
          name: 'exercises-add',
          component: () => import('../views/exercises/ExerciseAdd.vue')
        }

      ]
    },

  ]
})

export default router
