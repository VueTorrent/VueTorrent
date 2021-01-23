export default class Status {
  constructor(data, tags) {
    if (data) {
      this.status = data.connection_status
      this.downloaded = data.dl_info_data
      this.uploaded = data.up_info_data
      this.dlspeed = data.dl_info_speed
      this.upspeed = data.up_info_speed
      this.freeDiskSpace = data.free_space_on_disk
      this.altSpeed = data.use_alt_speed_limits
      this.dlspeedRaw = this.formatSpeed(data.dl_info_speed)
      this.upspeedRaw = this.formatSpeed(data.up_info_speed)
      this.tags = tags
      Object.freeze(this)
    }
  }

  formatSpeed(value) {
    if (!value) {
      return 0
    }

    return Math.round(value / 1000)
  }
}
