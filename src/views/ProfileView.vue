<template>
  <main>
    <h1 class="title">Mi perfil</h1>
    <form>
      <div class="form-question">
        <p>Nombre y apellidos</p>
      </div>
      <InputText v-model="name" :invalid="name === null" id="name" autocomplete="name" />

      <div class="form-question">
        <p>Correo electónico</p>
      </div>
      <InputText v-model="email" disabled id="email" autocomplete="email" />

      <Button label="Guardar datos" @click="writeUserData()" />
    </form>
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
main {
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  height: 100%;
  align-self: center;
  width: 100%;
}

.title {
  color: #facc15;
  margin-bottom: 20px;
}

form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}

.form-question {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
}

@media (width < 500px) {
  main {
    padding: 20px 10px;
  }
  form {
    width: 100%;
  }
  .form-question {
    font-size: 1rem;
  }
}
</style>
