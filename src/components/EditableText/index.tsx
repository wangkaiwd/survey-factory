import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'

export type AlignType = 'left' | 'center' | 'right'

// todo: optimize ts type
export interface EditableTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (textStyle: { text: string, align?: AlignType }) => void;
  editable?: boolean;
  placeholder?: string;
  align?: AlignType;
}

const EditableText = (props: EditableTextProps) => {
  const { value, editable = false, placeholder, align, className, onChange } = props
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) {return}
    const placeCaretAtEnd = () => {
      const range = document.createRange()
      const selection = window.getSelection()
      if (!selection || !contentRef.current) {return}
      range.setStart(contentRef.current, contentRef.current.childNodes.length)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    if (editable) {
      contentRef.current.innerText = value
      placeCaretAtEnd()
    }
  }, [editable])
  const onBlur = () => {
    const target = contentRef.current
    if (!target) {return}
    const text = target.innerText
    if (text !== value) {
      onChange({ text, align })
    }
  }
  const getTextAlignCls = () => {
    if (!align) {return}
    const alignMap = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }
    return alignMap[align]
  }

  return (
    <div>
      <div
        onBlur={onBlur}
        ref={contentRef}
        data-placeholder={placeholder}
        contentEditable={editable}
        className={
          cn(
            `py-2 focus:border-b-1 focus:border-b-blue-500 focus:outline-none overflow-hidden caret-blue-500 empty:before:content-[attr(data-placeholder)]`,
            getTextAlignCls(),
            className,
          )
        }
      >
      </div>
      {
        align && editable &&
        <div className={'flex items-center justify-end'}>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onChange?.({ text: value, align: 'left' })}}>
            <AlignLeft className={cn({ 'text-blue-500': align === 'left' })}/>
          </Button>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onChange?.({ text: value, align: 'center' })}}>
            <AlignCenter className={cn({ 'text-blue-500': align === 'center' })}/>
          </Button>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onChange?.({ text: value, align: 'right' })}}>
            <AlignRight className={cn({ 'text-blue-500': align === 'right' })}/>
          </Button>
        </div>
      }
    </div>
  )
}

export default EditableText
