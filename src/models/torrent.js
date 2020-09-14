export default class Torrent {
    constructor(data) {
        this.name = data.name
        this.size = this.formatBytes(data.size)
        this.birth = new Date(data.added_on * 1000).toLocaleString()
        this.dlspeed = this.formatBytes(data.dlspeed, 1)
        this.dloaded = this.formatBytes(data.completed)
        this.upspeed = this.formatBytes(data.upspeed, 1)
        this.uploaded = this.formatBytes(data.uploaded)
        this.eta = data.eta
        this.num_leechs = data.num_leechs
        this.num_seeds = data.num_seeds
        this.path = data.path === undefined ? '/downloads' : data.path
        this.state = this.formatState(data.state)
        // hash is used to identify
        this.hash = data.hash
        // available seeds
        this.available_seeds = data.num_complete
        this.available_peers = data.num_incomplete
        this.savePath = data.save_path
        this.progress = data.progress * 100
        this.ratio = Math.round(data.ratio * 100)
        this.tags = data.tags.length > 0 ? data.tags.split(',') : null
        this.category = data.category
    }

    formatState(state) {
        switch (state) {
            case 'forcedDL':
            case 'metaDL':
            case 'downloading':
                return 'busy'
            case 'forcedUP':
                return 'seeding'
            case 'pausedDL':
                return 'paused'
            case 'pausedUP':
                return 'done'
            case 'queuedDL':
            case 'queuedUP':
                return 'queued'
            case 'allocating':
            case 'checkingDL':
            case 'checkingUP':
            case 'queuedForChecking':
            case 'checkingResumeData':
            case 'moving':
                return 'checking'
            case 'unknown':
            case 'missingFiles':
                return 'fail'
            default:
                return 'fail'
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
