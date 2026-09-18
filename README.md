[![Cypress Test](https://github.com/glaboryp/recetas-ia/actions/workflows/main.yml/badge.svg)](https://github.com/glaboryp/recetas-ia/actions/workflows/main.yml)

# Recetas con Inteligencia Artificial 

👋🏻 Hola, mi nombre es Gloria, y este proyecto es mi participación en la [hackatón de midudev](https://github.com/midudev/hackaton-vercel-2024), aunque me gustaría seguir mejorándolo y añadiendo nuevas funcionalidades.

El objetivo de esta aplicación web es permitir a los usuarios generar recetas de cocina a partir de los ingredientes que tienen por casa, y además, que puedan configurar otros parámetros como el número de personas para las que quieren cocinar, el tiempo que tienen disponible, etc.

El proyecto está creado con vue, utilizando Vercel AI SDK para la conexión con la api de Gemini, y es Open Source, así que si te interesa aportar es super bienvenido.

Si quieres ver la aplicación en funcionamiento, puedes hacerlo [aquí](https://recetas-ia-sdk.vercel.app/).

> Puedes usar el siguiente usuario de prueba:
>
> - Email: prueba@prueba.com
> - Contraseña: 1234Prueba

## 🚀 Contribuir

1. Crea un [Fork](https://github.com/glaboryp/recetas-ia/fork) del proyecto

2. Clona el repositorio en tu máquina local:

   ```bash
   git clone git@github.com:tu_username/recetas-ia.git
   ```

3. Instala las dependencias y ejecuta la aplicación en local

   ```bash
   pnpm install
   pnpm run dev
   ```

4. Renombra el archivo `.env.example` a `.env` y añade tu API Key de Google Gemini y la API key de Firebase

   ```
   VITE_GOOGLE_API_KEY=your_api_key
   VITE_FIREBASE_API_KEY=your_api_key
   ```

5. Realiza los cambios y crea una pull request 🚀

## 🛠️ Stack y librerías utilizadas

- [**Vue**](https://vuejs.org/) - An approachable, performant and versatile framework for building web user interfaces
- [**Vite**](https://vitejs.dev/) - Next generation frontend tooling
- [**Vercel AI SDK**](https://sdk.vercel.ai/) - A set of tools for building AI-powered applications
- [**ESLint**](https://eslint.org/) - Find and fix problems in your JavaScript code
- [**Prettier**](https://prettier.io/) - An opinionated code formatter.

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).
