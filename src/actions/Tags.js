import store from '../store'
import { ArrayHelper } from '@/Helpers'

export class Tags {
  static update(response) {
    if (response?.full_update === true) {
      store.state.tags = response.tags

      return
    }

    if (response.tags_removed) {
      store.state.tags = ArrayHelper.remove(store.state.tags, response.tags_removed)

      return
    }

    if (response.tags) {
      store.state.tags = ArrayHelper.concat(store.state.tags, response.tags)


    }
  }
}
