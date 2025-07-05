'use server'

import prisma from '@/lib/prisma'
import { SurveyModel } from '@/types/prismaModel'
import { wrapApiHandler } from '@/lib/http/server'
import { Prisma } from '@/generated/prisma'
import { decryptJwt } from '@/lib/session'

export const getSurveyAction = wrapApiHandler<[string], SurveyModel>(async (id) => {
  await decryptJwt()
  const survey = await prisma.survey.findUnique({
    where: {
      id,
    },
  })
  if(!survey) {
    throw new Error('Survey not found')
  }
  return survey as unknown as SurveyModel
})

export const createSurveyAction = wrapApiHandler<[Partial<SurveyModel>], SurveyModel>(async (survey) => {
  const decoded = await decryptJwt()
  const savedSurvey = await prisma.survey.create({
    data: {
      ...survey,
      userId: decoded.id,
    } as unknown as Prisma.SurveyCreateInput,
  })
  return savedSurvey as unknown as SurveyModel
})

export const updateSurveyAction = wrapApiHandler<[Partial<SurveyModel>], SurveyModel>(async (survey) => {
  const savedSurvey = await prisma.survey.update({
    where: {
      id: survey.id,
    },
    data: survey as unknown as Prisma.SurveyUpdateInput,
  })
  return savedSurvey as unknown as SurveyModel
})

export const getSurveyListAction = wrapApiHandler<[], SurveyModel[]>(async () => {
  const decoded = await decryptJwt()
  const surveys = await prisma.survey.findMany({
    where: {
      userId: decoded.id,
    }
  })
  return surveys as unknown as SurveyModel[]
})
