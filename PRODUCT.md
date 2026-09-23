# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Cocinillas de andar por casa con poco tiempo que necesitan resolver "¿qué como hoy?" con lo que ya tienen en casa, sin asumir conocimientos avanzados de cocina. La copy actual del producto ("¿Tienes poco tiempo y quieres comer bien?", "quieres sorprender a los tuyos... no sabes cómo hacerlo") confirma esta situación de uso.

## Product Purpose

Generar recetas de cocina personalizadas mediante IA a partir de los ingredientes que el usuario ya tiene, junto con parámetros que él mismo fija: tipo de comida (desayuno, aperitivo, almuerzo, merienda, cena), número de personas y tiempo disponible. Éxito = el usuario obtiene rápido una receta concreta que puede cocinar ya, con lo que tiene a mano.

## Positioning

La personalización por restricciones reales (ingredientes + tipo de comida + comensales + tiempo disponible) produce una receta hecha a medida, en lugar de una búsqueda genérica en una base de datos de recetas existentes.

## Operating Context

- App web (SPA), interfaz en español.
- Flujo principal: formulario de restricciones (`FormRecipe`) → receta generada (`RecipeView`).
- Sistema de cuenta con Firebase Auth para guardar recetas propias (`UserRecipesView`) y perfil (`ProfileView`); existe un usuario de prueba documentado en el README para evaluar la app sin registrarse.
- Demo pública desplegada en Vercel.

## Capabilities and Constraints

- Vue 3 + Vue Router + Pinia; UI construida con PrimeVue (requiere una license key de PrimeVue Community).
- Generación de recetas vía Vercel AI SDK contra la API de Google Gemini.
- Firebase para autenticación y base de datos en tiempo real.
- Proyecto open source (licencia MIT), nacido de la hackatón de Vercel de midudev; mantenido principalmente por una sola persona, contribuciones externas bienvenidas.
- Sin requisito de accesibilidad específico documentado más allá de las prácticas estándar.

## Brand Commitments

Ninguno es vinculante para el rediseño: el usuario ha confirmado explícitamente que tanto el nombre "Recetas IA" como el logo actual (`public/logo.webp`) y el modo oscuro (hoy fijado en `index.html` sin toggle) están abiertos a replantearse como parte de la nueva dirección visual. No hay activos de marca que el rediseño deba preservar por defecto.

## Evidence on Hand

- Demo en producción: recetas-ia-sdk.vercel.app.
- Usuario de prueba documentado en README (prueba@prueba.com) para evaluar flujos autenticados.
- Logo actual en `public/logo.webp` (su continuidad es una decisión abierta del rediseño, no un hecho a preservar).
- No hay investigación de usuarios, testimonios ni casos de estudio reales; no inventar ninguno en el trabajo de diseño.

## Product Principles

1. La personalización por restricciones reales (ingredientes, tipo de comida, comensales, tiempo) es el valor central; nunca degradar la superficie principal a una búsqueda o listado genérico de recetas.
2. Diseñar para cocinillas de andar por casa, no para chefs: lenguaje y flujo accesibles, sin jerga culinaria avanzada.
3. Es un proyecto open source vivo, mantenido principalmente por una persona; priorizar decisiones que sigan siendo sostenibles de mantener en solitario.
4. El rediseño parte con las manos completamente libres: ninguna decisión visual actual (naming, logo, modo oscuro, look de PrimeVue) es una restricción a heredar.
