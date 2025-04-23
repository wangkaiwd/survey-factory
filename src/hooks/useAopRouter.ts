import { useRouter } from 'next/navigation'
import { joinQuery } from '@/lib/url'

interface RouteParams {
  pathname: string,
  query: Record<string, string | null | undefined>
  scroll?: boolean
}

export const useAopRouter = () => {
  const router = useRouter()
  const formatParams = (routeParams: RouteParams) => {
    const { scroll = true, query, pathname } = routeParams
    const path = joinQuery(pathname, query)
    return {
      path,
      scroll,
    }
  }
  return {
    push (routeParams: RouteParams) {
      const { path, scroll } = formatParams(routeParams)
      return router.push(path, { scroll })
    },
    replace (routeParams: RouteParams) {
      const { path, scroll } = formatParams(routeParams)
      return router.replace(path, { scroll })
    },
    back () {
      return router.back()
    },
    forward () {
      return router.forward()
    },
  }
}
