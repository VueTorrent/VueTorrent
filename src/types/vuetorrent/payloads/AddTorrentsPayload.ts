import {ContentLayout, StopCondition} from '@/enums/qbit/AppPreferences'
import {Category} from '@/types/vuetorrent'

export default interface AddTorrentsPayload {
  urls: string
  files: File[]
  tags: string[]
  category?: Category
  directory: string
  start: boolean
  autoTMM: boolean
  contentLayout: ContentLayout
  stopCondition: StopCondition
  skipHashChecking: boolean
  sequentialDownload: boolean
  firstLastPiecePriority: boolean
  cookie: string
  dlLimit?: number
  upLimit?: number
  ratioLimit?: number
  seedingTimeLimit?: number
  rename: string
  rootFolder: boolean | undefined
}