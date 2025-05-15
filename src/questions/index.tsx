import OpenQuestion, { OpenQuestionProps } from '@/questions/OpenQuestion'
import { FC } from 'react'

// todo: plugin system
export const blockMap = new Map<string, FC<OpenQuestionProps>>()
blockMap.set('OpenQuestion', OpenQuestion)
