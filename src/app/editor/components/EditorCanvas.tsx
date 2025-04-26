'use client'
import React, { useRef, useState } from 'react'
import EditableText from '@/components/EditableText'
import { useClickOutside } from '@/hooks/useClickOutside'
import TextContainer from '@/components/TextContainer'

const EditorCanvas = () => {
  const [activeBlockId, setActiveBlockId] = useState<string | undefined>(undefined)
  const blockRefs = useRef<HTMLDivElement[]>([])
  const [value, setValue] = useState('标题')
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('center')
  useClickOutside(blockRefs, () => {
    setActiveBlockId(undefined)
  })
  const addBlockRef = (el: HTMLDivElement | null) => {
    if (el && !blockRefs.current.includes(el)) {
      blockRefs.current.push(el)
    }
  }
  return (
    <div className={'flex-1 bg-gray-50 flex items-center justify-center py-3 h-full'}>
      <div className={'w-[600px] bg-white rounded-md h-full px-10 py-6'}>
        <TextContainer ref={addBlockRef} onClick={() => setActiveBlockId('title-id')}>
          <EditableText
            align={align}
            onAlignChange={setAlign}
            placeholder={'请输入标题'}
            editable={activeBlockId === 'title-id'}
            textClassName={'text-3xl'}
            value={value}
            onChange={setValue}
          />
        </TextContainer>
        <TextContainer
          ref={addBlockRef}
          className={'text-neutral-600'}
          onClick={() => setActiveBlockId('description-id')}
        >
          <EditableText
            placeholder={'请输入描述'}
            editable={activeBlockId === 'description-id'}
            value={value}
            onChange={setValue}
          />
        </TextContainer>
      </div>
    </div>
  )
}

export default EditorCanvas
