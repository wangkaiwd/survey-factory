'use client'
import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'
import { useAppStore, useAppStoreActions } from '@/store/appStore/useAppStore'
import { useEffect } from 'react'
import { mockData } from '@/mock'
import { useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import { LoaderIcon } from 'lucide-react'

const Editor = () => {
  const { setQuestions, setPageInfo } = useQuestionStoreActions()
  const { setLoading } = useAppStoreActions()
  const loading = useAppStore((state) => state.loading)
  useEffect(() => {
    setQuestions(mockData.questions)
    setPageInfo(mockData.pageInfo)
    setLoading(false)
  }, [])
  return (
    <div className="flex h-full bg-gray-100">
      {
        loading ?
          <LoaderIcon className="animate-spin"/>
          :
          <>
            <EditorLeftPanel/>
            <EditorCanvas/>
            <EditorSettingPanel/>
          </>
      }
    </div>
  )
}

export default Editor
