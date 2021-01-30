export default class Torrent {
  constructor(data) {
    this.name = data.name
    this.size = data.size
    this.added_on = new Date(data.added_on * 1000).toLocaleString()
    this.dlspeed = data.dlspeed
    this.dloaded = data.completed
    this.upspeed = data.upspeed
    this.uploaded = data.uploaded
    this.uploaded_session = data.uploaded_session
    this.eta = this.formatEta(data.eta)
    this.num_leechs = data.num_leechs
    this.num_seeds = data.num_seeds
    this.path = data.path === undefined ? '/downloads' : data.path
    this.state = this.formatState(data.state)
    this.hash = data.hash
    this.available_seeds = data.num_complete
    this.available_peers = data.num_incomplete
    this.savePath = data.save_path
    this.progress = Math.round(data.progress * 10000) / 100
    this.ratio = Math.round(data.ratio * 100) / 100
    this.tags = data.tags.length > 0 ? data.tags.split(',') : null
    this.category = data.category
    this.tracker = data.tracker
    this.comment = data.comment
    this.f_l_piece_prio = data.f_l_piece_prio
    this.seq_dl = data.seq_dl
    this.auto_tmm = data.auto_tmm
    this.dl_limit = data.dl_limit
    this.up_limit = data.up_limit
    this.ratio_limit = data.ratio_limit
    this.availability = Math.round(data.availability * 100) / 100
    this.forced = data.state.includes('forced')

    Object.freeze(this)
  }

  formatState(state) {
    switch (state) {
      case 'forcedDL':
      case 'downloading':
        return 'Downloading'
      case 'metaDL':
        return 'Metadata'
      case 'forcedUP':
      case 'uploading':
      case 'stalledUP':
        return 'Seeding'
      case 'pausedDL':
        return 'Paused'
      case 'pausedUP':
        return 'Done'
      case 'queuedDL':
      case 'queuedUP':
        return 'Queued'
      case 'allocating':
      case 'checkingDL':
      case 'checkingUP':
      case 'checkingResumeData':
        return 'Checking'
      case 'moving':
        return 'Moving'
      case 'unknown':
      case 'missingFiles':
        return 'Fail'
      case 'stalledDL':
        return 'Stalled'
      default:
        return 'Fail'
    }
  }

  formatEta(value) {
    const options = { dayLimit: 100 }
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const year = day * 365

    const durations = [year, day, hour, minute, 1]
    const units = 'ydhms'

    let index = 0
    let unitSize = 0
    const parts = []

    const defaultOptions = {
      maxUnitSize: 2,
      dayLimit: 0,
      minUnit: 0
    }

    const opt = options ?
      Object.assign(defaultOptions, options) :
      defaultOptions

    if (opt.dayLimit && value >= opt.dayLimit * day) {
      return '∞'
    }

    while (
      (!opt.maxUnitSize || unitSize !== opt.maxUnitSize) &&
            index !== durations.length
    ) {
      const duration = durations[index]
      if (value < duration) {
        index++
        continue
      } else if (
        opt.minUnit &&
                durations.length - index <= opt.minUnit
      ) {
        break
      }

      const result = Math.floor(value / duration)
      parts.push(result + units[index])

      value %= duration
      index++
      unitSize++
    }

    if (!parts.length) {
      return '0' + units[durations.length - 1 - opt.minUnit]
    }

    return parts.join(' ')
  }
}
