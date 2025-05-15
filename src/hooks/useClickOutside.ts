import { useEffect } from 'react'

export const useClickOutside = (getTarget: () => Element | null | undefined, onClickOutSide: () => void) => {
  useEffect(() => {
    // executing timing of document.addEventListener: https://stackblitz.com/edit/vitejs-vite-kwuuwfub?file=src%2FApp.tsx
    const handler = (event: MouseEvent) => {
      const target = getTarget()
      console.log('html', target)
      if (!target) {return}
      const clickTarget = event.target as Element
      const isClickInside = target.contains(clickTarget)
      if (!isClickInside) {
        onClickOutSide()
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])
}
