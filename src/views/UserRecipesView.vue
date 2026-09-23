<template>
  <div class="container">
    <h1 class="title" v-if="Object.keys(recipes).length === 0 && !loading">
      Aún no tienes recetas guardadas
    </h1>
    <h1 class="title" v-else>Tus recetas guardadas</h1>
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
  flex: 1 1 auto;
  min-height: 0;
  padding: 40px 24px 50px;
  background: var(--market-bg);
  background-image: radial-gradient(circle at 50% 20%, var(--market-bg-soft) 0%, var(--market-bg) 70%);
}

.title {
  text-align: center;
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(2.1rem, 4.5vw, 2.8rem);
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(12px);
  animation: title-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes title-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .title {
    animation: none;
    opacity: 1;
    transform: none;
  }
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
  justify-content: safe center;
}

.loading-text {
  text-align: center;
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(1.4rem, 3vw, 1.8rem);
}

@media (width < 700px) {
  .recipes-list {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .container {
    padding: 10px 18px 20px;
  }
}
</style>
