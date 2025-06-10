import { create } from 'zustand'

interface QuestionStoreActions {
  setQuestions: (questions: any[]) => void
  setPageInfo: (pageInfo: any) => void
  setActiveQuestionId: (id: string | null) => void
  updateQuestion: (question: any) => void
  setDragging: (isDragging: boolean) => void
}

interface QuestionStoreState {
  questions: any[]
  isDragging: boolean
  pageInfo: any
  activeQuestionId: string | null
  actions: QuestionStoreActions
}

export const useQuestionStore = create<QuestionStoreState>()((set) => {
  return {
    questions: [],
    isDragging: false,
    pageInfo: {},
    activeQuestionId: null,
    actions: {
      setDragging: (isDragging: boolean) => {
        set(() => ({ isDragging }))
      },
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
