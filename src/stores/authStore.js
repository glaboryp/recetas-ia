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

    async function login(email, password, router) {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          token.value = result.user.accessToken
          router.push({ name: 'recipe' })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
          alert('Error: ' + errorMessage)
        })
    }

    async function loginGoogle(router) {
      const googleProvider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          token.value = credential?.accessToken
          router.push({ name: 'recipe' })
        })
        .catch((error) => {
          alert('Error!: ' + error.message)
        })
    }

    async function register(name, email, password) {
      console.log(name, email, password)
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

    function logout() {
      token.value = null
    }

    return { token, error, login, loginGoogle, register, logout }
  },
  { persist: true }
)
