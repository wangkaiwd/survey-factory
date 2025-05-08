import { MessageCircleIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface OpenQuestionPreviewProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
}

const OpenQuestionPreview = (props: OpenQuestionPreviewProps) => {
  const { title, placeholder, className } = props
  return (
    <div className={cn(className)}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-lg font-medium flex-1'}>{title}</div>
      </div>
      <Textarea placeholder={placeholder} className={'resize-none mt-2'}/>
    </div>
  )
}

export default OpenQuestionPreview
