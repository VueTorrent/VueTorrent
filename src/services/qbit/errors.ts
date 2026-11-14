import { isAxiosError } from 'axios'

export function isAuthenticationError(error: unknown): boolean {
  return isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)
}

export function isConnectionError(error: unknown): boolean {
  if (!isAxiosError(error)) return false
  if (error.response) return [502, 503, 504].includes(error.response.status)
  return ['ERR_NETWORK', 'ECONNABORTED', 'ETIMEDOUT'].includes(error.code ?? '')
}
