<template>
  <h2>Receta</h2>
  <div v-html="output"></div>
</template>

<script setup>
import { marked } from 'marked'
import { computed } from 'vue'

const props = defineProps(['recipe'])

const output = computed(() => marked(props.recipe))
</script>

<style scoped>
h2 {
  color: #facc15;
  font-size: 2.5rem;
  margin-top: 20px;
}
div {
  border: 1px solid #ffffff1f;
  border-radius: 5px;
  padding: 20px;
}

@media (width < 500px) {
  h2 {
    font-size: 1.2rem;
  }
}
</style>
