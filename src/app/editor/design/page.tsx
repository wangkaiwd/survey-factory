'use client'

import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'
import {
  DndContext, DragEndEvent,
  DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, rectIntersection, useSensor, useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'
import QuestionRenderer from '@/components/QuestionRenderer'

const Editor = () => {
  const questions = useQuestionStore((state) => state.questions)
  const setQuestions = useQuestionStore((state) => state.setQuestions)
  const [dragItem, setDragItem] = useState<any>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDragStart = (event: DragStartEvent) => {
    console.log('event', event.active)
    setDragItem(event.active)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) {return}
    if (active.id !== over.id) {
      const oldIndex = questions.indexOf(active.id)
      const newIndex = questions.indexOf(over.id)
      console.log('move', active, over)
      setQuestions(arrayMove(questions, oldIndex, newIndex))
    }
  }

  // const onDragEnd = (event: DragEndEvent) => {
  //   const { over } = event
  //   setActiveItem(null)
  //   if (!over) {return}
  //   // 如果需要，更新新加入元素的数据
  // }
  // const onDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event
  //   // 移动进入列表，又移出列表
  //   if (!over) {
  //     // 左侧拖拽的组件移出时才会删除，列表中原有组件移动不删除
  //     if (activeItem.data.current?.type === 'draggable') {
  //       const newItems = questions.filter((item) => item.id !== active.id)
  //       setQuestions(newItems)
  //     }
  //     return
  //   }
  //   // 移入到列表中
  //   // 1. 如果列表中有该元素，更新位置
  //   const activeIndex = questions.findIndex((item) => item.id === active.id)
  //   const overIndex = questions.findIndex((item) => item.id === over.id)
  //   if (activeIndex !== -1) {
  //     setQuestions(arrayMove(questions, activeIndex, overIndex))
  //   } else { // 2. 如果列表中没有该元素，插入到移入的位置
  //     const newQuestion = { id: active.id, type: 'OpenQuestion', props: { title: '问答题', placeholder: '请输入内容' } }
  //     setQuestions(
  //       [...questions, newQuestion],
  //     )
  //     // setDragId(genId)
  //   }
  // }

  // todo: simply drag and drop interactive
  const renderOverlay = () => {
    // if (!dragItem?.data?.current) {
    //   return
    // }
    return <div className={'border'}>overlay</div>
  }

  return (
    <div className="flex h-full">
      <DndContext
        onDragStart={onDragStart}
        // onDragOver={onDragOver}
        // onDragEnd={onDragEnd}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
        sensors={sensors}
      >
        <EditorLeftPanel/>
        <EditorCanvas/>
        <EditorSettingPanel/>
        <DragOverlay>
          {renderOverlay()}
        </DragOverlay>
      </DndContext>

    </div>
  )
}

export default Editor
