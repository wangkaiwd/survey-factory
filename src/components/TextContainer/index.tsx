import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'

export interface TextContainerProps extends ComponentProps<'div'> {
  editable?: boolean;
}

const TextContainer = (props: TextContainerProps) => {
  const { className, editable = false, ...rest } = props
  const getCls = () => {
    const base = 'px-10'
    if (!editable) {return cn(base) }
    return cn(base, 'shadow-container border-y border-l-4 border-l-blue-500 py-3', className)
  }
  const getInnerCls = () => {
    if (!editable) {
      return cn('hover:border-b hover:border-gray-200')
    }
  }
  return (
    <div className={getCls()} {...rest} >
      <div className={getInnerCls()}>
        {props.children}
      </div>
    </div>
  )
}

export default TextContainer
