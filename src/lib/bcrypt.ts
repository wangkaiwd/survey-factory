import 'server-only'
import bcrypt from 'bcrypt'

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
