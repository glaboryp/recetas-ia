<template>
  <main class="profile-view">
    <div class="member-card">
      <span class="punch-hole"></span>
      <span class="card-kicker">Ficha de socio</span>
      <h1 class="title">{{ name || 'Tu ficha' }}</h1>

      <div class="field">
        <label for="name">Nombre y apellidos</label>
        <InputText v-model="name" :invalid="name === null" id="name" autocomplete="name" />
      </div>

      <div class="field">
        <label for="email">Correo electrónico</label>
        <InputText v-model="email" disabled id="email" autocomplete="email" />
      </div>

      <Button label="Guardar datos" class="btn-primary" @click="writeUserData()" />
    </div>
  </main>

  <Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as refFirebase, get, child, update } from 'firebase/database'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'

const dbRef = refFirebase(getDatabase())
const authStore = useAuthStore()
const toast = useToast()

const name = ref('')
const email = ref('')

onMounted(() => {
  getUserData()
})

const getUserData = () => {
  get(child(dbRef, `users/${authStore.userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        name.value = snapshot.val().username
        email.value = snapshot.val().email
      } else {
        const updatedData = {}
        updatedData['users/' + authStore.userId + '/email'] = authStore.emailUser
        update(dbRef, updatedData)
        email.value = authStore.emailUser
      }
    })
    .catch((error) => {
      toast.add({ severity: 'error', summary: 'Info', detail: error, life: 3000 })
    })
}

const writeUserData = () => {
  const updatedData = {}
  updatedData['users/' + authStore.userId + '/username'] = name.value
  updatedData['users/' + authStore.userId + '/email'] = email.value
  update(dbRef, updatedData)
    .then(() => {
      toast.add({
        severity: 'info',
        summary: 'Éxito',
        detail: 'Se ha guardado la información correctamente',
        life: 3000
      })
    })
    .catch((error) => {
      toast.add({ severity: 'error', summary: 'Info', detail: error, life: 3000 })
    })
}
</script>

<style scoped>
.profile-view {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: safe center;
  background: var(--market-bg);
  background-image: radial-gradient(circle at 50% 30%, var(--market-bg-soft) 0%, var(--market-bg) 70%);
}

.member-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--market-paper);
  padding: 40px 36px 34px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  clip-path: polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
  opacity: 0;
  transform: translateY(16px);
  animation: card-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.punch-hole {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--market-bg-soft);
  border: 1.5px solid var(--market-wood-dark);
}

.card-kicker {
  position: absolute;
  top: 16px;
  right: 22px;
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: var(--market-wood-dark);
}

.title {
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-ink);
  font-size: clamp(1.9rem, 4.5vw, 2.4rem);
  margin: 8px 0 4px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-size: 0.82rem;
  color: var(--market-wood-dark);
}

.btn-primary {
  background: var(--market-accent-strong) !important;
  color: var(--market-paper) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 0.85rem 1.5rem !important;
  font-family: var(--market-font-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 1.02rem;
  margin-top: 4px;
  transition: background-color 0.15s ease-out;
}

.btn-primary:hover {
  background: var(--market-accent) !important;
  border: none !important;
}

.btn-primary:focus-visible {
  outline: 3px solid var(--market-wood-dark);
  outline-offset: 2px;
}

:deep(.p-inputtext) {
  background: var(--market-paper) !important;
  border: 1.5px solid var(--market-wood-dark) !important;
  color: var(--market-ink) !important;
  border-radius: 3px;
  font-size: 1.02rem;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: var(--market-accent-strong) !important;
  box-shadow: 0 0 0 1px var(--market-accent-strong);
}

:deep(.p-inputtext:disabled) {
  background: rgba(36, 26, 16, 0.06);
  color: var(--market-ink);
  opacity: 1;
}

@keyframes card-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .member-card {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

@media (width < 500px) {
  .profile-view {
    padding: 24px 16px;
  }
}
</style>
