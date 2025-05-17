import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { GripHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuestionStore } from '@/store/useQuestionStore'

interface SortableContainerProps {
  id: string | number
  data?: any
  children?: React.ReactNode
  className?: string
}

const SortableContainer = ({ id, data, children, className }: SortableContainerProps) => {
  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)
  const editable = activeQuestionId === id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      context: data,
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // todo: use css variable
    backgroundColor: isDragging ? '#f6f3f4' : 'transparent',
  }
  const getCls = () => {
    const baseCls = ['px-10 py-3 pb-6 group', isDragging ? 'invisible' : 'visible']
    if (!editable) {
      return cn(baseCls, 'hover:shadow-container hover:border-y', className)
    }
    return cn(baseCls, 'shadow-container border-y border-l-4 border-l-blue-500', className)
  }
  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <div className={getCls()}>
        <div className={'flex items-center justify-center mb-1'}>
          <GripHorizontal {...listeners} className={'cursor-pointer invisible group-hover:visible text-gray-400'}/>
        </div>
           {children}
      </div>
    </div>
  )
}

export default SortableContainer
