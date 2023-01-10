import store from '../store'
import { Hostname } from '@/Helpers/index.js'
import Torrent from '@/models/Torrent'
import { isProduction } from '@/utils'
import { generateMultiple } from '@/utils/faker'

export class Torrents {
  static update(data) {
    if (store.state.webuiSettings.showTrackerFilter) {
      // don't calculate trackers when disabled

      if (store.state.sort_options.tracker !== null) {
        data = data.filter(d => Hostname.get(d.tracker) === store.state.sort_options.tracker)
      }
    }

    // update torrents
    store.state.torrents = data.map(t => new Torrent(t, store.state.webuiSettings.dateFormat))

    // load fake torrents if enabled
    if (isProduction()) return
    if (import.meta.env.VITE_USE_FAKE_TORRENTS === 'false') return
    const count = import.meta.env.VITE_FAKE_TORRENT_COUNT
    store.state.torrents.push(...generateMultiple(count))
  }
}
