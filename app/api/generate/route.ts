import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = await response.text()

    return NextResponse.json({ output: text })
  } catch (err) {
    console.error('Error generating content from Gemini:', err)
    return NextResponse.json({ output: '❌ Failed to generate content.' }, { status: 500 })
  }
}
