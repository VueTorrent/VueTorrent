import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useSearchEngineStore } from './searchEngine'

/**
 * Simulated qBittorrent search backend.
 *
 * Mirrors searchcontroller.cpp: results accumulate while a job runs, and an
 * offset past the current result count is rejected with 409 Conflict
 * ("Offset is out of range").
 */
const server = {
  total: 0,
  latencyMs: 0,
  /** Simulates a job qBittorrent no longer knows about (it keeps them in memory). */
  jobMissing: false,
}

/** axios.isAxiosError() only checks this flag, so the store treats these as real API errors. */
function apiError(message: string, status: number) {
  return Object.assign(new Error(message), { isAxiosError: true, response: { status } })
}

vi.mock('@/services/qbit', () => ({
  default: {
    getSearchResults: vi.fn(async (_id: number, offset = 0) => {
      // Offset is captured by the caller *before* this resolves — that window is the bug.
      await new Promise(resolve => setTimeout(resolve, server.latencyMs))

      if (server.jobMissing) {
        throw apiError('Not Found', 404)
      }

      if (offset > server.total) {
        throw apiError('Offset is out of range', 409)
      }

      const results = Array.from({ length: server.total - offset }, (_, i) => ({ fileName: `result-${offset + i}` }))
      return { results, status: 'Running' as const, total: server.total }
    }),
    stopSearch: vi.fn(() => Promise.resolve()),
    startSearch: vi.fn(() => Promise.resolve({ id: 1 })),
    getSearchPlugins: vi.fn(() => Promise.resolve([])),
  },
}))

function makeTab(store: ReturnType<typeof useSearchEngineStore>) {
  store.$reset()
  const tab = store.searchData[0]
  tab.id = 1
  tab.results = []
  return tab
}

describe('stores/searchEngine', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.total = 0
    server.latencyMs = 0
    server.jobMissing = false
  })

  test('a response for a job that is no longer current is discarded', async () => {
    const store = useSearchEngineStore()
    const tab = makeTab(store)

    server.total = 100
    server.latencyMs = 20

    const inFlight = store.refreshResults(tab)
    // The user restarts the search while that request is still out: runNewSearch() swaps in
    // the new job id and empties the results.
    tab.id = 2
    tab.results = []

    // Appending the old job's 100 results here would put the new job's offset past its own
    // result count — the same desync, reintroduced by a late response.
    await expect(inFlight).resolves.toBe('Running')
    expect(tab.results).toHaveLength(0)
  })

  test('an error for a job that is no longer current does not stop the new job', async () => {
    const store = useSearchEngineStore()
    const tab = makeTab(store)

    server.total = 0
    server.latencyMs = 20
    tab.results = Array.from({ length: 50 }, (_, i) => ({ fileName: `stale-${i}` })) as typeof tab.results

    const inFlight = store.refreshResults(tab)
    tab.id = 2
    tab.results = []

    // Reporting 'Stopped' would make the caller tear down a search the user has just started.
    await expect(inFlight).resolves.toBe('Running')
  })

  test('a desynced offset (409) reports the job as stopped instead of retrying forever', async () => {
    const store = useSearchEngineStore()
    const tab = makeTab(store)

    server.total = 10
    tab.results = Array.from({ length: 50 }, (_, i) => ({ fileName: `stale-${i}` })) as typeof tab.results

    await expect(store.refreshResults(tab)).resolves.toBe('Stopped')
  })

  test('a missing search job (404) reports the job as stopped', async () => {
    const store = useSearchEngineStore()
    const tab = makeTab(store)

    server.jobMissing = true

    await expect(store.refreshResults(tab)).resolves.toBe('Stopped')
  })
})
