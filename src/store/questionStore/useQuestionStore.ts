import { create } from 'zustand'
import { IQuestion, PageInfo, QuestionStoreState } from '@/store/questionStore/types'

export const useQuestionStore = create<QuestionStoreState>()((set) => {
  return {
    questions: [],
    isDragging: false,
    pageInfo: {
      id: crypto.randomUUID(),
      title: '',
      description: '',
    },
    activeQuestionId: null,
    actions: {
      setDragging: (isDragging: boolean) => {
        set(() => ({ isDragging }))
      },
      setQuestions: (questions: IQuestion[]) => {
        set(() => ({ questions }))
      },
      setPageInfo: (pageInfo: PageInfo) => {
        set((state) => ({
          pageInfo: {
            ...state.pageInfo,
            ...pageInfo,
          },
        }))
      },
      setActiveQuestionId: (id: string | null) => {
        set(() => ({ activeQuestionId: id }))
      },
      updateQuestion: (question: IQuestion) => {
        const { id } = question
        set((state) => {
          const questions = state.questions.map((q) =>
            q.id === id ? question : q,
          )
          return { questions }
        })
      },
    },
  }
})

export const useQuestionStoreActions = () => useQuestionStore((state) => state.actions)

export const getQuestionSelector = (state: QuestionStoreState): IQuestion | null => {
  const { activeQuestionId, questions } = state
  if (!activeQuestionId) return null
  return questions.find((q) => q.id === activeQuestionId) || null
}

