import { QuestionComponentType, QuestionProtocol } from '@/questions'

export interface IQuestion {
  id: string
  type: QuestionComponentType
  props: QuestionProtocol
}

export interface PageInfo {
  id: string
  title: string
  description: string
}

export interface QuestionStoreActions {
  setQuestions: (questions: IQuestion[]) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setActiveQuestionId: (id: string | null) => void
  updateQuestion: (question: IQuestion) => void
  setDragging: (isDragging: boolean) => void
}

export interface QuestionStoreState {
  questions: IQuestion[]
  isDragging: boolean
  pageInfo: PageInfo
  activeQuestionId: string | null
  actions: QuestionStoreActions
}
