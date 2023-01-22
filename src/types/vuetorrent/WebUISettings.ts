import type {TitleOptions} from "@/enums/vuetorrent"

export interface TorrentProperty {
  name: string
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
  busyTorrentProperties: TorrentProperty[]
  doneTorrentProperties: TorrentProperty[]
}
