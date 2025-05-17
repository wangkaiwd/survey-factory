import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'

export interface TextContainerProps extends ComponentProps<'div'> {
  id: string;
}

const BlockContainer = (props: TextContainerProps) => {
  const { className, id, ...rest } = props
  const setActiveQuestionId = useQuestionStore((state) => state.setActiveQuestionId)

  const onClick = () => {
    setTimeout(() => {
      setActiveQuestionId(id)
    })
  }
  return (
    <div {...rest} onClick={onClick}>
      {props.children}
    </div>
  )
}

export default BlockContainer
