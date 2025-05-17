'use client'
import { CircleIcon } from 'lucide-react'
import Draggable from '@/app/editor/components/Draggable'
import QuestionItem from '@/components/QuestionItem'

const questionTypes = [
  { icon: CircleIcon, label: '单选题', id: crypto.randomUUID(), type: 'OpenQuestion' },
]

const EditorLeftPanel = () => {
  return (
    <div className="w-72 h-full bg-white rounded-md p-4 flex flex-col gap-4">
      <h2 className="text-lg font-medium">添加题目</h2>
      {questionTypes.map((type) => (
        <Draggable key={type.id} id={type.id} data={type}>
          <QuestionItem icon={type.icon} label={type.label}/>
        </Draggable>
      ))}
    </div>
  )
}

export default EditorLeftPanel
