import { ReactNode } from 'react'
import NavBar from '@/app/editor/components/NavBar'

interface Props {
  children: ReactNode;
}

const Editor = (props: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar/>
      <div className="flex-1 overflow-auto">
        {props.children}
      </div>
    </div>
  )
}

export default Editor
