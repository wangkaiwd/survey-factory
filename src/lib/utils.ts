import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DropResult } from 'smooth-dnd/dist/src/exportTypes'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const applyDrag = (arr: any[], dragResult: DropResult, createInsertItem?: (payload: any) => any) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex === null) { // copy item to list
    itemToAdd = createInsertItem?.({ ...payload })
  }
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}
