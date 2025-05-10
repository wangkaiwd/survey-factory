'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditableText, { AlignType } from '@/components/EditableText'
import { useClickOutside } from '@/hooks/useClickOutside'
import TextContainer from '@/components/TextContainer'
import BlockContainer from '@/components/BlockContainer'
import { blockMap } from '@/blocks'
import { FormProvider, useForm } from 'react-hook-form'

interface FormTextStyle {
  align: AlignType
  text: string
}

interface FormState {
  title: FormTextStyle
  description: FormTextStyle

  [key: string]: any
}

const EditorCanvas = () => {
  const [activeBlockId, setActiveBlockId] = useState<string | undefined>(undefined)
  const blockRefs = useRef<HTMLDivElement[]>([])
  const [pageInfo, setPageInfo] = useState<FormState>({
    id: 'page-id-1',
    title: {
      align: 'center',
      text: '标题',
    },
    description: {
      align: 'center',
      text: '描述',
    },
  })
  const [questions, setQuestions] = useState([
    {
      id: 'question-1',
      type: 'OpenQuestion',
      props: {
        title: '问答题',
        placeholder: '请输入问题',
      },
    },
  ])
  const methods = useForm({
    values: {
      questions,
    },
  })

  useEffect(() => {
    const { unsubscribe } = methods.watch((value: any) => {
      setQuestions([...value.questions])
    })
    return () => unsubscribe()
  }, [methods.watch])

  useClickOutside(blockRefs, () => {
    setActiveBlockId(undefined)
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
      const editable = activeBlockId === question.id
      const BlockComponent = blockMap.get(question.type)
      if (!BlockComponent) {
        return null
      }
      return (
        <BlockContainer
          key={question.id}
          ref={addBlockRef}
          onClick={() => setActiveBlockId(question.id)}
          editable={editable}
        >
          <BlockComponent
            {...question.props}
            editable={editable}
          />
        </BlockContainer>
      )
    })
  }
  return (
    <div className={'flex-1 bg-gray-100 flex items-center justify-center py-3 h-full'}>
      <div className={'w-[600px] bg-white rounded-md h-full py-6'}>
        <TextContainer
          editable={activeBlockId === 'title-id'}
          ref={addBlockRef}
          onClick={() => setActiveBlockId('title-id')}
        >
          <EditableText
            value={pageInfo.title.text}
            align={pageInfo.title.align}
            placeholder={'请输入标题'}
            editable={activeBlockId === 'title-id'}
            className={'text-3xl'}
            onChange={(textStyle) => {
              setPageInfo({ ...pageInfo, title: textStyle as FormTextStyle })
            }}
          />
        </TextContainer>
        <TextContainer
          editable={activeBlockId === 'description-id'}
          ref={addBlockRef}
          className={'text-neutral-600'}
          onClick={() => setActiveBlockId('description-id')}
        >
          <EditableText
            value={pageInfo.description.text}
            align={pageInfo.description.align}
            placeholder={'请输入描述'}
            editable={activeBlockId === 'description-id'}
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
  )
}

export default EditorCanvas
