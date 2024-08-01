<template>
  <main>
    <FormRecipe
      v-if="status === 0"
      @changeStatus="(n) => (status = n)"
      @changeRecipe="(n) => (recipe = n)"
    />
    <div v-else class="recipe-container">
      <div class="recipe-title">
        <Button label="Volver" icon="pi pi-angle-left" text @click="backForm()" />
        <h2>Receta</h2>
        <div style="width: 98.77px;"></div>
      </div>
      <RecipeCard
        :id="id"
        :recipe="recipe"
        :favorite="favorite"
        @changeFavorite="(n) => (favorite = n)"
        @changeId="(n) => (recipe = n)"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import FormRecipe from '@/components/FormRecipe.vue'
import RecipeCard from '@/components/RecipeCard.vue'

const status = ref(0)
const recipe = ref({})
const favorite = ref(false)
const id = ref(null)

const backForm = () => {
  recipe.value = {}
  status.value = 0
}
</script>

<style scoped>
main {
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  height: 100%;
  align-self: center;
  width: 100%;
}

h2 {
  color: #facc15;
  font-size: 2.5rem;
}

button {
  height: fit-content;
}

.recipe-container {
  max-width: 600px;
}

.recipe-title {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (width < 900px) {
  main {
    padding: 40px 50px;
  }
}

@media (width < 750px) {
  main {
    padding: 30px 30px;
  }
}

@media (width < 500px) {
  main {
    padding: 20px 10px;
  }
  .recipe-title {
    margin-top: 0;
  }
  h2 {
    font-size: 1.7rem;
  }
  button {
    font-size: 0.8rem;
  }
}
</style>
