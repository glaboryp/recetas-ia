<template>
  <div class="container">
    <h1 class="title" v-if="Object.keys(recipes).length === 0 && !loading">
      No tiene aún recetas guardadas
    </h1>
    <h1 class="title" v-else>Recetas guardadas</h1>
    <div class="recipes-list">
      <template v-for="(recipe, index) in recipes" :key="recipe.key">
        <RecipeCard
          :id="index"
          :recipe="recipe"
          :favorite="recipe.favorite"
          @changeFavorite="(n) => (recipe.favorite = n)"
          @changeId="(n) => (index = n)"
        />
      </template>
    </div>
    <div class="loading" v-if="loading">
      <p class="loading-text">¡Recuperando las recetas!</p>
      <ProgressBar mode="indeterminate"></ProgressBar>
    </div>
  </div>

  <Toast />
</template>

<script setup>
import { ref } from 'vue'
import { getDatabase, ref as refFirebase, child, get } from 'firebase/database'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const dbRef = refFirebase(getDatabase())
const toast = useToast()

const recipes = ref({})
const loading = ref(true)

get(child(dbRef, `user-recipes/${authStore.userId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      recipes.value = snapshot.val()
      Object.values(recipes.value).forEach((recipe) => {
        recipe['favorite'] = true
      })
    } else {
      recipes.value = {}
    }
    loading.value = false
  })
  .catch(() => {
    toast.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Ha ocurrido un error al recuperar sus recetas guardadas, inténtelo en unos minutos',
      life: 3000
    })
  })
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 40px;
}

.title {
  text-align: center;
  color: #facc15;
  margin-bottom: 20px;
}

.recipes-list {
  display: grid;
  width: 70%;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
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

@media (width < 700px) {
  .recipes-list {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .container {
    padding-bottom: 20px;
    padding-top: 10px;
  }
}
</style>
