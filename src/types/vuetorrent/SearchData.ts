import { ByteUnitExponent } from './ByteUnitExponent'
import SearchResult from './SearchResult'

export interface SearchFilters {
  title: string
  category: string
  plugin: string
  /** null means 0. */
  seedsMin: number | null
  /** null means no upper bound. */
  seedsMax: number | null
  /** null means 0. */
  sizeMin: number | null
  /** null means no upper bound. */
  sizeMax: number | null
  sizeMinUnit: ByteUnitExponent
  sizeMaxUnit: ByteUnitExponent
}

export type SearchSortBy = { key: string; order: 'asc' | 'desc' }

export interface SearchData {
  uniqueId: string
  id: number
  timer: NodeJS.Timeout | null
  lastQuery: string
  query: string
  itemsPerPage: number
  filters: SearchFilters
  results: SearchResult[]
  sortBy: SearchSortBy[]
}
