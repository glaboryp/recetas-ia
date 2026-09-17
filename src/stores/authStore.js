import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'authstore',
  () => {
    const token = ref(null)
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
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
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
      const { getAuth, GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
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

    function logout(router) {
      token.value = null
      userId.value = null
      emailUser.value = null
      router.push({ name: 'login' })
    }

    return { token, userId, emailUser, login, loginGoogle, logout }
  },
  { persist: true }
)
