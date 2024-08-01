<template>
  <h1 class="title" v-if="recipes.length === 0">No tiene aún recetas guardadas</h1>
  <div v-else class="container">
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