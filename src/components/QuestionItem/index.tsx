import { Plus } from 'lucide-react'
import React from 'react'

interface Props {
  icon: React.ElementType
  label: React.ReactNode
}

const QuestionItem = ({ icon, label }: Props) => {
  const IconComponent = icon
  return (
    <div
      className="flex items-center justify-between h-12 border group rounded-md px-4 cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <IconComponent className="w-4 h-4"/>
        <span>{label}</span>
      </div>
      <Plus className="w-4 h-4 float-right opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
    </div>
  )
}

export default QuestionItem
