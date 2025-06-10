export const mockData = {
  pageInfo: {
    id: 'page-id-1',
    title: {
      align: 'center',
      text: '标题',
    },
    description: {
      align: 'center',
      text: '描述',
    },
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
