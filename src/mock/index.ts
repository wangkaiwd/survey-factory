import { IQuestion, PageInfo } from '@/store/questionStore/types'

// Survey类型定义，基于prisma schema
export type Survey = {
  id: string
  title: string
  pageInfo: {
    id: string
    title: string
    description: string
  }
  questions: IQuestion[]
  createdAt: string
  updatedAt: string
  userId: string
}

// 生成20条Survey mock数据
export const generateMockSurveys = (): Survey[] => {
  const surveys: Survey[] = []
  
  for (let i = 1; i <= 20; i++) {
    surveys.push({
      id: `survey-${i.toString().padStart(3, '0')}`,
      title: `问卷调查 ${i}`,
      pageInfo: {
        id: `page-${i}`,
        title: `问卷调查 ${i}`,
        description: `这是第${i}个问卷调查的描述信息`,
      },
      questions: [
        {
          id: `question-${i}-1`,
          type: 'OpenQuestion',
          props: {
            title: `开放式问题 ${i}`,
            placeholder: '请输入您的答案...',
          },
        },
        {
          id: `question-${i}-2`,
          type: 'SingleSelect',
          props: {
            title: `单选题 ${i}`,
            name: `single-select-question-${i}`,
            options: [
              { label: '选项A', value: 'optionA' },
              { label: '选项B', value: 'optionB' },
              { label: '选项C', value: 'optionC' },
            ],
          },
        },
      ],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      userId: 'user-001',
    })
  }
  
  return surveys
}

export const mockData: { pageInfo: PageInfo, questions: IQuestion[] } = {
  pageInfo: {
    id: 'page-id-1',
    title: '问卷标题',
    description: '这是一个问卷调查页面的描述',
  },
  questions: [
    {
      id: 'question-id-1',
      type: 'OpenQuestion',
      props: {
        title: '开放式问题',
        placeholder: '请输入您的答案...',
      },
    },
    {
      id: 'question-id-2',
      type: 'SingleSelect',
      props: {
        title: '单选题',
        name: 'single-select-question',
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3' },
        ],
      },
    },
  ],
}
