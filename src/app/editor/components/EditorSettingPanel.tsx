'use client'
import { getQuestionSelector, useQuestionStore } from '@/store/questionStore/useQuestionStore'
import QuestionSetting from '@/app/editor/components/QuestionSetting'
import SystemSetting from '@/app/editor/components/SystemSetting'

const EditorSettingPanel = () => {
  const question = useQuestionStore(getQuestionSelector)

  const renderChildren = () => {
    if (question) {
      return <QuestionSetting/>
    }
    return <SystemSetting/>
  }
  return (
    <div className="w-80 h-full">
      {renderChildren()}
    </div>
  )
}

export default EditorSettingPanel
