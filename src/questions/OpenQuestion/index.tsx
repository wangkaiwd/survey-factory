import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useQuestionStore } from '@/store/useQuestionStore'
import OpenQuestionEdit from './Edit';
import OpenQuestionPreview from '@/questions/OpenQuestion/Preview'

export interface OpenQuestionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  id: string;
}

// fixme: dynamic switch between edit and preview mode will cause useOutsideClick work not correctly
const OpenQuestion = (props: OpenQuestionProps) => {
  const { id, title, placeholder, ...restProps } = props
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const editable = activeQuestionId === id
  return (
    <div {...restProps}>
      <OpenQuestionEdit
        title={title}
        id={id}
        className={cn({ 'hidden': !editable })}
        placeholder={placeholder}
      />
      <OpenQuestionPreview className={cn({ 'hidden': editable })} title={title} placeholder={placeholder}/>
    </div>
  )
}

export default OpenQuestion
