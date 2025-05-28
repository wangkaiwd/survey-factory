'use client'
import { CircleIcon } from 'lucide-react'
import QuestionItem from '@/components/QuestionItem'
import DnDItem from '@/components/SmoothDnD/DnDItem'
import DnDContainer from '@/components/SmoothDnD/DnDContainer'
import { DND_GROUP_NAME } from '@/lib/constants'

const questionTypes = [
  { icon: CircleIcon, label: '单选题', id: crypto.randomUUID(), type: 'OpenQuestion' },
]

const EditorLeftPanel = () => {
  return (
    <div className="w-72 h-full bg-white rounded-md p-4 flex flex-col gap-4">
      <h2 className="text-lg font-medium">添加题目</h2>
      <DnDContainer groupName={DND_GROUP_NAME} getChildPayload={(i) => questionTypes[i]} behaviour="copy">
        {questionTypes.map((type) => (
          <DnDItem key={type.id}>
            <QuestionItem icon={type.icon} label={type.label}/>
          </DnDItem>
        ))}
      </DnDContainer>
    </div>
  )
}

export default EditorLeftPanel
