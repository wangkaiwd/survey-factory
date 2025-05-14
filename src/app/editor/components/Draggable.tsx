import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { cn } from '@/lib/utils'

interface DraggableProps {
  id: string | number
  className?: string
  children?: React.ReactNode
  data?: any
}

const Draggable = ({
  id,
  className,
  children,
  data
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type: 'draggable',
      ...data,
    },
  })
  return (
    <div
      ref={setNodeRef}
      className={cn('cursor-pointer', className)} {...attributes} {...listeners}
    >
      {children}
    </div>
  )
}

export default Draggable
