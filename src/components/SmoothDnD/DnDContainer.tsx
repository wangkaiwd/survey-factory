import React, { useEffect, useImperativeHandle } from 'react'
import { smoothDnD, dropHandlers, ContainerOptions } from 'smooth-dnd'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

interface SmoothDnDInstance {
  dropHandler?: any;
  wrapChild?: boolean;
  maxScrollSpeed?: number;
  useTransformForGhost?: boolean;
  cancelDrag: () => void;
  isDragging: () => boolean;
}

interface DnDContainerProps extends ContainerOptions {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dndInstanceRef?: React.RefObject<SmoothDnDInstance>;
}

const DnDContainer = (props: DnDContainerProps) => {
  const { className, style, children, dndInstanceRef, ...options } = props
  const dndContainerRef = React.useRef<HTMLDivElement>(null)
  useImperativeHandle(dndInstanceRef, () => {
    return {
      ...smoothDnD,
    }
  }, [])
  // fixme: 1. deps will always update, because options is a new object every time and options includes functions
  //        2. functions like onDrop, onDragStart, etc. will always be recreated
  useEffect(() => {
    if (!dndContainerRef.current) return
    const instance = smoothDnD(dndContainerRef.current, options)
    return () => {
      instance.dispose()
    }
  }, [options])

  return (
    <div ref={dndContainerRef} className={className} style={style}>
      {children}
    </div>
  )
}

export default DnDContainer
