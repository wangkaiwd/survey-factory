'use client'
import React, { useEffect } from 'react'
import BlockContainer from '@/components/BlockContainer'
import { useQuestionStore, useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import QuestionRenderer from '@/components/QuestionRenderer'
import { mockData } from '@/mock'
import DnDItem from '@/components/SmoothDnD/DnDItem'
import DnDContainer from '@/components/SmoothDnD/DnDContainer'
import { applyDrag } from '@/lib/utils'
import { DND_GROUP_NAME } from '@/lib/constants'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { blockMap } from '@/questions'

// interface FormState {
//   title: FormTextStyle
//   description: FormTextStyle
//
//   [key: string]: any
// }

const EditorCanvas = () => {
  const { setPageInfo, setQuestions } = useQuestionStoreActions()
  const questions = useQuestionStore((state) => state.questions)
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const form = useForm()

  useEffect(() => {
    setQuestions(mockData.questions)
    setPageInfo(mockData.pageInfo)
  }, [])

  const renderBlocks = () => {
    return questions.map((question) => {
      return (
        <DnDItem key={question.id}>
          <BlockContainer
            id={question.id}
          >
            <QuestionRenderer question={question}/>
          </BlockContainer>
        </DnDItem>
      )
    })
  }
  return (
    <div className={'flex-1 flex justify-center py-3 h-full'}>
      <div className={'overflow-y-auto h-full'}>
        <div className={'w-[800px] bg-white min-h-full rounded-md py-6 px-10'}>
          <div className={'text-3xl text-center'}>{pageInfo.title}</div>
          <div className={'text-neutral-600 text-center'}>{pageInfo.description}</div>
          <div className={'mt-4'}>
            <Form {...form}>
              <DnDContainer
                className={'space-y-3'}
                dragClass={'border border-gray-200'}
                dragHandleSelector={'.question-drag-handle'}
                groupName={DND_GROUP_NAME}
                getChildPayload={(i) => questions[i]}
                onDrop={(e) => {
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
                }}
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
