import { formatBytes } from '@/helpers'
import store from '@/store'

export class DocumentTitle {
  private static setDefault() {
    this.set('qBittorrent')
  }

  private static setGlobalSpeed() {
    const status = store.getters.getStatus()
    this.set(`[D: ${formatBytes(status.dlspeed)}/s, U: ${formatBytes(status.upspeed)}/s] VueTorrent`)
  }

  private static setFirstTorrentStatus() {
    const torrents = store.getters.getTorrents()
    if (!torrents && !torrents.length) return
    const torrent = torrents[0]
    this.set(`[D: ${formatBytes(torrent.dlspeed)}/s, U: ${formatBytes(torrent.upspeed)}/s] ${torrent.progress}%`)
  }

  public static update() {
    const mode = store.getters.getWebuiSettings().title
    switch (mode) {
      case 'Default':
        return this.setDefault()
      case 'Global Speed':
        return this.setGlobalSpeed()
      case 'First Torrent Status':
        return this.setFirstTorrentStatus()
      default:
        return this.setDefault()
    }
  }

  private static set(title: string) {
    document.title = title
  }
}
