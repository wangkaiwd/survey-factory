import { Textarea } from '@/components/ui/textarea'
import { OpenQuestionProps } from '@/questions/OpenQuestion/types'

const OpenQuestion = (props: OpenQuestionProps) => {
  const { title, placeholder, ...restProps } = props
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
