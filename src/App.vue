<template>
  <MenuBar />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue'
</script>

<style>
main {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  height: 100%;
  align-self: center;
  width: 100%;
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
}

@media (width < 500px) {
  main {
    padding: 20px 10px;
  }
}
</style>
