import store from '@/store'
import type { ServerState } from '@/types/qbit/models'
import { ConnectionStatus } from '@/enums/qbit'

export default class Status {
  alltimeDownloaded: number = 0
  alltimeUploaded: number = 0
  altSpeed: boolean = false
  dlspeed: number = 0
  dlspeedRaw: number = 0
  freeDiskSpace: number = 0
  sessionDownloaded: number = 0
  sessionUploaded: number = 0
  status: ConnectionStatus = ConnectionStatus.DISCONNECTED
  upspeed: number = 0
  upspeedRaw: number = 0

  constructor(in_state?: ServerState) {
  if (!in_state) {
  return
}

const previous = store.state.status

this.alltimeDownloaded = in_state.alltime_dl || previous.alltimeDownloaded
this.alltimeUploaded = in_state.alltime_ul || previous.alltimeUploaded
this.altSpeed = in_state.use_alt_speed_limits !== undefined ? in_state.use_alt_speed_limits : previous.altSpeed
this.dlspeed = in_state.dl_info_speed || 0
this.dlspeedRaw = this.formatSpeed(in_state.dl_info_speed) || 0
this.freeDiskSpace = in_state.free_space_on_disk || previous.freeDiskSpace
this.sessionDownloaded = in_state.dl_info_data || previous.sessionDownloaded
this.sessionUploaded = in_state.up_info_data || previous.sessionUploaded
this.status = in_state.connection_status || previous.status
this.upspeed = in_state.up_info_speed || 0
this.upspeedRaw = this.formatSpeed(in_state.up_info_speed) || 0

Object.freeze(this)
}

formatSpeed(value: number): number {
  if (!value) {
    return 0
  }

  return Math.round(value)
}
}
