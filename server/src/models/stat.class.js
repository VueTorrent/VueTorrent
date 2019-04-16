module.exports = class Stat {
  constructor(data) {
    if (data != undefined && data != null) {
      this.status = data.connection_status;
      this.downloaded = this.formatBytes(data.dl_info_data, 1);
      this.uploaded = this.formatBytes(data.up_info_data, 1);
      this.dlspeed = this.formatBytes(data.dl_info_speed, 1);
      this.upspeed = this.formatBytes(data.up_info_speed, 1);
    }
  }
  formatBytes(a, b) {
    if (0 == a) return '0 Bytes';
    var c = 1024,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  }
};
