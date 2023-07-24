import SearchFilters from './SearchFilters'
import { SearchResult } from '@/types/qbit/models'

export default interface SearchData {
  uniqueId: string
  id: number
  timer: NodeJS.Timer | null
  query: string
  itemsPerPage: number
  filters: SearchFilters
  results: SearchResult[]
}