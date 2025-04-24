'use client'
import React, { useState } from 'react'

const EditorCanvas = () => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')
  const onTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    const scrollHeight = target.scrollHeight
    const value = target.value
    target.style.height = scrollHeight + 'px'
    setValue(value)
  }
  return (
    <div className={'flex-1 bg-gray-50 flex items-center justify-center py-3 h-full'}>
      <div className={'w-[600px] bg-white rounded-md h-full px-10 py-6'}>
        <div onClick={() => setIsActive(true)}>
          {
            isActive ?
              <div>
                <textarea
                  rows={1}
                  onInput={onTextareaInput}
                  className={'text-3xl resize-none w-full border-2 overflow-hidden'}
                  value={value}
                />
                <div>
                  居中
                </div>
              </div>
              :
              <h3 className={'text-3xl hover:border-b hover:border-gray-200'}>标题</h3>
          }

        </div>
        <div className={'text-neutral-600'}>请输入描述</div>
      </div>
    </div>
  )
}

export default EditorCanvas
