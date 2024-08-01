<template>
  <form v-if="!loading">
    <div class="form-question">
      <Badge value="1" size="large" severity="primary"></Badge>
      <p>¿Qué ingredientes quieres usar?</p>
    </div>
    <Textarea v-model="ingredientes" rows="1" id="ingredientes" />

    <div class="form-question">
      <Badge value="2" size="large" severity="primary"></Badge>
      <p>¿Qué comida quieres hacer?</p>
    </div>
    <Select v-model="lunch" :options="lunchOptions" optionLabel="name" fluid />

    <div class="form-question">
      <Badge value="3" size="large" severity="primary"></Badge>
      <p>¿Para cuántas personas estás cocinando?</p>
    </div>
    <InputNumber v-model="persons" fluid showButtons inputId="persons" />

    <div class="form-question">
      <Badge value="4" size="large" severity="primary"></Badge>
      <p>¿Cuánto tiempo tienes?</p>
    </div>
    <div class="form-time">
      <span>{{ time }} minutos</span>
      <Slider v-model="time" :step="10" :min="5" :max="120" class="form-slider" />
    </div>

    <Button label="¡Oído cocina!" @click="createRecipe()" />
    <Message severity="error" v-if="alertIngredient && !ingredientes"
      >Debes introducir al menos un ingrediente</Message
    >
    <Message severity="error" v-if="alertLunch && !lunch"
      >Debes seleccionar la comida que quieres</Message
    >
  </form>

  <div class="loading" v-else>
    <p class="loading-text">¡Preparando tu receta!</p>
    <ProgressBar mode="indeterminate"></ProgressBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCreateRecipe } from '@/composables/ai'

const emits = defineEmits(['changeStatus', 'changeRecipe'])

const ingredientes = ref('')
const lunch = ref('')
const persons = ref(1)
const time = ref(5)
const loading = ref(false)
const alertIngredient = ref(false)
const alertLunch = ref(false)

const lunchOptions = [
  { name: 'Desayuno' },
  { name: 'Aperitivo' },
  { name: 'Almuerzo' },
  { name: 'Merienda' },
  { name: 'Cena' }
]

const createRecipe = async () => {
  if (!ingredientes.value) {
    alertIngredient.value = true
    return
  }
  if (!lunch.value) {
    alertLunch.value = true
    return
  }
  loading.value = true
  const result = await useCreateRecipe(ingredientes.value, persons.value, time.value, lunch.value)
  loading.value = false

  const indexOfEndTitle = result.split('**', 2).join('**').length
  const recipe = {
    title: result.substring(0, indexOfEndTitle + 2),
    content: result.substring(indexOfEndTitle + 2),
    lunch: lunch.value.name,
    persons: persons.value,
    time: time.value
  }

  emits('changeRecipe', recipe)
  emits('changeStatus', 1)
}
</script>

<style scoped>
form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
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

.loading {
  display: flex;
  gap: 20px;
  flex-direction: column;
  height: 70dvh;
  justify-content: center;
}

.loading-text {
  text-align: center;
  font-size: 1.5rem;
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
