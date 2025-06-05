import { HTMLAttributes } from 'react'
import { Textarea } from '@/components/ui/textarea'

export interface OpenQuestionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  id: string;
}

// fixme: dynamic switch between edit and preview mode will cause useOutsideClick work not correctly
const OpenQuestion = (props: OpenQuestionProps) => {
  const { id, title, placeholder, ...restProps } = props
  return (
    <div {...restProps}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-lg font-medium flex-1'}>{title}</div>
      </div>
      <Textarea placeholder={placeholder} className={'resize-none mt-2'}/>
    </div>
  )
}

export default OpenQuestion
