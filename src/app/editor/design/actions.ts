'use server'

import prisma from '@/lib/prisma'
import { SurveyModel } from '@/types/prismaModel'
import { wrapApiHandler } from '@/lib/http/server'
import { Prisma } from '@/generated/prisma'

export const getSurveyAction = wrapApiHandler<[string], SurveyModel>(async (id) => {
  const survey = await prisma.survey.findUnique({
    where: {
      id: id,
    },
  })
  if(!survey) {
    throw new Error('Survey not found')
  }
  return survey as unknown as SurveyModel
})

export const saveSurveyAction = wrapApiHandler<[Partial<SurveyModel>], SurveyModel>(async (survey) => {
  const savedSurvey = await prisma.survey.update({
    where: {
      id: survey.id,
    },
    data: survey as unknown as Prisma.SurveyUpdateInput,
  })
  return savedSurvey as unknown as SurveyModel
})