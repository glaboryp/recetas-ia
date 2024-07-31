import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY
})

export async function useCreateRecipe(ingredients, persons, time, lunch) {
  const prompt = `Dame una receta para ${lunch} con los siguientes ingredientes ${ingredients} (y solo estos ingredientes) y que sea fácil de hacer.
  Lo primero que me tienes que decir es el nombre de la receta.
  La receta debe contener los ingredientes que he mencionado anteriormente (son estos: ${ingredients}) y no puede contener ningún otro ingrediente, a no ser que sea un ingrediente básico como sal, aceite, agua, etc.
  La receta debe ser para ${persons} personas, por lo que tienes que decir la cantidad de ingredientes necesarios para ese número de personas.
  La receta no debe tardar más de ${time} minutos en prepararse.
  La receta tiene que ser para ${lunch}.
  `

  const { text } = await generateText({
    model: google('models/gemini-pro'),
    prompt
  })

  return text
}
