import OpenQuestion from '@/questions/OpenQuestion'
import SingleSelect from '@/questions/SingleSelect'
import OpenQuestionSetting from './OpenQuestion/OpenQuestionSetting'
import SingleSelectSetting from './SingleSelect/Setting'

// todo: plugin system
export const blockMap = new Map<string, {
  component: any,
  setting: any,
  defaultSetting: Record<string, any>
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
