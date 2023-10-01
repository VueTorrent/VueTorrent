import store from '@/store'
import { formatSpeed } from '@/filters'
import { formatProgress } from '@/filters'
import { Torrent } from '@/models'

export class DocumentTitle {
  private static setDefault() {
    this.set('qBittorrent')
  }

  private static setGlobalSpeed() {
    const status = store.getters.getStatus()
    const useBitSpeed = store.state.webuiSettings.useBitSpeed
    this.set(`[D: ${formatSpeed(status.dlspeed, useBitSpeed)}, U: ${formatSpeed(status.upspeed, useBitSpeed)}] VueTorrent`)
  }

  private static setFirstTorrentStatus() {
    const useBitSpeed = store.state.webuiSettings.useBitSpeed
    const torrents: Torrent[] = store.getters.getTorrents()
    if (!torrents || !torrents.length) return
    const torrent = torrents[0]
    this.set(`[D: ${formatSpeed(torrent.dlspeed, useBitSpeed)}, U: ${formatSpeed(torrent.upspeed, useBitSpeed)}] ${formatProgress(torrent.progress)}`)
  }

  public static update() {
    const mode = store.getters.getWebuiSettings().title
    switch (mode) {
      case 'Global Speed':
        return this.setGlobalSpeed()
      case 'First Torrent Status':
        return this.setFirstTorrentStatus()
      case 'Default':
      default:
        return this.setDefault()
    }
  }

  private static set(title: string) {
    document.title = title
  }
}
