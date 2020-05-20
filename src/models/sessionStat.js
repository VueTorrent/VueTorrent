export default class Stat {
    constructor(data) {
      if (data != undefined && data != null) {
        this.status = data.connection_status
        this.downloaded = this.formatBytes(data.dl_info_data, 1)
        this.uploaded = this.formatBytes(data.up_info_data, 1)
        this.dlspeed = this.formatBytes(data.dl_info_speed, 1)
        this.upspeed = this.formatBytes(data.up_info_speed, 1)
      }
    }

    formatBytes(a, b) {
      if (a == 0) return '0 Bytes'
      const c = 1024
        const d = b || 2
        const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const f = Math.floor(Math.log(a) / Math.log(c))
      return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
    }

}
