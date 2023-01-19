import store from '@/store'
import { Hostname } from '@/helpers'
import type {TorrentResponse} from "@/types/qbit/responses";

export class Trackers {
  static update(data: TorrentResponse[]) {
    if (store.state.webuiSettings.showTrackerFilter) {
      store.state.trackers = data
        .map(t => t.tracker)
        .map(url => Hostname.get(url))
        .filter((domain, index, self) => index === self.indexOf(domain) && domain)
        .sort()
    }
  }
}
