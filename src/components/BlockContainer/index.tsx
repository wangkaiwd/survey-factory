import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'

export interface TextContainerProps extends ComponentProps<'div'> {
  id: string;
}

const BlockContainer = (props: TextContainerProps) => {
  const { className, id, ...rest } = props
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)
  const editable = activeQuestionId === id
  const getCls = () => {
    const baseCls = 'px-10 py-3 pb-6'
    if (!editable) {
      return cn(baseCls, 'hover:shadow-container hover:border-y', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500', className)
  }

  const onClick = () => {
    console.log('setState')
    setActiveQuestionId(id)
  }
  return (
    <div className={getCls()} {...rest} onClick={onClick}>
      {props.children}
    </div>
  )
}

export default BlockContainer
