import { blockMap } from '@/blocks'
import React from 'react'

interface QuestionRendererProps {
  question: any
}

const QuestionRenderer = (props: QuestionRendererProps) => {
  const { question } = props
  const BlockComponent = blockMap.get(question.type)
  if (!BlockComponent) {
    return null
  }

  return (
    <BlockComponent id={question.id} {...question.props}/>
  )
}

export default QuestionRenderer
