import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import RecipeView from '@/views/RecipeView.vue'
import UserRecipesView from '@/views/UserRecipesView.vue'
import ProfileView from '@/views/ProfileView.vue'

const pinia = createPinia()
setActivePinia(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/user-recipes',
      name: 'user-recipes',
      component: UserRecipesView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.token != null && authStore.userId != null

  if (to.name === 'login' && isAuthenticated) {
    next('recipe')
    return
  }

  const needAuth = to.meta.requireAuth

  if (needAuth && !isAuthenticated) {
    next('login')
    return
  }

  next()
})

export default router
