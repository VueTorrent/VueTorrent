import store from '@/store'
import { Hostname } from '@/helpers'
import type {Torrent} from "@/types/qbit/models";

export class Trackers {
  static update(data: Torrent[]) {
    if (store.state.webuiSettings.showTrackerFilter) {
      store.state.trackers = data
        .map(t => t.tracker)
        .map(url => Hostname.get(url))
        .filter((domain, index, self) => index === self.indexOf(domain) && domain)
        .sort()
    }
  }
}
