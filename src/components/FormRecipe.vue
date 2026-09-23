<template>
  <div v-if="!loading" class="order-pad">
    <form>
      <div class="form-question">
        <span class="order-number">1</span>
        <p>¿Qué ingredientes quieres usar?</p>
      </div>
      <Textarea v-model="ingredients" rows="1" id="ingredients" />

      <div class="form-question">
        <span class="order-number">2</span>
        <p>¿Qué comida quieres hacer?</p>
      </div>
      <Select v-model="lunch" :options="lunchOptions" optionLabel="name" fluid id="lunch" />

      <div class="form-question">
        <span class="order-number">3</span>
        <p>¿Para cuántas personas estás cocinando?</p>
      </div>
      <InputNumber v-model="persons" fluid showButtons inputId="persons" />

      <div class="form-question">
        <span class="order-number">4</span>
        <p>¿Cuánto tiempo tienes?</p>
      </div>
      <div class="form-time">
        <span class="time-value">{{ time }} minutos</span>
        <Slider v-model="time" :step="10" :min="5" :max="120" class="form-slider" />
      </div>

      <Button label="¡Oído cocina!" class="btn-primary" @click="createRecipe()" id="button-create" />
      <Message severity="error" v-if="alertIngredient && !ingredients"
        >Debes introducir al menos un ingrediente</Message
      >
      <Message severity="error" v-if="alertLunch && !lunch"
        >Debes seleccionar la comida que quieres</Message
      >
    </form>
  </div>

  <div class="loading" v-else>
    <p class="loading-text">¡Preparando tu receta!</p>
    <ProgressBar mode="indeterminate"></ProgressBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCreateRecipe } from '@/composables/ai'

const emits = defineEmits(['changeStatus', 'changeRecipe'])

const ingredients = ref('')
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
  if (!ingredients.value) {
    alertIngredient.value = true
    return
  }
  if (!lunch.value) {
    alertLunch.value = true
    return
  }
  loading.value = true
  const result = await useCreateRecipe(ingredients.value, persons.value, time.value, lunch.value)
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
.order-pad {
  position: relative;
  width: 68%;
  margin-top: 30px;
  background: var(--market-paper);
  border-radius: 4px;
  padding: 38px 36px 34px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.28);
  opacity: 0;
  transform: translateY(16px);
  animation: order-pad-drop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes order-pad-drop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .order-pad {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.order-pad::before {
  content: '';
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  height: 8px;
  background-image: radial-gradient(circle, var(--market-wood-dark) 2.5px, transparent 2.5px);
  background-size: 18px 8px;
  background-repeat: repeat-x;
  background-position: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-question {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
}

.form-question p {
  font-family: Inter, system-ui, sans-serif;
  color: var(--market-ink);
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.order-number {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: var(--market-wood-dark);
  color: var(--market-paper);
  font-family: var(--market-font-label);
  font-weight: 700;
  font-size: 0.9rem;
}

.form-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.time-value {
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.9rem;
  color: var(--market-ink);
}

.form-slider {
  width: 90%;
}

.btn-primary {
  background: var(--market-accent-strong) !important;
  color: var(--market-paper) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 1.1rem 1.75rem !important;
  font-family: var(--market-font-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 1.05rem;
  margin-top: 8px;
  transition: background-color 0.15s ease-out;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background: var(--market-accent) !important;
  border: none !important;
}

.btn-primary:focus-visible {
  outline: 3px solid var(--market-ink);
  outline-offset: 2px;
}

:deep(.p-textarea),
:deep(.p-inputnumber-input),
:deep(.p-select) {
  background: var(--market-paper);
  border: 1.5px solid var(--market-wood-dark);
  color: var(--market-ink);
  border-radius: 3px;
  font-size: 0.98rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

:deep(.p-textarea:enabled:focus),
:deep(.p-inputnumber-input:enabled:focus),
:deep(.p-select:not(.p-disabled).p-focus) {
  border-color: var(--market-accent-strong);
  box-shadow: 0 0 0 1px var(--market-accent-strong);
}

:deep(.p-select-label) {
  color: var(--market-ink);
}

:deep(.p-slider) {
  background: var(--market-paper) !important;
  border: 1.5px solid var(--market-wood-dark) !important;
  height: 6px !important;
  border-radius: 3px !important;
  align-items: stretch !important;
}

:deep(.p-slider-track) {
  height: 100% !important;
}

:deep(.p-slider-range) {
  background: var(--market-accent-strong) !important;
  border-radius: 3px !important;
  height: 100% !important;
  top: 0 !important;
}

:deep(.p-slider-handle) {
  background: var(--market-wood-dark) !important;
  border: none !important;
  width: 18px !important;
  height: 18px !important;
  margin-top: -6px !important;
}

.loading {
  display: flex;
  gap: 26px;
  flex-direction: column;
  align-items: center;
  height: 70dvh;
  justify-content: center;
  justify-content: safe center;
}

.loading-text {
  text-align: center;
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.loading :deep(.p-progressbar) {
  width: 70%;
  height: 1.5rem !important;
  border-radius: 4px !important;
}

:deep(.p-progressbar-value) {
  background: var(--market-accent-strong);
}

:deep(.p-progressbar) {
  background: var(--market-bg-soft);
}

@media (width < 750px) {
  .order-pad {
    width: 100%;
    padding: 26px 18px 22px;
  }
}
</style>


