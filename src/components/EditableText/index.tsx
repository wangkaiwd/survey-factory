import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'

export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  textClassName?: string;
  editable?: boolean;
  placeholder?: string;
  align?: 'left' | 'center' | 'right';
  onAlignChange?: (align: 'left' | 'center' | 'right') => void;
}

const EditableText = (props: EditableTextProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const { value, onChange, textClassName, editable = false, placeholder, align, onAlignChange } = props
  const onTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    const scrollHeight = target.scrollHeight
    const value = target.value
    target.style.height = scrollHeight + 'px'
    onChange(value)
  }
  useEffect(() => {
    if (editable && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(value.length, value.length)
    }
  }, [editable])
  if (!editable) {
    return (
      <div className={cn('py-2', textClassName)}>{value || placeholder}</div>
    )
  }

  return (
    <div>
      <textarea
        ref={textareaRef}
        rows={1}
        onInput={onTextareaInput}
        className={cn(
          `resize-none w-full text-${align} focus:border-b-1 py-2 caret-blue-500 focus:border-b-blue-500 focus:outline-none overflow-hidden`,
          textClassName)}
        value={value}
        placeholder={placeholder}
      />
      <div v-if={align} className={'flex items-center justify-end'}>
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
    </div>
  )
}

export default EditableText
