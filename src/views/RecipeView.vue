<template>
  <FormRecipe
    v-if="status === 0"
    @changeStatus="(n) => (status = n)"
    @changeRecipe="(n) => (recipe = n)"
  />
  <ResultRecipe v-if="status === 1" :recipe="recipe" />
</template>

<script setup>
import { ref } from 'vue'
import FormRecipe from '@/components/FormRecipe.vue'
import ResultRecipe from '@/components/ResultRecipe.vue'

const status = ref(0)
const recipe = ref('')
</script>

<style scoped></style>
