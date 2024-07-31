<template>
  <FormRecipe
    v-if="status === 0"
    @changeStatus="(n) => (status = n)"
    @changeRecipe="(n) => (recipe = n)"
  />
  <template v-else>
    <h2>Receta</h2>
    <RecipeCard
      :id="id"
      :recipe="recipe"
      :favorite="favorite"
      @changeFavorite="(n) => (favorite = n)"
      @changeId="(n) => (recipe = n)"
    />
  </template>
</template>

<script setup>
import { ref } from 'vue'
import FormRecipe from '@/components/FormRecipe.vue'
import RecipeCard from '@/components/RecipeCard.vue'

const status = ref(0)
const recipe = ref({})
const favorite = ref(false)
const id = ref(null)
</script>

<style scoped>
h2 {
  color: #facc15;
  font-size: 2.5rem;
  margin-top: 20px;
}

@media (width < 500px) {
  h2 {
    font-size: 1.2rem;
  }
}
</style>
