import { ComponentProps } from 'react'
import { constants } from 'smooth-dnd'
import { cn } from '@/lib/utils'

const DnDItem = (props: ComponentProps<'div'>) => {
  const { className, style, children, ...restProps } = props
  return (
    <div className={cn(className, constants.wrapperClass)} style={style} {...restProps}>
      {children}
    </div>
  )
}

export default DnDItem
