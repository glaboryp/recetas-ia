<template>
  <main>
    <h1>¿Tienes poco tiempo y <span class="title-color">quieres comer bien?</span></h1>
    <h1>
      ¿Quieres sorprender a los tuyos con una buena comida pero
      <span class="title-color">no sabes cómo hacerlo?</span>
    </h1>
    <h2>
      Di adiós a las comidas aburridas, con recomendaciones de recetas impulsadas por inteligencia
      artificial a partir de los ingredientes que tú decidas.
    </h2>

    <FormRecipe
      v-if="status === 0"
      @changeStatus="(n) => (status = n)"
      @changeRecipe="(n) => (recipe = n)"
    />
    <ResultRecipe v-if="status === 1" :recipe="recipe" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import FormRecipe from '@/components/FormRecipe.vue'
import ResultRecipe from '@/components/ResultRecipe.vue'

const status = ref(0)
const recipe = ref('')
</script>

<style scoped>
main {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  max-width: 1300px;
}

h1 {
  color: white;
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: bolder;
}

h2 {
  margin-top: 20px;
  font-size: 1.7rem;
  line-height: 1.5;
}

.title-color {
  color: #facc15;
  font-weight: bolder;
}

@media (width < 900px) {
  main {
    padding: 20px 50px;
  }
}

@media (width < 750px) {
  main {
    padding: 20px 30px;
  }
  h1 {
    font-size: 2.5rem;
  }
}

@media (width < 500px) {
  main {
    padding: 20px 10px;
  }
  h1 {
    font-size: 1.7rem;
  }
  h2 {
    font-size: 1.2rem;
  }
}
</style>
