'use server'

import { decryptJwt } from '@/lib/session'

export const start = async () => {
  return await decryptJwt()
}
