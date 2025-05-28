import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'
import { GripHorizontal } from 'lucide-react'

export interface TextContainerProps extends ComponentProps<'div'> {
  id: string;
}

const BlockContainer = (props: TextContainerProps) => {
  const { className, id, ...rest } = props
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const editable = activeQuestionId === id
  const getCls = () => {
    const baseCls = ['px-10 py-3 pb-6 group bg-white']
    if (!editable) {
      return cn(baseCls, 'hover:shadow-container hover:border-y', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500', className)
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
