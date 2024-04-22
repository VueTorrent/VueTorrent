import type { PropertyData, PropertyMetadata, TorrentProperty } from './DashboardDefaults'
import { propsData, propsMetadata } from './DashboardDefaults'
import { DashboardDisplayMode } from './DashboardDisplayMode'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { FeedState } from './FeedState'
import { getFileIcon, typesMap } from './FileIcon'
import { HistoryKey } from './HistoryKey'
import { TitleOptions } from './TitleOptions'
import { VuetorrentTheme } from './VuetorrentTheme'

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'

export {
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
  TitleOptions,
  VuetorrentTheme,
  defaultDateFormat
}
