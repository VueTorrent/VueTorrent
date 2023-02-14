import type { SearchResult } from '@/types/qbit/models'

export default interface SearchResultsResponse {
  /** Array of result objects- see table below */
  results: SearchResult[]
  /** Current status of the search job (either Running or Stopped) */
  status: 'Running' | 'Stopped'
  /** Total number of results. If the status is Running this number may continue to increase */
  total: number
}
