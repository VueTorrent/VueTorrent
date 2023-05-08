import store from '@/store'
import { Hostname } from '@/helpers'
import { Torrent as VtTorrent } from '@/models'
import type { Torrent as QbitTorrent } from '@/types/qbit/models'
import { isProduction } from '@/utils'
import { generateMultiple } from '@/utils/faker'

export class Torrents {
  static update(data: QbitTorrent[]) {
    if (store.state.webuiSettings.showTrackerFilter) {
      // don't calculate trackers when disabled

      if (store.state.sort_options.tracker !== null) {
        data = data.filter(d => Hostname.get(d.tracker) === store.state.sort_options.tracker)
      }
    }

    // update torrents
    store.state.torrents = data.map(t => new VtTorrent(t, store.state.webuiSettings.dateFormat))

    // load fake torrents if enabled
    if (isProduction()) return
    if (import.meta.env.VITE_USE_FAKE_TORRENTS === 'false') return
    const count = import.meta.env.VITE_FAKE_TORRENT_COUNT
    store.state.torrents.push(...generateMultiple(count))

    // filter out deleted torrents from selection
    const hash_index = store.state.torrents.map(torrent => torrent.hash)
    store.state.selected_torrents = store.state.selected_torrents.filter(hash => hash_index.includes(hash))
  }
}
