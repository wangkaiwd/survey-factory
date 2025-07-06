'use client'
import React from 'react'
import BlockContainer from '@/components/BlockContainer'
import { useQuestionStore, useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import QuestionRenderer from '@/components/QuestionRenderer'
import DnDItem from '@/components/SmoothDnD/DnDItem'
import DnDContainer from '@/components/SmoothDnD/DnDContainer'
import { applyDrag } from '@/lib/utils'
import { DND_GROUP_NAME } from '@/lib/constants'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { blockMap } from '@/questions'
import { DropResult } from 'smooth-dnd'
import { updateSurveyAction } from '@/app/editor/design/actions'
import { handleApiRes } from '@/lib/http/client'
import { useSearchParams } from 'next/navigation'

const EditorCanvas = () => {
  const { setQuestions } = useQuestionStoreActions()
  const questions = useQuestionStore((state) => state.questions)
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')!
  const form = useForm()
  const onDrop = (e: DropResult) => {
    const newQuestions = applyDrag(questions, e, (payload) => {
      const { type } = payload
      const { defaultSetting } = blockMap.get(type) || {}
      return {
        id: crypto.randomUUID(),
        type,
        props: defaultSetting,
      }
    })
    setQuestions(newQuestions)
    handleApiRes(() => updateSurveyAction({ id, questions: newQuestions }))
  }
  const renderBlocks = () => {
    if (!questions?.length) {
      return (
        <div className={'text-center text-neutral-400'}>
          <div className={'text-2xl mb-4'}>请添加问题</div>
          <div className={'text-lg'}>拖拽左侧面板中的问题类型进行添加</div>
        </div>
      )
    }
    return questions.map((question) => {
      return (
        <DnDItem key={question.id}>
          <BlockContainer
            id={question.id}
          >
            <QuestionRenderer question={question} />
          </BlockContainer>
        </DnDItem>
      )
    })
  }
  return (
    <div className={'flex-1 flex justify-center py-3 h-full'}>
      <div className={'overflow-y-auto h-full'}>
        <div className={'w-[800px] bg-white min-h-full rounded-md py-6 px-10'}>
          {
            pageInfo.title ?
              <div className={'text-3xl text-center'}>{pageInfo.title}</div>
              :
              <div className={'text-3xl text-center text-neutral-400'}>请输入问卷标题</div>
          }
          {
            pageInfo.description ?
              <div className={'text-neutral-600 text-center'}>{pageInfo.description}</div>
              :
              <div className={'text-neutral-400 text-center'}>请输入问卷描述</div>
          }
          <div className={'mt-4'}>
            <Form {...form}>
              <DnDContainer
                className={'space-y-3'}
                dragClass={'border border-gray-200'}
                dragHandleSelector={'.question-drag-handle'}
                groupName={DND_GROUP_NAME}
                getChildPayload={(i) => questions[i]}
                onDrop={onDrop}
              >
                {renderBlocks()}
              </DnDContainer>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorCanvas
