<template>
  <main class="auth-view">
    <section class="auth-scene">
      <div class="auth-card">
        <p class="auth-greeting">De vuelta al mostrador.</p>

        <Button
          label="Continuar con Google"
          icon="pi pi-google"
          fluid
          class="btn-secondary"
          @click="authStore.loginGoogle($router)"
        />

        <div class="divider">
          <span>o con tu correo</span>
        </div>

        <form>
          <FloatLabel>
            <InputText id="username" v-model="email" fluid autocomplete="email" />
            <label for="username">Correo electrónico</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              inputId="passwordUser"
              v-model="password"
              :feedback="false"
              toggleMask
              fluid
              autocomplete="current-password"
            />
            <label for="passwordUser">Contraseña</label>
          </FloatLabel>
          <Button
            id="button-login"
            label="Iniciar sesión"
            class="btn-primary"
            @click.prevent="authStore.login(email, password, $router, toast)"
            fluid
          />
        </form>
      </div>
    </section>
  </main>

  <Toast position="top-center" />
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const toast = useToast()

const email = ref('')
const password = ref('')
</script>

<style scoped>
.auth-view {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.auth-scene {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: safe center;
  align-items: center;
  padding: 20px;
  background: var(--market-bg);
  background-image: radial-gradient(circle at 50% 40%, var(--market-bg-soft) 0%, var(--market-bg) 70%);
}

.auth-card {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  max-width: 430px;
  background: var(--market-bg-soft);
  border: 1px solid var(--market-wood-dark);
  border-radius: 4px;
  padding: 40px 36px;
}

.auth-greeting {
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(2rem, 4.5vw, 2.6rem);
  margin: 0 0 4px;
  text-align: center;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--market-chalk-dim);
  font-family: var(--market-font-label);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--market-line);
}

form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.btn-secondary {
  background: var(--market-paper) !important;
  color: var(--market-ink) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 0.85rem 1.5rem !important;
  font-family: var(--market-font-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.92rem;
  transition: background-color 0.15s ease-out;
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
  transition: background-color 0.15s ease-out;
}

.btn-secondary:hover {
  background: var(--market-chalk) !important;
  border: none !important;
}

.btn-primary:hover {
  background: var(--market-accent) !important;
  border: none !important;
}

.btn-secondary:focus-visible,
.btn-primary:focus-visible {
  outline: 3px solid var(--market-chalk);
  outline-offset: 2px;
}

:deep(.p-inputtext) {
  background: var(--market-bg) !important;
  border: 1px solid var(--market-wood-dark) !important;
  color: var(--market-chalk) !important;
  font-size: 1.02rem;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: var(--market-accent) !important;
  box-shadow: 0 0 0 1px var(--market-accent);
}

:deep(.p-floatlabel label) {
  color: var(--market-chalk-dim) !important;
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-size: 0.82rem;
}

:deep(.p-password) {
  width: 100%;
}

@media (width < 480px) {
  .auth-card {
    padding: 24px 20px;
  }
}
</style>
