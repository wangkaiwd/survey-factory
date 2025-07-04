import { toast } from 'sonner'
import { HttpResponse } from '@/types/http'

export const handleApiRes = async <T> (fn: () => Promise<HttpResponse<T>>) => {
  const response = await fn()
  if (response.code !== '200') {
    toast.error(response.message)
    throw new Error(response.message)
  }
  return response.data
}
