import type { SearchResult } from '..'
import type { Optional } from '@/global'

export default interface SearchStatus {
  id: number
  status: 'Running' | 'Stopped'
  interval: Optional<NodeJS.Timer>
  results: SearchResult[]
}
