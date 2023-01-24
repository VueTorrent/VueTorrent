import store from '@/store'
import {ArrayHelper} from '@/helpers'
import type {MainDataResponse} from "@/types/qbit/responses";

export class Tags {
  static update(response: MainDataResponse) {
    if (response?.fullUpdate === true) {
      store.state.tags = response.tags || []

      return
    }

    if (response.tags_removed) {
      store.state.tags = ArrayHelper.remove(store.state.tags, ...response.tags_removed)

      return
    }

    if (response.tags) {
      store.state.tags = ArrayHelper.concat(store.state.tags, response.tags)
    }
  }
}
