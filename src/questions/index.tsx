import OpenQuestion from '@/questions/OpenQuestion'
import SingleSelect from '@/questions/SingleSelect'
import OpenQuestionSetting from './OpenQuestion/OpenQuestionSetting'
import SingleSelectSetting from './SingleSelect/Setting'
import { FC } from 'react'
import { OpenQuestionProps } from '@/questions/OpenQuestion/types'
import { SingleSelectProps } from '@/questions/SingleSelect/types'

// todo: plugin system

export type QuestionProtocol = OpenQuestionProps | SingleSelectProps

export type QuestionComponent = FC<OpenQuestionProps> | FC<SingleSelectProps>

export type QuestionComponentType = 'OpenQuestion' | 'SingleSelect'

export const blockMap = new Map<QuestionComponentType, {
  component: QuestionComponent,
  setting: FC,
  defaultSetting: QuestionProtocol
}>()
blockMap.set('OpenQuestion', {
  component: OpenQuestion,
  setting: OpenQuestionSetting,
  defaultSetting: {
    title: 'Open Question',
    placeholder: 'Please enter your answer here...',
  },
})
blockMap.set('SingleSelect', {
  component: SingleSelect,
  setting: SingleSelectSetting,
  defaultSetting: {
    title: 'Single Select',
    name: 'SingleSelect',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
})
