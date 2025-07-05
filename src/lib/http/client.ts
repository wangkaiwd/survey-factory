import { toast } from 'sonner'
import { HttpResponse } from '@/types/http'
import { redirect } from 'next/navigation'

export const handleApiRes = async <T> (fn: () => Promise<HttpResponse<T>>) => {
  const response = await fn()
  if (response.code === '200') {
    return response.data
  }
  if (response.code !== '200') {
    toast.error(response.message)
    if (response.code === '401') {
      redirect('/login')
    }
    throw new Error(response.message)
  }
}
