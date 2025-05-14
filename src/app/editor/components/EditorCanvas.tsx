'use client'
import React, { useEffect, useRef } from 'react'
import EditableText, { AlignType } from '@/components/EditableText'
import { useClickOutside } from '@/hooks/useClickOutside'
import TextContainer from '@/components/TextContainer'
import BlockContainer from '@/components/BlockContainer'
import { blockMap } from '@/blocks'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuestionStore } from '@/store/useQuestionStore'
import { mockData } from '@/mock'

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
  const setQuestions = useQuestionStore((state) => state.setQuestions)
  const setPageInfo = useQuestionStore((state) => state.setPageInfo)
  const questions = useQuestionStore((state) => state.questions)
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const blockRefs = useRef<HTMLDivElement[]>([])
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const methods = useForm()

  useEffect(() => {
    setQuestions(mockData.questions)
    setPageInfo(mockData.pageInfo)
    methods.setValue('questions', mockData.questions)
  }, [])

  useEffect(() => {
    const { unsubscribe } = methods.watch((value: any) => {
      console.log('update', value)
      setQuestions([...value.questions])
    })
    return () => unsubscribe()
  }, [methods.watch])

  useClickOutside(blockRefs, () => {
    setActiveQuestionId(null)
  })
  const addBlockRef = (el: HTMLDivElement | null) => {
    if (!el) {return}
    const index = blockRefs.current.indexOf(el)
    if (index === -1) {
      blockRefs.current.push(el)
    } else {
      blockRefs.current[index] = el
    }
  }

  const renderBlocks = () => {
    return questions.map((question) => {
      const BlockComponent = blockMap.get(question.type)
      if (!BlockComponent) {
        return null
      }
      return (
        <BlockContainer
          key={question.id}
          id={question.id}
          ref={addBlockRef}
        >
          <BlockComponent
            id={question.id}
            {...question.props}
          />
        </BlockContainer>
      )
    })
  }
  return (
    <div className={'flex-1 bg-gray-100 flex justify-center py-3 h-full'}>
      <div className={'overflow-y-auto h-full'}>
        <div className={'w-[600px] bg-white min-h-full rounded-md py-6'}>
          <TextContainer
            editable={activeQuestionId === 'title-id'}
            ref={addBlockRef}
            onClick={() => setActiveQuestionId('title-id')}
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
            editable={activeQuestionId === 'description-id'}
            ref={addBlockRef}
            className={'text-neutral-600'}
            onClick={() => setActiveQuestionId('description-id')}
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
                {renderBlocks()}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorCanvas
