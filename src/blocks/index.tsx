import OpenQuestion, { OpenQuestionProps } from '@/blocks/OpenQuestion'
import { FC } from 'react'

// todo: plugin system
export const blockMap = new Map<string, FC<OpenQuestionProps>>()
blockMap.set('OpenQuestion', OpenQuestion)
