import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

export const useAuthStore = defineStore(
  'authstore',
  () => {
    const token = ref(null)
    const error = ref('')
    const userId = ref(null)
    const emailUser = ref(null)

    async function login(email, password, router, toast) {
      if (!email || !password) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduzca usuario y contraseña',
          life: 3000
        })
        return
      }
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          token.value = result.user.accessToken
          userId.value = result.user.uid
          emailUser.value = result.user.reloadUserInfo.email

          router.push({ name: 'recipe' })
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'El usuario o la contraseña es incorrecta',
              life: 3000
            })
          } else {
            toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
          }
        })
    }

    async function loginGoogle(router) {
      const googleProvider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          token.value = credential?.accessToken
          userId.value = result.user.uid
          emailUser.value = result.user.email

          router.push({ name: 'recipe' })
        })
        .catch((error) => {
          alert('Error!: ' + error.message)
        })
    }

    async function register(name, email, password) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        })

        const res = await response.json()

        if (!res.status) {
          error.value = res.message
          return false
        }

        token.value = res.token
        return true
      } catch (error) {
        error.value = error.message
        return false
      }
    }

    function logout(router) {
      token.value = null
      userId.value = null
      emailUser.value = null
      router.push({ name: 'login' })
    }

    return { token, error, userId, emailUser, login, loginGoogle, register, logout }
  },
  { persist: true }
)
