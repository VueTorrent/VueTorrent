import comparatorMap from './Comparators'
import type { PropertyData, PropertyMetadata, TorrentProperty } from './DashboardDefaults'
import { propsData, propsMetadata } from './DashboardDefaults'
import { DashboardDisplayMode } from './DashboardDisplayMode'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { FeedState } from './FeedState'
import { FileType, extMap, typesMap } from './FileIcon'
import { FilterState } from './FilterState'
import { FilterType } from './FilterType'
import { HistoryKey } from './HistoryKey'
import { ThemeMode } from './ThemeMode'
import { TitleOptions } from './TitleOptions'
import { TorrentState, emojiStateMap, stateQbitToVt, stateVtToQbit } from './TorrentState'
import { TrackerSpecialFilter } from './TrackerSpecialFilter'

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'
const defaultDurationFormat = 'Y[Y] M[M] D[d] H[h] m[m] s[s]'

export {
  comparatorMap,
  TorrentProperty,
  PropertyData,
  PropertyMetadata,
  propsData,
  propsMetadata,
  DashboardDisplayMode,
  DashboardProperty,
  DashboardPropertyType,
  FeedState,
  FileType,
  typesMap,
  extMap,
  FilterState,
  FilterType,
  HistoryKey,
  ThemeMode,
  TitleOptions,
  TorrentState,
  emojiStateMap,
  stateQbitToVt,
  stateVtToQbit,
  TrackerSpecialFilter,
  defaultDateFormat,
  defaultDurationFormat
}
