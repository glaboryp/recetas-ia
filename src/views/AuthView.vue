<template>
  <section>
    <div class="container">
      <h3>Inicia sesión con Google</h3>
      <Button
        label="Iniciar sesión con Google"
        icon="pi pi-google"
        fluid
        @click="authStore.loginGoogle($router)"
      />

      <h3>o continúa con el correo electrónico</h3>

      <form>
        <FloatLabel>
          <InputText id="username" v-model="email" fluid autocomplete="email" />
          <label for="username">Correo electrónico</label>
        </FloatLabel>
        <FloatLabel>
          <Password id="password" v-model="password" :feedback="false" toggleMask fluid autocomplete="current-password" />
          <label for="password">Contraseña</label>
        </FloatLabel>
        <Button
          label="Iniciar sesión"
          @click.prevent="authStore.login(email, password, $router, toast)"
          fluid
        />
      </form>
    </div>
  </section>

  <Toast position="top-center"/>
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
h1 {
  padding-bottom: 40px;
}
h3 {
  text-align: center;
  padding-top: 30px;
}
section {
  height: 80dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(circle, #facc151a, #181818, #181818);
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #181818;
  padding: 30px;
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 20px;
  width: 100%;
}
</style>
