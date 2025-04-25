import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  textClassName?: string;
  editable?: boolean;
}

const EditableText = (props: EditableTextProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const { value, onChange, textClassName, editable = false } = props
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
      <div className={cn('py-2', textClassName)}>{value}</div>
    )
  }

  return (
    <div>
      <textarea
        ref={textareaRef}
        rows={1}
        onInput={onTextareaInput}
        className={cn(
          'resize-none w-full focus:border-b-1 py-2 caret-blue-500 focus:border-b-blue-500 focus:outline-none overflow-hidden',
          textClassName)}
        value={value}
      />
      <div>
        <Button>居中</Button>
        <Button>居左</Button>
      </div>
    </div>
  )
}

export default EditableText
