import { HttpResponse } from '@/types/http'
import { isPlainObject } from 'lodash-es'

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
      let code = '0'
      if (error instanceof Error) {
        message = error.message
      }
      // 通过 Promise.reject 抛出异常: 如token失效，类型为：{ code: string, message: string }
      if (isPlainObject(error)) {
        message = error.message
        code = error.code
      }
      if (typeof error === 'string') {
        message = error
      }
      return {
        code,
        message,
      }
    }
  }
}

