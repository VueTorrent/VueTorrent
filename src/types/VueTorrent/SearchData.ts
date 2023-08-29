import { SearchResult } from '@/types/qbit/models'

interface SearchFilters {
  title: string
  category: string
  plugin: string
}

export interface SearchData {
  uniqueId: string
  id: number
  timer: NodeJS.Timeout | null
  query: string
  itemsPerPage: number
  filters: SearchFilters
  results: SearchResult[]
}