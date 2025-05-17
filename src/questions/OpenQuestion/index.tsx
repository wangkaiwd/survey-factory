import { HTMLAttributes } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'
import OpenQuestionEdit from './Edit'
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
  const renderChildren = () => {
    if (editable) {
      return <OpenQuestionEdit title={title} id={id} placeholder={placeholder}/>
    }
    return <OpenQuestionPreview title={title} placeholder={placeholder}/>
  }
  return (
    <div {...restProps}>
      {renderChildren()}
    </div>
  )
}

export default OpenQuestion
