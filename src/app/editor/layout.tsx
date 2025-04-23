import { ReactNode } from 'react'
import NavBar from '@/app/editor/components/NavBar'

interface Props {
  children: ReactNode;
}

const Editor = (props: Props) => {
  return (
    <div className="w-screen h-screen">
      <NavBar/>
      <div className="">
        {props.children}
      </div>
    </div>
  )
}

export default Editor
