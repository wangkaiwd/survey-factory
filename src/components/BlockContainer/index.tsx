import { cn } from '@/lib/utils'
import React, { HTMLAttributes, Ref } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'

export interface TextContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref: Ref<HTMLDivElement>;
  id: string;
}

const BlockContainer = (props: TextContainerProps) => {
  const { ref, className, id, ...rest } = props
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)
  const editable = activeQuestionId === id
  const getCls = () => {
    const baseCls = 'px-10 pt-3 pb-6'
    if (!editable) {
      return cn(baseCls, 'hover:shadow-container hover:border-y', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500', className)
  }
  return (
    <div ref={ref} className={getCls()} {...rest} onClick={() => setActiveQuestionId(id)}>
      {props.children}
    </div>
  )
}

export default BlockContainer
