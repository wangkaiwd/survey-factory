import { create } from 'zustand'

interface QuestionStoreState {
  questions: any[]
  pageInfo: any
  setQuestions: (questions: any[]) => void
  setPageInfo: (pageInfo: any) => void
  activeQuestionId: string | null
  setActiveQuestionId: (id: string | null) => void
}

export const useQuestionStore = create<QuestionStoreState>()((set) => {
  return {
    questions: [],
    pageInfo: {},
    activeQuestionId: null,
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
    }
  }
})
