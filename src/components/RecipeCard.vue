<template>
  <section class="recipe-card">
    <header><div v-html="recipeTitle"></div></header>
    <div class="recipe-body">
      <div v-html="recipeContent"></div>
    </div>
    <footer>
      <Button
        v-if="props.favorite"
        id="button-delete-favorite"
        class="btn-secondary"
        label="Eliminar de favoritos"
        @click="deleteRecipe()"
      />
      <Button
        v-else
        id="button-favorite"
        class="btn-primary"
        label="Guardar receta como favorita"
        icon="pi pi-star"
        iconPos="right"
        @click="saveRecipe()"
        :disabled="noLogin || noContent"
        v-tooltip.bottom="{
          value: 'Debe iniciar sesión para realizar esta acción',
          disabled: !noLogin
        }"
      />
    </footer>
  </section>

  <Toast />
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { getDatabase, ref as refFirebase, push, child, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'

const dbRef = refFirebase(getDatabase())
const authStore = useAuthStore()
const toast = useToast()

const props = defineProps({
  id: { type: String, default: null },
  recipe: Object,
  favorite: { type: Boolean, default: false }
})

const emit = defineEmits(['changeFavorite', 'changeId'])

const recipeTitle = computed(() => marked(props.recipe.title))
const recipeContent = computed(() => marked(props.recipe.content))
const noLogin = computed(() => !authStore.token && !authStore.userId)
const noContent = computed(() => !props.recipe.content)

const saveRecipe = async () => {
  try {
    // Firebase can accept the login before the Database connection has
    // finished attaching the auth token to it; forcing a token fetch here
    // waits for that handshake so the write below isn't rejected as
    // unauthenticated on its first attempt.
    await getAuth().currentUser?.getIdToken()

    const newRecipeKey = push(child(dbRef, 'recipes')).key

    const updatedData = {}
    updatedData['recipes/' + newRecipeKey] = props.recipe
    updatedData['user-recipes/' + authStore.userId + '/' + newRecipeKey] = props.recipe
    await update(dbRef, updatedData)

    toast.add({
      severity: 'info',
      summary: 'Éxito',
      detail: 'Se ha guardado la información correctamente',
      life: 3000
    })
    emit('changeFavorite', true)
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Ha ocurrido un error al guardar la información: ${error.message}`,
      life: 3000
    })
  }
}

const deleteRecipe = () => {
  const deletedData = {}
  deletedData['recipes/' + props.id] = null
  deletedData['user-recipes/' + authStore.userId + '/' + props.id] = null
  update(dbRef, deletedData)
    .then(() => {
      toast.add({
        severity: 'info',
        summary: 'Éxito',
        detail: 'Se ha eliminado la receta de favoritos',
        life: 3000
      })
      emit('changeFavorite', false)
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error al eliminar la receta. Por favor, inténtelo en unos minutos',
        life: 3000
      })
    })
}
</script>

<style scoped>
.recipe-card {
  background: var(--market-paper);
  color: var(--market-ink);
  border-top: 4px solid var(--market-wood-dark);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 1.25rem;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
}

header {
  font-family: var(--market-font-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 1.3rem;
  color: var(--market-wood-dark);
  padding-bottom: 0.75rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid rgba(36, 26, 16, 0.15);
}

header :deep(strong) {
  font-weight: 700;
}

.recipe-body {
  font-family: Inter, system-ui, sans-serif;
  color: var(--market-ink);
  line-height: 1.6;
}

.recipe-body :deep(h1),
.recipe-body :deep(h2),
.recipe-body :deep(h3) {
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
  color: var(--market-wood-dark);
  margin: 1rem 0 0.4rem;
}

.recipe-body :deep(p) {
  margin: 0 0 0.6rem;
}

.recipe-body :deep(ul),
.recipe-body :deep(ol) {
  margin: 0 0 0.6rem;
  padding-left: 1.4rem;
}

.recipe-body :deep(li) {
  margin-bottom: 0.3rem;
}

.recipe-body :deep(li::marker) {
  color: var(--market-wood-dark);
}

footer {
  margin-top: auto;
  padding-top: 20px;
}

.btn-primary {
  background: var(--market-accent-strong) !important;
  color: var(--market-paper) !important;
  border: none !important;
  border-radius: 4px !important;
  font-family: var(--market-font-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.95rem;
}

.btn-secondary {
  background: transparent !important;
  color: var(--market-ink) !important;
  border: 1.5px solid var(--market-wood-dark) !important;
  border-radius: 4px !important;
  font-family: var(--market-font-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.95rem;
  transition:
    color 0.15s ease-out,
    border-color 0.15s ease-out;
}

.btn-primary:hover {
  background: var(--market-accent) !important;
  border: none !important;
}

.btn-secondary:hover {
  color: var(--market-accent-strong) !important;
  border-color: var(--market-accent-strong) !important;
  background: transparent !important;
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 3px solid var(--market-wood-dark);
  outline-offset: 2px;
}
</style>
