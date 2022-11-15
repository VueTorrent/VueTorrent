import store from '../store'
import { Hostname } from '@/Helpers/index.js'

export class Trackers {
  static update(data) {
    if (store.state.webuiSettings.showTrackerFilter) {
      store.state.trackers = data
        .map(t => t.tracker)
        .map(url => Hostname.get(url))
        .filter((domain, index, self) => index === self.indexOf(domain) && domain)
        .sort()
    }
  }
}
