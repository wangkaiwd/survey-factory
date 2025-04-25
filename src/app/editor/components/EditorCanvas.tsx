'use client'
import React, { useState } from 'react'
import EditableText from '@/components/EditableText'

const EditorCanvas = () => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('标题')
  return (
    <div className={'flex-1 bg-gray-50 flex items-center justify-center py-3 h-full'}>
      <div className={'w-[600px] bg-white rounded-md h-full px-10 py-6'}>
        <div className={'hover:border-b hover:border-gray-200'} onClick={() => setIsActive(true)}>
          <EditableText editable={isActive} textClassName={'text-3xl'} value={value} onChange={setValue}/>
        </div>
        <div className={'text-neutral-600'}>请输入描述</div>
      </div>
    </div>
  )
}

export default EditorCanvas
