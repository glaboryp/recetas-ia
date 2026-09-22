<template>
  <main class="recipe-view">
    <FormRecipe
      v-if="status === 0"
      @changeStatus="(n) => (status = n)"
      @changeRecipe="(n) => (recipe = n)"
    />
    <div v-else class="recipe-container">
      <div class="recipe-title">
        <Button label="Volver" icon="pi pi-angle-left" text class="btn-back" @click="backForm()" />
        <h2>Tu receta</h2>
        <div style="width: 98.77px"></div>
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
  favorite.value = false
}
</script>

<style scoped>
.recipe-view {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: safe center;
  background: var(--market-bg);
  background-image: radial-gradient(circle at 50% 30%, var(--market-bg-soft) 0%, var(--market-bg) 70%);
}

h2 {
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(2.1rem, 4.5vw, 2.8rem);
  margin: 0;
}

button {
  height: fit-content;
}

.btn-back {
  color: var(--market-chalk-dim) !important;
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
}

.recipe-container {
  max-width: 750px;
  width: 100%;
  opacity: 0;
  transform: translateY(16px);
  animation: recipe-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes recipe-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .recipe-container {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.recipe-title {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (width < 900px) {
  .recipe-view {
    padding: 40px 50px;
  }
}

@media (width < 750px) {
  .recipe-view {
    padding: 30px 30px;
  }
}

@media (width < 500px) {
  .recipe-view {
    padding: 20px 10px;
  }
  .recipe-title {
    margin-top: 0;
  }
  button {
    font-size: 0.8rem;
  }
}
</style>
