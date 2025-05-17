'use client'
import React, { useRef } from 'react'
import EditableText, { AlignType } from '@/components/EditableText'
import { useClickOutside } from '@/hooks/useClickOutside'
import TextContainer from '@/components/TextContainer'
import BlockContainer from '@/components/BlockContainer'
import { blockMap } from '@/questions'
import { useQuestionStore } from '@/store/useQuestionStore'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableContainer from '@/components/SortableContainer'
import QuestionRenderer from '@/components/QuestionRenderer'

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
  const setPageInfo = useQuestionStore((state) => state.setPageInfo)
  const questions = useQuestionStore((state) => state.questions)
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const questionRefs = useRef<Record<string, Element>>({})
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)

  useClickOutside(() => {
    if (questionRefs.current && activeQuestionId) {
      return questionRefs.current[activeQuestionId]
    }
  }, () => {
    setActiveQuestionId(null)
  })

  const renderBlocks = () => {
    return questions.map((question) => {
      const BlockComponent = blockMap.get(question.type)
      if (!BlockComponent) {
        return null
      }
      return (
        <SortableContainer id={question.id} key={question.id} data={question}>
          <BlockContainer
            id={question.id}
            ref={(el) => addQuestionRef(el, question.id)}
          >
            <QuestionRenderer question={question}/>
          </BlockContainer>
        </SortableContainer>
      )
    })
  }
  const addQuestionRef = (el: HTMLDivElement | null, id: string) => {
    if (el) {
      questionRefs.current[id] = el
    }
  }
  return (
    <div className={'flex-1 bg-gray-100 flex justify-center py-3 h-full'}>
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
            <SortableContext
              items={questions}
              strategy={rectSortingStrategy}
            >
              <form>
                {renderBlocks()}
              </form>
            </SortableContext>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorCanvas
