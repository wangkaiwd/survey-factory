import { RefObject, useEffect } from 'react'

export const useClickOutside = (targetRefs: RefObject<(Element)[]>, onClickOutSide: () => void) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const clickTarget = event.target as Element
      const isClickInside = targetRefs.current.some(el => el.contains(clickTarget))
      if (!isClickInside) {
        onClickOutSide()
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [targetRefs.current])
}
