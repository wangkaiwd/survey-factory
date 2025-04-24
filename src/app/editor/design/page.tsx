import EditorLeftPanel from '@/app/editor/components/EditorLeftPanel'
import EditorCanvas from '@/app/editor/components/EditorCanvas'
import EditorSettingPanel from '@/app/editor/components/EditorSettingPanel'

const Editor = () => {
  return (
    <div className="flex h-full">
      <EditorLeftPanel/>
      <EditorCanvas/>
      <EditorSettingPanel/>
    </div>
  )
}

export default Editor
