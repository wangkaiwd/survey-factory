'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { getQuestionSelector, useQuestionStore, useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import { useEffect } from 'react'
import { debounce } from 'lodash-es'
import { useLatest } from '@/hooks/useLatest'
import { blockMap } from '@/questions'
import { useSearchParams } from 'next/navigation'
import { updateSurveyAction } from '../design/actions'
import { handleApiRes } from '@/lib/http/client'

const QuestionSetting = () => {
  const question = useQuestionStore(getQuestionSelector)!
  const questionRef = useLatest(question)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')!

  const { updateQuestion } = useQuestionStoreActions()

  const form = useForm()

  useEffect(() => {
    form.reset(question.props)
  }, [])

  useEffect(() => {
    const cleanup = form.subscribe({
      formState: {
        values: true,
      },
      callback: debounce(({ values }) => {
        const newQuestion = {
          ...questionRef.current,
          props: values,
        }
        updateQuestion(newQuestion)
        const questions = useQuestionStore.getState().questions
        handleApiRes(() => updateSurveyAction({ id, questions: [...questions, newQuestion] }))
      }, 800),
    })
    return () => cleanup()
  }, [form.subscribe])

  const { setting: SettingComponent } = blockMap.get(question.type) || {}
  if (!SettingComponent) {
    return null
  }
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>问卷设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form><SettingComponent/></form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default QuestionSetting
