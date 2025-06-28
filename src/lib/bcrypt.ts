import 'server-only'
import bcrypt from 'bcrypt'
import { saltRounds } from '@/lib/constants'

export const comparePassword = async (prevPassword: string, currentHash: string) => {
  const prevHash = await bcrypt.hash(prevPassword, saltRounds)
  return bcrypt.compare(prevHash, currentHash)
}
