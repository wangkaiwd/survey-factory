import { HTMLAttributes } from 'react'
import OpenQuestionEdit from '@/blocks/OpenQuestion/Edit'
import OpenQuestionPreview from '@/blocks/OpenQuestion/Preview'
import { cn } from '@/lib/utils'

interface OpenQuestionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  onTitleChange: (title: string) => void;
  onPlaceholderChange: (placeholder: string) => void;
  editable?: boolean;
}

// fixme: dynamic switch between edit and preview mode will cause useOutsideClick work not correctly
const OpenQuestion = (props: OpenQuestionProps) => {
  const { editable = false, title, placeholder, onTitleChange, onPlaceholderChange, ...restProps } = props
  return (
    <div {...restProps}>
      <OpenQuestionEdit
        title={title}
        editable={editable}
        className={cn({ 'hidden': !editable })}
        placeholder={placeholder}
        onPlaceholderChange={onPlaceholderChange}
        onTitleChange={onTitleChange}
      />
      <OpenQuestionPreview className={cn({ 'hidden': editable })} title={title} placeholder={placeholder}/>
    </div>
  )
}

export default OpenQuestion
