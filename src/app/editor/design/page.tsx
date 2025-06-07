import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'

const Editor = () => {

  return (
    <div className="flex h-full bg-gray-100">
      <EditorLeftPanel/>
      <EditorCanvas/>
      <EditorSettingPanel/>
    </div>
  )
}

export default Editor
