import { cn } from '@/lib/utils'
import React, { HTMLAttributes, Ref } from 'react'

export interface TextContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref: Ref<HTMLDivElement>
}

const TextContainer = (props: TextContainerProps) => {
  const { ref, className, ...rest } = props
  return (
    <div ref={ref} className={cn('hover:border-b hover:border-gray-200', className)} {...rest} >
      {props.children}
    </div>
  )
}

export default TextContainer
