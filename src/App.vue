<template>
  <MenuBar />
  <div class="app-content" :class="{ 'full-bleed': route.meta.fullBleed }">
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MenuBar from './components/MenuBar.vue'

const route = useRoute()
</script>
