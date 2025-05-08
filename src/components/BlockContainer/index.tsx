import { cn } from '@/lib/utils'
import React, { HTMLAttributes, Ref } from 'react'

export interface TextContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref: Ref<HTMLDivElement>;
  editable?: boolean;
}

const BlockContainer = (props: TextContainerProps) => {
  const { ref, className, editable = false, ...rest } = props
  const getCls = () => {
    const baseCls = 'px-10 py-6'
    if (!editable) {
      return cn(baseCls, 'hover:shadow-container hover:border-y', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500', className)
  }
  return (
    <div ref={ref} className={getCls()} {...rest} >
      {props.children}
    </div>
  )
}

export default BlockContainer
