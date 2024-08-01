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
    <Button
      label="Comenzar"
      as="router-link"
      :to="{ name: 'recipe' }"
      size="large"
      class="button-start"
      icon="pi pi-arrow-right"
      iconPos="right"
    />
  </main>
</template>

<script setup></script>

<style scoped>
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

h1 {
  color: white;
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: bolder;
  padding-top: 20px;
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

.button-start {
  margin-top: 70px;
  font-size: 1.5rem;
  padding: 10px 20px;
  display: flex;
  align-items: baseline;
  text-decoration: none;
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
  .button-start {
    margin-top: 60px;
    font-size: 1.2rem;
    padding: 8px 16px;
  }
}

@media (width < 515px) {
  main {
    padding: 20px 10px;
  }
  h1 {
    font-size: 1.7rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  .button-start {
    margin-top: 40px;
    font-size: 1rem;
    padding: 5px 10px;
  }
}
</style>
