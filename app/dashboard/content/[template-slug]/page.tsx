'use client'

import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

interface PROPS {
  params: {
    'template-slug': string
  }
}

export default function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params['template-slug']
  )

  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  const { user } = useUser()

  const GenerateAIContent = async (formData: any) => {
    setLoading(true)
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt || ''
      const finalPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      })

      const data = await res.json()
      setAiOutput(data.output || '⚠️ No response from AI')
    } catch (error) {
      console.error('AI generation error:', error)
      setAiOutput('❌ Failed to generate content. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div>
      <Link href='/dashboard'>
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        <FormSection
          selectedTemplate={selectedTemplate}
          loading={loading}
          setLoading={setLoading}
          setAiOutput={setAiOutput}
        />
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}
