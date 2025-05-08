'use client'
import React, { useRef, useState } from 'react'
import EditableText, { AlignType } from '@/components/EditableText'
import { useClickOutside } from '@/hooks/useClickOutside'
import TextContainer from '@/components/TextContainer'
import OpenQuestion from '@/blocks/OpenQuestion'
import BlockContainer from '@/components/BlockContainer'

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
  const [formState, setFormState] = useState<FormState>({
    title: {
      align: 'center',
      text: '标题',
    },
    description: {
      align: 'center',
      text: '描述',
    },
    questions: [
      {
        id: 'question-1',
        type: 'OpenQuestion',
        props: {
          title: '问答题',
          placeholder: '请输入问题',
        },
      },
    ],
  })
  const openQuestion = formState.questions[0]
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
  return (
    <div className={'flex-1 bg-gray-50 flex items-center justify-center py-3 h-full'}>
      <div className={'w-[600px] bg-white rounded-md h-full py-6'}>
        <TextContainer
          editable={activeBlockId === 'title-id'}
          ref={addBlockRef}
          onClick={() => setActiveBlockId('title-id')}
        >
          <EditableText
            value={formState.title.text}
            align={formState.title.align}
            placeholder={'请输入标题'}
            editable={activeBlockId === 'title-id'}
            className={'text-3xl'}
            onChange={(textStyle) => {
              setFormState({ ...formState, title: textStyle as FormTextStyle })
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
            value={formState.description.text}
            align={formState.description.align}
            placeholder={'请输入描述'}
            editable={activeBlockId === 'description-id'}
            onChange={(textStyle) => { setFormState({ ...formState, description: textStyle as FormTextStyle }) }}
          />
        </TextContainer>
        <div className={'mt-4'}>
          <BlockContainer
            ref={addBlockRef}
            onClick={() => setActiveBlockId(openQuestion.id)}
            editable={activeBlockId === openQuestion.id}
          >
            <OpenQuestion
              {...openQuestion.props}
              editable={activeBlockId === openQuestion.id}
              onTitleChange={(title) => {
                setFormState({
                  ...formState,
                  questions: [{ ...openQuestion, props: { ...openQuestion.props, title } }],
                })
              }}
              onPlaceholderChange={(placeholder) => {
                setFormState({
                  ...formState,
                  questions: [{ ...openQuestion, props: { ...openQuestion.props, placeholder } }],
                })
              }}
            />
          </BlockContainer>
        </div>
      </div>
    </div>
  )
}

export default EditorCanvas
