import { useEffect } from 'react'
import { useLatest } from '@/hooks/useLatest'

export const useClickOutside = (getTarget: () => Element | null | undefined, onClickOutside: () => void) => {
  const getTargetRef = useLatest(getTarget)
  const onClickOutsideRef = useLatest(onClickOutside)
  useEffect(() => {
    // executing timing of document.addEventListener: https://stackblitz.com/edit/vitejs-vite-kwuuwfub?file=src%2FApp.tsx
    const handler = (event: MouseEvent) => {
      const target = getTargetRef.current()
      if (!target) {return}
      const clickTarget = event.target as Element
      const isClickInside = target.contains(clickTarget)
      if (!isClickInside) {
        onClickOutsideRef.current()
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])
}
