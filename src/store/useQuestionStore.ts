import { create } from 'zustand'

interface QuestionStoreActions {
  setQuestions: (questions: any[]) => void
  setPageInfo: (pageInfo: any) => void
  setActiveQuestionId: (id: string | null) => void
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
        set((state) => ({
          ...state,
          questions,
        }))
      },
      setPageInfo: (pageInfo: any) => {
        set((state) => ({
          ...state,
          pageInfo,
        }))
      },
      setActiveQuestionId: (id: string | null) => {
        set((state) => ({
          ...state,
          activeQuestionId: id,
        }))
      },
    },
  }
})

export const useQuestionStoreActions = () => useQuestionStore((state) => state.actions)
