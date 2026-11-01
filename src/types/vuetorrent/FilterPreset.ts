import type Torrent from './Torrent'
import type { FilterType, TorrentState, TrackerSpecialFilter } from '@/constants/vuetorrent'

export default interface FilterPreset {
  id: string
  name: string
  filterType: FilterType
  textFilter: string
  statusFilter: TorrentState[]
  categoryFilter: string[]
  tagFilterInclude: (string | null)[]
  tagFilterExclude: (string | null)[]
  tagFilterType: FilterType
  trackerFilterInclude: (string | TrackerSpecialFilter)[]
  trackerFilterExclude: (string | TrackerSpecialFilter)[]
  trackerFilterType: FilterType
  sortCriterias?: { value: keyof Torrent; reverse: boolean }[]
}
