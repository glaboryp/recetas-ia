<template>
  <form v-if="!loading">
    <div class="form-question">
      <Badge value="1" size="large" severity="primary"></Badge>
      <p>¿Qué ingredientes quieres usar?</p>
    </div>
    <Textarea v-model="ingredientes" rows="1" />

    <div class="form-question">
      <Badge value="2" size="large" severity="primary"></Badge>
      <p>¿Para cuántas personas estás cocinando?</p>
    </div>
    <InputNumber v-model="persons" fluid showButtons />

    <div class="form-question">
      <Badge value="3" size="large" severity="primary"></Badge>
      <p>¿Cuánto tiempo tienes?</p>
    </div>
    <div class="form-time">
      <span>{{ time }} minutos</span>
      <Slider v-model="time" :step="10" :min="5" :max="120" class="form-slider" />
    </div>

    <Button label="¡Oído cocina!" @click="createRecipe()" />
  </form>

  <div v-else>
    ¡Preparando tu receta!
    <ProgressBar mode="indeterminate"></ProgressBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCreateRecipe } from '@/composables/ai'

const ingredientes = ref('')
const persons = ref(1)
const time = ref(5)
const loading = ref(false)

const createRecipe = async () => {
  loading.value = true
  const result = await useCreateRecipe(ingredientes.value, persons.value, time.value)
  console.log(result)
  loading.value = false
}
</script>

<style scoped>
form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
}

.form-question {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
}

.form-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.form-slider {
  width: 90%;
}
</style>
