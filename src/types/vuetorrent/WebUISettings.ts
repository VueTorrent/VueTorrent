import type { DashboardProperty, TitleOptions } from '@/enums/vuetorrent'

export interface TorrentProperty {
  name: DashboardProperty
  active: boolean
}

export interface TorrentPropertyLocalized extends TorrentProperty {
  label: string
}

export default interface WebUISettings {
  lang: string
  darkTheme: boolean
  showFreeSpace: boolean
  showSpeedGraph: boolean
  showSessionStat: boolean
  showAlltimeStat: boolean
  showCurrentSpeed: boolean
  showTrackerFilter: boolean
  showSpeedInTitle: boolean
  deleteWithFiles: boolean
  title: TitleOptions
  rightDrawer: boolean
  topPagination: boolean
  paginationSize: number
  dateFormat: string
  openSideBarOnStart: boolean
  showShutdownButton: boolean
  busyTorrentProperties: TorrentProperty[]
  doneTorrentProperties: TorrentProperty[]
}
