import EditableText from '@/components/EditableText'
import { MessageCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'

interface OpenQuestionEditProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeholder: string;
  editable?: boolean;
}

const OpenQuestionEdit = (props: OpenQuestionEditProps) => {
  const { editable, className } = props
  const { control } = useFormContext()
  return (
    <div className={cn(className)}>
      <div className={'flex items-center justify-between'}>
        <Controller
          render={({ field }) => (
            <EditableText
              {...field}
              editable={editable}
              wrapperClassName={'flex-1'}
              className={'text-lg'}
              placeholder={'单选题'}
              onChange={(textStyle) => {
                field.onChange(textStyle.text)
              }}
            />
          )}
          name={`questions.0.props.title`}
          control={control}
        />
        <div className={'inline-flex items-center justify-between py-1 px-2 rounded-sm text-sm bg-gray-100 ml-3'}>
          <MessageCircleIcon className={'h-3.5'}/> 问答题
        </div>
      </div>
      <Controller
        control={control}
        render={({ field }) => <Input className={'mt-2'} {...field} />}
        name={`questions.0.props.placeholder`}
      />
    </div>
  )
}

export default OpenQuestionEdit
