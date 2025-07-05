import 'server-only'
import { JWT_SECRET } from '@/lib/constants'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

interface JwtPayload {
  id: string
  username: string
}

export const setToken = async (token: string) => {
  const expires = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export const getToken = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return token?.value || null
}

export const encryptJwt = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' })
}

export const decryptJwt = async () => {
  try {
    const token = await getToken()
    if (!token) {
      return Promise.reject({ code: '401', message: '未登录或登录已过期' })
    }
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch (error) {
    console.log('JWT 解密失败:', error)
    return Promise.reject({ code: '401', message: '未登录或登录已过期' })
  }
}
