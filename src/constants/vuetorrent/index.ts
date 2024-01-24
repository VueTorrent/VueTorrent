import type { PropertyData, PropertyMetadata, TorrentProperty } from './DashboardDefaults'
import { propsData, propsMetadata } from './DashboardDefaults'
import { DashboardDisplayMode } from './DashboardDisplayMode'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { getFileIcon, typesMap } from './FileIcon'
import { HistoryKey } from './HistoryKey'
import { TitleOptions } from './TitleOptions'

export enum VuetorrentTheme {
  LIGHT = 0,
  DARK = 1,
  SYSTEM = 2
}

export {
  TorrentProperty,
  PropertyData,
  PropertyMetadata,
  propsData,
  propsMetadata,
  DashboardDisplayMode,
  DashboardProperty,
  DashboardPropertyType,
  getFileIcon,
  typesMap,
  HistoryKey,
  TitleOptions
}
