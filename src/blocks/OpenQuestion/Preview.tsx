import { MessageCircleIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils';

interface OpenQuestionPreviewProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
}

const OpenQuestionPreview = (props: OpenQuestionPreviewProps) => {
  const { title, placeholder, className } = props
  return (
    <div className={cn(className)}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-xl flex-1'}>{title}</div>
        <div className={'inline-flex items-center justify-between py-2 px-3'}>
          <MessageCircleIcon/> 问答题
        </div>
      </div>
      <Textarea placeholder={placeholder} className={'resize-none'}/>
    </div>
  )
}

export default OpenQuestionPreview
