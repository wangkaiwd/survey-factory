'use client'
import React, { useEffect, useRef } from 'react'
import EditableText, { AlignType } from '@/components/EditableText'
import TextContainer from '@/components/TextContainer'
import BlockContainer from '@/components/BlockContainer'
import { useQuestionStore, useQuestionStoreActions } from '@/store/useQuestionStore'
import QuestionRenderer from '@/components/QuestionRenderer'
import { FormProvider, useForm } from 'react-hook-form'
import { mockData } from '@/mock'
import DnDItem from '@/components/SmoothDnD/DnDItem'
import DnDContainer from '@/components/SmoothDnD/DnDContainer'
import { applyDrag } from '@/lib/utils'
import { DND_GROUP_NAME } from '@/lib/constants'

interface FormTextStyle {
  align: AlignType
  text: string
}

// interface FormState {
//   title: FormTextStyle
//   description: FormTextStyle
//
//   [key: string]: any
// }

const EditorCanvas = () => {
  const { setPageInfo, setQuestions, setActiveQuestionId } = useQuestionStoreActions()
  const questions = useQuestionStore((state) => state.questions)
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const questionRefs = useRef<Record<string, Element>>({})

  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)

  const methods = useForm()

  useEffect(() => {
    setQuestions(mockData.questions)
    setPageInfo(mockData.pageInfo)
    methods.setValue('questions', mockData.questions)
  }, [])

  useEffect(() => {
    const { unsubscribe } = methods.watch((value: any) => {
      setQuestions([...value.questions])
    })
    return () => unsubscribe()
  }, [methods.watch])

  const renderBlocks = () => {
    return questions.map((question) => {
      return (
        <DnDItem key={question.id}>
          <BlockContainer
            id={question.id}
            ref={(el) => addQuestionRef(el, question.id)}
          >
            <QuestionRenderer question={question}/>
          </BlockContainer>
        </DnDItem>
      )
    })
  }
  const addQuestionRef = (el: HTMLDivElement | null, id: string) => {
    if (el) {
      questionRefs.current[id] = el
    }
  }
  return (
    <div className={'flex-1 flex justify-center py-3 h-full'}>
      <div className={'overflow-y-auto h-full'}>
        <div className={'w-[600px] bg-white min-h-full rounded-md py-6'}>
          <TextContainer
            ref={(el) => addQuestionRef(el, 'title-id')}
            editable={activeQuestionId === 'title-id'}
            onClick={() => {
              setTimeout(() => {
                setActiveQuestionId('title-id')
              })
            }}
          >
            <EditableText
              value={pageInfo.title?.text}
              align={pageInfo.title?.align}
              placeholder={'请输入标题'}
              editable={activeQuestionId === 'title-id'}
              className={'text-3xl'}
              onChange={(textStyle) => {
                setPageInfo({ ...pageInfo, title: textStyle as FormTextStyle })
              }}
            />
          </TextContainer>
          <TextContainer
            ref={(el) => addQuestionRef(el, 'description-id')}
            editable={activeQuestionId === 'description-id'}
            className={'text-neutral-600'}
            onClick={() => {
              setTimeout(() => {
                setActiveQuestionId('description-id')
              })
            }}
          >
            <EditableText
              value={pageInfo.description?.text}
              align={pageInfo.description?.align}
              placeholder={'请输入描述'}
              editable={activeQuestionId === 'description-id'}
              onChange={(textStyle) => { setPageInfo({ ...pageInfo, description: textStyle as FormTextStyle }) }}
            />
          </TextContainer>
          <div className={'mt-4'}>
            <FormProvider {...methods}>
              <form>
                <DnDContainer
                  dragHandleSelector={'.question-drag-handle'}
                  groupName={DND_GROUP_NAME}
                  dropPlaceholder={{ className: 'bg-gray-100' }}
                  getChildPayload={(i) => questions[i]}
                  onDrop={(e) => {
                    const newQuestions = applyDrag(questions, e, (payload) => {
                      const { type } = payload
                      return {
                        id: crypto.randomUUID(),
                        type,
                        props: {
                          title: '标题',
                          placeholder: '请输入问题',
                        },
                      }
                    })
                    setQuestions(newQuestions)
                    methods.setValue('questions', newQuestions)
                  }}
                >
                  {renderBlocks()}
                </DnDContainer>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorCanvas
