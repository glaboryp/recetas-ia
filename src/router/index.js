import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

const pinia = createPinia()
setActivePinia(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: () => import('@/views/RecipeView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AuthView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/user-recipes',
      name: 'user-recipes',
      component: () => import('@/views/UserRecipesView.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.token != null && authStore.userId != null

  if (to.name === 'login' && isAuthenticated) {
    return { name: 'recipe' }
  }

  if (to.meta.requireAuth && !isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
