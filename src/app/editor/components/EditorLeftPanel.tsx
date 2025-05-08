'use client'
import {
  CircleIcon,
  CheckSquareIcon,
  MessageCircleIcon,
  StarIcon,
  ImageIcon,
  CalendarIcon,
  Plus
} from 'lucide-react'

const questionTypes = [
  { icon: CircleIcon, label: '单选题' },
  { icon: CheckSquareIcon, label: '多选题' },
  { icon: MessageCircleIcon, label: '问答题' },
  { icon: StarIcon, label: '评分题' },
  { icon: ImageIcon, label: '图片上传题' },
  { icon: CalendarIcon, label: '日期题' },
]

const EditorLeftPanel = () => {
  return (
    <div className="w-72 h-full bg-white rounded-md p-4 flex flex-col gap-4">
      <h2 className="text-lg font-medium">添加题目</h2>
      {questionTypes.map((type, index) => (
        <div key={index} className="flex items-center justify-between h-12 border group rounded-md px-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <type.icon className="w-4 h-4" />
            <span>{type.label}</span>
          </div>
          <Plus className="w-4 h-4 float-right opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  )
}

export default EditorLeftPanel
