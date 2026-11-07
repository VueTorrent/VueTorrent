import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useLogStore } from './logs'
import { LogType } from '@/constants/qbit'
import type { Log } from '@/types/qbit/models'

const { getLogs } = vi.hoisted(() => ({
  getLogs: vi.fn<(lastId?: number) => Promise<Log[]>>(),
}))

vi.mock('@/services/qbit', () => ({
  default: { getLogs },
}))

function log(id: number, message: string): Log {
  return { id, message, timestamp: 0, type: LogType.INFO }
}

describe('stores/logs - external IP detection', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    getLogs.mockReset()
  })

  test('keeps IPv4 and IPv6 addresses logged in the same batch', async () => {
    getLogs.mockResolvedValueOnce([
      log(1, 'Successfully listening on IP. IP: "10.0.0.2". Port: "TCP/6881"'),
      log(2, 'Detected external IP. IP: "203.0.113.7"'),
      log(3, 'Detected external IP. IP: "2001:db8::55"'),
    ])

    const store = useLogStore()
    await store.updateLogs()

    expect(store.externalIp).toBe('203.0.113.7')
    expect(store.externalIpV6).toBe('2001:db8::55')
  })

  test('an IPv6 detection does not overwrite the IPv4 address', async () => {
    getLogs.mockResolvedValueOnce([log(1, 'Detected external IP. IP: "203.0.113.7"')])
    getLogs.mockResolvedValueOnce([log(2, 'Detected external IP. IP: "2001:db8::55"')])

    const store = useLogStore()
    await store.updateLogs()
    await store.updateLogs()

    expect(store.externalIp).toBe('203.0.113.7')
    expect(store.externalIpV6).toBe('2001:db8::55')
  })

  test('keeps the latest address when one changes', async () => {
    getLogs.mockResolvedValueOnce([log(1, 'Detected external IP. IP: "2001:db8::55"'), log(2, 'Detected external IP. IP: "2001:db8:1::55"')])

    const store = useLogStore()
    await store.updateLogs()

    expect(store.externalIp).toBeUndefined()
    expect(store.externalIpV6).toBe('2001:db8:1::55')
  })
})
