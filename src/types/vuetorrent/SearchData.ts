import SearchResult from './SearchResult'

interface SearchFilters {
  title: string
  category: string
  plugin: string
}

export interface SearchData {
  uniqueId: string
  id: number
  lastQuery: string
  query: string
  itemsPerPage: number
  filters: SearchFilters
  results: SearchResult[]
}
