import store from '../store'
import Status from '@/models/Status'

export class ServerStatus {
  static update(response) {
    if (response.server_state) {
      store.state.status = new Status(response.server_state)
    }
  }
}
