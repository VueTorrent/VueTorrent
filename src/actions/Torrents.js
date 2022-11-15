import store from '../store'
import { Hostname } from '@/Helpers/index.js'
import Torrent from '@/models/Torrent'

export class Torrents {
  static update(data) {
    if (store.state.webuiSettings.showTrackerFilter) {
      // dont calculate trackers when disabled

      if (store.state.sort_options.tracker !== null) {
        data = data.filter(d => Hostname.get(d.tracker) === store.state.sort_options.tracker)
      }
    }

    // update torrents
    store.state.torrents = data.map(t => new Torrent(t))
  }
}
