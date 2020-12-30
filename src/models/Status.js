import { formatBytes } from '../helpers'

export default class Status {
  constructor(data, tags) {
    if (data != undefined && data != null) {
      this.status = data.connection_status
      this.downloaded = formatBytes(data.dl_info_data, 1)
      this.uploaded = formatBytes(data.up_info_data, 1)
      this.dlspeed = formatBytes(data.dl_info_speed, 1)
      this.upspeed = formatBytes(data.up_info_speed, 1)
      this.freeDiskSpace = formatBytes(data.free_space_on_disk)
      this.altSpeed = data.use_alt_speed_limits
      this.dlspeedRaw = this.formatSpeed(data.dl_info_speed)
      this.upspeedRaw = this.formatSpeed(data.up_info_speed)
      this.tags = tags
    }
  }

  formatSpeed(value) {
    if (!value) {
      return 0
    }

    return Math.round(value / 1000)
  }
}
