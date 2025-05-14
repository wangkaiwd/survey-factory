'use client'
import { CircleIcon, Plus } from 'lucide-react'
import { uniqueId } from 'lodash-es'
import Draggable from '@/app/editor/components/Draggable'

const uuid = () => uniqueId('question-')

const questionTypes = [
  { icon: CircleIcon, label: '单选题', id: uuid(), type: 'OpenQuestion' },
]

const EditorLeftPanel = () => {
  return (
    <div className="w-72 h-full bg-white rounded-md p-4 flex flex-col gap-4">
      <h2 className="text-lg font-medium">添加题目</h2>
      {questionTypes.map((type) => (
        <Draggable key={type.id} id={type.id} data={type}>
          <div
            className="flex items-center justify-between h-12 border group rounded-md px-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <type.icon className="w-4 h-4"/>
              <span>{type.label}</span>
            </div>
            <Plus className="w-4 h-4 float-right opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          </div>
        </Draggable>
      ))}
    </div>
  )
}

export default EditorLeftPanel
