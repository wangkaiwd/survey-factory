export const joinQuery = (url: string, query: Record<string, string | null | undefined>) => {
  const queryWithoutNullish: Record<string, string> = {}
  for (const key in query) {
    const val = query[key]
    if (val) {
      queryWithoutNullish[key] = val
    }
  }

  const queryStr = new URLSearchParams(queryWithoutNullish).toString()
  if (!queryStr) {
    return url
  }
  // already has query string
  if (url.includes('?')) {
    return `${url}&${queryStr}`
  }
  return `${url}?${queryStr}`
}
