import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'
import { useQuestionStore, useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import { GripHorizontal } from 'lucide-react'

export interface TextContainerProps extends ComponentProps<'div'> {
  id: string;
}

const BlockContainer = (props: TextContainerProps) => {
  const { className, id, ...rest } = props
  const { setActiveQuestionId } = useQuestionStoreActions()
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const isActive = activeQuestionId === id
  const getCls = () => {
    const baseCls = ['px-10 py-3 pb-6 group bg-white rounded-lg']
    if (!isActive) {
      return cn(baseCls, 'hover:shadow-container hover:border hover:border-gray-200', className)
    }
    return cn(baseCls, 'shadow-container border border-blue-400', className)
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    rest.onClick?.(e)
    setTimeout(() => {
      setActiveQuestionId(id)
    })
  }
  return (
    <div className={getCls()} {...rest} onClick={onClick}>
      <div className={'flex items-center justify-center mb-1'}>
        <GripHorizontal className={'cursor-pointer invisible group-hover:visible text-gray-400 question-drag-handle'}/>
      </div>
      {props.children}
    </div>
  )
}

export default BlockContainer
