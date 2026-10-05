import SearchResult from './SearchResult'

interface SearchFilters {
  title: string
  category: string
  plugin: string
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
