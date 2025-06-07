import { create } from 'zustand'

interface QuestionStoreActions {
  setQuestions: (questions: any[]) => void
  setPageInfo: (pageInfo: any) => void
  setActiveQuestionId: (id: string | null) => void
  updateQuestion: (question: any) => void
}

interface QuestionStoreState {
  questions: any[]
  pageInfo: any
  activeQuestionId: string | null
  actions: QuestionStoreActions
}

export const useQuestionStore = create<QuestionStoreState>()((set) => {
  return {
    questions: [],
    pageInfo: {},
    activeQuestionId: null,
    actions: {
      setQuestions: (questions: any[]) => {
        set(() => ({ questions }))
      },
      setPageInfo: (pageInfo: any) => {
        set(() => ({ pageInfo }))
      },
      setActiveQuestionId: (id: string | null) => {
        set(() => ({ activeQuestionId: id }))
      },
      updateQuestion: (question: any) => {
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
