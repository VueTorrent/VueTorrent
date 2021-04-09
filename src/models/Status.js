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
    this.status = this.ddf(connection_status, previous.status),
    this.downloaded = this.ddf(dl_info_data, previous.downloaded),
    this.uploaded = this.ddf(up_info_data, previous.uploaded),
    this.dlspeed = this.ddf(dl_info_speed, 0),
    this.upspeed = this.ddf(up_info_speed, 0),
    this.freeDiskSpace = this.ddf(free_space_on_disk, previous.freeDiskSpace),
    this.altSpeed = this.ddf(use_alt_speed_limits, previous.altSpeed),
    this.dlspeedRaw = this.ddf(this.formatSpeed(dl_info_speed), 0),
    this.upspeedRaw = this.ddf(this.formatSpeed(up_info_speed), 0)
    Object.freeze(this)

  }

  ddf(v, p) {
    if (v === undefined)
      return p
    else
      return v
  }

  formatSpeed(value) {
    if (!value) {
      return 0
    }

    return Math.round(value)
  }
}
