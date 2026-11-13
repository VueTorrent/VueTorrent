import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useAppStore } from './app'
import qbit from '@/services/qbit'

vi.mock('@/services/qbit', () => ({
  default: { getVersion: vi.fn(), getWebAPIVersion: vi.fn(), getBuildInfo: vi.fn() },
}))

function responseError(status: number) {
  const response: AxiosResponse = {
    status,
    statusText: 'Request failed',
    data: '',
    headers: {},
    config: { headers: new AxiosHeaders() },
  }
  return new AxiosError('Request failed', 'ERR_BAD_RESPONSE', undefined, undefined, response)
}

beforeEach(() => {
  setActivePinia(createPinia())
  vi.resetAllMocks()
  vi.mocked(qbit.getVersion).mockResolvedValue('5.3.0')
  vi.mocked(qbit.getWebAPIVersion).mockResolvedValue('2.16.2')
  vi.mocked(qbit.getBuildInfo).mockResolvedValue(undefined)
})

describe('authentication during connection failures', () => {
  test.each([new AxiosError('Network unavailable', 'ERR_NETWORK'), new AxiosError('Request timed out', 'ECONNABORTED'), responseError(503), responseError(500)])(
    'retains the authenticated session and version during %s',
    async error => {
      const app = useAppStore()
      await app.fetchAuthStatus()
      vi.mocked(qbit.getVersion).mockRejectedValueOnce(error)
      await expect(app.fetchAuthStatus()).rejects.toBe(error)
      expect(app.isAuthenticated).toBe(true)
      expect(app.version).toBe('5.3.0')
      expect(await app.fetchAuthStatus()).toBe(true)
    }
  )

  test.each([401, 403])('signs out only when the server rejects authentication (%i)', async status => {
    const app = useAppStore()
    await app.fetchAuthStatus()
    vi.mocked(qbit.getVersion).mockRejectedValueOnce(responseError(status))
    expect(await app.fetchAuthStatus()).toBe(false)
    expect(app.isAuthenticated).toBe(false)
    expect(app.version).toBe('0.0.0')
  })

  test('an offline startup can recover using the existing browser session', async () => {
    const app = useAppStore()
    vi.mocked(qbit.getVersion).mockRejectedValueOnce(new AxiosError('Offline', 'ERR_NETWORK'))
    await expect(app.fetchAuthStatus()).rejects.toBeInstanceOf(AxiosError)
    expect(await app.fetchAuthStatus()).toBe(true)
    expect(app.isAuthenticated).toBe(true)
  })
})
