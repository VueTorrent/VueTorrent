import type { DashboardProperty, TitleOptions } from '@/enums/vuetorrent'

export class TorrentProperty {
  name: DashboardProperty
  active: boolean

  constructor(name: DashboardProperty, active: boolean) {
    this.name = name
    this.active = active
  }
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
  busyDesktopTorrentProperties: TorrentProperty[]
  doneDesktopTorrentProperties: TorrentProperty[]
  busyMobileCardProperties: TorrentProperty[]
  doneMobileCardProperties: TorrentProperty[]
}
