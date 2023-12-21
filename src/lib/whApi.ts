import { getCachedPromise } from './promiseCache'

const {
  WHAPI_BASE_URL = 'https://www.webhallen.com/api',
  WHAPI_TOKEN = '',
} = process.env

let apiKey = WHAPI_TOKEN
let baseUrl = WHAPI_BASE_URL

export const setApiToken = (key: string): string => (apiKey = key)
export const getApiToken = (): string => apiKey
export const setBaseUrl = (url: string): string => (baseUrl = url)
export const getBaseUrl = (): string => baseUrl

export class ResponseError extends Error {
  response!: Response
}

export const apiRequestRaw = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  const fullUrl = `${baseUrl}${url}`
  // immutability <3
  const opts = structuredClone(options ?? {})

  // append auth
  const headerName = 'Cookie'
  const headerValue = `webhallen_auth=${getApiToken()}`
  if (!opts.headers) opts.headers = {}
  if (Array.isArray(opts.headers)) {
    opts.headers.push([headerName, headerValue])
  } else if (opts.headers instanceof Headers) {
    opts.headers.set(headerName, headerValue)
  } else {
    opts.headers[headerName] = headerValue
  }

  console.log(`🏃 fetching from source: ${fullUrl}`)
  const response = await fetch(fullUrl, opts)
  if (!response.ok) {
    const err = new ResponseError('Network response was not ok')
    err.response = response
    throw err
  }
  return response
}

export const apiRequestJson = async <JSONData = unknown>(
  url: string,
  options?: RequestInit,
): Promise<JSONData> => {
  return await getCachedPromise({
    key: url,
    fn: async () => {
      const response = await apiRequestRaw(url, options)
      return await response.json()
    },
  })
}
