import store from '@/store'

export class Graph {
  public static shiftValues() {
    const state = store.state
    state.download_data.shift()
    state.download_data.push(state.status.dlspeedRaw || 0)
    state.upload_data.shift()
    state.upload_data.push(state.status.upspeedRaw || 0)
  }
}
