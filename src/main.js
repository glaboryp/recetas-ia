import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(router)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'recetas-ia.firebaseapp.com',
  projectId: 'recetas-ia',
  storageBucket: 'recetas-ia.appspot.com',
  messagingSenderId: '1080727127336',
  appId: '1:1080727127336:web:9c56d2b5c16d689fc0bc1d',
  measurementId: 'G-CK5J536QJM'
}

const appAnalytics = initializeApp(firebaseConfig)
getAnalytics(appAnalytics)

app.mount('#app')
