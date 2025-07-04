'use client'
import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'
import { useAppStore, useAppStoreActions } from '@/store/appStore/useAppStore'
import { useEffect } from 'react'
import { useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import { LoaderIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { getSurveyAction } from './actions'
import { handleApiRes } from '@/lib/http/client'

const Editor = () => {
  const { setQuestions, setPageInfo } = useQuestionStoreActions()
  const { setLoading } = useAppStoreActions()
  const searchParams = useSearchParams()
  const id = searchParams.get('id ')
  const loading = useAppStore((state) => state.loading)
  useEffect(() => {
    const fetchSurvey = async () => {
      if (!id) {
        setLoading(false)
        return
      }
      setLoading(true)
      const survey = await handleApiRes(() => getSurveyAction(id))
      if (!survey) return
      setQuestions(survey.questions)
      setPageInfo({
        id: survey.id,
        title: survey.title,
        description: survey.description,
      })
    }
    fetchSurvey()
  }, [])
  return (
    <div className="flex h-full bg-gray-100">
      {
        loading ?
          <LoaderIcon className="animate-spin" />
          :
          <>
            <EditorLeftPanel />
            <EditorCanvas />
            <EditorSettingPanel />
          </>
      }
    </div>
  )
}

export default Editor
