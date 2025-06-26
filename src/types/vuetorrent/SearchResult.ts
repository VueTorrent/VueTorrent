import type QSearchResult from '@/types/qbit/models/SearchResult'

export default interface SearchResult extends QSearchResult {
  downloaded?: true
}
