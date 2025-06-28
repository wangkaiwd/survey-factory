'use server'

import prisma from '@/lib/prisma'
import { LoginFormData, RegisterFormData } from './schemas'
import { Prisma } from '@/generated/prisma'
import bcrypt from 'bcrypt'
import { saltRounds } from '@/lib/constants'

export const login = async (data: LoginFormData) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: data.username },
    })
    if (!user) {
      return { success: false, error: '用户不存在' }
    }
    if (user.password !== data.password) {
      return { success: false, error: '密码错误' }
    }
    const { password, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.dir(error, { depth: null })
    return { success: false, error: '登录失败，请稍后重试' }
  }
}

export const register = async (data: RegisterFormData) => {
  try {
    const passwordHash = await bcrypt.hash(data.password, saltRounds)
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHash,
      },
    })
    return { success: true, user }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { success: false, error: '用户名已存在' }
    }
    return { success: false, error: '注册失败，请稍后重试' }
  }
}
