<template>
  <h1 class="title" v-if="recipes.length === 0">No tiene aún recetas guardadas</h1>
  <div v-else>
    <h1 class="title">Recetas guardadas</h1>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getDatabase, ref as refFirebase, child, get } from 'firebase/database'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const dbRef = refFirebase(getDatabase())

const recipes = ref({})

get(child(dbRef, `user-recipes/${authStore.userId}`))
.then((snapshot) => {
  if (snapshot.exists()) {
    recipes.value = snapshot.val()
    Object.values(recipes.value).forEach(recipe => {
      recipe['favorite'] = true
    })
  } else {
    recipes.value = {}
  }
}).catch((error) => {
  console.error(error)
})
</script>

<style scoped>
.title {
  text-align: center;
  color: #facc15;
  margin-bottom: 20px;
}
.recipes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 20px;
}
</style>