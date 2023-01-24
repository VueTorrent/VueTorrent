import store from '@/store'
import {Status} from '@/models'
import type {ServerState} from "@/types/qbit/models";
import type {Optional} from "@/global";

export class ServerStatus {
  static update(server_state: Optional<ServerState>) {
    if (server_state) {
      store.state.status = new Status(server_state)
    }
  }
}
