import type { ServerState } from '@/types/qbit/models'
import { ConnectionStatus } from '@/enums/qbit'
import type { Optional } from '@/global'

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

  constructor(in_state?: Optional<ServerState>) {
    this.alltimeDownloaded = in_state?.alltime_dl || 0
    this.alltimeUploaded = in_state?.alltime_ul || 0
    this.altSpeed =
      in_state?.use_alt_speed_limits !== undefined
        ? in_state.use_alt_speed_limits
        : false
    this.dlspeed = in_state?.dl_info_speed || 0
    this.dlspeedRaw = this.formatSpeed(in_state?.dl_info_speed || 0)
    this.freeDiskSpace = in_state?.free_space_on_disk || 0
    this.sessionDownloaded = in_state?.dl_info_data || 0
    this.sessionUploaded = in_state?.up_info_data || 0
    this.status = in_state?.connection_status || ConnectionStatus.UNKNOWN
    this.upspeed = in_state?.up_info_speed || 0
    this.upspeedRaw = this.formatSpeed(in_state?.up_info_speed || 0)

    Object.freeze(this)
  }

  formatSpeed(value: number): number {
    if (!value) {
      return 0
    }

    return Math.round(value)
  }
}
