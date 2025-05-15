import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { GripHorizontal } from 'lucide-react'

interface SortableContainerProps {
  id: string | number
  data?: any
  children?: React.ReactNode
}

const SortableContainer = ({ id, data, children }: SortableContainerProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div ref={setNodeRef} {...attributes} style={style} className={'group'}>
      <div className={'flex items-center justify-center mb-1'}>
        <GripHorizontal {...listeners} className={'cursor-pointer invisible group-hover:visible text-gray-400'}/>
      </div>
      {children}
    </div>
  )
}

export default SortableContainer
