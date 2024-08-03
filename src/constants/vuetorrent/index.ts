import comparatorMap from './Comparators'
import type { PropertyData, PropertyMetadata, TorrentProperty } from './DashboardDefaults'
import { propsData, propsMetadata } from './DashboardDefaults'
import { DashboardDisplayMode } from './DashboardDisplayMode'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { FeedState } from './FeedState'
import { getFileIcon, typesMap } from './FileIcon'
import { HistoryKey } from './HistoryKey'
import { ThemeMode } from './ThemeMode'
import { TitleOptions } from './TitleOptions'
import { TorrentState, stateQbitToVt, stateVtToQbit } from './TorrentState'

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
  getFileIcon,
  typesMap,
  HistoryKey,
  ThemeMode,
  TitleOptions,
  TorrentState,
  stateQbitToVt,
  stateVtToQbit,
  defaultDateFormat,
  defaultDurationFormat
}
