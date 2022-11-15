import store from '../store'

export default class Status {
  constructor({ connection_status, dl_info_data, up_info_data, alltime_dl, alltime_ul, dl_info_speed, up_info_speed, free_space_on_disk, use_alt_speed_limits }) {
    const previous = store.state.status

    this.status = connection_status || previous.status
    this.sessionDownloaded = dl_info_data || previous.sessionDownloaded
    this.sessionUploaded = up_info_data || previous.sessionUploaded
    this.alltimeDownloaded = alltime_dl || previous.alltimeDownloaded
    this.alltimeUploaded = alltime_ul || previous.alltimeUploaded
    this.dlspeed = dl_info_speed || 0
    this.upspeed = up_info_speed || 0
    this.freeDiskSpace = free_space_on_disk || previous.freeDiskSpace
    this.altSpeed = use_alt_speed_limits !== undefined ? use_alt_speed_limits : previous.altSpeed
    this.dlspeedRaw = this.formatSpeed(dl_info_speed) || 0
    this.upspeedRaw = this.formatSpeed(up_info_speed) || 0
    Object.freeze(this)
  }

  formatSpeed(value) {
    if (!value) {
      return 0
    }

    return Math.round(value)
  }
}
