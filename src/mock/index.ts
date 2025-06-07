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

  questions: Array.from({ length: 2 }, (_, index) => ({
    id: crypto.randomUUID(),
    type: 'OpenQuestion',
    props: {
      title: `问答题${index + 1}`,
      placeholder: '请输入问题',
      required: false,
    },
  })),
}
