import EditableText from '@/components/EditableText'
import { MessageCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ChangeEvent, HTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/utils'

interface OpenQuestionEditProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  onTitleChange: (title: string) => void;
  onPlaceholderChange: (placeholder: string) => void;
  editable?: boolean;
}

const OpenQuestionEdit = (props: OpenQuestionEditProps) => {
  const { title, placeholder, onTitleChange, onPlaceholderChange, editable, className } = props
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPlaceholderChange(e.target.value)
  }
  return (
    <div className={cn(className)}>
      <div className={'flex items-center justify-between'}>
        <EditableText
          editable={editable}
          wrapperClassName={'flex-1'}
          className={'text-xl'}
          placeholder={'单选题'}
          value={title}
          onChange={({ text }) => onTitleChange(text)}
        />
        <div className={'inline-flex items-center justify-between py-2 px-3'}>
          <MessageCircleIcon/> 问答题
        </div>
      </div>
      <Input className={'mt-2'} value={placeholder} onChange={onInputChange}/>
    </div>
  )
}

export default OpenQuestionEdit
