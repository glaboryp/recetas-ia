<template>
  <section>
    <header><div v-html="recipeTitle"></div></header>
    <div>
      <div v-html="recipeContent"></div>
    </div>
    <footer>
      <Button
        v-if="props.favorite"
        id="button-delete-favorite"
        label="Eliminar de favoritos"
        @click="deleteRecipe()"
      />
      <Button
        v-else
        id="button-favorite"
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

const saveRecipe = () => {
  const newRecipeKey = push(child(dbRef, 'recipes')).key

  const updatedData = {}
  updatedData['recipes/' + newRecipeKey] = props.recipe
  updatedData['user-recipes/' + authStore.userId + '/' + newRecipeKey] = props.recipe
  update(dbRef, updatedData)
    .then(() => {
      toast.add({
        severity: 'info',
        summary: 'Éxito',
        detail: 'Se ha guardado la información correctamente',
        life: 3000
      })
      emit('changeFavorite', true)
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Ha ocurrido un error al guardar la información. Por favor, inténtelo en unos minutos',
        life: 3000
      })
    })
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
section {
  background: #2a2a31fa;
  color: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.5rem;
}
header {
  font-size: 25px;
}
footer {
  margin-top: 20px;
}
</style>
