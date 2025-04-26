import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'

export interface EditableTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  editable?: boolean;
  placeholder?: string;
  align?: 'left' | 'center' | 'right';
  onAlignChange?: (align: 'left' | 'center' | 'right') => void;
}

const EditableText = (props: EditableTextProps) => {
  const { value, editable = false, placeholder, align, onAlignChange, className, onChange } = props
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      placeCaretAtEnd()
    }
  }, [editable])

  const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target
    const text = target.innerText
    onChange(text)
  }
  return (
    <div>
      <div
        onInput={onInput}
        ref={contentRef}
        contentEditable={editable}
        className={cn(
          `py-2 text-center focus:border-b-1 focus:border-b-blue-500 focus:outline-none overflow-hidden caret-blue-500`,
          className)}
      >
        {value || placeholder}
      </div>
      {
        align && editable &&
        <div className={'flex items-center justify-end'}>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onAlignChange?.('left')}}>
            <AlignLeft className={cn({ 'text-blue-500': align === 'left' })}/>
          </Button>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onAlignChange?.('center')}}>
            <AlignCenter className={cn({ 'text-blue-500': align === 'center' })}/>
          </Button>
          <Button variant={'ghost'} size={'icon'} onClick={() => {onAlignChange?.('right')}}>
            <AlignRight className={cn({ 'text-blue-500': align === 'right' })}/>
          </Button>
        </div>
      }
    </div>
  )
}

export default EditableText
