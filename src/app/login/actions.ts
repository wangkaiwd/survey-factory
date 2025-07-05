'use server'

import prisma from '@/lib/prisma'
import { LoginFormData, RegisterFormData } from './schemas'
import { Prisma, User } from '@/generated/prisma'
import bcrypt from 'bcrypt'
import { saltRounds } from '@/lib/constants'
import { comparePassword } from '@/lib/bcrypt'
import { encryptJwt, setToken } from '@/lib/session'
import { wrapApiHandler } from '@/lib/http/server'

const generateToken = async (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
  }
  const token = encryptJwt(payload)
  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  })
  await setToken(token)
  return token
}

export const login = wrapApiHandler<[LoginFormData], Omit<User, 'password'>>(async (data) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  })
  if (!user) {
    throw new Error('用户不存在')
  }
  const matched = await comparePassword(data.password, user.password)
  if (!matched) {
    throw new Error('密码错误')
  }
  const token = await generateToken(user)

  const { password, ...userWithoutPassword } = user
  return {
    ...userWithoutPassword,
    token,
  }
})

export const register = wrapApiHandler<[RegisterFormData], User>(async (data) => {
  try {
    const passwordHash = await bcrypt.hash(data.password, saltRounds)
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHash,
      },
    })
    return user
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('用户名已存在')
    }
    throw new Error('注册失败，请稍后重试')
  }
})
