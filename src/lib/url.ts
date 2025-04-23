export const joinQuery = (url: string, query: Record<string, string | null | undefined>) => {
  let queryStr = ''
  Object.keys(query).forEach(key => {
    const val = query[key]
    if (val) {
      if (queryStr) {
        queryStr += '&'
      }
      queryStr += `${key}=${val}`
    }
  })
  if (!queryStr) {
    return url
  }
  // already has query string
  if (url.includes('?')) {
    return `${url}&${queryStr}`
  }
  return `${url}?${queryStr}`
}
