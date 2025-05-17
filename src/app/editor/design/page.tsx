'use client'

import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { useQuestionStore } from '@/store/useQuestionStore'
import QuestionRenderer from '@/components/QuestionRenderer'
import { FormProvider, useForm } from 'react-hook-form'
import { mockData } from '@/mock'
import Draggable from '@/app/editor/components/Draggable'
import QuestionItem from '@/components/QuestionItem'

const Editor = () => {
  const questions = useQuestionStore((state) => state.questions)
  const setQuestions = useQuestionStore((state) => state.setQuestions)
  const setPageInfo = useQuestionStore((state) => state.setPageInfo)
  const [dragItem, setDragItem] = useState<any>(null)

  const methods = useForm()

  useEffect(() => {
    setQuestions(mockData.questions)
    setPageInfo(mockData.pageInfo)
    methods.setValue('questions', mockData.questions)
  }, [])

  useEffect(() => {
    const { unsubscribe } = methods.watch((value: any) => {
      setQuestions([...value.questions])
    })
    return () => unsubscribe()
  }, [methods.watch])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDragStart = (event: DragStartEvent) => {
    setDragItem(event.active)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) {return}
    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((item) => item.id === active.id)
      const newIndex = questions.findIndex((item) => item.id === over.id)
      const newQuestions = arrayMove(questions, oldIndex, newIndex)
      setQuestions(newQuestions)
      // 移动位置后，重新设置表单value ?
      methods.setValue('questions', newQuestions)
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

  const renderOverlay = () => {
    if (!dragItem?.data?.current) {
      return
    }
    const { context, type } = dragItem.data.current
    if (type === 'draggable') {
      return (
        <Draggable id={context.id}>
          <QuestionItem icon={context.icon} label={context.label}/>
        </Draggable>
      )
    }
    return (
      <QuestionRenderer question={context}/>
    )
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
        <FormProvider {...methods}>
          <EditorCanvas/>
          <DragOverlay>
            {renderOverlay()}
          </DragOverlay>
        </FormProvider>
        <EditorSettingPanel/>

      </DndContext>

    </div>
  )
}

export default Editor
