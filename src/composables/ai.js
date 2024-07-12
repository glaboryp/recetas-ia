import { StreamingTextResponse } from 'ai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' })

export async function useCreateRecipe(ingredients = 'Huevos', persons = 2, time = 3) {
  const prompt = `Dame una receta con los siguientes ingredientes ${ingredients} y que sea fácil de hacer.
  La receta debe ser para ${persons} personas y no debe tardar más de ${time} minutos en prepararse.
  `

  const result = await model.generateContent(prompt)
  const response = await result.response

  const streamingResponse = new StreamingTextResponse(response)
  const res = await streamingResponse.text()
  console.log(res)
}
