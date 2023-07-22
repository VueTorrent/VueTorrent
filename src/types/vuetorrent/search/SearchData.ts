import SearchFilters from './SearchFilters'
import { SearchResult } from "@/types/qbit/models";

export default interface SearchData {
  id: number
  timer: NodeJS.Timer | null
  query: string
  filters: SearchFilters
  results: SearchResult[]
}