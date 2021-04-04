import store from '../store'

export default class Status {
  constructor({
    connection_status,
    dl_info_data,
    up_info_data,
    dl_info_speed,
    up_info_speed,
    free_space_on_disk,
    use_alt_speed_limits
  }) {

    const previous = store.state.status

    this.status = connection_status || previous.status
    this.downloaded = dl_info_data || previous.downloaded
    this.uploaded = up_info_data || previous.uploaded
    this.dlspeed = dl_info_speed || previous.dlspeed
    this.upspeed = up_info_speed || previous.upspeed
    this.freeDiskSpace = free_space_on_disk || previous.freeDiskSpace
    this.altSpeed = use_alt_speed_limits || previous.altSpeed
    this.dlspeedRaw = this.formatSpeed(dl_info_speed) || previous.dlspeedRaw
    this.upspeedRaw = this.formatSpeed(up_info_speed) || previous.upspeedRaw
    Object.freeze(this)

  }

  formatSpeed(value) {
    if (!value) {
      return 0
    }

    return Math.round(value)
  }
}
