import { cn } from '@/lib/utils'
import React, { HTMLAttributes, Ref } from 'react'

export interface TextContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref: Ref<HTMLDivElement>;
  editable?: boolean;
}

const TextContainer = (props: TextContainerProps) => {
  const { ref, className, editable = false, ...rest } = props
  const getCls = () => {
    const baseCls = 'px-10'
    if (!editable) {
      return cn(baseCls, 'hover:border-b hover:border-gray-200', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500 py-3', className)
  }
  return (
    <div ref={ref} className={getCls()} {...rest} >
      {props.children}
    </div>
  )
}

export default TextContainer
