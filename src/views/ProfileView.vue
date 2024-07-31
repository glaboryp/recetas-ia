<template>
  <h1>Mi perfil</h1>
  <form>
    <div class="form-question">
      <p>Nombre y apellidos</p>
    </div>
    <InputText v-model="name" :invalid="name === null" />

    <div class="form-question">
      <p>Correo electónico</p>
    </div>
    <InputText v-model="email" disabled/>

    <Button label="Guardar datos" @click="writeUserData()" />
  </form>

  <Toast />
</template>

<script setup>
import { ref, onMounted  } from 'vue'
import { getDatabase, ref as refFirebase, get, child, update } from "firebase/database"
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast';

const dbRef = refFirebase(getDatabase())
const authStore = useAuthStore()
const toast = useToast()

const name = ref('')
const email = ref('')

onMounted(() => {
  getUserData()
})


const getUserData = () => {
  get(child(dbRef, `users/${authStore.userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      name.value = snapshot.val().username
      email.value = snapshot.val().email
    } else {
      const updatedData = {}
      updatedData['users/' + authStore.userId + '/email'] = authStore.emailUser
      update(dbRef, updatedData)
      email.value = authStore.emailUser
    }
  }).catch((error) => {
    toast.add({ severity: 'error', summary: 'Info', detail: error, life: 3000 })
  })
}

const writeUserData = () => {
  const updatedData = {}
  updatedData['users/' + authStore.userId + '/username'] = name.value
  updatedData['users/' + authStore.userId + '/email'] = email.value
  update(dbRef, updatedData)
  .then(() => {
    toast.add({ severity: 'info', summary: 'Éxito', detail: 'Se ha guardado la información correctamente', life: 3000 })
  })
  .catch((error) => {
    toast.add({ severity: 'error', summary: 'Info', detail: error, life: 3000 })
  })
}
</script>

<style scoped>
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

@media (width < 750px) {
  form {
    width: 100%;
  }
  .form-question {
    font-size: 1rem;
  }
}
</style>