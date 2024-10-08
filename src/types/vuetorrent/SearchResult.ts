import type QSearchResult from '../qbit/models/SearchResult'

export default interface SearchResult extends QSearchResult {
  downloaded?: true
}
