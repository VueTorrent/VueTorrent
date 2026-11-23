import SearchResult from './SearchResult'

export const DEFAULT_SEEDS_MIN = 0
export const DEFAULT_SEEDS_MAX = 100_000

/** Bytes for 100GB or 100GiB, depending on the settings. */
export function defaultSizeMax(useBinarySize: boolean): number {
  return (useBinarySize ? 1024 : 1000) ** 3 * 100
}

export interface SearchFilters {
  title: string
  category: string
  plugin: string
  seedsMin: number
  seedsMax: number
  /** In bytes. */
  sizeMin: number
  /** In bytes. */
  sizeMax: number
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
