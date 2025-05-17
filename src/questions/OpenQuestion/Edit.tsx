import EditableText from '@/components/EditableText'
import { MessageCircleIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'
import { useQuestionStore } from '@/store/useQuestionStore'
import FormInput from '@/components/FormInput'

interface OpenQuestionEditProps extends ComponentProps<'div'> {
  title: string;
  placeholder: string;
  id: string;
}

const OpenQuestionEdit = (props: OpenQuestionEditProps) => {
  const { id, className } = props
  const { control } = useFormContext()

  const activeQuestion = useQuestionStore((state) => {
    const { activeQuestionId, questions } = state
    return questions.find((question) => question.id === activeQuestionId)
  })
  const activeQuestionIndex = useQuestionStore((state) => {
    const { activeQuestionId, questions } = state
    return questions.findIndex((question) => question.id === activeQuestionId)
  })

  if (!activeQuestion) {
    return null
  }
  const editable = activeQuestion.id === id
  return (
    <div className={cn(className)}>
      <div className={'flex items-center justify-between'}>
        <Controller
          name={`questions.${activeQuestionIndex}.props.title`}
          render={({ field }) => {
            return (
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
            )
          }}
          control={control}
        />
        <div className={'inline-flex items-center justify-between py-1 px-2 rounded-sm text-sm bg-gray-100 ml-3'}>
          <MessageCircleIcon className={'h-3.5'}/> 问答题
        </div>
      </div>
      <Controller
        control={control}
        name={`questions.${activeQuestionIndex}.props.placeholder`}
        render={({ field }) => <FormInput className={'mt-2'} {...field} />}
      />
    </div>
  )
}

export default OpenQuestionEdit
