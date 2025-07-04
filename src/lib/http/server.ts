import { HttpResponse } from '@/types/http'

export const wrapApiHandler = <Args extends any[], Data> (action: (...args: Args) => Promise<Data>) => {
  return async (...args: Args): Promise<HttpResponse<Data>> => {
    try {
      const result = await action(...args)
      return {
        code: '200',
        data: result,
        message: '成功',
      }
    } catch (error: any) {
      let message = '服务器内部错误'
      if (error instanceof Error) {
        message = error.message
      }
      if (typeof error === 'string') {
        message = error
      }
      return {
        code: '0',
        message,
      }
    }
  }
}

