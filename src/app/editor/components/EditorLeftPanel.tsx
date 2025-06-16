'use client'
import { CircleIcon, LetterText } from 'lucide-react'
import QuestionItem from '@/components/QuestionItem'
import DnDItem from '@/components/SmoothDnD/DnDItem'
import DnDContainer from '@/components/SmoothDnD/DnDContainer'
import { DND_GROUP_NAME } from '@/lib/constants'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const questionTypes = [
  { icon: LetterText, label: '问答题', id: crypto.randomUUID(), type: 'OpenQuestion' },
  { icon: CircleIcon, label: '单选题', id: crypto.randomUUID(), type: 'SingleSelect' },
]

const EditorLeftPanel = () => {
  return (
    <Card className="w-80 h-full bg-white rounded-md">
      <CardHeader>添加题目</CardHeader>
      <CardContent>
        <DnDContainer
          className="space-y-2 mt-2"
          groupName={DND_GROUP_NAME}
          getChildPayload={(i) => questionTypes[i]}
          behaviour="copy"
        >
          {questionTypes.map((type) => (
            <DnDItem key={type.id}>
              <QuestionItem icon={type.icon} label={type.label}/>
            </DnDItem>
          ))}
        </DnDContainer>
      </CardContent>
    </Card>
  )
}

export default EditorLeftPanel
