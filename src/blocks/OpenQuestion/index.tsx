import { HTMLAttributes, Ref } from 'react'
import OpenQuestionEdit from '@/blocks/OpenQuestion/Edit'
import OpenQuestionPreview from '@/blocks/OpenQuestion/Preview'
import { cn } from '@/lib/utils'

interface OpenQuestionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  onTitleChange: (title: string) => void;
  onPlaceholderChange: (placeholder: string) => void;
  editable?: boolean;
  ref?: Ref<HTMLDivElement>;
}

// fixme: dynamic switch between edit and preview mode will cause useOutsideClick work not correctly
const OpenQuestion = (props: OpenQuestionProps) => {
  const { editable = false, ref, title, placeholder, onTitleChange, onPlaceholderChange, ...restProps } = props
  return (
    <div ref={ref} className={'px-10'} {...restProps}>
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
