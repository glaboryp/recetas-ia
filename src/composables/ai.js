import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY
})

export async function useCreateRecipe(ingredients, persons, time) {
  const prompt = `Dame una receta con los siguientes ingredientes ${ingredients} y que sea fácil de hacer.
  La receta debe ser para ${persons} personas y no debe tardar más de ${time} minutos en prepararse.
  `

  const { text } = await generateText({
    model: google('models/gemini-pro'),
    prompt
  })

  return text
}
